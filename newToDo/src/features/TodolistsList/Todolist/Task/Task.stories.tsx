import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../../../../app/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../app/store";
import {TaskType} from "../../../../api/todolist-api";


export default {
    title: 'TodoList/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],

} as ComponentMeta<typeof Task>;


const TaskReduxToStore = () => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])

    return <Task task={task} todolistId={'todolistId1'}/>
}


const Template: ComponentStory<typeof TaskReduxToStore> = (args) => <TaskReduxToStore/>;

export const TaskStory = Template.bind({});

TaskStory.args = {};
