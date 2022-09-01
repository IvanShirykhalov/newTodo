import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, TodoList} from "./TodoList";
import {v1} from "uuid";


export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    const todoTitle: string = "What to learn"

    const [tasks, setTasks] = useState<Array<TaskPropsType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: false},
        {id: v1(), title: 'JS', isDone: false},])


    const [filter, setFilter] = useState<FilterValuesType>('all')

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const addTask = (title: string) => {

        setTasks([...tasks, {id: v1(), title, isDone: false}])
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


    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(t => t.id !== taskID))
    }

    return (
        <div className="App">
            <TodoList title={todoTitle} task={getTasksForTodolist()} removeTask={removeTask}
                      changeFilter={changeFilter} addTask={addTask}/>
        </div>
    );
}

export default App;
