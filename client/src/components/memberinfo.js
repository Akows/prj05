import React, { useContext, useState } from 'react';

import { myContext } from '../App';

import '../style/MemberInfo.css';

const MemberInfo = () => {

    const contextApi = useContext(myContext);

    const [componentValue, setComponentValue] = useState('showinfo');

    React.useEffect(() => {
        contextApi.ReqMemberInfo();
    });

    const memberData = '';

    const memberNumber = '';

    // 정확한 입력값을 체크하기 위해서 입력창의 값이 변하는 순간마다 값을 갱신, useState로 변수에 SET하도록 함.
    const handleInputId = (e) => {
        // setMemberId(e.target.value);
    }
    const handleInputName = (e) => {
        // setMemberName(e.target.value);
    }
    const handleInputEmail = (e) => {
        // setMemberEmail(e.target.value);
    }

    // 정보 조회 화면과 변경 화면을 제어하는 onClick 함수들
    const toChangeMemberInfo = () => {
        setComponentValue('changeinfo');
    }
    const toShowMemberInfo = () => {
        setComponentValue('showinfo');
    }

    const modifyMemberInfo = () => {
        // axios
        // .put('/prj05/member/infomodify', null, {
        //     params: {
        //         'MEMBER_NUMBER': memberData.MEMBER_NUMBER,
        //         'MEMBER_ID': memberId,
        //         'MEMBER_NAME': mamberName,
        //         'MEMBER_EMAIL': mamberEmail
        //     }
        // })
        // .then(res => {
        //     // 작업 완료 되면 메시지 알람 띄움.
        //     alert(res.data.SystemMessage);
        //     // 작업 완료 되면 페이지 이동(새로고침).
        //     document.location.href = '/info'
        // })
        // .catch(error => {
        //     console.log(error);
        // })
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
                                        회원번호 : {sessionStorage.getItem("MEMBER_DATA"[1])}
                                    </div>
                                    <div className='memberinfo-memberinfoform-idpwinput'>
                                        아이디 : {memberData.MEMBER_ID}
                                    </div>
                                    <div className='memberinfo-memberinfoform-idpwinput'>
                                        이름 : {memberData.MEMBER_NAME} 
                                    </div>
                                    <div className='memberinfo-memberinfoform-idpwinput'>
                                        이메일주소 : {memberData.MEMBER_EMAIL}
                                    </div>
                                    <div className='memberinfo-memberinfoform-idpwinput'>
                                        가입날짜 : {memberData.MEMBER_JOINDATE} 
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
                                        회원번호 : {memberData.MEMBER_NUMBER}
                                    </div>
                                    <div className='memberinfo-memberinfoform-idpwinput'>
                                        아이디 : <input defaultValue={memberData.MEMBER_ID} onChange={handleInputId}/>
                                    </div>
                                    <div className='memberinfo-memberinfoform-idpwinput'>
                                        이름 : <input defaultValue={memberData.MEMBER_NAME} onChange={handleInputName}/>
                                    </div>
                                    <div className='memberinfo-memberinfoform-idpwinput'>
                                        이메일주소 :  <input defaultValue={memberData.MEMBER_EMAIL} onChange={handleInputEmail}/>
                                    </div>
                                    <div className='memberinfo-memberinfoform-idpwinput'>
                                        가입날짜 : {memberData.MEMBER_JOINDATE} 
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