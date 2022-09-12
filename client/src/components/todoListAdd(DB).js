import React, { useCallback, useContext, useState } from 'react';
import axios from 'axios';

import { myContext } from '../App';

import '../style/TodoListAdd.css';
import '../style/GlobalStyle.css';

const TodoListAddDB = ( props ) => {
    // contextAPI를 사용.
    const contextApi = useContext(myContext);

    // 입력한 값을 제어하는 변수.
    const [inputText, setinputText] = useState("");

    const onChange = useCallback(e => {
        setinputText(e.target.value);
    }, []);

    const addTodolist = () => {
        if(!contextApi.loginStatus) {
            alert("DB Todolist는 회원전용기능입니다.");
            document.location.href = '/todolist';
        }

        // 로그인 검증 실시.
        contextApi.loginCheck();

        if(!contextApi.loginStatus) {
            console.log("회원정보 검증이 실패하였습니다.");
        }
        else {
            axios.post('/prj05/todo/todoinsert', {
                'memberId': props.memberId,
                'insertText': inputText
            })
            .then(res => {
                console.log(res.data.SystemMassage);
                document.location.href = '/todolist';
            })
            .catch(res => {
                console.log(res.data.SystemMassage);
            })
        }
    }

    return (
        <>
            <div className='tdl-addform gifont'>
                <div className="tdl-form">
                    <input className="tdl-addinput gifont" placeholder="추가할 할 일을 입력하세요" defaultValue={inputText} onChange={onChange} maxlength={35}/>
                    <button className="tdl-addbtu gifont" onClick={addTodolist}>
                        <h2>추가</h2>
                    </button>
                </div>
            </div>
        </>
    )
}

export default TodoListAddDB;