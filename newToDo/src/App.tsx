import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolist-api";
import {FilterValuesType, TodolistDomainType} from "./store/todolists-reducer";

export type TasksStateType = {
    [todolist_ID: string]: Array<TaskType>
}

function App() {

    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodolistDomainType>>([
        {id: todoListID_1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todoListID_2, title: "What to buy", filter: "all", addedDate: '', order: 1},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID_1]: [
            {
                id: v1(),
                title: 'HTML',
                status: TaskStatuses.Completed,
                todoListId: todoListID_1,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(),
                title: 'CSS',
                status: TaskStatuses.New,
                todoListId: todoListID_1,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(),
                title: 'JS',
                status: TaskStatuses.New,
                todoListId: todoListID_1,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },],
        [todoListID_2]: [
            {
                id: v1(),
                title: 'Milk',
                status: TaskStatuses.Completed,
                todoListId: todoListID_2,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(),
                title: 'Bread',
                status: TaskStatuses.New,
                todoListId: todoListID_2,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(),
                title: 'Buns',
                status: TaskStatuses.Completed,
                todoListId: todoListID_2,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
        ]

    })


    const addTask = (title: string, todoListID: string) => {
        setTasks({
            ...tasks, [todoListID]: [{
                id: v1(), title, status: TaskStatuses.New,
                todoListId: todoListID,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            }, ...tasks[todoListID]]
        })
    }
    const changeTaskStatus = (taskID: string, status: TaskStatuses, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, status} : t)})
    }
    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, title} : t)})
    }
    const removeTask = (task_ID: string, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== task_ID)})
    }


    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }
    const addTodoList = (title: string) => {
        const newTodoList_ID = v1()
        const newTodoList: TodolistDomainType = {
            id: newTodoList_ID, title, filter: "all", addedDate: '', order: 0
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoList_ID]: []})

    }
    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id !== todoListID ? tl : {...tl, filter}))
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id !== todoListID ? tl : {...tl, title}))
    }


    const todoListComponents = todoLists.map(tl => {
        let tasksForRender: Array<TaskType>;
        switch (tl.filter) {
            case 'active':
                tasksForRender = tasks[tl.id].filter(t => t.status === TaskStatuses.New)
                break
            case "completed":
                tasksForRender = tasks[tl.id].filter(t => t.status === TaskStatuses.Completed)
                break
            default:
                tasksForRender = tasks[tl.id]
        }


        return (
            <Grid item key={tl.id}>
                <Paper variant={"outlined"} style={{padding: "20px"}}>
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
                        changeTodoListTitle={changeTodoListTitle}
                        changeTaskTitle={changeTaskTitle}
                    />
                </Paper>
            </Grid>
        );
    })

    return (
        <div className={"App"}>
            <AppBar position={"static"}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge={"start"} color={"inherit"} arial-label={"menu"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        Todolists
                    </Typography>
                    <Button color={"inherit"} variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0"}}>
                    <AddItemForm AddItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    )
}

export default App;


