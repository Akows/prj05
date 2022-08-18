import React, { useCallback, useState } from 'react';

import '../style/TodoListAdd.css';

const TodoListAdd = ({ onAdd }) => {
    const [value, setValue] = useState("");

    // const onChange = useCallback(e => {
    //     setValue(e.target.value);
    // }, []);

    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, []);

    const onSubmit = useCallback(e => {
        e.preventDefault();
        onAdd(value);
        setValue("");
    }, [onAdd, value]);

    return (
        <div className='todolistadd-form'>
            <form className="TodoAdd" onSubmit={onSubmit}>
                <input placeholder="추가할 할 일을 입력하세요" value={value} onChange={onChange}/>
                <button type="submit">
                    추가
                </button>
            </form>
        </div>
    )
}

export default TodoListAdd;