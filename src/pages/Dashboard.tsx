import { useEffect, useState } from "react";
import type { Project } from "../types";
import { api } from "../services/api";
import Navbar from "../components/layout/Navbar";
import ProjectCard from "../components/projects/ProjectCard";

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await api.fetchProjects();
      const projects = data.projects;
      console.log(data, "data");
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

  const handleUpdate = async (
    projectId: string,
    data: { name: string; description: string; status: Project['status'] }
  ) => {
    try {
      await api.updateProject(projectId, data);
      setProjects(projects.map(t =>
        t._id === projectId ? { ...t, ...data } : t
      ));
    } catch (err) {
      alert('Failed to update project');
    }
  };

  // Filter projects based on search query
  const filteredProjects = projects.filter(project => {
    const query = searchQuery.toLowerCase();
    return (
      project.name.toLowerCase().includes(query) ||
      (project.description?.toLowerCase().includes(query) ?? false)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Projects</h1>
        
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="mt-2 text-sm text-gray-600">
              Found {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">Loading projects...</div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {searchQuery ? (
              <>
                No projects found matching "{searchQuery}"
                <button
                  onClick={() => setSearchQuery("")}
                  className="block mx-auto mt-4 text-blue-600 hover:text-blue-800 underline"
                >
                  Clear search
                </button>
              </>
            ) : (
              "No projects yet. Click \"Add Project\" to create one."
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onDelete={handleDelete}
                onProjectStatusChange={handleProjectStatus}
                onUpdate={handleUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;