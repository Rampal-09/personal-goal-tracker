import style from "./GoalDetails.module.css"
import { useState } from "react";


const GoalDetails = ({goal , deleteGoal, saveEdit, taskMarked })=> {

  const priorities = ["Low", "Medium", "High"];
  const categories = ["Health", "Work", "Education", "Personal"];

 
    const[isEditing , setIsEditing] = useState(false)
    const[editName , setEditName] =  useState(goal.name)
    const[editDeadline , setDeadline] = useState(goal.deadline)
    const[editCategory , setCategory] =  useState(goal.category)
    const[editPriority,  setPriority] =  useState(goal.priority)

   

    const editGoal = ()=> {
      setIsEditing(!isEditing)
      
   }

   const handleCancel = ()=> {
   setEditName(goal.name)
   setDeadline (goal.deadline) 
   setCategory(goal.category) 
   setPriority(goal.priority)
   setIsEditing(false)
   }

  const handlesaveEdit = ()=> {
    
    saveEdit((goal.id), editName ,editDeadline, editCategory,editPriority)
   setIsEditing(false)
  }

 


  
 
  return (
<div className={`container  ${goal.priority === "High" ? "high-priority" : goal.priority=== "Medium" ? "medium-priority" : "low-priority" } ${goal.iscomplete ? "newclass" : null} ${style.goalContainer}`}>
  
     {isEditing  ?  <input value={editName} className={style.goalName} onChange={(e)=>setEditName(e.target.value)}></input> :
    <div className={`col ${style.goalName}`}>{goal.name}</div>}
    {isEditing ? <input value={editDeadline} className={style.goalDate} onChange={(e)=>setDeadline(e.target.value)}></input> :
    <div className={`col ${style.goalDate}`}>{goal.deadline}</div>
      }
      {isEditing ? <div className={`mb-3 ${style.goalCategory}`}>
  
  <select name="category" id="category"
  value={editCategory}
  onChange={ (e)=>setCategory(e.target.value)}
  >
    <option value="">choose your category </option>
    {categories.map ((category , idx)=> <option  value={category} key={idx}>{category}</option>)}
   </select>
  </div> :
    <div className={`col ${style.goalCategory}`}>{goal.category}</div>}
    {isEditing ? <div className={`mb-3 ${style.goalpriority}`}>
 
   <select name="priority" id="priority"
   value={editPriority}
   onChange={(e)=> setPriority(e.target.value)}
   >
    <option value="">choose your priority </option>
   { priorities.map((priority, idx)=><option value={priority} key={idx}>{priority}</option>)}

   </select>
  </div>
  :
    <div className={`col ${style.goalpriority}`}>{goal.priority}</div> }
      <div className={style.goalBtns}>  
   <button onClick={ ()=> deleteGoal(goal.id)}>delete</button>
    
    <button onClick={editGoal} >edit</button>
  { isEditing && <button onClick={handlesaveEdit}>save</button> }
    {isEditing  && <button onClick={handleCancel}>cancel</button>}
  
 <input type="checkbox"  checked={goal.iscomplete} onChange={()=>taskMarked(goal.id)}/>
 </div>
</div>

  )
}


export default GoalDetails;