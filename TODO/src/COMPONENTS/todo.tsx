import { useToDos } from '../store/todos'
import {useSearchParams} from 'react-router-dom'

function todo() {
    const {todos,toggleToDoAsCompleted,handleDeleteToDo}=useToDos();

    const [searchParams]=useSearchParams();

    let todosdata=searchParams.get("todos")
    console.log(todosdata)

    let filterData=todos;

    if(todosdata=="active"){
        filterData=filterData.filter(task=>!task.completed)
    }
    if(todosdata=="completed"){
        filterData=filterData.filter(task=>task.completed)
    }
  return (
    <ul className='main-task'>
        {
            filterData.map((todo)=>{
                return <li key={todo.id}>
                    <input type="checkbox" id={`todo-${todo.id}`} checked={todo.completed}
                    onChange={()=>toggleToDoAsCompleted(todo.id)}
                    />
                    <label htmlFor="">{todo.task}</label>
                    {
                        todo.completed&&<button type="button" onClick={()=>handleDeleteToDo(todo.id)}>Delete</button>
                    }
                </li>
            })
        }
    </ul>
  )
}

export default todo
