import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, TodoList} from "./TodoList";


export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    const todoTitle: string = "What to learn"

    const [tasks, setTasks] = useState<Array<TaskPropsType>>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: false},
        {id: 3, title: 'JS', isDone: false},])


    const [filter, setFilter] = useState<FilterValuesType>('all')

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const getTasksForTodolist = () => {
        switch (filter) {
            case 'active':
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }


    const removeTask = (taskID: number) => {
        setTasks(tasks.filter(t => t.id !== taskID))
    }

    return (
        <div className="App">
            <TodoList title={todoTitle} task={getTasksForTodolist()} removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
