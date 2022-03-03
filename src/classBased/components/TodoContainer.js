import React from 'react';
import {
    Component
} from 'react';
import TodoList from './TodoList';
import Header from './Header';
import InputTodo from './InputTodo';
import {v4 as uuidv4 } from 'uuid';
class TodoContainer extends Component {
    state={
        todos:[
            
        ],
    }
    handleChange=(id)=>{
        /*This is not prefer method as we are directly changing the state*/

        // this.setState({
        //     todos:this.state.todos.map(todo=>{
        //         if(todo.id===id){
        //             todo.completed=!todo.completed;
        //         }
        //         return todo
        //     })
        // })

        /*This is not allowed in the strict mode method */

        // this.setState(prevState=>({
        //     todos:prevState.todos.map(todo=>{
        //         if(todo.id===id){
        //             todo.completed=!todo.completed;
        //         }
        //         return todo;
        //     }),
        // }));

        // this.setState(prevState=>({
        //     todos:prevState.todos.map(todo=>{
        //         if(todo.id===id){
        //             return{
        //             ...todo,
        //             completed:!todo.completed
        //             }
        //         }
        //         return todo
        //     }),
        // }))

        /*Above Method can be defined using return function also*/

        this.setState((prevState)=>{
            return{
                todos:prevState.todos.map(todo=>{
                    if(todo.id===id){
                        return{
                            ...todo,
                            completed:!todo.completed
                        }
                    }
                    return todo;
                })
            }
        })

    }

    delTodo=id=>{
        this.setState({
            todos:[
                ...this.state.todos.filter(todo=>{
                    return todo.id!==id;
                })
            ]
        })
    }

    addItem=title=>{
        const newTodo={
            id:uuidv4(),
            title:title,
            completed:false,
        }
        this.setState({
            todos:[...this.state.todos,newTodo]
        })
    }

    updateTodo=(title,id)=>{
        this.setState({
            todos:this.state.todos.map(todo=>{
                if(todo.id===id){
                    todo.title=title
                }
                return todo
            })
        })
    }

    //Life Cycle Methods

    // componentDidMount(){
    //     //Using native Fetch Api method
    //     fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")  /// Making request to URL
    //     .then(response=>response.json())  // Return an promise containing HTTP respose
    //     .then(data=>this.setState({todos:data}))
    // }

    //setState inside the componentDidMount  cause rendering twice before it is loaded to the browser this could cause performace issues
    componentDidMount(){
        const temp=localStorage.getItem('todos');
        const loadedtodos=JSON.parse(temp);
        if(loadedtodos){
            this.setState({
                todos:loadedtodos 
            })
        }

    }

    componentDidUpdate(prevProps,prevState){
        if(prevState.todos!==this.state.todos){
            const temp=JSON.stringify(this.state.todos);
            localStorage.setItem('todos',temp);
        }
    }

    

    render() {
        return ( 
        
            <div className="container">
                <div className="inner">
                <Header/>
                <InputTodo addTodoProps={this.addItem}/>
                <TodoList 
                todos={this.state.todos} 
                handleChangeProps={this.handleChange}
                handleDelete={this.delTodo}
                updateTodo={this.updateTodo}
                />
                
                </div>
            </div>
        )
    }
}
export default TodoContainer;