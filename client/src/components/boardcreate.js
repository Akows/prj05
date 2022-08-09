
import axios from 'axios';
import React, { useState } from 'react';
import '../style/Boardcreate.css';

const Boardcreate = (props) => {
    const [inputtitle, setInputtitle] = useState('')
    const [inputtext, setInputtext] = useState('')

    const checkInputtitle = (e) => {
        setInputtitle(e.target.value)
    }

    const checkInputtext = (e) => {
        setInputtext(e.target.value)
    }

    const createboard = () => {
        axios
        .post('/prj05/board/write', null, {
            params: {
                'BOARD_TITLE': inputtitle,
                'BOARD_TEXT': inputtext,
                'BOARD_WRITE': props.whoLogin
            }
        })
        .then(res => {
            alert(res.data.SystemMessage);
            
            // 작업 완료 되면 페이지 이동(새로고침)
            document.location.href = '/board'
        })
        .catch(err => {
            console.log(err, '에러 발생!');
        })
    }

    return (
        <div className='board-contents-board'>
            <div className='board-contents-boardcreatetitle memberinfo-section'>
                <label htmlFor='inputtitle'></label>
                <input type='text' name='inputtitle' value={inputtitle} onChange={checkInputtitle} placeholder={'제목을 입력해주세요'}/>
            </div>

            <div className='board-contents-boardcreatetext memberinfo-section'>
                <label htmlFor='inputtext'></label>
                <input type='text' name='inputtext' value={inputtext} onChange={checkInputtext} placeholder={'내용을 입력해주세요'}/>
            </div>

            <div className='board-contents-submitbutton'>
                <button className='board-contents-submitbtn' type='button' onClick={createboard}>글작성</button>
            </div>
        </div>
    )
}

export default Boardcreate;