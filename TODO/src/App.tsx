import './App.css'

import AddToDo from './COMPONENTS/addToDo'
import Navbar from './COMPONENTS/navbar'
import ToDo from "./COMPONENTS/todo"
function App() {

  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center", width:100+"vw",height:100+"vh"}}>
      <h1>TODO REACT + TYPESCRIPT</h1>
      <Navbar/> 
      <AddToDo/>
      <ToDo/>
    </div>
  )
}

export default App
