import GoalForm from './component/GoalForm'
import GoalList from './component/GoalList'
import './App.css'
import { useEffect, useState } from 'react'
import GoalFilter from './component/GoalFilter'
import ProgressBar from './component/ProgressBar'

function App() {


  const [filterStatus , setFilterStatus] =  useState("all")
  const [filterPriority, setFilterPriority] = useState("all");
  const[sortMethod , setSortMethod]  = useState("none")

 const[goals , setGoals] = useState(()=> {
    const saveGoals = localStorage.getItem("goals" )
    return saveGoals ?  JSON.parse(saveGoals) : []
 })

 const handleFilterChange = (status) => {
  setFilterStatus(status);
};

const handlePriorityChange = (priority) => {
  setFilterPriority(priority);
};

const handleSortChange = (method)=> {
  setSortMethod(method)
}


useEffect(()=>{
  localStorage.setItem("goals", JSON.stringify(goals))
}, [goals])


 const addGoal = (inputValue, deadline, category, priority)=> {
 
  
   const newGoal =  {
    id :  Date.now(),
     name: inputValue,
     deadline: deadline,
     category: category,
     priority: priority,
     iscomplete : false
   }
   setGoals([... goals , newGoal])
  }



const deleteGoal = (id)=> {
   
  
 const  updateGoal = goals.filter(goal=>  goal.id !== id)
  
   setGoals(updateGoal)
}


const saveEdit = (id, editName , editDeadline, editCategory,editPriority)=> {
  const newUpdateGoal = goals.map((goal)=> goal.id === id ? {...goal ,  name: editName , deadline: editDeadline , category: editCategory, priority: editPriority }: goal  )
  setGoals(newUpdateGoal)
}

const taskMarked = (id)=> {
  setGoals(goals.map((goal)=> goal.id === id ? {...goal , iscomplete :  !goal.iscomplete} : goal))
}


const filterGoal = goals.filter(goal => {
   
  const StatusMatch  =  filterStatus === "all" || filterStatus === "complete" && (goal.iscomplete) ||  filterStatus === "pending" && (!goal.iscomplete)

  const priorityMatch =   filterPriority === "all" || (goal.priority.toLowerCase() )  ===( filterPriority.toLowerCase());

 
  return StatusMatch && priorityMatch

});





const sortGoals = (goalArray , sortMethod)=> {
     if(sortMethod === "priority"){
       const sortedArray = [...goalArray]
       const priorityOrder =  ["low", "medium" , "high"]
       
         sortedArray.sort ((a , b)=>  priorityOrder.indexOf(a.priority.toLowerCase()) - priorityOrder.indexOf(b.priority.toLowerCase()))
       
         return  sortedArray;
     }
      

       else if (sortMethod === "deadline") {
            const sortedArray =  [...goalArray]
            sortedArray.sort((a, b)=> new Date(a.deadline) - new Date(b.deadline))
            return sortedArray
       }
       else {
                return goalArray
       }
}




  return (
   <div className='goal-container'>
    <div className='header'>
      <h2>Personal Goal Tracker</h2>
    </div>
    <div className='goal-form'>
     <GoalForm  addGoal={addGoal}></GoalForm> 
     </div>
     <div  className="goal-list">
      <GoalList goals={sortGoals(filterGoal, sortMethod)}  deleteGoal={deleteGoal} saveEdit={saveEdit}  taskMarked={taskMarked} ></GoalList >
      </div>
      <div className="goal-filter" >
      <GoalFilter handleFilterChange={handleFilterChange}  handlePriorityChange={handlePriorityChange}   handleSortChange={handleSortChange}></GoalFilter>
      </div>
<div className="progress-bar">
      <ProgressBar  goals={goals}></ProgressBar>
      </div>
      </div>
    
  )
}

export default App
