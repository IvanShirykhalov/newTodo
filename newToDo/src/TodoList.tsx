import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {DeleteOutline} from "@material-ui/icons";


export type TaskType = {
    id: string
    title: string
    isDone: boolean;

}


type TodoListPropsType = {
    todoListID: string
    title: string
    task: TaskType[];
    filter: FilterValuesType
    removeTask: (taskID: string, todolistID: string) => void;
    changeFilter: (filter: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    removeTodoList: (todolistID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
}

export const TodoList: FC<TodoListPropsType> = (props) => {

    const taskItem = props.task.length ?
        props.task.map(t => {

            const removeTask = () => props.removeTask(t.id, props.todoListID)
            const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todoListID)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
            }

            return <li key={t.id} className={t.isDone ? "isDone" : ""}>
                <IconButton onClick={removeTask}
                            size={"small"}
                            color={"secondary"}>
                    <DeleteOutline/>
                </IconButton>
                <Checkbox
                    size={"small"}
                    checked={t.isDone}
                    onChange={changeTaskStatus}/>
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
            </li>
        }) : <span>Tasks list is empty</span>

    const addTask = (title: string) => props.addTask(title, props.todoListID)
    const removeTodolist = () => props.removeTodoList(props.todoListID)
    const handlerCreator = (filter: FilterValuesType) => props.changeFilter(filter, props.todoListID)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)

    return (
        <div>
            <h3>
                <IconButton onClick={removeTodolist} color={"secondary"}>
                    <DeleteOutline/>
                </IconButton>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>

            </h3>
            <AddItemForm AddItem={addTask}/>
            <ul>
                {taskItem}
            </ul>
            <div>
                <Button
                    size={"small"}
                    variant={"contained"}
                    color={props.filter === 'all' ? "secondary" : "primary"}
                    onClick={() => handlerCreator('all')}>All
                </Button>
                <Button
                    size={"small"}
                    variant={"contained"}
                    color={props.filter === 'active' ? "secondary" : "primary"}
                    onClick={() => handlerCreator('active')}>Active
                </Button>
                <Button
                    size={"small"}
                    variant={"contained"}
                    color={props.filter === 'completed' ? "secondary" : "primary"}
                    onClick={() => handlerCreator('completed')}>Completed
                </Button>
            </div>
        </div>
    );
};