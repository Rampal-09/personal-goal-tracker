import style from "./GoalDetails.module.css";
import { useState } from "react";

const GoalDetails = ({ goal, deleteGoal, saveEdit, taskMarked }) => {
  const priorities = ["Low", "Medium", "High"];
  const categories = ["Health", "Work", "Education", "Personal"];

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(goal.name);
  const [editDeadline, setDeadline] = useState(goal.deadline);
  const [editCategory, setCategory] = useState(goal.category);
  const [editPriority, setPriority] = useState(goal.priority);

  const editGoal = () => {
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setEditName(goal.name);
    setDeadline(goal.deadline);
    setCategory(goal.category);
    setPriority(goal.priority);
    setIsEditing(false);
  };

  const handlesaveEdit = () => {
    saveEdit(goal.id, editName, editDeadline, editCategory, editPriority);
    setIsEditing(false);
  };

  const isOverdue = () => {
    if (!goal.deadline) return false;
    const today = new Date();
    const deadline = new Date(goal.deadline);
    return deadline < today && !goal.iscomplete;
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High":
        return style.priorityHigh;
      case "Medium":
        return style.priorityMedium;
      case "Low":
        return style.priorityLow;
      default:
        return style.priorityDefault;
    }
  };

  const getCategoryClass = (category) => {
    switch (category) {
      case "Health":
        return style.categoryHealth;
      case "Work":
        return style.categoryWork;
      case "Education":
        return style.categoryEducation;
      case "Personal":
        return style.categoryPersonal;
      default:
        return style.categoryDefault;
    }
  };

  return (
    <div
      className={`card mb-4 ${style.goalCard} ${
        goal.iscomplete ? style.completed : ""
      } ${isOverdue() ? style.overdue : ""}`}
    >
      {/* Header Section */}
      <div className={`card-header ${style.goalHeader}`}>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            {/* Priority Indicator */}
            <div
              className={`${style.priorityDot} ${getPriorityClass(
                goal.priority
              )}`}
            ></div>

            {/* Status Badges */}
            {goal.iscomplete && (
              <span className={`badge ${style.completedBadge}`}>
                ✓ Completed
              </span>
            )}
            {isOverdue() && (
              <span className={`badge ${style.overdueBadge}`}>⚠ Overdue</span>
            )}
          </div>

          {/* Custom Checkbox */}
          <div className={style.checkboxContainer}>
            <input
              type="checkbox"
              id={`goal-${goal.id}`}
              checked={goal.iscomplete}
              onChange={() => taskMarked(goal.id)}
              className={style.customCheckbox}
            />
            <label
              htmlFor={`goal-${goal.id}`}
              className={style.checkboxLabel}
            ></label>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="card-body">
        <div className="row g-3">
          {/* Goal Name */}
          <div className="col-lg-8 col-md-12">
            <label className={style.fieldLabel}>📝 Goal Name</label>
            {isEditing ? (
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className={`form-control ${style.customInput}`}
                placeholder="Enter goal name"
              />
            ) : (
              <div
                className={`${style.goalNameDisplay} ${
                  goal.iscomplete ? style.completedText : ""
                }`}
              >
                {goal.name}
              </div>
            )}
          </div>

          {/* Deadline */}
          <div className="col-lg-4 col-md-12">
            <label className={style.fieldLabel}>📅 Deadline</label>
            {isEditing ? (
              <input
                type="date"
                value={editDeadline}
                onChange={(e) => setDeadline(e.target.value)}
                className={`form-control ${style.customInput}`}
              />
            ) : (
              <div
                className={`${style.deadlineDisplay} ${
                  isOverdue() ? style.overdueText : ""
                }`}
              >
                {goal.deadline
                  ? new Date(goal.deadline).toLocaleDateString()
                  : "No deadline"}
              </div>
            )}
          </div>

          {/* Category */}
          <div className="col-lg-6 col-md-6">
            <label className={style.fieldLabel}>🏷️ Category</label>
            {isEditing ? (
              <select
                value={editCategory}
                onChange={(e) => setCategory(e.target.value)}
                className={`form-select ${style.customSelect}`}
              >
                <option value="">Select category</option>
                {categories.map((category, idx) => (
                  <option value={category} key={idx}>
                    {category}
                  </option>
                ))}
              </select>
            ) : (
              <span
                className={`${style.categoryBadge} ${getCategoryClass(
                  goal.category
                )}`}
              >
                {goal.category || "Uncategorized"}
              </span>
            )}
          </div>

          {/* Priority */}
          <div className="col-lg-6 col-md-6">
            <label className={style.fieldLabel}>🎯 Priority</label>
            {isEditing ? (
              <select
                value={editPriority}
                onChange={(e) => setPriority(e.target.value)}
                className={`form-select ${style.customSelect}`}
              >
                <option value="">Select priority</option>
                {priorities.map((priority, idx) => (
                  <option value={priority} key={idx}>
                    {priority}
                  </option>
                ))}
              </select>
            ) : (
              <span
                className={`${style.priorityBadge} ${getPriorityClass(
                  goal.priority
                )}`}
              >
                {goal.priority || "Not set"}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className={`card-footer ${style.goalFooter}`}>
        <div className="d-flex flex-wrap gap-2">
          {!isEditing ? (
            <>
              <button onClick={editGoal} className={`btn ${style.editBtn}`}>
                ✏️ Edit
              </button>
              <button
                onClick={() => deleteGoal(goal.id)}
                className={`btn ${style.deleteBtn}`}
              >
                🗑️ Delete
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handlesaveEdit}
                className={`btn ${style.saveBtn}`}
              >
                💾 Save
              </button>
              <button
                onClick={handleCancel}
                className={`btn ${style.cancelBtn}`}
              >
                ❌ Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalDetails;
