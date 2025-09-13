import { useState } from "react";
import style from "./GoalForm.module.css";

const GoalForm = ({ addGoal }) => {
  const priorities = ["Low", "Medium", "High"];
  const categories = ["Health", "Work", "Education", "Personal"];

  const [inputValue, setInputValue] = useState("");
  const [deadline, setDeadline] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");

  const handleINputValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleDeadline = (e) => {
    setDeadline(e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  const handlePriority = (e) => {
    setPriority(e.target.value);
  };
  const handleformData = (e) => {
    e.preventDefault();
    addGoal(inputValue, deadline, category, priority);
    setInputValue("");
    setDeadline("");
    setCategory("");
    setPriority("");
  };

  return (
    <form className={style.goalForm}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Goal Name
        </label>

        <input
          type="text"
          className="form-control"
          id="name"
          value={inputValue}
          aria-describedby="emailHelp"
          onChange={handleINputValue}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="deadline" className="form-label">
          Deadline
        </label>
        <input
          type="date"
          className="form-control"
          id="deadline"
          value={deadline}
          onChange={handleDeadline}
        />
      </div>
      <div className={`mb-3 ${style.goalCategory}`}>
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          value={category}
          onChange={handleCategory}
        >
          <option value="">choose your category </option>
          {categories.map((category, idx) => (
            <option value={category} key={idx}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className={`mb-3 ${style.goalpriority}`}>
        <label htmlFor="priority">priority</label>
        <select
          name="priority"
          id="priority"
          value={priority}
          onChange={handlePriority}
        >
          <option value="">choose your priority </option>
          {priorities.map((priority, idx) => (
            <option value={priority} key={idx}>
              {priority}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        onClick={(e) => handleformData(e)}
      >
        Add Goal
      </button>
    </form>
  );
};

export default GoalForm;
