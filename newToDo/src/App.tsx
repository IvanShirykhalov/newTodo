import React from 'react';
import './App.css';
import {TaskPropsType, TodoList} from "./TodoList";

function App() {

    const todoTitle_1: string = "What to learn"
    const todoTitle_2: string = "What to buy"

    const tasks1: Array<TaskPropsType> = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: false},
        {id: 3, title: 'JS', isDone: false},
    ]

    const tasks2: Array<TaskPropsType> = [
        {id: 1, title: 'Milk', isDone: true},
        {id: 2, title: 'Cacao', isDone: true},
        {id: 3, title: 'Bock', isDone: false},
    ]

    return (
        <div className="App">
            <TodoList title={todoTitle_1} task={tasks1}/>
            <TodoList title={todoTitle_2} task={tasks2}/>
        </div>
    );
}

export default App;
