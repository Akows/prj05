import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { createContext, useState } from 'react';

import './App.css';

import Menubar from './pages/menubar';
import Main from './pages/main';
import Callapi from './pages/callapi';
import Todolist from './pages/todolist';
import Board from './pages/board';
import BoardViewandMod from './pages/boardviewandmod';
import Login from './pages/login';
import Join from './pages/join';

// 전역 상태 관리를 위한 ContextAPI 사용을 위해 createContext()을 사용, 빈 Context를 생성.
export const myContext = createContext('defaultvalue');

function App() {

  // 로그인 값은 최상단 App에서 제어하면서 필요한 컴포넌트로 내려보내주어야 함.
  // 따라서 로그인 값을 제어할 변수를 useState로 생성.
  // 로그인한 유저의 아이디를 제어할 whoIsLogin.
  const [whoIsLogin, setwhoIsLogin] = useState('비로그인사용자');
  // 로그인 상태를 제어할 loginStatus.
  const [loginStatus, setLoginStatus] = useState(false);

  // React.useEffect(() => {

  // }, [])

  // Login 페이지에서 App으로 로그인 값을 넘겨줄 함수.
  const receiveLoginStatus = (data) => {
    console.log('isLogin : ', data);
    setLoginStatus(data);
  }
  // Login 페이지에서 App으로 사용자 이름을 넘겨줄 함수.
  const receiveLoginID = (data) => {
    console.log('whoLogin : ', data);
    setwhoIsLogin(data);
  }

// sessionStorage 방식 로그인 기능.
// 로그인 방식을 JWT로 변경하면서 더 이상 사용하지 않음.
//   // 로그인 여부 값과 로그인 한 사용자 이름을 관리하기 위한 isLogin / whoLogin 변수를 useState로 관리.
//   const [isLogin, setIsLogin] = useState('');
//   const [whoLogin, setWhoLogin] = useState('');

//   React.useEffect(() => {
//     // 웹이 실행되면 가장 먼저 isLogin을 false로 초기화.
//         setIsLogin(false);

//     // sessionStorage에 Item으로 담겨진 로그인값을 검증.
//     // 로그인 값의 이름은 'MEMBER_ID', 이 값이 없을(null) 경우 whoLogin의 값을 '익명사용자'로 set.
//     if (sessionStorage.getItem('MEMBER_ID') === null) {
//         setWhoLogin('익명사용자');
//     } 
//     else {
//     // 이 값이 있을 경우 useState로 제어하는 isLogin의 값을 true로 전환하고 whoLogin을 로그인 한 유저의 ID값으로 변경한다.
//         setIsLogin(true);
//         setWhoLogin(sessionStorage.getItem('MEMBER_ID'));
//     }
// }, [])

  return (
    <> 
      <myContext.Provider value={{ whoIsLogin, setwhoIsLogin, loginStatus, setLoginStatus }}>
        <BrowserRouter>
          {/* 사용자가 로그인을 하지 않았을 경우 로그인 페이지를 출력.*/}
          {/* 로그인을 하거나, 비로그인 사용을 클릭할 경우 메인 페이지로 이동.*/}
          {loginStatus !== true ? 
            <>
              <Routes>
                  <Route path='/' element={<Login sendLoginStatus={receiveLoginStatus} sendLoginID={receiveLoginID}/>}/>
                  <Route path='/join' element={<Join/>}/>
              </Routes>
            </>
          : 
            <>
              <Menubar/>
              <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/api' element={<Callapi/>}/>
                <Route path='/todolist' element={<Todolist/>}/>
                <Route path='/board' element={<Board/>}/>
                <Route path='/boardview/:BOARD_NUMBER' element={<BoardViewandMod/>}/>
              </Routes>
            </>
          }
        </BrowserRouter>
      </myContext.Provider>
    </>
  );
}

export default App;
