
import { useEffect, useState } from 'react';
import '../style/Main.css';

const Main = () => {

    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        if(sessionStorage.getItem('MEMBER_ID') === null){
        // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 없다면
            console.log('isLogin ?? :: ', isLogin)
        } 
        else {
        // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 있다면
        // 로그인 상태 변경
            setIsLogin(true)
            console.log('isLogin ?? :: ', isLogin)
        }
    }, [isLogin])

    const logout = () => {
        // sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다.
        sessionStorage.removeItem('MEMBER_ID')
        // App 으로 이동(새로고침)
        document.location.href = '/'
    }

    return (
        <>
            {isLogin ? '로그인 됨'  : '로그인 되지 않음.'}

            <hr/>

            <button onClick={logout}>로그아웃</button>
        </>
    )
}

export default Main;