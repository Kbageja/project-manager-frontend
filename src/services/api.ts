import type { Project, ProjectResponse, Task } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


class ApiService {
  private getAuthHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
    };
  }

  async register(name: string, email: string, password: string): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) throw new Error('Registration failed');
    return res.json();
  }

  async login(email: string, password: string): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  }

  async logout(): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Logout failed');
  }

async fetchProjects(): Promise<ProjectResponse> {
  // ✅ Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // ✅ Build URL with userId as query param
  const res = await fetch(
    `${API_BASE_URL}/projects/fetchall?userId=${user.id}`,
    {
      headers: this.getAuthHeaders(),
      credentials: 'include',
    }
  );

  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}
async createProject(name: string, description: string): Promise<Project> {
  // ✅ Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const res = await fetch(`${API_BASE_URL}/projects/create`, {
    method: 'POST',
    headers: this.getAuthHeaders(),
    credentials: 'include',
    // ✅ Include userId in body
    body: JSON.stringify({
      name,
      description,
      userId: user.id,
      status:"active"   // 👈 Add userId from localStorage
    }),
  });

  if (!res.ok) throw new Error('Failed to create project');
  return res.json();
}


  async deleteProject(projectId: string): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/projects/delete?projectId=${projectId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify({ projectId }),
    });
    if (!res.ok) throw new Error('Failed to delete project');
  }

    async updateProject(projectId: string, updates: Partial<Project>): Promise<Project> {
    const res = await fetch(`${API_BASE_URL}/projects/update`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify({ projectId, ...updates }),
    });
    if (!res.ok) throw new Error('Failed to update task');
    return res.json();
  }

async fetchTasks(projectId: string): Promise<Task[]> {
  const res = await fetch(
    `${API_BASE_URL}/tasks/fetchtasks?projectId=${projectId}`,
    {
      headers: this.getAuthHeaders(),
      credentials: 'include',
    }
  );

  if (!res.ok) throw new Error('Failed to fetch tasks');

  // ✅ Only call res.json() once
  const data = await res.json();
  console.log(data, "Fetched tasks response");

  // ✅ Return the task array (based on your backend response)
  return data.tasks;
}

  async addTask(projectId: string, title: string, description: string,dueDate:string): Promise<Task> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const res = await fetch(`${API_BASE_URL}/tasks/add`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify({ projectId, title, description, status: 'pending',userId: user.id,dueDate  }),
    });
    if (!res.ok) throw new Error('Failed to add task');
    return res.json();
  }

  async updateTask(taskId: string, updates: Partial<Task>): Promise<Task> {
    const res = await fetch(`${API_BASE_URL}/tasks/update`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify({ taskId, ...updates }),
    });
    if (!res.ok) throw new Error('Failed to update task');
    return res.json();
  }

  async deleteTask(taskId: string): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/tasks/delete`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify({ taskId }),
    });
    if (!res.ok) throw new Error('Failed to delete task');
  }
}

export const api = new ApiService();
