import GoalDetails from "./GoalDetails"



const GoalList = ({goals , deleteGoal, saveEdit, taskMarked,  })=> {

 

  return (
   <>{ goals.map(goal=><GoalDetails key={goal.id} goal={goal}
   deleteGoal={deleteGoal}  saveEdit={saveEdit} taskMarked={taskMarked}
   ></GoalDetails>)}</>

  )
}

export default GoalList