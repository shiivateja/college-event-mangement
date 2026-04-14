import { SprintData } from './types';

export const SPRINT_1_DATA: SprintData = {
  projectName: "College Event Management System",
  sprintNumber: 1,
  goal: "Establish core authentication infrastructure, database schema, and initial administrative interface to support student registration and system management.",
  duration: "2 Weeks (March 5, 2026 - March 19, 2026)",
  userStories: [
    {
      id: "US-01",
      role: "Student",
      goal: "register for an account",
      benefit: "I can access and participate in college events",
      priority: "High"
    },
    {
      id: "US-02",
      role: "Student",
      goal: "log in to my account",
      benefit: "I can view my registered events and profile",
      priority: "High"
    },
    {
      id: "US-03",
      role: "Admin",
      goal: "log in to the administrative portal",
      benefit: "I can manage events and student registrations",
      priority: "High"
    },
    {
      id: "US-04",
      role: "Admin",
      goal: "view a basic dashboard",
      benefit: "I can see a summary of system activity",
      priority: "Medium"
    }
  ],
  productBacklog: [
    { id: "PB-01", title: "User Authentication System", description: "Complete login/logout functionality for students and admins.", estimate: 8 },
    { id: "PB-02", title: "Student Registration", description: "Form for students to create new accounts.", estimate: 5 },
    { id: "PB-03", title: "Event Creation Module", description: "Admin interface to create and schedule events.", estimate: 13 },
    { id: "PB-04", title: "Database Architecture", description: "Design and implementation of SQL schema.", estimate: 5 },
    { id: "PB-05", title: "Admin Dashboard UI", description: "Basic layout for administrative overview.", estimate: 3 },
    { id: "PB-06", title: "Event Registration", description: "Ability for students to sign up for specific events.", estimate: 8 },
    { id: "PB-07", title: "Email Notifications", description: "Automated emails for registration confirmation.", estimate: 5 }
  ],
  sprintBacklog: [
    { id: "PB-01", title: "User Authentication System", description: "Complete login/logout functionality.", estimate: 8 },
    { id: "PB-02", title: "Student Registration", description: "Form for students to create new accounts.", estimate: 5 },
    { id: "PB-04", title: "Database Architecture", description: "Design and implementation of SQL schema.", estimate: 5 },
    { id: "PB-05", title: "Admin Dashboard UI", description: "Basic layout for administrative overview.", estimate: 3 }
  ],
  tasks: [
    { id: "T-01", title: "Database Schema Design", description: "Define tables for Users, Roles, and Sessions.", assignee: "Database Lead", status: "Done" },
    { id: "T-02", title: "Backend Auth API", description: "Implement JWT-based authentication endpoints.", assignee: "Backend Dev", status: "In Progress" },
    { id: "T-03", title: "Registration Frontend", description: "Develop responsive registration form with validation.", assignee: "Frontend Dev", status: "In Progress" },
    { id: "T-04", title: "Admin Login Page", description: "Create secure login interface for administrators.", assignee: "Frontend Dev", status: "To Do" },
    { id: "T-05", title: "Dashboard Shell", description: "Implement sidebar and header for admin portal.", assignee: "UI Designer", status: "To Do" },
    { id: "T-06", title: "Environment Setup", description: "Configure server, database, and CI/CD pipeline.", assignee: "DevOps", status: "Done" }
  ],
  deliverables: [
    "Functional Student Registration Form",
    "Secure Login System (Student & Admin)",
    "Initialized SQL Database with User Schema",
    "Basic Admin Dashboard Layout",
    "Sprint 1 Technical Documentation"
  ]
};
