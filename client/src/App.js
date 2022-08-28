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
import { useCookies } from 'react-cookie';

// 전역 상태 관리를 위한 ContextAPI 사용을 위해 createContext()을 사용, 빈 Context를 생성.
export const myContext = createContext('defaultvalue');

function App() {
  // 로그인 페이지에서 로그인을 완료하면 로그인 페이지는 로그인 값을 받아 App 페이지로 이동.
  // App 페이지는 로그인 값이 필요한 페이지 혹은 컴포넌트로 값을 전달해준다.
  // 따라서 로그인 값을 제어할 변수를 useState로 선언하여 제어한다.

    // 로그인 상태를 제어하는 loginStatus.
    const [loginStatus, setLoginStatus] = useState(false);

    // 로그인한 유저의 아이디 값을 제어하는 whoIsLogin.
    const [whoIsLogin, setwhoIsLogin] = useState('비로그인사용자');

    // 로그인한 유저의 쿠키 값을 제어하는 cookies.
    const [cookies, setCookie, removeCookie] = useCookies(['쿠키 이름']);

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

  // Login 페이지에서 App으로 쿠키 값을 넘겨줄 함수.
  const receiveCookie = (data) => {
    console.log('Cookie : ', data);
    setCookie(data);
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
            <Route path='/login' element={<Login sendLoginStatus={receiveLoginStatus} sendLoginID={receiveLoginID} sendCookie={receiveCookie}/>}/>
            <Route path='/join' element={<Join/>}/>
            <Route path='/info' element={<MemberInfo/>}/>
          </Routes>
        </BrowserRouter>
      </myContext.Provider>
    </>
  );
}

export default App;
