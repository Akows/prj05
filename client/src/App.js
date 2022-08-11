import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { createContext, useState } from 'react';

import './App.css';

import Menubar from './pages/menubar';
import Main from './pages/main';
import Callapi from './pages/callapi';
import Todolist from './pages/todolist';
import Board from './pages/board';
import Boardview from './pages/boardview';
import Member from './pages/member';

// 전역 상태 관리를 위한 ContextAPI 사용을 위해 createContext()을 사용, 빈 Context를 생성.
export const myContext = createContext('defaultvalue');

function App() {

    // 로그인 여부 값과 로그인 한 사용자 이름을 관리하기 위한 isLogin / whoLogin 변수를 useState로 관리.
  const [isLogin, setIsLogin] = useState('');
  const [whoLogin, setWhoLogin] = useState('');

  React.useEffect(() => {
    // 웹이 실행되면 가장 먼저 isLogin을 false로 초기화.
        setIsLogin(false);

    // sessionStorage에 Item으로 담겨진 로그인값을 검증.
    // 로그인 값의 이름은 'MEMBER_ID', 이 값이 없을(null) 경우 whoLogin의 값을 '익명사용자'로 set.
    if (sessionStorage.getItem('MEMBER_ID') === null) {
        setWhoLogin('익명사용자');
    } 
    else {
    // 이 값이 있을 경우 useState로 제어하는 isLogin의 값을 true로 전환하고 whoLogin을 로그인 한 유저의 ID값으로 변경한다.
        setIsLogin(true);
        setWhoLogin(sessionStorage.getItem('MEMBER_ID'));
    }
}, [])

  return (
    <>  
      <myContext.Provider value={ {isLogin, setIsLogin, whoLogin, setWhoLogin} }>
        <BrowserRouter>
            <Menubar/>
            <Routes>
              <Route path='/' element={<Main/>}/>
              <Route path='/api' element={<Callapi/>}/>
              <Route path='/todolist' element={<Todolist/>}/>
              <Route path='/board' element={<Board/>}/>
              <Route path='/boardview/:BOARD_NUMBER' element={<Boardview/>}/>
              <Route path='/member' element={<Member/>}/>
            </Routes>
        </BrowserRouter>
      </myContext.Provider>
    </>
  );
}

export default App;
