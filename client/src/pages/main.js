import '../style/Main.css';
import '../style/global.css';

const Main = () => {
    
    return (
        <>
            <div className='main-outer'>
                <div className='main-inner'>
                    <p>
                        <h1>
                            'REM' Web Project
                        </h1>
                        <h2>
                            React - Express - MySQL(MariaDB)를 활용한 웹 개발 개인 프로젝트입니다.
                        </h2>
                        <h2>
                            웹 개발에서 가장 대중적으로 사용되는 기술 스택을 활용하여 간단한 웹 사이트를 만들었습니다.
                        </h2>
                        <h2>
                            회원 기능 (회원가입, 로그인, 로그아웃) / 게시판 기능(웹의 소양 CRUD 기능들)
                        </h2>
                        <h2>
                            이외에 TodoList와 공공데이터를 이용한 API 호출 기능을 구현해보았습니다.
                        </h2>

                        <h2>
                            <hr/>
                        </h2>

                        <h3>
                            만든 사람 : 이유승
                        </h3>
                        <h3>
                            전화번호 : 010-3629-3686
                        </h3>
                        <h3>
                            이메일 주소 : akows141@gmail.com
                        </h3>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Main;