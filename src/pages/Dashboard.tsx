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

  // Filter projects based on search query
  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">My Projects</h1>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg 
                className="h-5 w-5 text-gray-400" 
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
            </div>
            <input
              type="text"
              placeholder="Search projects by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg 
                  className="h-5 w-5 text-gray-400 hover:text-gray-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        {searchQuery && (
          <div className="mb-4 text-sm text-gray-600">
            Found {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} matching "{searchQuery}"
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">Loading projects...</div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {searchQuery 
              ? `No projects found matching "${searchQuery}"`
              : 'No projects yet. Click "Add Project" to create one.'
            }
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project._id} 
                project={project} 
                onDelete={handleDelete} 
                onProjectStatusChange={handleProjectStatus} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;