
import React, { useState } from 'react';
import axios from 'axios';

import '../style/Member.css';

const Member = () => {

    const [inputID, setInputID] = useState('')
    const [inputPW, setInputPW] = useState('')

    // 정확한 입력값을 체크하기 위해서 입력창의 값이 변하는 순간마다 값을 갱신, useState로 변수에 SET하도록 함.
    const handleInputId = (e) => {
        setInputID(e.target.value)
    }

    const handleInputPw = (e) => {
        setInputPW(e.target.value)
    }

    // 아이디와 비밀번호를 입력하고 로그인 버튼을 클릭하면 작동되는 함수.
    const onClickLogin = () => {
        axios.post('/prj05/member/login', null, {
            params: {
                'MEMBER_ID': inputID,
                'MEMBER_PW': inputPW
            }
        })
        .then(res => {
            console.log(res)
            console.log('res.data.MEMBERID :: ', res.data.MEMBERID)
            console.log('res.data.SystemMessage :: ', res.data.SystemMessage)

            if (res.data.MEMBERID === undefined) {
                // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
                console.log('======================',res.data.SystemMessage)
                alert('입력하신 id 가 일치하지 않습니다.')

            } 
            else if (res.data.MEMBERID === null) {
                // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
                console.log('======================','입력하신 비밀번호 가 일치하지 않습니다.')
                alert('입력하신 비밀번호 가 일치하지 않습니다.')

            } 
            else if (res.data.MEMBERID === inputID) {
                // id, pw 모두 일치 userId = userId1, msg = undefined
                console.log('======================','로그인 성공')
                sessionStorage.setItem('MEMBER_ID', inputID)
            }
            // 작업 완료 되면 페이지 이동(새로고침)
            document.location.href = '/'
        })
        .catch()
    }

    // // 페이지 렌더링 후 가장 처음 호출되는 함수
    // useEffect(() => {
    //     axios
    //     .get('/prj05/member/login')
    //     .then(res => 
    //         console.log(res)
    //     )
    //     .catch()
    // },
    // // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
    // [])

    return (
        <>
        
        <div className='member-outer'>

            <div className='member-inner'>
    
                <div className='member-inner-loginform'>

                    <h2>Login</h2>

                    <div className='member-inner-loginform-idinput'>
                        <label htmlFor='inputid'>ID : </label>
                        <input type='text' name='inputid' value={inputID} onChange={handleInputId} />
                    </div>
                    <div className='member-inner-loginform-pwinput'>
                        <label htmlFor='inputpw'>PW : </label>
                        <input type='password' name='inputpw' value={inputPW} onChange={handleInputPw} />
                    </div>
                    <div className='member-inner-loginform-submitbtu'>
                        <button type='button' onClick={onClickLogin}>Login</button>
                    </div>

                </div>

            </div>

        </div>

        </>






    )
}

export default Member;