import { useNavigate } from "react-router-dom";
import type { Project } from "../../types";

const ProjectCard: React.FC<{ project: Project; onProjectStatusChange: (id: string, status: Project['status']) => void; onDelete: (id: string) => void }> = ({ project, onDelete , onProjectStatusChange }) => {
  const navigate = useNavigate();
    const statusColors = {
    active: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
      <div onClick={() => navigate(`/project/${project._id}`)}>
        <div className="flex items-start justify-between mb-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{project.description || 'No description'}</p>
             <div className="flex items-center gap-2">
               <span className="text-sm text-gray-600">Status:</span>
               <select
                 value={project.status}
                 onClick={(e) => e.stopPropagation()}   
                 onChange={(e) => onProjectStatusChange(project._id, e.target.value as Project['status'])} 
                 className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[project.status]}`}
               >
                 <option value="active">Active</option>
                 <option value="completed">Completed</option>
               </select>
             </div>
        <p className="text-xs text-gray-400">
          Created: {new Date(project.createdAt).toLocaleDateString()}
        </p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(project._id);
        }}
        className="mt-4 w-full bg-red-100 text-red-600 py-2 rounded-lg hover:bg-red-200 transition-colors text-sm"
      >
        Delete Project
      </button>
    </div>
  );
};
export default ProjectCard;