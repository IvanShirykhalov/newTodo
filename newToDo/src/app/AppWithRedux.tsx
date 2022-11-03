import React from 'react';

import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {TaskType} from "../api/todolist-api";
import {RequestStatusType} from "./app-reducer";
import {
    AppBar,
    Button,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {TodolistLists} from "../features/TodolistsList/TodolistLists";


export type TasksStateType = {
    [todolist_ID: string]: Array<TaskType>
}

function AppWithRedux() {

    let status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    /*const todoListComponents = todoLists.map(tl => {

        return (
            <Grid item key={tl.id}>
                <Paper variant={"outlined"} style={{padding: "20px"}}>
                    <TodoList
                        todoListId={tl.id}
                        title={tl.title}
                        entityStatus={tl.entityStatus}
                        filter={tl.filter}
                        task={tasks[tl.id]}
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
    })*/

    return (
        <div className={"App"}>
            <ErrorSnackbar/>
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
            {status === "loading" && <LinearProgress/>}
            <Container fixed>
                <TodolistLists/>
            </Container>
        </div>
    )
}




export default AppWithRedux;


