import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


type AddItemFormPropsType = {
    AddItem: (title: string) => void
}


export const AddItemForm = (props: AddItemFormPropsType) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addItem()
    }

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            trimmedTitle && props.AddItem(trimmedTitle)

        } else {
            setError(true)
        }
        setTitle('')
    }

    return (
        <div>
            <input value={title}
                   onChange={changeTitle}
                   onKeyDown={onKeyDownAddItem}
                   className={error ? "error" : ""}
            />
            <button onClick={addItem}>+</button>
            {error && <div className={'error-message'}>Title is required!</div>}
        </div>
    );
};
