import React from 'react';
import {FilterValuesType} from "./App";


export type TaskPropsType = {
    id: number
    title: string
    isDone: boolean;

}

type TodoListPropsType = {
    title: string
    task: TaskPropsType[];
    removeTask: (taskID: number) => void;
    changeFilter: (filter: FilterValuesType) => void
}

export const TodoList = (props: TodoListPropsType) => {

    const taskItem = props.task.map(t => <li key={t.id}>
        <button onClick={() => props.removeTask(t.id)}>x
        </button>
        <input type="checkbox" checked={t.isDone}/>
        <span>{t.title}</span></li>)

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {taskItem}
            </ul>
            <div>
                <button onClick={()=>{props.changeFilter("all")}}>All</button>
                <button onClick={()=>{props.changeFilter("active")}}>Active</button>
                <button onClick={()=>{props.changeFilter("completed")}}>Completed</button>
            </div>
        </div>
    );
};