import axios from 'axios';
import React, { useCallback, useContext, useState } from 'react';

import { myContext } from '../App';

import '../style/MemberInfo.css';
import '../style/GlobalStyle.css';

const MemberInfo = () => {

    const contextApi = useContext(myContext);

    const [componentValue, setComponentValue] = useState('showinfo');

    const [memberNumber, setMemberNumber] = useState('');   
    const [memberId, setMemberId] = useState('');
    const [memberName, setMemberName] = useState('');
    const [memberEmail, setMemberEmail] = useState('');
    const [memberJoinDate, setMemberJoinDate] = useState('');

    const memberInfoReq = useCallback(() => {
        contextApi.ReqMemberInfo();

        setMemberNumber(sessionStorage.getItem("MEMBER_NUMBER"));
        setMemberId(sessionStorage.getItem("MEMBER_ID"));
        setMemberName(sessionStorage.getItem("MEMBER_NAME"));
        setMemberEmail(sessionStorage.getItem("MEMBER_EMAIL"));
        setMemberJoinDate(sessionStorage.getItem("MEMBER_JOINDATE"));
    }, [contextApi]);

    React.useEffect(() => {
        contextApi.loginCheck();
        memberInfoReq();

    }, [contextApi, memberInfoReq]);

    // 정확한 입력값을 체크하기 위해서 입력창의 값이 변하는 순간마다 값을 갱신, useState로 변수에 SET하도록 함.
    const handleInputId = (e) => {
        setMemberId(e.target.value);
    }
    const handleInputName = (e) => {
        setMemberName(e.target.value);
    }
    const handleInputEmail = (e) => {
        setMemberEmail(e.target.value);
    }

    // 정보 조회 화면과 변경 화면을 제어하는 onClick 함수들
    const toChangeMemberInfo = () => {
        setComponentValue('changeinfo');
    }
    const toShowMemberInfo = () => {
        setComponentValue('showinfo');
    }

    const modifyMemberInfo = () => {
        axios
        .put('/prj05/member/infomodify', null, {
            params: {
                'MEMBER_NUMBER': memberNumber,
                'MEMBER_ID': memberId,
                'MEMBER_NAME': memberName,
                'MEMBER_EMAIL': memberEmail
            }
        })
        .then(res => {
            // 수정사항이 반영된 이후 다시 한번 데이터를 조회하여 Set.
            memberInfoReq();
            // 작업 완료 되면 메시지 알람 띄움.
            alert(res.data.SystemMessage);
            // 작업 완료 되면 페이지 이동 (새로고침).
            document.location.href = '/info'

        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <>
            {componentValue === 'showinfo' ?
                <>
                    <div className='memberinfo-outer memberinfo-section'>
                        <div className='memberinfo-inner memberinfo-section'>
                            <div className='memberinfo-memberinfoform'>
                                <div className='memberinfo-memberinfoform-title'>
                                    <h2>회원정보</h2>
                                </div>
                                <div className='memberinfo-memberinfoform-input'>
                                    <div className='memberinfo-memberinfoform-idpwinput'>
                                        회원번호 : {memberNumber}
                                    </div>
                                    <div className='memberinfo-memberinfoform-idpwinput'>
                                        아이디 : {memberId}
                                    </div>
                                    <div className='memberinfo-memberinfoform-idpwinput'>
                                        이름 : {memberName} 
                                    </div>
                                    <div className='memberinfo-memberinfoform-idpwinput'>
                                        이메일주소 : {memberEmail}
                                    </div>
                                    <div className='memberinfo-memberinfoform-idpwinput'>
                                        가입날짜 : {memberJoinDate} 
                                    </div>
                                </div>
                                <div className='memberinfo-memberinfoform-submitbutton'>
                                    <div className='memberinfo-memberinfoform-submitbtu'>
                                        <button type='button' onClick={toChangeMemberInfo}>정보변경</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            :
                <>
                    <div className='memberinfo-outer memberinfo-section'>
                        <div className='memberinfo-inner memberinfo-section'>
                            <div className='memberinfo-memberinfoform'>
                                <div className='memberinfo-memberinfoform-title'>
                                    <h2>회원정보변경</h2>
                                </div>
                                <div className='memberinfo-memberinfoform-input'>
                                    <div className='memberinfo-memberinfoform-idpwinput'>
                                        회원번호 : {memberNumber}
                                    </div>
                                    <div className='memberinfo-memberinfoform-idpwinput'>
                                        아이디 : <input defaultValue={memberId} onChange={handleInputId}/>
                                    </div>
                                    <div className='memberinfo-memberinfoform-idpwinput'>
                                        이름 : <input defaultValue={memberName} onChange={handleInputName}/>
                                    </div>
                                    <div className='memberinfo-memberinfoform-idpwinput'>
                                        이메일주소 :  <input defaultValue={memberEmail} onChange={handleInputEmail}/>
                                    </div>
                                    <div className='memberinfo-memberinfoform-idpwinput'>
                                        가입날짜 : {memberJoinDate} 
                                    </div>
                                </div>
                                <div className='memberinfo-memberinfoform-submitbutton'>
                                    <div className='memberinfo-memberinfoform-submitbtu'>
                                        <button type='button' onClick={toShowMemberInfo}>변경취소</button>
                                    </div>
                                    <div className='memberinfo-memberinfoform-submitbtu'>
                                        <button type='button' onClick={modifyMemberInfo}>변경하기</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default MemberInfo;