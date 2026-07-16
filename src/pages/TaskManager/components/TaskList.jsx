// src/pages/TaskManager/components/TaskList.jsx
import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

function TaskList({ tasks, onToggleComplete, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return (
      <div className="task-list-empty-glass">
        <div className="empty-state-icon">🌿</div>
        <h3>No tasks here</h3>
        <p>All tasks are complete or nothing matches your filter.</p>
        <div className="empty-state-decoration">
          <span className="decoration-dot"></span>
          <span className="decoration-dot"></span>
          <span className="decoration-dot"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list-glass">
      {tasks.map((task, index) => (
        <TaskItem
          key={task._id}          // 👈 Using _id from MongoDB
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEdit={onEdit}
          style={{ animationDelay: `${index * 0.04}s` }}
        />
      ))}
    </div>
  );
}

export default TaskList;