import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }

    const onKeyDownOddEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && offEditMode()

    }

    return (
        editMode
            ? <input value={title} autoFocus
                     onBlur={offEditMode}
                     onChange={onChangeSetTitle}
                     onKeyDown={onKeyDownOddEditMode}/> :
            <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};
