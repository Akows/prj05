
import axios from 'axios';
import { useEffect, useState } from 'react';

import '../style/MemberInfo.css';

const MemberInfo = (props) => {

    const [memberdata, setMemberdata] = useState([]);

    useEffect(() => {
        axios
        .get('/prj05/member/info', {
            params: {
                'MEMBER_ID': props.whoLogin,
            }
        })
        .then(res => {
            setMemberdata(res.data);
            console.log(res.data);
        });
    
    }, [props.whoLogin])

    return (
        <>
            <div className='memberinfo-outer memberinfo-section'>
                <div className='memberinfo-inner memberinfo-section'>
                    <div className='memberinfo-memberinfoform'>
                        <div className='memberinfo-memberinfoform-title'>
                            <h2>회원정보</h2>
                        </div>
                        <div className='memberinfo-memberinfoform-input'>
                            <div className='memberinfo-memberinfoform-idpwinput'>
                                회원번호 : {memberdata.MEMBER_NUMBER}
                            </div>
                            <div className='memberinfo-memberinfoform-idpwinput'>
                                아이디 : {memberdata.MEMBER_ID}
                            </div>
                            <div className='memberinfo-memberinfoform-idpwinput'>
                                이름 : {memberdata.MEMBER_NAME} 
                            </div>
                            <div className='memberinfo-memberinfoform-idpwinput'>
                                이메일주소 : {memberdata.MEMBER_EMAIL}
                            </div>
                            <div className='memberinfo-memberinfoform-idpwinput'>
                                가입날짜 : {memberdata.MEMBER_JOINDATE} 
                            </div>
                        </div>
                        <div className='memberinfo-memberinfoform-submitbutton'>
                            <div className='memberinfo-memberinfoform-submitbtu'>
                                <button type='button'>정보변경(미구현)</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MemberInfo;