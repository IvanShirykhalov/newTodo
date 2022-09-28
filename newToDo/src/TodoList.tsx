import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import {DeleteOutline} from "@material-ui/icons";
import {Task} from "./Task";


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

export const TodoList: FC<TodoListPropsType> = memo((props) => {
    console.log('TodoList')

    let tasks = props.task
    switch (props.filter) {
        case 'active':
            tasks = tasks.filter(t => !t.isDone)
            break;
        case "completed":
            tasks = tasks.filter(t => t.isDone)
            break;
        default:
            break;
    }

/*    const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.todoListID),
        [props.removeTask, props.todoListID])
    const changeTaskTitle = useCallback((taskId: string, title: string) => props.changeTaskTitle(taskId, title, props.todoListID),
        [props.changeTaskTitle, props.todoListID])
    const changeTaskStatus = useCallback((taskId: string, newTaskStatus: boolean) => {
        props.changeTaskStatus(taskId, newTaskStatus, props.todoListID)
    }, [props.changeTaskStatus, props.todoListID])*/

    const taskItem = props.task.length ?
        tasks.map(t => {
            return (<Task key={t.id}
                          task={t}
                          todolistId={props.todoListID}
                />)
        }) : <span>Tasks list is empty</span>

    const addTask = useCallback((title: string) => props.addTask(title, props.todoListID), [props.addTask, props.todoListID])
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
            <List>
                {taskItem}
            </List>
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
})