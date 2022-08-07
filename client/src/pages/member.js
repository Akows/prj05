
import React from 'react';
import { useLocation } from 'react-router-dom';

import MemberInfo from '../components/memberinfo';
import MemberLogin from '../components/memberlogin';
import MemberJoin from '../components/memberjoin';

import '../style/Member.css';

// 메뉴바에서 'componentvalue'의 이름으로 출력될 컴포넌트를 판별.
const Member = () => {
    // Link로 넘어오는 값이기 때문에 useLocation를 이용하여 값을 받아 사용한다.
    const location = useLocation();
	const componentvalue = location.state?.value;

    // 값을 componentvalue에 넣어 알맞은 컴포넌트를 출력해준다.
    if (componentvalue === 'memberinfo')
        return <MemberInfo/>;
    else if (componentvalue === 'memberlogin')
        return <MemberLogin/>;
    else if (componentvalue === 'memberjoin')
        return <MemberJoin/>;
    else
        return '에러가 발생했습니다.';
}

export default Member;