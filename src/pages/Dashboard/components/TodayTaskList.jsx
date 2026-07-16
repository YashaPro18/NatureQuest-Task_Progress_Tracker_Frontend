// src/pages/Dashboard/components/TodayTaskList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import TaskCard from './TaskCard';
import './TodayTaskList.css';

function TodayTaskList({ tasks }) {
  const navigate = useNavigate();

  const incompleteTasks = tasks.filter(t => !t.completed);
  const visibleTasks = incompleteTasks.slice(0, 3);
  const hasMoreTasks = incompleteTasks.length > 3;

  const handleTaskClick = () => {
    navigate('/tasks');
  };

  return (
    <div className="task-list-section">
      <div className="task-list-header">
        <div className="task-list-header-left">
          <span className="task-list-eyebrow">Daily Focus</span>
          <h2 className="task-list-title">Today's Tasks</h2>
        </div>
        <span className="task-list-count">
          {incompleteTasks.length} remaining
        </span>
      </div>

      {tasks.length === 0 ? (
        <div className="task-list-empty">
          <span className="empty-icon">🌱</span>
          <p>No tasks for today. Visit Task Manager to add some!</p>
          <button className="empty-cta" onClick={() => navigate('/tasks/manage')}>
            Add Tasks
          </button>
        </div>
      ) : incompleteTasks.length === 0 ? (
        <div className="task-list-empty">
          <span className="empty-icon">🎉</span>
          <p className="empty-success">All tasks completed! Great job!</p>
        </div>
      ) : (
        <>
          <div className="task-list-grid">
            {visibleTasks.map((task) => (
              <TaskCard 
                key={task._id} 
                task={task} 
                onClick={handleTaskClick}
                readOnly={true}
              />
            ))}
          </div>
          {hasMoreTasks && (
            <button className="see-more-btn" onClick={() => navigate('/tasks')}>
              See {incompleteTasks.length - 3} more tasks →
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default TodayTaskList;