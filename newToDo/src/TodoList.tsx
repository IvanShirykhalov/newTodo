import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";


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
}

export const TodoList: FC<TodoListPropsType> = (props) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTask()
    }


    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            trimmedTitle && props.addTask(trimmedTitle, props.todoListID)

        } else {
            setError(true)
        }
        setTitle('')
    }


    const taskItem = props.task.length ?
        props.task.map(t => <li key={t.id} className={t.isDone ? "isDone" : ""}>
            <button onClick={() => props.removeTask(t.id, props.todoListID)}>x
            </button>
            <input type="checkbox" checked={t.isDone} onChange={(e) => {
                props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
            }}/>
            <span>{t.title}</span></li>) : <span>Tasks list is empty</span>

    const handlerCreator = (filter: FilterValuesType) => props.changeFilter(filter, props.todoListID)

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={() =>
                    props.removeTodoList(props.todoListID)}>x
                </button>
            </h3>
            <div>
                <input value={title}
                       onChange={changeTitle}
                       onKeyDown={onKeyDownAddTask}
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>Title is required!</div>}
            </div>
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