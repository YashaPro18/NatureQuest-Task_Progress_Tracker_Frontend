// src/pages/TaskManager/components/AddTaskForm.jsx
import React, { useState, useEffect } from 'react';
import './AddTaskForm.css';

function AddTaskForm({ onAdd, editingTask, onEdit, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const xpMap = { Easy: 10, Medium: 25, Hard: 50 };

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDifficulty(editingTask.difficulty);
    } else {
      setTitle('');
      setDifficulty('Medium');
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);

    if (editingTask) {
      onEdit(editingTask.id, { title: title.trim(), difficulty });
    } else {
      onAdd({ title: title.trim(), difficulty, xp: xpMap[difficulty] });
    }

    setTitle('');
    setDifficulty('Medium');
    setIsSubmitting(false);
  };

  const handleCancel = () => {
    setTitle('');
    setDifficulty('Medium');
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <div className="add-task-form-glass">
      <div className="add-task-form-header">
        <h3 className="add-task-form-title">
          {editingTask ? '✏️ Edit Task' : '✨ Add New Task'}
        </h3>
        {editingTask && (
          <button className="add-task-close-edit" onClick={handleCancel}>
            ✕
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="add-task-form">
        <div className="add-task-field">
          <label htmlFor="taskTitle">
            Task Title
            <span className="field-required">*</span>
          </label>
          <input
            id="taskTitle"
            type="text"
            placeholder="What do you want to grow today?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="add-task-input"
            autoFocus={!editingTask}
          />
        </div>

        <div className="add-task-field">
          <label>Difficulty</label>
          <div className="add-task-difficulty-group">
            {['Easy', 'Medium', 'Hard'].map((level) => (
              <button
                key={level}
                type="button"
                className={`difficulty-btn ${difficulty === level ? 'active' : ''}`}
                onClick={() => setDifficulty(level)}
              >
                <span className="difficulty-name">{level}</span>
                <span className="difficulty-xp">+{xpMap[level]} XP</span>
              </button>
            ))}
          </div>
        </div>

        <div className="add-task-actions">
          {editingTask && (
            <button type="button" className="add-task-cancel" onClick={handleCancel}>
              Cancel
            </button>
          )}
          <button
            type="submit"
            className={`add-task-submit ${isSubmitting ? 'loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="submit-loader">⏳</span>
            ) : editingTask ? (
              'Update Task'
            ) : (
              'Add Task'
            )}
            {!isSubmitting && (
              <svg viewBox="0 0 20 20" fill="none">
                <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTaskForm;