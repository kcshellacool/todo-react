import React, { useState, useEffect } from "react";
import './App.css';

//Importing Components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {

  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status,setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);
  //run once
  useEffect(() => {
    getLocalTodos();
  },[]);
  //functions
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos,status]);
  const filterHandler = () => {
    switch(status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }

    };
    //Save to Local
    const saveLocalTodos = () => {
        localStorage.setItem("todos",JSON.stringify(todos));
        console.log(localStorage.todos)
    };
    const getLocalTodos = () => {
        if(localStorage.getItem("todos") === null) {
          localStorage.setItem("todos",JSON.stringify([]));
        } else {
          localStorage.setItem("todos", JSON.stringify(todos));
        }
    }
  return (
    <div className="App">
    <header>
      <h1>Casey's Todo List</h1>
    </header>
    <Form setStatus={setStatus} inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText} />
    <TodoList setTodos={setTodos} todos={todos} filteredTodos={filteredTodos}/>
    </div>  
  );
}

export default App;
