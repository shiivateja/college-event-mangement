import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Database, 
  LayoutDashboard, 
  LogIn, 
  UserPlus, 
  ShieldCheck, 
  LogOut,
  ChevronRight,
  GraduationCap,
  Calendar,
  Activity,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Sparkles
} from 'lucide-react';

// --- Types ---
interface User {
  id: number;
  name: string;
  email: string;
  registration_number?: string;
  phone_number?: string;
  role: 'student' | 'admin';
}

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  capacity: number;
  image_url: string;
}

type View = 'landing' | 'login' | 'register' | 'admin-dashboard' | 'student-dashboard' | 'browse-events' | 'my-events';

// --- Components ---

const Navbar = ({ user, setView, onLogout }: { user: User | null, setView: (v: View) => void, onLogout: () => void }) => (
  <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <GraduationCap size={20} />
          </div>
          <span className="font-bold text-slate-900 tracking-tight">EduEvents</span>
        </div>
        
        <div className="flex items-center gap-6">
          {user && user.role === 'student' && (
            <>
              <button onClick={() => setView('browse-events')} className="text-sm font-medium text-slate-600 hover:text-indigo-600">Browse Events</button>
              <button onClick={() => setView('my-events')} className="text-sm font-medium text-slate-600 hover:text-indigo-600">My Registrations</button>
            </>
          )}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600 hidden sm:inline">Hello, <span className="font-semibold">{user.name}</span></span>
                <button 
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setView('login')}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  Login
                </button>
                <button 
                  onClick={() => setView('register')}
                  className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </nav>
);

const LandingPage = ({ setView, events }: { setView: (v: View) => void, events: Event[] }) => (
  <div className="bg-slate-50 min-h-[calc(100vh-64px)]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center space-y-8 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-widest"
        >
          <Sparkles size={14} />
          Final Release Live
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight"
        >
          Manage College Events <br />
          <span className="text-indigo-600">With Ease.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-600 leading-relaxed"
        >
          The ultimate platform for students to discover events and for administrators to manage campus activities seamlessly.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
        >
          <button 
            onClick={() => setView('register')}
            className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 flex items-center justify-center gap-2 group"
          >
            Get Started <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => setView('login')}
            className="px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-xl font-bold hover:bg-slate-50"
          >
            Student Login
          </button>
        </motion.div>
      </div>
      
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Users, title: "Student Registration", desc: "Quick and easy registration with college-specific details." },
          { icon: ShieldCheck, title: "Admin Dashboard", desc: "Comprehensive tools for managing students and tracking event stats." },
          { icon: Calendar, title: "Event Management", desc: "Create, browse, and register for technical, cultural, and sports events." }
        ].map((feature, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm"
          >
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
              <feature.icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
            <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {events.length > 0 && (
        <div className="mt-32">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Featured Events</h2>
              <p className="text-slate-500">Don't miss out on these upcoming activities</p>
            </div>
            <button onClick={() => setView('login')} className="text-sm font-bold text-indigo-600 hover:underline">View All Events</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.slice(0, 3).map((event, i) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + (i * 0.1) }}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <img src={event.image_url} alt="" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase rounded">{event.category}</span>
                    <span className="text-xs font-bold text-slate-900">{event.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{event.title}</h3>
                  <p className="text-sm text-slate-500 mb-6 line-clamp-2">{event.description}</p>
                  <button onClick={() => setView('login')} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
                    Register to Attend
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

const AuthForm = ({ type, onSuccess, setView }: { type: 'login' | 'register', onSuccess: (u: User) => void, setView: (v: View) => void }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    registration_number: '', 
    phone_number: type === 'register' ? '+91' : '' 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = type === 'login' ? '/api/auth/login' : '/api/auth/register';
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        onSuccess(data.user);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 p-4 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
            {type === 'login' ? <LogIn size={24} /> : <UserPlus size={24} />}
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            {type === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            {type === 'login' ? 'Enter your credentials to continue' : 'Join the college event network'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-rose-50 border border-rose-100 text-rose-600 text-sm rounded-lg flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'register' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Registration Number</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="Registration Number"
                  value={formData.registration_number}
                  onChange={e => setFormData({...formData, registration_number: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="+91"
                  value={formData.phone_number}
                  onChange={e => setFormData({...formData, phone_number: e.target.value})}
                />
              </div>
            </>
          )}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="abc@gmail.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 disabled:opacity-50 transition-all mt-4"
          >
            {loading ? 'Processing...' : type === 'login' ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            {type === 'login' ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setView(type === 'login' ? 'register' : 'login')}
              className="ml-1 text-indigo-600 font-bold hover:underline"
            >
              {type === 'login' ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState<{ totalStudents: number, totalEvents: number, totalRegistrations: number, recentRegistrations: any[] } | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [tab, setTab] = useState<'stats' | 'users' | 'events'>('stats');
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '', description: '', date: '', time: '', location: '', category: 'Technical', capacity: 100, image_url: ''
  });

  const fetchData = () => {
    fetch('/api/admin/stats').then(res => res.json()).then(setStats);
    fetch('/api/admin/users').then(res => res.json()).then(setAllUsers);
    fetch('/api/events').then(res => res.json()).then(setAllEvents);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent)
    });
    if (res.ok) {
      setShowEventForm(false);
      setNewEvent({ title: '', description: '', date: '', time: '', location: '', category: 'Technical', capacity: 100, image_url: '' });
      fetchData();
    }
  };

  const handleDeleteEvent = async (id: number) => {
    if (confirm('Are you sure you want to delete this event?')) {
      await fetch(`/api/events/${id}`, { method: 'DELETE' });
      fetchData();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Admin Portal</h2>
          <p className="text-slate-500">System overview and management</p>
        </div>
        <div className="flex gap-2 p-1 bg-slate-200/50 rounded-xl">
          <button 
            onClick={() => setTab('stats')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${tab === 'stats' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setTab('events')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${tab === 'events' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Events
          </button>
          <button 
            onClick={() => setTab('users')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${tab === 'users' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Students
          </button>
        </div>
      </div>

      {tab === 'stats' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                  <Users size={24} />
                </div>
              </div>
              <div className="text-4xl font-black text-slate-900 mb-1">{stats?.totalStudents || 0}</div>
              <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">Total Students</div>
            </div>
            
            <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                  <Calendar size={24} />
                </div>
              </div>
              <div className="text-4xl font-black text-slate-900 mb-1">{stats?.totalEvents || 0}</div>
              <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">Total Events</div>
            </div>

            <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
                  <Activity size={24} />
                </div>
              </div>
              <div className="text-4xl font-black text-slate-900 mb-1">{stats?.totalRegistrations || 0}</div>
              <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">Total Registrations</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Recent Activity</h3>
              <button onClick={() => setTab('users')} className="text-xs font-bold text-indigo-600 hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">Event</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {stats?.recentRegistrations.map((r, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900">{r.user_name}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{r.event_title}</td>
                      <td className="px-6 py-4 text-xs text-slate-400">
                        {new Date(r.registered_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab === 'events' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-900">Manage Events</h3>
            <button 
              onClick={() => setShowEventForm(!showEventForm)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700"
            >
              {showEventForm ? 'Cancel' : 'Add New Event'}
            </button>
          </div>

          {showEventForm && (
            <motion.form 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleCreateEvent}
              className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Event Title</label>
                <input required className="w-full px-4 py-2 bg-slate-50 border rounded-lg" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Description</label>
                <textarea required className="w-full px-4 py-2 bg-slate-50 border rounded-lg" value={newEvent.description} onChange={e => setNewEvent({...newEvent, description: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Date</label>
                <input type="date" required className="w-full px-4 py-2 bg-slate-50 border rounded-lg" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Time</label>
                <input type="text" required placeholder="10:00 AM" className="w-full px-4 py-2 bg-slate-50 border rounded-lg" value={newEvent.time} onChange={e => setNewEvent({...newEvent, time: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Location</label>
                <input required className="w-full px-4 py-2 bg-slate-50 border rounded-lg" value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Category</label>
                <select className="w-full px-4 py-2 bg-slate-50 border rounded-lg" value={newEvent.category} onChange={e => setNewEvent({...newEvent, category: e.target.value})}>
                  <option>Technical</option>
                  <option>Cultural</option>
                  <option>Sports</option>
                  <option>Workshop</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700">Create Event</button>
              </div>
            </motion.form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allEvents.map(event => (
              <div key={event.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <img src={event.image_url || 'https://picsum.photos/seed/event/400/200'} alt="" className="w-full h-40 object-cover" />
                <div className="p-6">
                  <h4 className="font-bold text-slate-900 mb-2">{event.title}</h4>
                  <p className="text-xs text-slate-500 mb-4 line-clamp-2">{event.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{event.category}</span>
                    <button onClick={() => handleDeleteEvent(event.id)} className="text-rose-500 hover:text-rose-700"><LogOut size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'users' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-slate-900">Student Directory</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="px-6 py-4">Student Name</th>
                  <th className="px-6 py-4">Reg. Number</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Phone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {allUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">{u.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-mono">{u.registration_number || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{u.email}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{u.phone_number || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const StudentDashboard = ({ user, setView }: { user: User, setView: (v: View) => void }) => {
  const [myEvents, setMyEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch(`/api/registrations/user/${user.id}`).then(res => res.json()).then(setMyEvents);
  }, [user.id]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome, {user.name}</h2>
        <p className="text-slate-500">Your student portal for campus events</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="p-10 bg-indigo-600 rounded-3xl text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">
                {myEvents.length > 0 ? `You have ${myEvents.length} upcoming events` : 'No upcoming events'}
              </h3>
              <p className="text-indigo-100 mb-6">Explore and register for new events happening around campus.</p>
              <button onClick={() => setView('browse-events')} className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
                Browse Events
              </button>
            </div>
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-64 h-64 bg-indigo-500 rounded-full opacity-20 blur-3xl" />
          </div>

          {myEvents.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900">Your Registered Events</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {myEvents.map(event => (
                  <div key={event.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex gap-4">
                    <img src={event.image_url} alt="" className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                      <h5 className="font-bold text-sm text-slate-900">{event.title}</h5>
                      <p className="text-xs text-slate-500">{event.date} • {event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-4">Quick Stats</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Registered Events</span>
                <span className="font-bold">{myEvents.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Profile Status</span>
                <span className="text-emerald-500 font-bold text-xs uppercase">Verified</span>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-4">Announcements</h4>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-xs font-bold text-indigo-600 mb-1">FINAL RELEASE</div>
                <p className="text-sm text-slate-700 font-medium">Event registration is now fully functional!</p>
                <p className="text-[10px] text-slate-400 mt-1">Just now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BrowseEvents = ({ user, setView }: { user: User, setView: (v: View) => void }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [registeredIds, setRegisteredIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/events').then(res => res.json()).then(setEvents);
    fetch(`/api/registrations/user/${user.id}`)
      .then(res => res.json())
      .then((data: Event[]) => setRegisteredIds(data.map(e => e.id)));
  }, [user.id]);

  const handleRegister = async (eventId: number) => {
    setLoading(true);
    const res = await fetch('/api/registrations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id, event_id: eventId })
    });
    if (res.ok) {
      setRegisteredIds([...registeredIds, eventId]);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Explore Events</h2>
        <p className="text-slate-500">Discover and register for upcoming campus activities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map(event => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <img src={event.image_url} alt="" className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase rounded">{event.category}</span>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-900">{event.date}</p>
                  <p className="text-[10px] text-slate-500">{event.time}</p>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{event.title}</h3>
              <p className="text-sm text-slate-500 mb-6 line-clamp-3">{event.description}</p>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
                <Activity size={14} />
                <span>{event.location}</span>
              </div>
              <button 
                disabled={registeredIds.includes(event.id) || loading}
                onClick={() => handleRegister(event.id)}
                className={`w-full py-3 rounded-xl font-bold transition-all ${
                  registeredIds.includes(event.id) 
                    ? 'bg-emerald-50 text-emerald-600 cursor-default' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100'
                }`}
              >
                {registeredIds.includes(event.id) ? 'Registered' : 'Register Now'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch('/api/events').then(res => res.json()).then(setEvents);
  }, []);

  const handleAuthSuccess = (u: User) => {
    setUser(u);
    setView(u.role === 'admin' ? 'admin-dashboard' : 'student-dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar user={user} setView={setView} onLogout={handleLogout} />

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {view === 'landing' && <LandingPage setView={setView} events={events} />}
          {view === 'login' && <AuthForm type="login" onSuccess={handleAuthSuccess} setView={setView} />}
          {view === 'register' && <AuthForm type="register" onSuccess={handleAuthSuccess} setView={setView} />}
          {view === 'admin-dashboard' && <AdminDashboard />}
          {view === 'student-dashboard' && user && <StudentDashboard user={user} setView={setView} />}
          {view === 'browse-events' && user && <BrowseEvents user={user} setView={setView} />}
          {view === 'my-events' && user && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
               <h2 className="text-3xl font-bold text-slate-900 mb-8">My Registrations</h2>
               <StudentDashboard user={user} setView={setView} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
