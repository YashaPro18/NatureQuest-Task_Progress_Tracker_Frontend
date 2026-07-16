// src/pages/TaskManager/TaskManager.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import TaskManagerHeader from './components/TaskManagerHeader';
import TaskStats from './components/TaskStats';
import AddTaskForm from './components/AddTaskForm';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import ToastMessage from './components/ToastMessage';
import './TaskManager.css';
import API_URL from "../../config/api";

function TaskManager() {
  const navigate = useNavigate();
  const { token, updateUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [toast, setToast] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, active: 0, completed: 0 });

  // ─── Fetch tasks from backend ───
  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      showToast('Failed to load tasks', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // ─── Load tasks on mount ───
  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token, fetchTasks]);

  // ─── Update stats when tasks change ───
  useEffect(() => {
    const total = tasks.length;
    const active = tasks.filter(t => !t.completed).length;
    const completed = tasks.filter(t => t.completed).length;
    setStats({ total, active, completed });
  }, [tasks]);

  // ─── Toast helper ───
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ─── Add task ───
  const addTask = async (taskData) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      const newTask = await response.json();
      setTasks([newTask, ...tasks]);
      showToast(`"${taskData.title}" added! 🌱`, 'success');
    } catch (error) {
      showToast('Failed to add task', 'error');
    }
  };

  // ─── Edit task ───
  const editTask = async (id, updatedData) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const updatedTask = await response.json();
      setTasks(tasks.map(task => task._id === id ? updatedTask : task));
      setEditingTask(null);
      showToast('Task updated! ✨', 'success');
    } catch (error) {
      showToast('Failed to update task', 'error');
    }
  };

  // ─── Delete task ───
  const deleteTask = async (id) => {
    const task = tasks.find(t => t._id === id);
    if (!task) return;

    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      setTasks(tasks.filter(task => task._id !== id));
      showToast(`"${task.title}" deleted.`, 'info');
    } catch (error) {
      showToast('Failed to delete task', 'error');
    }
  };

  // ─── Toggle complete ───
  const toggleComplete = async (id) => {
    const task = tasks.find(t => t._id === id);
    if (!task) return;

    try {
      const response = await fetch(`${API_URL}/tasks/${id}/toggle`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to toggle task');
      }

      const data = await response.json();
      
      // Update tasks
      setTasks(tasks.map(t => t._id === id ? data.task : t));

      // Update user stats if returned
      if (data.user) {
        updateUser(data.user);
      }

      if (data.task.completed) {
        showToast(`"${task.title}" completed! 🌿`, 'success');
      } else {
        showToast(`"${task.title}" uncompleted.`, 'info');
      }
    } catch (error) {
      showToast('Failed to toggle task', 'error');
    }
  };

  // ─── Filter tasks ───
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  if (isLoading) {
    return (
      <div className="task-manager-page">
        <div className="loading-container">
          <div className="loading-spinner">🌱</div>
          <p>Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="task-manager-page">
      <TaskManagerHeader onBack={() => navigate('/tasks')} />

      <TaskStats
        total={stats.total}
        active={stats.active}
        completed={stats.completed}
      />

      <div className="task-manager-grid">
        <div className="task-manager-form">
          <AddTaskForm
            onAdd={addTask}
            editingTask={editingTask}
            onEdit={editTask}
            onCancelEdit={() => setEditingTask(null)}
          />
        </div>

        <div className="task-manager-list">
          <TaskFilter
            filter={filter}
            onFilterChange={setFilter}
            counts={stats}
          />
          <TaskList
            tasks={filteredTasks}
            onToggleComplete={toggleComplete}
            onDelete={deleteTask}
            onEdit={(task) => setEditingTask(task)}
          />
        </div>
      </div>

      {toast && (
        <ToastMessage
          message={toast.message}
          type={toast.type}
        />
      )}
    </div>
  );
}

export default TaskManager;