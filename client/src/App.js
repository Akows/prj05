import React, { createContext, useCallback, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Uppermenu from './components/uppermenu';
import Main from './pages/main';
import Callapi from './pages/callapi';
import Todolist from './pages/todolist';
import Board from './pages/board';
import BoardViewandMod from './pages/boardviewandmod';
import Login from './pages/login';
import Join from './pages/join';
import MemberInfo from './components/memberinfo';

import Test from './pages/test';

import './App.css';

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

  // Cookie에 저장된 JWT를 검증하는 함수를 useCallback으로 저장.
  // ContextAPI로 모든 컴포넌트들에게 전달.
  const loginCheck = useCallback(() => {
    axios
    .get('/prj05/member/validation')
    .then((res) => {
      console.log("JWT 검증이 정상적으로 통과되었습니다.");
      setLoginStatus(true);
      setwhoIsLogin(res.data.memberid);
    })
    .catch(() => {
      console.log("JWT 검증에 이상 발생함.");
      setLoginStatus(false);
      setwhoIsLogin('비로그인사용자');
    });
  }, []);

  return (
    <> 
      <myContext.Provider value={{ whoIsLogin, loginStatus, setwhoIsLogin, setLoginStatus, loginCheck }}>
        <BrowserRouter>
          <Uppermenu/>
          <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/api' element={<Callapi/>}/>
            <Route path='/todolist' element={<Todolist/>}/>
            <Route path='/board' element={<Board/>}/>
            <Route path='/boardview/:BOARD_NUMBER' element={<BoardViewandMod/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/join' element={<Join/>}/>
            <Route path='/info' element={<MemberInfo/>}/>

            <Route path='/test' element={<Test/>}/>
          </Routes>
        </BrowserRouter>
      </myContext.Provider>
    </>
  );
}

export default App;
