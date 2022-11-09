import React, {useEffect} from 'react';

import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./store";
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
import {Login} from "../features/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {initializeAppTC} from "../features/Login/auth-reducer";


export type TasksStateType = {
    [todolist_ID: string]: Array<TaskType>
}
type PropsType = {
    demo?: boolean
}

export enum ROUTS {
    DEFAULT = '/',
    LOGIN = 'login',
    NOT_FOUND = '404'
}

function AppWithRedux({demo = false}: PropsType) {

    const dispatch = useAppDispatch()

    let status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

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
                <Routes>
                    <Route path={ROUTS.DEFAULT} element={<TodolistLists demo={demo}/>}/>
                    <Route path={ROUTS.LOGIN} element={<Login/>}/>
                    <Route path={ROUTS.NOT_FOUND} element={<h1>404. PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to={ROUTS.NOT_FOUND}/>}/>
                </Routes>
            </Container>
        </div>
    )
}


export default AppWithRedux;


