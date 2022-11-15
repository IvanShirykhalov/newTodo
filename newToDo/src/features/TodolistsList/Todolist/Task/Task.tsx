import React, {ChangeEvent, memo} from 'react';
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {removeTaskTC, updateTaskTC} from "../../tasks-reducer";
import {TaskStatuses, TaskType} from "../../../../api/todolist-api";
import {AppRootStateType, useAppDispatch} from "../../../../app/store";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import {DeleteOutline} from '@mui/icons-material';
import {RequestStatusType} from "../../../../app/app-reducer";
import {useSelector} from "react-redux";

type TaskPropsType = {
    task: TaskType
    todolistId: string
    entityStatus: RequestStatusType
}

export const Task = memo(({task, todolistId, ...props}: TaskPropsType) => {

    let entityStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    const {id, title, status} = task
    const dispatch = useAppDispatch()

    const removeTask = () => dispatch(removeTaskTC(todolistId, id))
    const changeTaskTitle = (title: string) => dispatch(updateTaskTC(id, {title}, todolistId))
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatus = e.currentTarget.checked
        dispatch(updateTaskTC(id, {status: newStatus ? TaskStatuses.Completed : TaskStatuses.New}, todolistId))
    }

    return (
        <ListItem key={id} divider>
            <IconButton onClick={removeTask}
                        size={"small"}
                        color={"secondary"}
                        disabled={entityStatus === 'loading'}>
                <DeleteOutline/>
            </IconButton>
            <Checkbox
                size={"small"}
                checked={status === TaskStatuses.Completed}
                onChange={changeTaskStatus}
                disabled={entityStatus === 'loading'}
            />
            <EditableSpan title={title} changeTitle={changeTaskTitle}/>
        </ListItem>
    );
})