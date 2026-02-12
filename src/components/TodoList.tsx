import React, { useState } from "react";
import type { Todo } from "../types/Todo.types";
import { MdDelete } from "react-icons/md";

const ToDoList: React.FC = () => {

  const [todo, setTodo] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState(1);
  const [todoText, setTodoText] = useState("");
  const [todoCompleted, setTodoCompleted] = useState(false);
  
  function handleAddTodo() {
    const newTodo = {id: todoId,
                     text: todoText,
                     completed: todoCompleted,};
    if (todoText.trim() === ''){
      return;
    }
        setTodo(t => [...t, newTodo]);
        setTodoId(t => t + 1)
        setTodoText("")
        setTodoCompleted(false)
  }
  function handleRemoveTodo(index: number){
    if (todoCompleted === true){
      setTodo(t => t.filter((_, i) => i !== index));
    }
    
  }

  function handleAddText(event: React.ChangeEvent<HTMLInputElement>){
    setTodoText(event.target.value);
  }

  function handleCompleted(){
    setTodoCompleted(true)
  }


  return(
  <div>
    
    <h2 className="">To do list</h2>
    
    <div>
      <input type="text" value={todoText} onChange={handleAddText} placeholder="Enter task" className=""/><br/>
      <button onClick={handleAddTodo}>Add task</button>
    </div>
    
      <ul>
        {todo.map((todo, index) => 
          <li key={index} >
            {todo.id}) {todo.text} {todo.completed} <input type="radio" onChange={handleCompleted}/><MdDelete onClick={() => handleRemoveTodo(index)}/>
          </li>)}
      </ul>
      
  </div>
  )
}

export default ToDoList