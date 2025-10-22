import { useEffect, useState } from "react";
import type { Project } from "../types";
import { api } from "../services/api";
import Navbar from "../components/layout/Navbar";
import ProjectCard from "../components/projects/ProjectCard";

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await api.fetchProjects();
      const projects = data.projects
      console.log(data,"data");
      setProjects(projects);

    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.deleteProject(projectId);
      setProjects(projects.filter(p => p._id !== projectId));
    } catch (err) {
      alert('Failed to delete project');
    }
  };

      const handleProjectStatus = async (projectId: string, status: Project['status']) => {
    try {
      await api.updateProject(projectId, { status });
      setProjects(projects.map(t => t._id === projectId ? { ...t, status } : t));
    } catch (err) {
      alert('Failed to update task status');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Projects</h1>
        {loading ? (
          <div className="text-center py-12">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No projects yet. Click "Add Project" to create one.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} onDelete={handleDelete} onProjectStatusChange={handleProjectStatus} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;