import React, { useState,useEffect } from "react";
import { FaTrash } from "react-icons/fa"
import styles from "./TodoItem.module.css";
const TodoItem=(props)=>{
  
    const [editing,setEditing]=useState(false)
    const handleEditing=()=>{    
        setEditing(true)
    }
    const handleUpdateDone=(e)=>{
        if(e.key==='Enter'){setEditing(false)}
    }
    useEffect(()=>{
        return ()=>{
            console.log('Unmounting....')
        }
        
    },[])

        let viewMode={}
        let editMode={}
        if(editing){
            viewMode.display="none"
        }else{
            editMode.display="none"
        }
        const {id,title,completed}=props.todo;
        const completedStyle = {
            fontStyle: "italic",
            color: "#595959",
            opacity: 0.4,
            textDecoration: "line-through",
          }
        return(
            <li className={styles.item}>
                <div onDoubleClick={handleEditing} style={viewMode}>
                
                <input 
                type="checkbox" 
                className={styles.checkbox}
                checked={completed} 
                onChange={()=>props.handleChangeProps(id)}
                
                />
            
            <button
            onClick={()=>props.handleDelete(id)}
            ><FaTrash  style={{ color: "orangered", fontSize: "16px" }}/></button>
            
            <span style={completed? completedStyle : null}>
            {title}
            </span>
            </div>
            <input 
            type="text" 
            style={editMode} 
            className={styles.textInput} 
            value={title} 
            onChange={e=>props.handleUpdate(e.target.value,id)}
            onKeyDown={handleUpdateDone}
            />
            
            </li>
        )
    
}
export default TodoItem