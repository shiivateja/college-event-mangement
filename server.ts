import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database("college_events.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    registration_number TEXT UNIQUE,
    phone_number TEXT,
    role TEXT CHECK(role IN ('student', 'admin')) NOT NULL DEFAULT 'student'
  );

  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    location TEXT NOT NULL,
    category TEXT NOT NULL,
    capacity INTEGER DEFAULT 100,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    event_id INTEGER NOT NULL,
    registered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (event_id) REFERENCES events(id),
    UNIQUE(user_id, event_id)
  );
`);

// Simple migration for existing databases
try { db.exec("ALTER TABLE users ADD COLUMN registration_number TEXT"); } catch (e) {}
try { db.exec("ALTER TABLE users ADD COLUMN phone_number TEXT"); } catch (e) {}
try { db.exec("CREATE UNIQUE INDEX IF NOT EXISTS idx_user_reg_num ON users(registration_number)"); } catch (e) {}

// Seed Initial Events if none exist
const eventCount = db.prepare("SELECT COUNT(*) as count FROM events").get() as any;
if (eventCount.count === 0) {
  const seedEvents = [
    ["Annual Tech Fest 2026", "A grand celebration of technology and innovation.", "2026-05-15", "10:00 AM", "Main Auditorium", "Technical", 500, "https://picsum.photos/seed/tech/800/400"],
    ["Inter-College Sports Meet", "Compete with the best athletes from across the region.", "2026-06-10", "08:00 AM", "College Ground", "Sports", 1000, "https://picsum.photos/seed/sports/800/400"],
    ["Cultural Night", "An evening filled with music, dance, and drama.", "2026-05-20", "06:00 PM", "Open Air Theater", "Cultural", 800, "https://picsum.photos/seed/cultural/800/400"]
  ];
  const stmt = db.prepare("INSERT INTO events (title, description, date, time, location, category, capacity, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  seedEvents.forEach(event => stmt.run(...event));
}

// Seed Admin if not exists
const adminExists = db.prepare("SELECT * FROM users WHERE role = 'admin'").get();
if (!adminExists) {
  db.prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)")
    .run("Admin User", "admin@college.edu", "admin123", "admin");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/auth/register", (req, res) => {
    const { name, email, password, registration_number, phone_number } = req.body;
    try {
      const result = db.prepare("INSERT INTO users (name, email, password, registration_number, phone_number, role) VALUES (?, ?, ?, ?, ?, ?)")
        .run(name, email, password, registration_number, phone_number, 'student');
      const user = db.prepare("SELECT id, name, email, registration_number, phone_number, role FROM users WHERE id = ?").get(result.lastInsertRowid);
      res.json({ success: true, user });
    } catch (error: any) {
      let message = "Registration failed";
      if (error.message.includes("UNIQUE")) {
        if (error.message.includes("email")) message = "Email already exists";
        if (error.message.includes("registration_number")) message = "Registration number already exists";
      }
      res.status(400).json({ success: false, message });
    }
  });

  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare("SELECT id, name, email, registration_number, phone_number, role FROM users WHERE email = ? AND password = ?")
      .get(email, password) as any;
    
    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });

  app.get("/api/admin/users", (req, res) => {
    const users = db.prepare("SELECT id, name, email, registration_number, phone_number, role FROM users WHERE role = 'student' ORDER BY id DESC").all();
    res.json(users);
  });

  app.get("/api/admin/stats", (req, res) => {
    const totalStudents = db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'student'").get() as any;
    const totalEvents = db.prepare("SELECT COUNT(*) as count FROM events").get() as any;
    const totalRegistrations = db.prepare("SELECT COUNT(*) as count FROM registrations").get() as any;
    
    const recentRegistrations = db.prepare(`
      SELECT u.name as user_name, e.title as event_title, r.registered_at
      FROM registrations r
      JOIN users u ON r.user_id = u.id
      JOIN events e ON r.event_id = e.id
      ORDER BY r.registered_at DESC
      LIMIT 5
    `).all();

    res.json({
      totalStudents: totalStudents.count,
      totalEvents: totalEvents.count,
      totalRegistrations: totalRegistrations.count,
      recentRegistrations
    });
  });

  // Event Routes
  app.get("/api/events", (req, res) => {
    const events = db.prepare("SELECT * FROM events ORDER BY date ASC").all();
    res.json(events);
  });

  app.post("/api/events", (req, res) => {
    const { title, description, date, time, location, category, capacity, image_url } = req.body;
    try {
      const result = db.prepare("INSERT INTO events (title, description, date, time, location, category, capacity, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
        .run(title, description, date, time, location, category, capacity || 100, image_url);
      res.json({ success: true, id: result.lastInsertRowid });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  });

  app.delete("/api/events/:id", (req, res) => {
    try {
      db.prepare("DELETE FROM registrations WHERE event_id = ?").run(req.params.id);
      db.prepare("DELETE FROM events WHERE id = ?").run(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  });

  // Registration Routes
  app.post("/api/registrations", (req, res) => {
    const { user_id, event_id } = req.body;
    try {
      db.prepare("INSERT INTO registrations (user_id, event_id) VALUES (?, ?)")
        .run(user_id, event_id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message.includes("UNIQUE") ? "Already registered" : "Registration failed" });
    }
  });

  app.get("/api/registrations/user/:userId", (req, res) => {
    const registrations = db.prepare(`
      SELECT e.* FROM events e
      JOIN registrations r ON e.id = r.event_id
      WHERE r.user_id = ?
      ORDER BY e.date ASC
    `).all(req.params.userId);
    res.json(registrations);
  });

  app.get("/api/registrations/event/:eventId", (req, res) => {
    const students = db.prepare(`
      SELECT u.name, u.email, u.registration_number, r.registered_at
      FROM users u
      JOIN registrations r ON u.id = r.user_id
      WHERE r.event_id = ?
    `).all(req.params.eventId);
    res.json(students);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
