// import { useState, useEffect, useMemo, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./TaskManager.css";

// // ─── Seed tasks (only when localStorage is empty) ─────────────
// const SEED_TASKS = [
//   { id: 1, title: "Study React",  completed: false, priority: "high"   },
//   { id: 2, title: "Exercise",     completed: false, priority: "medium" },
//   { id: 3, title: "Read Book",    completed: false, priority: "low"    },
//   { id: 4, title: "Practice DSA", completed: false, priority: "high"   },
// ];

// const PRIORITIES = ["high", "medium", "low"];

// const PRIORITY_META = {
//   high:   { label: "High",   color: "#f87171", bg: "rgba(248,113,113,0.14)", border: "rgba(248,113,113,0.25)" },
//   medium: { label: "Medium", color: "#fbbf24", bg: "rgba(251,191,36,0.13)",  border: "rgba(251,191,36,0.22)"  },
//   low:    { label: "Low",    color: "#4ade80", bg: "rgba(74,222,128,0.13)",  border: "rgba(74,222,128,0.22)"  },
// };

// // ─── Icons ────────────────────────────────────────────────────
// function IconPlus() {
//   return (
//     <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
//       <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
//     </svg>
//   );
// }

// function IconTrash() {
//   return (
//     <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
//       <path d="M2 4h12M5 4V2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5V4M6 7.5v4M10 7.5v4M3 4l.8 8.6a.6.6 0 0 0 .6.4h7.2a.6.6 0 0 0 .6-.4L13 4"
//         stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>
//   );
// }

// function IconEdit() {
//   return (
//     <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
//       <path d="M11.5 2.5a1.41 1.41 0 0 1 2 2L5 13H3v-2L11.5 2.5Z"
//         stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>
//   );
// }

// function IconBack() {
//   return (
//     <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
//       <path d="M12 5L7 10L12 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>
//   );
// }

// function IconCheck() {
//   return (
//     <svg viewBox="0 0 12 10" fill="none" width="11" height="9">
//       <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>
//   );
// }

// // ─── Main ─────────────────────────────────────────────────────
// function TaskManager() {
//   const navigate     = useNavigate();
//   const inputRef     = useRef(null);

//   const [tasks, setTasks]           = useState([]);
//   const [isLoading, setIsLoading]   = useState(true);
//   const [inputVal, setInputVal]     = useState("");
//   const [inputPriority, setInputPriority] = useState("medium");
//   const [editingId, setEditingId]   = useState(null);
//   const [editVal, setEditVal]       = useState("");
//   const [editPriority, setEditPriority] = useState("medium");
//   const [filter, setFilter]         = useState("all");
//   const [deleteConfirmId, setDeleteConfirmId] = useState(null);
//   const [toast, setToast]           = useState(null);

//   // ── Load ──
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       try {
//         const saved = localStorage.getItem("tasks");
//         setTasks(saved ? JSON.parse(saved) : SEED_TASKS);
//       } catch {
//         setTasks(SEED_TASKS);
//       }
//       setIsLoading(false);
//     }, 400);
//     return () => clearTimeout(timer);
//   }, []);

//   // ── Persist ──
//   useEffect(() => {
//     if (!isLoading) {
//       localStorage.setItem("tasks", JSON.stringify(tasks));
//     }
//   }, [tasks, isLoading]);

//   // ── Toast helper ──
//   const showToast = (msg, type = "success") => {
//     setToast({ msg, type });
//     setTimeout(() => setToast(null), 2800);
//   };

//   // ── Add task ──
//   const addTask = () => {
//     const title = inputVal.trim();
//     if (!title) { inputRef.current?.focus(); return; }
//     const newTask = { id: Date.now(), title, completed: false, priority: inputPriority };
//     setTasks((prev) => [newTask, ...prev]);
//     setInputVal("");
//     setInputPriority("medium");
//     showToast(`"${title}" added to today's tasks`);
//     inputRef.current?.focus();
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") addTask();
//     if (e.key === "Escape") setInputVal("");
//   };

//   // ── Edit ──
//   const startEdit = (task) => {
//     setEditingId(task.id);
//     setEditVal(task.title);
//     setEditPriority(task.priority || "medium");
//     setDeleteConfirmId(null);
//   };

//   const saveEdit = (id) => {
//     const title = editVal.trim();
//     if (!title) return;
//     setTasks((prev) =>
//       prev.map((t) => t.id === id ? { ...t, title, priority: editPriority } : t)
//     );
//     setEditingId(null);
//     showToast("Task updated");
//   };

//   const cancelEdit = () => setEditingId(null);

//   const handleEditKey = (e, id) => {
//     if (e.key === "Enter")  saveEdit(id);
//     if (e.key === "Escape") cancelEdit();
//   };

//   // ── Delete ──
//   const requestDelete = (id) => {
//     setDeleteConfirmId(id);
//     setEditingId(null);
//   };

//   const confirmDelete = (id) => {
//     const task = tasks.find((t) => t.id === id);
//     setTasks((prev) => prev.filter((t) => t.id !== id));
//     setDeleteConfirmId(null);
//     showToast(`"${task?.title}" removed`, "warn");
//   };

//   const cancelDelete = () => setDeleteConfirmId(null);

//   // ── Toggle ──
//   const toggleTask = (id) => {
//     setTasks((prev) =>
//       prev.map((t) => t.id === id ? { ...t, completed: !t.completed } : t)
//     );
//   };

//   // ── Clear completed ──
//   const clearCompleted = () => {
//     const count = tasks.filter((t) => t.completed).length;
//     setTasks((prev) => prev.filter((t) => !t.completed));
//     showToast(`${count} completed task${count > 1 ? "s" : ""} cleared`);
//   };

//   // ── Stats ──
//   const total     = tasks.length;
//   const completed = useMemo(() => tasks.filter((t) => t.completed).length, [tasks]);
//   const active    = total - completed;

//   // ── Filtered list ──
//   const filtered = useMemo(() => {
//     if (filter === "active")    return tasks.filter((t) => !t.completed);
//     if (filter === "completed") return tasks.filter((t) =>  t.completed);
//     return tasks;
//   }, [tasks, filter]);

//   // ─── Skeleton ────────────────────────────────────────────────
//   if (isLoading) {
//     return (
//       <div className="tm-page">
//         <div className="tm-card">
//           <div className="tm-skeleton">
//             {[1,2,3,4].map((i) => (
//               <div key={i} className="tm-sk-row" />
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ─── Render ──────────────────────────────────────────────────
//   return (
//     <div className="tm-page">

//       {/* ── Toast ── */}
//       {toast && (
//         <div className={`tm-toast tm-toast--${toast.type}`}>
//           {toast.type === "success"
//             ? <svg viewBox="0 0 16 16" fill="none" width="14"><path d="M3 8L6.5 11.5L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
//             : <svg viewBox="0 0 16 16" fill="none" width="14"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
//           }
//           {toast.msg}
//         </div>
//       )}

//       <div className="tm-card">

//         {/* Header */}
//         <div className="tm-header">
//           <button className="tm-back-btn" onClick={() => navigate("/tasks")}>
//             <IconBack />
//             Back to Focus
//           </button>
//           <div className="tm-header-text">
//             <span className="tm-eyebrow">Task Management</span>
//             <h1 className="tm-title">Manage Tasks</h1>
//             <p className="tm-subtitle">
//               Add, edit, and organise your daily goals. Changes sync instantly to your Focus view.
//             </p>
//           </div>
//         </div>

//         {/* Stats strip */}
//         <div className="tm-stats">
//           {[
//             { num: total,     lbl: "Total",     color: "white"   },
//             { num: active,    lbl: "Active",    color: "#fbbf24" },
//             { num: completed, lbl: "Completed", color: "#4ade80" },
//           ].map(({ num, lbl, color }) => (
//             <div className="tm-stat-chip" key={lbl}>
//               <span className="tm-stat-num" style={{ color }}>{num}</span>
//               <span className="tm-stat-lbl">{lbl}</span>
//             </div>
//           ))}
//           {completed > 0 && (
//             <button className="tm-clear-btn" onClick={clearCompleted}>
//               Clear completed ({completed})
//             </button>
//           )}
//         </div>

//         {/* Add task form */}
//         <div className="tm-add-form">
//           <div className="tm-add-input-row">
//             <div className="tm-input-wrap">
//               <IconPlus />
//               <input
//                 ref={inputRef}
//                 type="text"
//                 className="tm-input"
//                 placeholder="What needs to be done today?"
//                 value={inputVal}
//                 onChange={(e) => setInputVal(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 maxLength={120}
//               />
//             </div>

//             {/* Priority selector */}
//             <div className="tm-priority-select">
//               {PRIORITIES.map((p) => {
//                 const m = PRIORITY_META[p];
//                 return (
//                   <button
//                     key={p}
//                     className={`tm-priority-btn${inputPriority === p ? " tm-priority-btn--active" : ""}`}
//                     style={inputPriority === p
//                       ? { background: m.bg, borderColor: m.border, color: m.color }
//                       : {}
//                     }
//                     onClick={() => setInputPriority(p)}
//                     title={`Set priority: ${m.label}`}
//                   >
//                     {m.label}
//                   </button>
//                 );
//               })}
//             </div>

//             <button className="tm-add-btn" onClick={addTask}>
//               Add Task
//             </button>
//           </div>
//           <p className="tm-input-hint">Press Enter to add quickly</p>
//         </div>

//         {/* Filter tabs */}
//         <div className="tm-filter-bar">
//           {[
//             { key: "all",       label: `All (${total})`      },
//             { key: "active",    label: `Active (${active})`  },
//             { key: "completed", label: `Done (${completed})`  },
//           ].map(({ key, label }) => (
//             <button
//               key={key}
//               className={`tm-filter-tab${filter === key ? " tm-filter-tab--active" : ""}`}
//               onClick={() => setFilter(key)}
//             >
//               {label}
//             </button>
//           ))}
//         </div>

//         {/* Task list */}
//         <div className="tm-list">

//           {filtered.length === 0 && (
//             <div className="tm-empty">
//               <p>
//                 {filter === "all"
//                   ? "No tasks yet. Add your first task above."
//                   : filter === "active"
//                   ? "All tasks complete for today."
//                   : "Nothing completed yet."}
//               </p>
//             </div>
//           )}

//           {filtered.map((task, idx) => {
//             const p   = PRIORITY_META[task.priority] || PRIORITY_META.medium;
//             const isEditing = editingId === task.id;
//             const isDeleting = deleteConfirmId === task.id;

//             return (
//               <div
//                 key={task.id}
//                 className={`tm-task${task.completed ? " tm-task--done" : ""}${isEditing ? " tm-task--editing" : ""}${isDeleting ? " tm-task--confirming" : ""}`}
//                 style={{ animationDelay: `${idx * 0.03}s` }}
//               >
//                 {/* Priority stripe */}
//                 <div className="tm-stripe" style={{ background: p.color }} />

//                 {/* Checkbox */}
//                 <label className="tm-check-wrap" title="Toggle complete">
//                   <input
//                     type="checkbox"
//                     checked={task.completed}
//                     onChange={() => toggleTask(task.id)}
//                     className="tm-check-input"
//                   />
//                   <span className={`tm-checkmark${task.completed ? " tm-checkmark--done" : ""}`}>
//                     {task.completed && <IconCheck />}
//                   </span>
//                 </label>

//                 {/* Content */}
//                 {isEditing ? (
//                   /* Edit mode */
//                   <div className="tm-edit-area">
//                     <input
//                       className="tm-edit-input"
//                       autoFocus
//                       value={editVal}
//                       onChange={(e) => setEditVal(e.target.value)}
//                       onKeyDown={(e) => handleEditKey(e, task.id)}
//                       maxLength={120}
//                     />
//                     <div className="tm-edit-priority">
//                       {PRIORITIES.map((pr) => {
//                         const m = PRIORITY_META[pr];
//                         return (
//                           <button
//                             key={pr}
//                             className={`tm-priority-btn tm-priority-btn--sm${editPriority === pr ? " tm-priority-btn--active" : ""}`}
//                             style={editPriority === pr
//                               ? { background: m.bg, borderColor: m.border, color: m.color }
//                               : {}
//                             }
//                             onClick={() => setEditPriority(pr)}
//                           >
//                             {m.label}
//                           </button>
//                         );
//                       })}
//                     </div>
//                     <div className="tm-edit-actions">
//                       <button className="tm-save-btn" onClick={() => saveEdit(task.id)}>
//                         Save
//                       </button>
//                       <button className="tm-cancel-btn" onClick={cancelEdit}>
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 ) : isDeleting ? (
//                   /* Delete confirm mode */
//                   <div className="tm-confirm-area">
//                     <span className="tm-confirm-text">
//                       Remove <strong>"{task.title}"</strong>?
//                     </span>
//                     <div className="tm-confirm-actions">
//                       <button className="tm-confirm-yes" onClick={() => confirmDelete(task.id)}>
//                         Delete
//                       </button>
//                       <button className="tm-confirm-no" onClick={cancelDelete}>
//                         Keep
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   /* View mode */
//                   <>
//                     <div className="tm-task-body">
//                       <span className="tm-task-title">{task.title}</span>
//                       <span
//                         className="tm-priority-tag"
//                         style={{ color: p.color, background: p.bg, border: `1px solid ${p.border}` }}
//                       >
//                         {p.label}
//                       </span>
//                     </div>

//                     <div className="tm-task-actions">
//                       <button
//                         className="tm-action-btn tm-action-btn--edit"
//                         onClick={() => startEdit(task)}
//                         title="Edit task"
//                       >
//                         <IconEdit />
//                       </button>
//                       <button
//                         className="tm-action-btn tm-action-btn--delete"
//                         onClick={() => requestDelete(task.id)}
//                         title="Delete task"
//                       >
//                         <IconTrash />
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </div>
//             );
//           })}
//         </div>

//         {/* Footer note */}
//         <div className="tm-footer">
//           <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
//             <path d="M8 1.5L9.5 6H14L10.5 8.5L12 13L8 10.5L4 13L5.5 8.5L2 6H6.5L8 1.5Z"
//               stroke="rgba(74,222,128,0.6)" strokeWidth="1.2" />
//           </svg>
//           <span>Tasks sync automatically to your Daily Focus view and tree growth.</span>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default TaskManager;