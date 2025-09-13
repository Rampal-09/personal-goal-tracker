import { useEffect, useState } from "react";
import style from "./ProgressBar.module.css";

const ProgressBar = ({ goals }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const completeGoal = goals.filter((goal) => goal.iscomplete).length;

    setProgress(goals.length > 0 ? (completeGoal / goals.length) * 100 : 0);
  }, [goals]);

  return (
    <>
      <p>Progress Bar</p>
      <div className={style.progressContainer}>
        <div className={style.progressBar} style={{ width: `${progress}%` }}>
          <p>{progress.toFixed()}%</p>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
