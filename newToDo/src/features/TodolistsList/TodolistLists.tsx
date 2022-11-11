import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {
    addTodolistTC, changeTodolistFilterAC, changeTodolistTitleTC,
    fetchTodolist,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from "./todolists-reducer";
import {createTaskTC, removeTaskTC, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../api/todolist-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {TodoList} from "./Todolist/TodoList";
import {ROUTS, TasksStateType} from "../../app/AppWithRedux";
import {Navigate} from "react-router-dom";

type PropsType = {
    demo?: boolean
}

export const TodolistLists: React.FC<PropsType> = ({demo = false}) => {

    let todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)


    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(fetchTodolist)
    }, [dispatch])


    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])


    if (!isLoggedIn) {
        return <Navigate to={ROUTS.LOGIN}/>
    }


    return (
        <>
            <Grid container style={{padding: "20px 0"}}>
                <AddItemForm AddItem={addTodoList}/>
            </Grid>
            <Grid container spacing={4}>
                {todoLists.map(tl => {
                    return (
                        <Grid item key={tl.id}>
                            <Paper variant={"outlined"} style={{padding: "20px"}}>
                                <TodoList
                                    todoListId={tl.id}
                                    title={tl.title}
                                    entityStatus={tl.entityStatus}
                                    filter={tl.filter}
                                    task={tasks[tl.id]}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </>)
}