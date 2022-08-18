import '../style/Main.css';
import '../style/GlobalStyle.css';

import reacticon from '../asset/icon/React-icon.svg.png';
import expressicon from '../asset/icon/png-transparent-node-js-express-thumbnail.png';
import mariadbicon from '../asset/icon/mariadb_logo_icon_168996.png';

const Main = () => {

    return (
        <>
            <div className='main-pagebackground setcenter'>
                <div className='main-pageinner setcenter'>
                    <div className='main-projectexplain'>

                        <div className='main-explainicon setcenter'>
                            <img className='main-iconreact' src={reacticon} alt='??'/>
                            <img className='main-iconexpress' src={expressicon} alt='??'/>
                            <img className='main-iconmariadb' src={mariadbicon} alt='??'/>
                        </div>

                        <div className='main-explaintext gifont'>
                            <h1>
                                'REM' Web Project (React - Express - MySQL(MariaDB))
                            </h1>
                            <h2>
                                React - Express - MySQL(MariaDB)를 활용한 웹 개발 개인 프로젝트입니다.
                            </h2>
                            <h2>
                                웹 개발에서 가장 대중적으로 사용되는 기술 스택을 활용하여 간단한 웹 사이트를 만들었습니다.
                            </h2>

                            <hr/>

                            <h2>
                                본 프로젝트에서 구현한 기능은 다음과 같습니다.
                            </h2>
                            <h2>
                                회원 기능 (회원가입, 로그인, 로그아웃) / 게시판 기능(웹의 소양 CRUD 기능들)
                            </h2>
                            <h2>
                                이외에 TodoList와 공공데이터를 이용한 API 호출 기능을 구현해보았습니다.
                            </h2>

                            <hr/>

                            <h3>
                            만든 사람 : 이유승
                            </h3>
                            <h3>
                                전화번호 : 010-3629-3686
                            </h3>
                            <h3>
                                이메일 주소 : akows141@gmail.com
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main;