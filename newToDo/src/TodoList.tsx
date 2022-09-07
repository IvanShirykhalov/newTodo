import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


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

            const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todoListID)

            return <li key={t.id} className={t.isDone ? "isDone" : ""}>
                <button onClick={() => props.removeTask(t.id, props.todoListID)}>x
                </button>
                <input type="checkbox" checked={t.isDone} onChange={(e) => {
                    props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
                }}/>
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
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm AddItem={addTask}/>
            <ul>
                {taskItem}
            </ul>
            <div>
                <button className={props.filter === 'all' ? "bnt-active" : ""} onClick={() => handlerCreator('all')}>All
                </button>
                <button className={props.filter === 'active' ? "bnt-active" : ""}
                        onClick={() => handlerCreator('active')}>Active
                </button>
                <button className={props.filter === 'completed' ? "bnt-active" : ""}
                        onClick={() => handlerCreator('completed')}>Completed
                </button>
            </div>
        </div>
    );
};