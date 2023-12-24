//import logo from './logo.svg';
import React, {useEffect, useState} from 'react';
import './App.css';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';


function App() {

const [isCompleteScreen,setIsCompleteScreen] = useState(false);
const [allTodos, setTodos] = useState([]);
const [newTitle, setNewTitle] = useState("");
const [newDescription, setDescription] = useState("");
const [completedTodos, setCompletedTodos] = useState([]);

//handler for adding item in todo list
const handleAddTodo = () =>{
  let newTodoItem = {
    title:newTitle,
    description:newDescription
  }


  let updatedTodoArr = [...allTodos];
  updatedTodoArr.push(newTodoItem);
  setTodos(updatedTodoArr);
  //Store array locally as a string, not as obejct object values
  localStorage.setItem("todoList",JSON.stringify(updatedTodoArr));
};

//function to delete todo item
  const handleDeleteTodo = (index) =>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1);

    localStorage.setItem("todoList", JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  //function to move todo item to completed list
  const handleComplete = (index)=>{
    let now = new Date();
    let day = now.getDate();
    let month = now.getMonth()+1;
    let year = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    let completedOn = day+'-'+month+'-'+year+' at '+h+':'+m+':'+s;

    let filteredItem = {
      ...allTodos[index],
      completedOn:completedOn
    }

    let updatecompletedArr = [...completedTodos];
    updatecompletedArr.push(filteredItem);
    setCompletedTodos(updatecompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem("completedTodos", JSON.stringify(updatecompletedArr));
  }

  //function to delete completed todo item
  const handleCompletedDeleteTodo = (index)=>{
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index,1);

    localStorage.setItem("completedTodos", JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  }

//the first function which will run after refresh
  useEffect(()=>{
    //converting of local storage data into array
    let savedTodo = JSON.parse(localStorage.getItem("todoList"));
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodos"));
    if(savedTodo){
      setTodos(savedTodo);
    }

    if(savedCompletedTodo){
      setCompletedTodos(savedCompletedTodo);
    }
  },[])

  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" value={newTitle} 
              onChange={(e)=>setNewTitle(e.target.value)} 
              placeholder="Task Title"></input>
          </div>

          <div className="todo-input-item">
          <label>Description</label>
            <input type="text" value={newDescription} 
              onChange={(e)=>setDescription(e.target.value)} 
              placeholder="Task Description"></input>
          </div>
          <div>
          <button type="button" 
            onClick={handleAddTodo} 
            className="primaryBtn">Add</button>
          </div>
        </div>

        <div className="btn-area">
          <button 
            className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} 
            onClick={() => setIsCompleteScreen(false)}>
            Todo</button>
          <button 
            className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
            onClick={() => setIsCompleteScreen(true)}>
            Completed</button>
        </div>

        <div className="todo-list">
        {isCompleteScreen === false && allTodos.map((item,index)=>{
          return(
            <div className="todo-list-item" key={index}>
            <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            </div>       
          <div>
            <AiOutlineDelete className='icon' title='Delete ?' onClick={()=>handleDeleteTodo(index)}/>
            <BsCheckLg className='check-icon' title='Complete ?' onClick={()=>handleComplete(index)}/>
          </div>
          </div>
          )
        })}  

        {isCompleteScreen === true && completedTodos.map((item,index)=>{
          return(
            <div className="todo-list-item" key={index}>
            <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p><small>Completed On: {item.completedOn}</small></p>
            </div>       
          <div>
            <AiOutlineDelete className='icon' title='Delete ?' onClick={()=>handleCompletedDeleteTodo(index)}/>
          </div>
          </div>
          )
        })}         
        </div>
      </div>
    </div>
  );
}



export default App;
