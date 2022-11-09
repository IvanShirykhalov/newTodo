import React, {useEffect} from 'react';

import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./store";
import {TaskType} from "../api/todolist-api";
import {RequestStatusType} from "./app-reducer";
import {
    AppBar,
    Button, CircularProgress,
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
import {initializeAppTC, logoutTC} from "../features/Login/auth-reducer";


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
    let isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    let isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const logOut = () => {
        dispatch(logoutTC())
    }

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


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
                    {isLoggedIn && <Button color={"inherit"} variant={"outlined"} onClick={logOut}>Log out</Button>}
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


