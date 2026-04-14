export interface UserStory {
  id: string;
  role: string;
  goal: string;
  benefit: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  status: 'To Do' | 'In Progress' | 'Done';
}

export interface BacklogItem {
  id: string;
  title: string;
  description: string;
  estimate: number; // Story points
}

export interface SprintData {
  projectName: string;
  sprintNumber: number;
  goal: string;
  duration: string;
  userStories: UserStory[];
  productBacklog: BacklogItem[];
  sprintBacklog: BacklogItem[];
  tasks: Task[];
  deliverables: string[];
}
