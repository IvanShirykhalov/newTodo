import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {DeleteOutline} from "@material-ui/icons";
import {EditableSpan} from "./EditableSpan";
import {TaskType} from "./TodoList";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = memo(({task,todolistId, ...props}: TaskPropsType) => {

    const {id, isDone, title} = task
    const dispatch = useDispatch()

    console.log('Task')
    const removeTask = () => dispatch(removeTaskAC(id, todolistId))
    const changeTaskTitle = (title: string) => dispatch(changeTaskTitleAC(id, title, todolistId))
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(id, e.currentTarget.checked, todolistId))
    }

    return (
        <ListItem key={id} className={isDone ? "isDone" : ""} divider>
            <IconButton onClick={removeTask}
                        size={"small"}
                        color={"secondary"}>
                <DeleteOutline/>
            </IconButton>
            <Checkbox
                size={"small"}
                checked={isDone}
                onChange={changeTaskStatus}/>
            <EditableSpan title={title} changeTitle={changeTaskTitle}/>
        </ListItem>
    );
})