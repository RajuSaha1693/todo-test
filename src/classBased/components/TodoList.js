import React, { Component } from "react";
import TodoItem from "./TodoItem";
class TodoList extends Component{
    render(){
        return(
            <ul>
            {this.props.todos.map((value,index)=>(
                <TodoItem 
                key={index} 
                todo={value} 
                handleChangeProps={this.props.handleChangeProps}
                handleDelete={this.props.handleDelete
                }
                handleUpdate={this.props.updateTodo}
                />
            ))}
            </ul>
        )
    }
}
export default TodoList