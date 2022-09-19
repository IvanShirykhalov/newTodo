import React, {useReducer} from 'react';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";


export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    title: string
    filter: FilterValuesType
    id: string
}

export type TasksStateType = {
    [todolist_ID: string]: Array<TaskType>
}

function AppWithRedux() {

    let todoLists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()


    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
    }
    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todoListID))
    }
    const removeTask = (task_ID: string, todoListID: string) => {
        dispatch(removeTaskAC(task_ID, todoListID))
    }


    const removeTodoList = (todoListID: string) => {
        dispatch(removeTodolistAC(todoListID))
    }
    const addTodoList = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }
    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        dispatch(changeTodolistFilterAC(todoListID, filter))
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        dispatch(changeTodolistTitleAC(todoListID, title))
    }


    const todoListComponents = todoLists.map(tl => {
        let tasksForRender: Array<TaskType>;
        switch (tl.filter) {
            case 'active':
                tasksForRender = tasks[tl.id].filter(t => !t.isDone)
                break
            case "completed":
                tasksForRender = tasks[tl.id].filter(t => t.isDone)
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

export default AppWithRedux;


