import React, { useContext, useState } from 'react';


import './Test.css';
import '../style/GlobalStyle.css';

import { myContext } from '../App';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Test = () => {
    const contextApi = useContext(myContext);

    // Generalforum에서 게시물 데이터를 가지고 오기위해 useLocation을 사용.
    const location = useLocation();

    const [isModify, setIsModify] = useState(false);
    const [boardTitle, setBoardTitle] = useState(location.state?.BOARD_TITLE);
    const [boardText, setBoardText] = useState(location.state?.BOARD_TEXT);

    // useLocation으로 가져온 데이터를 변수에 삽입.
    const boardNumber = location.state?.BOARD_NUMBER;
    const boardWriter = location.state?.BOARD_WRITER;
    const boardWritetime = location.state?.BOARD_WRITE_TIME;

    const setTimeinfo = '';

    // 정확한 입력값을 체크하기 위해서 입력창의 값이 변하는 순간마다 값을 갱신, useState로 변수에 SET하도록 함.
    const handleInputTitle = (e) => {
        setBoardTitle(e.target.value)
    }

    const handleInputText = (e) => {
        setBoardText(e.target.value)
    }

    const deleteboard = () => {
        axios
        .delete('/prj05/board/delete', {
            params: {
                'BOARD_NUMBER': boardNumber
            }
        })
        .then(res => {
            console.log(res)
            alert('글이 삭제되었습니다.');

            // 작업 완료 되면 페이지 이동(새로고침)
            document.location.href = '/board'
        })
    };

    const modifyboard = () => {
        axios
        .put('/prj05/board/modify', null, {
            params: {
                'BOARD_TITLE': boardTitle,
                'BOARD_TEXT': boardText,
                'BOARD_NUMBER': boardNumber
            }
        })
        .then(res => {
            // 작업 완료 되면 메시지 알람 띄움.
            alert(res.data.SystemMessage);
            // 작업 완료 되면 페이지 이동(새로고침).
            document.location.href = '/board'
        })
        .catch(error => {
            console.log(error);
        })
    }

    const changemodify = () => {
        setIsModify(true);
    };
    
    return (
        <>
                <div className='bodvm-pagebackground setcenter'>
                    <div className='bodvm-pageinner setcenter'>
                        <div className='bodvm-bodarea setcenter gifont'>

                            <div className='bodvm-sidebar'>

                                <div className='bodvm-sidetitle'>
                                    <h1>자유게시판</h1>
                                </div>

                                <div className='bodvm-sideutil'>
                                    {contextApi.loginStatus ? 
                                        <h2>{contextApi.whoIsLogin}</h2>
                                    :
                                        <h2>익명(비로그인)</h2>
                                    }

                                    <h3>{setTimeinfo}</h3>
                                </div>

                                <div className='bodvm-sidebtu'>
                                    {contextApi.whoIsLogin === boardWriter ?
                                            <button className='bodvm-changebtu gifont' onClick={deleteboard}>글삭제</button>
                                        :
                                            <button className='bodvm-changebtu gifont'>삭제권한없음</button>
                                    }

                                    {contextApi.whoIsLogin === boardWriter ?
                                            <button className='bodvm-changebtu gifont' onClick={changemodify}>글수정</button>
                                        :
                                            <button className='bodvm-changebtu gifont'>수정권한없음</button>  
                                    }
                                </div>
                            </div>

                            {isModify ? 
                                <div className='bodvm-contents'>
                                    <div className='bodvm-contents-viewerinfo'>
                                        <div className='bodvm-contents-number'>
                                            {boardNumber}
                                        </div>
                                        <div className='bodvm-contents-title bodvm-section'>
                                            <input defaultValue={boardTitle} onChange={handleInputTitle}/>
                                        </div>
                                        <div className='bodvm-contents-writer'>
                                            {boardWriter}
                                        </div>
                                        <div className='bodvm-contents-writetime'>
                                            {boardWritetime}
                                        </div>
                                    </div>
                                    <div className='bodvm-contents-viewertext bodvm-section'>
                                        <div className='bodvm-contents-text bodvm-section'>
                                            <input defaultValue={boardText} onChange={handleInputText}/>
                                        </div>
                                    </div>
                                    <div className='bodvm-contents-submitbutton'>
                                        <button className='bodvm-contents-submitbtn' type='button' onClick={modifyboard}>수정하기</button>
                                    </div>
                                </div>
                            :
                                <div className='bodvm-contents'>
                                    <div className='bodvm-contents-viewerinfo'>
                                        <div className='bodvm-contents-number'>
                                            {boardNumber}
                                        </div>
                                        <div className='bodvm-contents-title'>
                                            {boardTitle}
                                        </div>
                                        <div className='bodvm-contents-writer'>
                                            {boardWriter}
                                        </div>
                                        <div className='bodvm-contents-writetime'>
                                            {boardWritetime}
                                        </div>
                                    </div>
                                    <div className='bodvm-contents-viewertext bodvm-section'>
                                        <div className='bodvm-contents-text'>
                                            {boardText}
                                        </div>
                                    </div>
                                </div>
                            }








                        </div>
                    </div>
                </div>
        </>
    )
}

export default Test;