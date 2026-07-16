// src/pages/TaskTracker/TaskTracker.jsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import TreeProgress from "../../components/TreeProgress/TreeProgress";
import TaskCard from "./components/TaskCard";
import ToastMessage from "../TaskManager/components/ToastMessage";
import "./TaskTracker.css";
import API_URL from "../../config/api";


const STAGE_LABELS = [
  "Seedling","Sprout","Sapling","Young Tree","Growing",
  "Maturing","Established","Flourishing","Thriving","Ancient",
];

function getMotivation(rate) {
  if (rate === 0)   return "Ready to grow today?";
  if (rate < 25)    return "Great start — keep it going.";
  if (rate < 50)    return "Building momentum.";
  if (rate < 75)    return "Halfway there — you're thriving.";
  if (rate < 100)   return "Almost at full growth — push through.";
  return "Perfect day. Your tree is fully grown.";
}

function TaskTracker() {
  const navigate = useNavigate();
  const { token, updateUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState(null);
  const [confirmData, setConfirmData] = useState(null); // { taskId, action }

  // ─── Toast helper ───
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2800);
  };

  // ─── Fetch tasks ───
  const fetchTasks = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      showToast('Failed to load tasks', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchTasks();
  }, [token, fetchTasks]);

  // ─── Stats ───
  const totalTasks = tasks.length;
  const completedCount = tasks.filter(t => t.completed).length;
  const activeCount = totalTasks - completedCount;
  const progress = totalTasks === 0 ? 0 : (completedCount / totalTasks) * 100;
  const completionRate = Math.round(progress);
  const stage = progress === 0 ? 0 : Math.min(9, Math.ceil(progress / 10) - 1);
  const stageLabel = STAGE_LABELS[stage];

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // ─── Perform toggle (API call) ───
  const performToggle = async (taskId) => {
    const task = tasks.find(t => t._id === taskId);
    if (!task) return;

    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}/toggle`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to toggle task');

      const data = await response.json();

      // Update task in local state
      setTasks(tasks.map(t => t._id === taskId ? data.task : t));

      // Update user stats
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

  // ─── Request toggle with confirmation ───
  const requestToggleComplete = (taskId) => {
    const task = tasks.find(t => t._id === taskId);
    if (!task) return;
    const action = task.completed ? 'uncomplete' : 'complete';
    setConfirmData({ taskId, action });
  };

  const confirmToggleComplete = () => {
    if (!confirmData) return;
    performToggle(confirmData.taskId);
    setConfirmData(null);
  };

  const cancelToggleComplete = () => {
    setConfirmData(null);
  };

  const pendingTask = confirmData ? tasks.find(t => t._id === confirmData.taskId) : null;

  // ─── Skeleton ───
  if (isLoading) {
    return (
      <div className="tt-layout">
        <div className="tt-panel tt-panel--skeleton">
          <div className="sk-header"><div className="sk-block sk-title" /><div className="sk-block sk-badge" /></div>
          <div className="sk-block sk-progress" />
          {[1, 2, 3, 4].map(i => <div key={i} className="sk-block sk-task" />)}
        </div>
        <div className="tt-tree-col"><div className="sk-block sk-tree" /></div>
      </div>
    );
  }

  return (
    <div className="tt-layout">
      <div className="tt-panel">
        {/* Header */}
        <div className="tt-header">
          <div className="tt-header-left">
            <span className="tt-eyebrow">Daily Focus</span>
            <h1 className="tt-title">Today's Growth</h1>
          </div>
          <div className="tt-header-right">
            <button className="tt-manage-btn" onClick={() => navigate("/tasks/manage")}>
              <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
                <path d="M3 10h14M3 5h14M3 15h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              Manage Tasks
            </button>
            <button className="tt-history-btn" onClick={() => navigate("/journal")}>
              <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
                <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10 6.5v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              History
            </button>
            <div className="tt-ring-wrap" title={`${completionRate}% complete`}>
              <svg viewBox="0 0 40 40" width="40" height="40">
                <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                <circle cx="20" cy="20" r="16" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeDasharray={`${completionRate * 1.005} 100.5`} strokeDashoffset="25" transform="rotate(-90 20 20)" style={{ transition: "stroke-dasharray 0.6s ease" }} />
              </svg>
              <span className="tt-ring-pct">{completionRate}%</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="tt-progress-section">
          <div className="tt-progress-meta">
            <span className="tt-progress-label">{getMotivation(completionRate)}</span>
            <span className="tt-progress-stage"><span className="tt-stage-dot" />{stageLabel}</span>
          </div>
          <div className="tt-progress-track"><div className="tt-progress-fill" style={{ width: `${progress}%` }} /></div>
          <div className="tt-pips">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className={`tt-pip${i <= stage && totalTasks > 0 ? " tt-pip--filled" : ""}`} />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="tt-stats-strip">
          <div className="tt-stat"><span className="tt-stat-num">{totalTasks}</span><span className="tt-stat-lbl">Total</span></div>
          <div className="tt-stat-sep" />
          <div className="tt-stat"><span className="tt-stat-num tt-stat-num--green">{completedCount}</span><span className="tt-stat-lbl">Done</span></div>
          <div className="tt-stat-sep" />
          <div className="tt-stat"><span className="tt-stat-num tt-stat-num--amber">{activeCount}</span><span className="tt-stat-lbl">Remaining</span></div>
        </div>

        {/* Filters */}
        <div className="tt-filters">
          {[
            { key: "all", label: `All (${totalTasks})` },
            { key: "active", label: `Active (${activeCount})` },
            { key: "completed", label: `Done (${completedCount})` },
          ].map(({ key, label }) => (
            <button key={key} className={`tt-filter-tab${filter === key ? " tt-filter-tab--active" : ""}`} onClick={() => setFilter(key)}>
              {label}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="tt-task-list">
          {filteredTasks.length === 0 ? (
            <div className="tt-empty">
              <div className="tt-empty-icon"><svg viewBox="0 0 48 48" fill="none" width="48" height="48"><circle cx="24" cy="24" r="20" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 4" /><path d="M24 16v8M24 32h.01" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" /></svg></div>
              <p className="tt-empty-title">No tasks yet</p>
              <p className="tt-empty-sub">Tap <strong>Manage Tasks</strong> to add your daily goals</p>
              <button className="tt-empty-cta" onClick={() => navigate("/tasks/manage")}>Add Your First Task</button>
            </div>
          ) : (
            filteredTasks.map((task, idx) => (
              <TaskCard key={task._id} task={task} onToggleComplete={requestToggleComplete} index={idx} />
            ))
          )}
        </div>

        {/* All done banner */}
        {completionRate === 100 && totalTasks > 0 && (
          <div className="tt-all-done">
            <div className="tt-all-done-glow" />
            <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
              <path d="M12 2L13.5 8.5L20 9.5L15 14L16.5 20.5L12 17L7.5 20.5L9 14L4 9.5L10.5 8.5L12 2Z" stroke="#4ade80" strokeWidth="1.4" fill="rgba(74,222,128,0.15)" />
            </svg>
            <span>Outstanding. Your tree has reached its full growth today.</span>
          </div>
        )}
      </div>

      {/* Tree */}
      <div className="tt-tree-col">
        <TreeProgress progress={progress} />
      </div>

      {/* Confirmation Modal */}
      {confirmData && pendingTask && (
        <div className="tt-confirm-overlay" onClick={cancelToggleComplete}>
          <div className="tt-confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="tt-confirm-icon">
              {confirmData.action === 'complete' ? '🌱' : '↩️'}
            </div>
            <h3 className="tt-confirm-title">
              {confirmData.action === 'complete' ? 'Complete Task?' : 'Uncomplete Task?'}
            </h3>
            <p className="tt-confirm-text">
              {confirmData.action === 'complete' ? (
                <>
                  Are you sure you want to mark <strong>"{pendingTask.title}"</strong> as complete?
                  This will contribute to your tree's growth.
                </>
              ) : (
                <>
                  Are you sure you want to <strong>uncomplete</strong> "{pendingTask.title}"?
                  This will be removed from your completed tasks.
                </>
              )}
            </p>
            <div className="tt-confirm-actions">
              <button className="tt-confirm-btn cancel" onClick={cancelToggleComplete}>Cancel</button>
              <button className="tt-confirm-btn confirm" onClick={confirmToggleComplete}>
                {confirmData.action === 'complete' ? 'Yes, Complete' : 'Yes, Uncomplete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <ToastMessage message={toast.message} type={toast.type} />}
    </div>
  );
}

export default TaskTracker;