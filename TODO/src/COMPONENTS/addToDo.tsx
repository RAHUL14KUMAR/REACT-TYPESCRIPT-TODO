import {FormEvent, useState} from "react"
import { useToDos } from "../store/todos";

function addToDo() {
    const [todo,setToDo]=useState("");
    const {handleAddToDo}=useToDos();
    

    const handleSubmit=(e:FormEvent<HTMLElement>)=>{
        e.preventDefault();
        handleAddToDo(todo);
        setToDo("");
    }
  return (
    <form onSubmit= {handleSubmit}>
        <input type="text" value={todo} onChange={(e)=>setToDo(e.target.value)}/>

        <button type="submit">Add</button>
    </form>
  )
}

export default addToDo


// points to remember
// 1-> e is a type of FormEvent<HTMLElement> by default