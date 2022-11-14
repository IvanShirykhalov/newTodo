import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: 'TodoList/AddItemForm',
    component: AddItemForm,
    argTypes: {
        addItem: {
            description: 'callback'
        },
    },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});
AddItemFormStory.args = {
    disabled: false,
    AddItem: action('Clicked forn inside form')
};

export const AddItemFormDisabledStory = Template.bind({});
AddItemFormDisabledStory.args = {
    disabled: true,
    AddItem: action('Clicked forn inside form')
};

