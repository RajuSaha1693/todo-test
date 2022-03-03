import React from 'react';
import {useState,useEffect} from 'react';
import TodoList from './TodoList';
import Header from './Header';
import InputTodo from './InputTodo';
import Navbar from './Navbar';
import {v4 as uuidv4 } from 'uuid';
import { Route,Switch } from 'react-router-dom';

import About from "../pages/About"
import NotMatch from "../pages/NotMatch"

const TodoContainer=()=>{

    function getInitialTodos(){
        let blank=[];
        let temp=localStorage.getItem("todos");
        const savedata=JSON.parse(temp);
        return savedata || blank
    }

   const [todos,setTodos]=useState(getInitialTodos());

    const handleChange=(id)=>{
       
        setTodos(prevState=>
            prevState.map(todo=>{
                if(todo.id===id){
                    return{
                        ...todo,
                        completed:!todo.completed,
                    }
                }
                return todo
            })
        )
    }
    
    const delTodo=(id)=>{
        setTodos([
                ...todos.filter(todo=>{
                    return todo.id!==id;
                }),
            ])
    }
    const addItem=(title)=>{
        const newTodo={
            id:uuidv4(),
            title:title,
            completed:false,
        }
        setTodos([...todos,newTodo])
    }
    
    const updateTodo=(updatedTitle,id)=>{
        setTodos(
            todos.map(todo=>{
                if(todo.id===id){
                    todo.title=updatedTitle
                }
                return todo;
            })
        )
    }

    useEffect(()=>{
        const temp=JSON.stringify(todos);
        localStorage.setItem("todos",temp);
    },[todos])

    useEffect(()=>{
        const savetemp=localStorage.getItem('todos');
        const loadedTodo=JSON.parse(savetemp);
        if(loadedTodo){
            setTodos(loadedTodo)
        }
    },[setTodos])

   

    
    return ( 
        <>
        <Navbar/>
        <Switch>
    <Route exact path="/">
        <div className="container">
            <div className="inner">
         
            <Header/>
            <InputTodo addTodoProps={addItem}/>
            <TodoList 
            todos={todos} 
            handleChangeProps={handleChange}
            handleDelete={delTodo}
            updateTodo={updateTodo}
            />
            
            </div>
        </div>
    </Route>
    <Route path="/about">
    <About />
  </Route>
  <Route path="*">
    <NotMatch />
  </Route>
  </Switch>
  </>
    )

}
export default TodoContainer;