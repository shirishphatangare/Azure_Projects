import React, { Component } from 'react'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'

/*
 
 This Component uses React Life-cycle methods like componentWillUnmount, shouldComponentUpdate, componentDidMount
 Sequence of life-cycle methods is shown in comments
 
 */

class ListTodosComponent extends Component {
	
	// Life-cycle Seq 1
    constructor(props) {
        console.log('constructor')
        
        super(props)
    
        this.state = {
            todos: [],
            message: null
        }
        
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
    }

    // Life-cycle Seq 5
    // componentWillUnmount() is called just before a component is unmounted. Good place for resource de-allocation.
    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    
    // Life-cycle Seq 4
    // Called to determine whether the change in state should trigger a re-render
    // Component re-rendering happens when this function returns true 
    // We can selectively enable(return true) and disable(return false) component re-rendering based on nextProps and nextState
    // Improves application performance by selectively disabling component re-rendering.
    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate')
        console.log(nextProps)
        console.log(nextState)
        return true
    }
    
    
    // Life-cycle Seq 3
    // Called immediately after a component is mounted. Setting state here will trigger re-rendering.
    componentDidMount() {
        console.log('componentDidMount')
        // Setting state in refreshTodos() cause re-rendering
        this.refreshTodos();
        console.log(this.state)
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveAllTodos(username)
            .then(
                response => {
                    //console.log(response);
                    this.setState({ todos: response.data })
                }
            )
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUserName()
        //console.log(id + " " + username);
        TodoDataService.deleteTodo(username, id)
            .then(
                response => {
                	// render() will be called 2 times (once for each state change)
                    this.setState({ message: `Delete of todo ${id} Successful` })
                    this.refreshTodos()
                }
            )
    }

    addTodoClicked() {
        this.props.history.push(`/todos/-1`)
    }

    updateTodoClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/todos/${id}`)
    }
    
    // Life-cycle Seq 2 - render page on every state update if shouldComponentUpdate() is returning true
    render() {
        console.log('render')
        return (
            <div>
                <h1>List Todos</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Target Date</th>
                                <th>IsCompleted?</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Using Array helper map from JS */}  
                        	{
                            	this.state.todos.map(
                                    todo =>
                                        <tr key={todo.id}>
                                            <td>{todo.description}</td>
                                            <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                            <td>{todo.done.toString()}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListTodosComponent