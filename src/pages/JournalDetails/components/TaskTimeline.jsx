// src/pages/JournalDetails/components/TaskTimeline.jsx
import React from 'react';
import TimelineItem from './TimelineItem';
import './TaskTimeline.css';

function TaskTimeline({ tasks }) {
  const completedTasks = tasks.filter(task => task.completed);
  const incompleteTasks = tasks.filter(task => !task.completed);

  return (
    <div className="task-timeline-glass">
      <h3 className="timeline-title">Task Timeline</h3>

      {tasks.length === 0 ? (
        <div className="timeline-empty">
          <span className="timeline-empty-icon">📋</span>
          <p>No tasks recorded for this day.</p>
        </div>
      ) : (
        <div className="timeline-list">
          {completedTasks.length > 0 && (
            <div className="timeline-group">
              <span className="timeline-group-label completed-label">
                <span className="group-dot green"></span>
                Completed ({completedTasks.length})
              </span>
              {completedTasks.map((task, index) => (
                <TimelineItem key={index} task={task} index={index} />
              ))}
            </div>
          )}

          {incompleteTasks.length > 0 && (
            <div className="timeline-group">
              <span className="timeline-group-label incomplete-label">
                <span className="group-dot red"></span>
                Incomplete ({incompleteTasks.length})
              </span>
              {incompleteTasks.map((task, index) => (
                <TimelineItem key={index} task={task} index={index} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TaskTimeline;