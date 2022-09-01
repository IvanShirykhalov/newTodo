import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";


export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean;

}

type TodoListPropsType = {
    title: string
    task: TaskPropsType[];
    removeTask: (taskID: string) => void;
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

export const TodoList = (props: TodoListPropsType) => {

    const [title, setTitle] = useState<string>('')

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTask()
    }
    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }


    const taskItem = props.task.length ?
        props.task.map(t => <li key={t.id}>
            <button onClick={() => props.removeTask(t.id)}>x
            </button>
            <input type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span></li>) : <span>Tasks list is empty</span>

    const handlerCreator = (filter: FilterValuesType) => props.changeFilter(filter)

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={changeTitle}
                       onKeyDown={onKeyDownAddTask}/>
                <button onClick={addTask}>+
                </button>
            </div>
            <ul>
                {taskItem}
            </ul>
            <div>
                <button onClick={() => handlerCreator('all')}>All
                </button>
                <button onClick={() => handlerCreator('active')}>Active
                </button>
                <button onClick={() => handlerCreator('completed')}>Completed
                </button>
            </div>
        </div>
    );
};