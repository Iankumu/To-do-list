import './App.css';
import Form from './components/Form'
import TodoList from './components/TodoList'
import {useState, useEffect} from 'react'

function App() {
  //States
  const [inputText,setInputText] = useState("");
  const [todos,setTodos] = useState([]);
  const [status,setStatus]=useState("all")
  const [filteredTodos,setFilteredTodos] = useState([])


  useEffect(()=>{
    getLocalTodos()
  },[])

  useEffect(()=>{
    filterHandler()
  },[status,todos])


  // Functions

  const filterHandler = () => {
    switch(status){
    case 'completed':
      setFilteredTodos(todos.filter(todo => todo.completed ===true))
      break
    case 'uncompleted':
      setFilteredTodos(todos.filter(todo => todo.completed ===false))
      break
    default:
      setFilteredTodos(todos)    
    }
  }
  // Save to Local todos

  const saveToLocalTodos = () => {
    localStorage.setItem('todos',JSON.stringify(todos))
  }

  const getLocalTodos = () =>{
    if(localStorage.getItem('todos') === null)
    {
      localStorage.setItem('todos',JSON.stringify([]))
    }else{
      let todoLocal= JSON.parse(localStorage.getItem("todos"))
      setTodos(todoLocal)
    }
  }
  return (
    <div className="App">
     <header><h1>To-do List</h1></header> 
     <Form setInputText={setInputText}  todos={todos} setStatus={setStatus} setTodos={setTodos} inputText={inputText} />
     <TodoList filteredTodos={filteredTodos} setTodos={setTodos} todos={todos}/>
    </div>
   
  );
}

export default App;
