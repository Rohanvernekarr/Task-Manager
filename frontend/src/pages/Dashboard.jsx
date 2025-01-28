import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/common/Card';
import api from '../utils/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0
  });
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]); 
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/users/stats');
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    const fetchTasks = async () => {
      try {
        const { data } = await api.get('/tasks');
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchStats();
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!newTask.trim()) {
      return alert('Task name cannot be empty!');
    }

    try {
      const { data } = await api.post('/tasks', { name: newTask }); 
      setTasks((prevTasks) => [...prevTasks, data]); 
      setStats((prevStats) => ({
        ...prevStats,
        totalTasks: prevStats.totalTasks + 1,
        pendingTasks: prevStats.pendingTasks + 1
      }));
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Welcome, {user.name}!
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-blue-50">
          <div className="text-center">
            <h3 className="text-lg font-medium text-blue-800">Total Tasks</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalTasks}</p>
          </div>
        </Card>
        
        <Card className="bg-green-50">
          <div className="text-center">
            <h3 className="text-lg font-medium text-green-800">Completed</h3>
            <p className="text-3xl font-bold text-green-600">{stats.completedTasks}</p>
          </div>
        </Card>
        
        <Card className="bg-yellow-50">
          <div className="text-center">
            <h3 className="text-lg font-medium text-yellow-800">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.pendingTasks}</p>
          </div>
        </Card>
      </div>

      <Card title="Add Task">
        <form onSubmit={handleAddTask} className="space-y-4">
          <input
            type="text"
            placeholder="Enter task name"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Task
          </button>
        </form>
      </Card>

      <Card title="Recent Activity">
        <div className="space-y-4">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <p key={task.id} className="text-gray-600">
                {task.name} ({task.status})
              </p>
            ))
          ) : (
            <p className="text-gray-600">No recent activity to display.</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
