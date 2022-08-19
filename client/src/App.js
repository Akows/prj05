import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { createContext, useState } from 'react';

import './App.css';

import Uppermenu from './components/uppermenu';
import Main from './pages/main';
import Callapi from './pages/callapi';
import Todolist from './pages/todolist';
import Board from './pages/board';
import BoardViewandMod from './pages/boardviewandmod';
import Login from './pages/login';
import Join from './pages/join';
import MemberInfo from './components/memberinfo';

// 전역 상태 관리를 위한 ContextAPI 사용을 위해 createContext()을 사용, 빈 Context를 생성.
export const myContext = createContext('defaultvalue');

function App() {

  // 로그인 값은 최상단 App에서 제어하면서 필요한 컴포넌트로 내려보내주어야 함.
  // 따라서 로그인 값을 제어할 변수를 useState로 생성.
  // 로그인한 유저의 아이디를 제어할 whoIsLogin.
  const [whoIsLogin, setwhoIsLogin] = useState('비로그인사용자');
  // 로그인 상태를 제어할 loginStatus.
  const [loginStatus, setLoginStatus] = useState(false);

  // Login 페이지에서 App으로 로그인 값을 넘겨줄 함수.
  const receiveLoginStatus = (data) => {
    console.log('isLogin : ', data);
    setLoginStatus(data);
    localStorage.setItem('loginstatus', loginStatus);
  }
  // Login 페이지에서 App으로 사용자 이름을 넘겨줄 함수.
  const receiveLoginID = (data) => {
    console.log('whoLogin : ', data);
    setwhoIsLogin(data);
    localStorage.setItem('whologin', whoIsLogin);
  }

  return (
    <> 
      <myContext.Provider value={{ whoIsLogin, setwhoIsLogin, loginStatus, setLoginStatus }}>
        <BrowserRouter>
          <Uppermenu/>
          <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/api' element={<Callapi/>}/>
            <Route path='/todolist' element={<Todolist/>}/>
            <Route path='/board' element={<Board/>}/>
            <Route path='/boardview/:BOARD_NUMBER' element={<BoardViewandMod/>}/>
            <Route path='/login' element={<Login sendLoginStatus={receiveLoginStatus} sendLoginID={receiveLoginID}/>}/>
            <Route path='/join' element={<Join/>}/>
            <Route path='/info' element={<MemberInfo/>}/>
          </Routes>
        </BrowserRouter>
      </myContext.Provider>
    </>
  );
}

export default App;
