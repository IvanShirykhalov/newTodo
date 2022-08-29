import React from 'react';


export type TaskPropsType = {
    id: number
    title: string
    isDone: boolean;

}

type TodoListPropsType = {
    title: string
    task: TaskPropsType[];
}

export const TodoList = (props: TodoListPropsType) => {

    const taskItem = props.task.map(t => <li key={t.id}><input type="checkbox" checked={t.isDone}/>
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
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};