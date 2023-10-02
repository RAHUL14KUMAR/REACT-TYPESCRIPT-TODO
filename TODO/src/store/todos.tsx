// createContext
import { createContext,ReactNode,useContext,useState } from "react"

export type TodosProviderProps={
    children:ReactNode
}
export type ToDo={
    id:string,
    task:string,
    completed:boolean,
    createdAt:Date
}
export type TodoContext={
    todos:ToDo[];
    handleAddToDo:(task:string)=>void;
    toggleToDoAsCompleted:(id:string)=>void;
    handleDeleteToDo:(id:string)=>void;
}

// createContext
export const todosContext=createContext<TodoContext | null>(null)


// provider
export const TodosProvider=({children}:TodosProviderProps)=>{
    const [todos,setToDo]=useState<ToDo[]>(()=>{
        try{
            let a= localStorage.getItem("todos") || "[]";
            return JSON.parse(a) as ToDo[]
        }catch(error){
            return []
        }
    })
    const handleAddToDo=(task:string)=>{
        setToDo((prev)=>{
            const newToDo:ToDo[]=[
                {
                    id:Math.random().toString(),
                    task:task,
                    completed:false,
                    createdAt:new Date()
                },
                ...prev
            ]
            localStorage.setItem("todos",JSON.stringify(newToDo))
            return newToDo
        })
    }

    // mark Completed
    const toggleToDoAsCompleted=(id:string)=>{
        setToDo((prev)=>{
            let newTodos=prev.map(todo=>{
                if(todo.id==id){
                    return {...todo,completed:!todo.completed}
                }
                return todo;
            })
            localStorage.setItem("todos",JSON.stringify(newTodos))
            return newTodos
        })
    }
    // delete
    const handleDeleteToDo=(id:string)=>{
        setToDo((prev)=>{
            let newTodos=prev.filter((todo)=>todo.id!=id);
            localStorage.setItem("todos",JSON.stringify(newTodos))
            return newTodos 
        })
    }
    return <todosContext.Provider value={{todos,handleAddToDo,toggleToDoAsCompleted,handleDeleteToDo}}>
        {children}
    </todosContext.Provider>
}



// consumer=>useContext
export const useToDos=()=>{
    const todosConsumer=useContext(todosContext);
    if(!todosConsumer){
        throw new Error("useTodos used outside of provider")
    }
    return todosConsumer
}