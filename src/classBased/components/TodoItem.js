import React, { Component } from "react";
import styles from "./TodoItem.module.css";
class TodoItem extends Component{
    state={
        editing:false,
    }
    handleEditing=()=>{
        this.setState({
            editing:true,
        })
    }
    handleUpdateDone=(e)=>{
        if(e.key==='Enter'){this.setState({editing:false})}
    }
    componentWillUnmount(){
        console.log('Unmounting');
    }
    render(){
        let viewMode={}
        let editMode={}
        if(this.state.editing){
            viewMode.display="none"
        }else{
            editMode.display="none"
        }
        const {id,title,completed}=this.props.todo;
        const completedStyle = {
            fontStyle: "italic",
            color: "#595959",
            opacity: 0.4,
            textDecoration: "line-through",
          }
        return(
            <li className={styles.item}>
                <div onDoubleClick={this.handleEditing} style={viewMode}>
                
                <input 
                type="checkbox" 
                className={styles.checkbox}
                checked={completed} 
                onChange={()=>this.props.handleChangeProps(id)}
                
                />
            
            <button
            onClick={()=>this.props.handleDelete(id)}
            >Delete</button>
            
            <span style={completed? completedStyle : null}>
            {title}
            </span>
            </div>
            <input 
            type="text" 
            style={editMode} 
            className={styles.textInput} 
            value={title} 
            onChange={e=>this.props.handleUpdate(e.target.value,id)}
            onKeyDown={this.handleUpdateDone}
            />
            
            </li>
        )
    }
}
export default TodoItem