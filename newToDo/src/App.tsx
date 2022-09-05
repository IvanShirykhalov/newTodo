import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";


export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
    title: string
    filter: FilterValuesType
    id: string
}

type TaskStateType = {
    [todolist_ID: string]: Array<TaskType>
}

function App() {

    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: false},
            {id: v1(), title: 'JS', isDone: false},],
        [todoListID_2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Buns', isDone: true},
        ]

    })

    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id !== todoListID ? tl : {...tl, filter}))
    }
    const addTask = (title: string, todoListID: string) => {
        setTasks({...tasks, [todoListID]: [{id: v1(), title, isDone: false}, ...tasks[todoListID]]})
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)})
    }
    const removeTask = (task_ID: string, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== task_ID)})
    }


    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }


    const todoListComponents = todoLists.map(tl => {
        let tasksForRender;
        switch (tl.filter) {
            case 'active':
                return tasks[tl.id].filter(t => !t.isDone)
            case "completed":
                return tasks[tl.id].filter(t => t.isDone)
            default:
                tasksForRender = tasks[tl.id]
        }


        return (
            <div className="App">
                <TodoList
                    todoListID={tl.id}
                    title={tl.title}
                    filter={tl.filter}
                    task={tasksForRender}
                    removeTask={removeTask}
                    changeFilter={changeTodoListFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    removeTodoList={removeTodoList}
                />
            </div>
        );
    })

    return (
        <div className={"App"}>
            {todoListComponents}
        </div>
    )
}

export default App;


