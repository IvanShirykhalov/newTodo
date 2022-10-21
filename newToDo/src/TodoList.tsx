import React, {FC, memo, useCallback, useEffect} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton, List} from "@material-ui/core";
import {DeleteOutline} from "@material-ui/icons";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./api/todolist-api";
import {FilterValuesType} from "./store/todolists-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "./store/tasks-reducer";
import {useAppDispatch} from "./store/store";

type TodoListPropsType = {
    todoListID: string
    title: string
    task: TaskType[];
    filter: FilterValuesType
    removeTask: (taskID: string, todolistID: string) => void;
    changeFilter: (filter: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, status: TaskStatuses, todolistID: string) => void
    removeTodoList: (todolistID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
}

export const TodoList: FC<TodoListPropsType> = memo((props) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.todoListID))
    }, [])

    let tasks = props.task
    switch (props.filter) {
        case 'active':
            tasks = tasks.filter(t => t.status === TaskStatuses.New)
            break;
        case "completed":
            tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
            break;
        default:
            break;
    }

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