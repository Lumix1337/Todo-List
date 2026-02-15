import React, { useState, useEffect } from "react";
import type { Todo } from "../types/Todo.types";
import { MdDelete } from "react-icons/md";

const TodoList: React.FC = () => {

  const [todo, setTodo] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos_list");
    return saved ? JSON.parse(saved) : [];
  });
  const [todoId, setTodoId] = useState(1);
  const [todoText, setTodoText] = useState("");
  const [todoCompleted, setTodoCompleted] = useState(false);
  
  useEffect(() => {
    localStorage.setItem("todos_list", JSON.stringify(todo));
  }, [todo]);

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

  function moveTaskUp(index: number){
    if (index > 0) {
      const updatedTodo = [...todo];
      [updatedTodo[index], updatedTodo[index - 1]] = [updatedTodo[index - 1], updatedTodo[index]];
      setTodo(updatedTodo);
    }
  }

  function moveTaskDown(index: number){
   if (index < todo.length - 1) {
      const updatedTodo = [...todo];
      [updatedTodo[index], updatedTodo[index + 1]] = [updatedTodo[index + 1], updatedTodo[index]];
      setTodo(updatedTodo);
    } 
  }


  return(
  <div className="TodoMain">
    
    <h2>To do list</h2>
    
    <div className="TodoAdd">
      <input type="text" value={todoText} onChange={handleAddText} placeholder="Enter task" className=""/><br/>
      <button onClick={handleAddTodo}>Add task</button>
    </div>
    
      <ul className="TodoList">
        {todo.map((todo, index) => 
          <li key={index} >
            {todo.id}) {todo.text} {todo.completed} 
            <input type="radio" onChange={handleCompleted}/>
            <MdDelete onClick={() => handleRemoveTodo(index)} />
            <button onClick={() => moveTaskUp(index)}>Move Up</button>
            <button onClick={() => moveTaskDown(index)}>Move Down</button>
          </li>)}
      </ul>
      
  </div>
  )
}

export default TodoList