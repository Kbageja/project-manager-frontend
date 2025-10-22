import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Project, Task } from "../types";
import { api } from "../services/api";
import Navbar from "../components/layout/Navbar";
import TaskCard from "../components/tasks/TaskCard";
import AddTaskModal from "../components/tasks/AddTaskModal";

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (projectId) loadTasks();
  }, [projectId]);

  const loadTasks = async () => {
    try {
      console.log("Fetching tasks for projectId:", projectId);
      const data = await api.fetchTasks(projectId!);
      console.log(data,"data");
      setTasks(data);
    } catch (err) {
      console.error('Failed to load tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (taskId: string, status: Task['status']) => {
    try {
      await api.updateTask(taskId, { status });
      setTasks(tasks.map(t => t._id === taskId ? { ...t, status } : t));
    } catch (err) {
      alert('Failed to update task status');
    }
  };



  const handleDelete = async (taskId: string) => {
    if (!confirm('Delete this task?')) return;
    try {
      await api.deleteTask(taskId);
      setTasks(tasks.filter(t => t._id !== taskId));
    } catch (err) {
      alert('Failed to delete task');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Project Tasks</h1>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Add Task
          </button>
        </div>
        {loading ? (
          <div className="text-center py-12">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No tasks yet. Click "Add Task" to create one.
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
      {showModal && <AddTaskModal projectId={projectId!} onClose={() => setShowModal(false)} onAdd={loadTasks} />}
    </div>
  );
};
export default ProjectDetail;