import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {DeleteOutline} from "@material-ui/icons";
import {EditableSpan} from "./EditableSpan";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, removeTaskTC, updateTaskTC} from "./store/tasks-reducer";
import {TaskStatuses, TaskType} from "./api/todolist-api";
import {useAppDispatch} from "./store/store";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = memo(({task, todolistId}: TaskPropsType) => {

    const {id, title, status} = task
    const dispatch = useAppDispatch()

    const removeTask = () => dispatch(removeTaskTC(todolistId, id))
    const changeTaskTitle = (title: string) => dispatch(updateTaskTC(id, {title}, todolistId))
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatus = e.currentTarget.checked
        dispatch(updateTaskTC(id, newStatus ? TaskStatuses.Completed : TaskStatuses.New, todolistId))
    }

    return (
        <ListItem key={id} className={status ? "isDone" : ""} divider>
            <IconButton onClick={removeTask}
                        size={"small"}
                        color={"secondary"}>
                <DeleteOutline/>
            </IconButton>
            <Checkbox
                size={"small"}
                checked={status === TaskStatuses.Completed}
                onChange={changeTaskStatus}/>
            <EditableSpan title={title} changeTitle={changeTaskTitle}/>
        </ListItem>
    );
})