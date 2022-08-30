import React, { useCallback, useState } from 'react';

import '../style/TodoListAdd.css';
import '../style/GlobalStyle.css';

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
        <div className='tdl-addform gifont'>
            <form className="tdl-form" onSubmit={onSubmit}>
                <input className="tdl-addinput gifont" placeholder="추가할 할 일을 입력하세요" value={value} onChange={onChange}/>
                <button className="tdl-addbtu gifont" type="submit">
                    <h2>추가</h2>
                </button>
            </form>
        </div>
    )
}

export default TodoListAdd;