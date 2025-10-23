import type { Task } from "../../types";

const TaskCard: React.FC<{
  task: Task;
  onStatusChange: (id: string, status: Task['status']) => void;
  onDelete: (id: string) => void;
}> = ({ task, onStatusChange, onDelete }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    inprogress: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{task.title}</h3>
          <p className="text-gray-600 mb-4">{task.description}</p>
        <p>Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}</p>
        </div>
        <button
          onClick={() => onDelete(task._id)}
          className="text-red-500 hover:text-red-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Status:</span>
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value as Task['status'])}
          className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[task.status]}`}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="inprogress">In progress</option>
        </select>
      </div>
    </div>
  );
};
export default TaskCard;