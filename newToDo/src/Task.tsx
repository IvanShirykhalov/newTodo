import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {DeleteOutline} from "@material-ui/icons";
import {EditableSpan} from "./EditableSpan";
import {TaskType} from "./TodoList";

type TaskPropsType = {
    task: TaskType
    changeTaskTitle: (taskID: string, title: string) => void
    removeTask: (taskID: string) => void;
    changeTaskStatus: (taskID: string, isDone: boolean) => void
}

export const Task = memo(({task, ...props}: TaskPropsType) => {
console.log('Task')
    const removeTask = () => props.removeTask(task.id)
    const changeTaskTitle = (title: string) => props.changeTaskTitle(task.id, title)
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(task.id, e.currentTarget.checked)
    }

    return (
        <ListItem key={task.id} className={task.isDone ? "isDone" : ""} divider>
            <IconButton onClick={removeTask}
                        size={"small"}
                        color={"secondary"}>
                <DeleteOutline/>
            </IconButton>
            <Checkbox
                size={"small"}
                checked={task.isDone}
                onChange={changeTaskStatus}/>
            <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
        </ListItem>
    );
})