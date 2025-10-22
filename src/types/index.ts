export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Project {
  _id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  status: 'active' | 'completed';
}

export interface ProjectResponse {
  projects: Project[];
  sucess:string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed' | 'blocked';
  dueDate?: string;
  projectId: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}