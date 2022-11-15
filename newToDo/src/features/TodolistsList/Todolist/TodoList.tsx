import React, {FC, memo, useCallback} from 'react';
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from "../todolists-reducer";
import {createTaskTC} from "../tasks-reducer";
import {AppRootStateType, useAppDispatch} from "../../../app/store";
import {Button, IconButton, List} from "@mui/material";
import {DeleteOutline} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {RequestStatusType} from "../../../app/app-reducer";

type TodoListPropsType = {
    todolist: TodolistDomainType
    task: TaskType[];
    demo: boolean
}

export const TodoList: FC<TodoListPropsType> = memo(({demo = false, ...props}) => {


    let status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const dispatch = useAppDispatch()


    let tasks = props.task
    switch (props.todolist.filter) {
        case 'active':
            tasks = tasks.filter(t => t.status === TaskStatuses.New)
            break;
        case "completed":
            tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
            break;
        default:
            break;
    }

    const taskItem = props.task.length ?
        tasks.map(t => {
            return (<Task key={t.id}
                          task={t}
                          todolistId={props.todolist.id}
                          entityStatus={props.todolist.entityStatus}
            />)
        }) : <span>Tasks list is empty</span>

    const addTask = useCallback((title: string) => dispatch(createTaskTC(props.todolist.id, title)), [dispatch])
    const removeTodolist = () => dispatch(removeTodolistTC(props.todolist.id))
    const handlerCreator = (filter: FilterValuesType) => dispatch(changeTodolistFilterAC(props.todolist.id, filter))
    const changeTodoListTitle = (title: string) => dispatch(changeTodolistTitleTC(props.todolist.id, title))

    return (
        <div>
            <h3>
                <IconButton onClick={removeTodolist} color={"secondary"}
                            disabled={props.todolist.entityStatus === 'loading'}>
                    <DeleteOutline/>
                </IconButton>
                <EditableSpan title={props.todolist.title} changeTitle={changeTodoListTitle}/>

            </h3>
            <AddItemForm AddItem={addTask} disabled={status === 'loading'}/>
            <List>
                {taskItem}
            </List>
            <div>
                <Button
                    size={"small"}
                    variant={"contained"}
                    color={props.todolist.filter === 'all' ? "secondary" : "primary"}
                    onClick={() => handlerCreator('all')}>All
                </Button>
                <Button
                    size={"small"}
                    variant={"contained"}
                    color={props.todolist.filter === 'active' ? "secondary" : "primary"}
                    onClick={() => handlerCreator('active')}>Active
                </Button>
                <Button
                    size={"small"}
                    variant={"contained"}
                    color={props.todolist.filter === 'completed' ? "secondary" : "primary"}
                    onClick={() => handlerCreator('completed')}>Completed
                </Button>
            </div>
        </div>
    );
})