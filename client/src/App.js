import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './App.css';

import Menubar from './pages/menubar';
import Main from './pages/main';
import Callapi from './pages/callapi';
import Todolist from './pages/todolist';
import Board from './pages/board';
import Member from './pages/member';

function App() {

  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
      // sessionStorage에 Item으로 담겨진 로그인 값을 검증.
      // 로그인 값의 이름은 'MEMBER_ID', 이 값이 없을(null) 경우 아무 일도 일어나지 않는다.
      if (sessionStorage.getItem('MEMBER_ID') === null) {
          console.log('isLogin ?? :: ', isLogin)
      } 
      else {
      // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 있다면
      // 로그인 상태 변경
          setIsLogin(true)
          console.log('isLogin ?? :: ', isLogin)
      }
  }, [isLogin])

  return (
    <>
      <BrowserRouter>
        <Menubar isLogin={isLogin}/>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/api' element={<Callapi/>}/>
          <Route path='/todolist' element={<Todolist/>}/>
          <Route path='/board' element={<Board/>}/>
          <Route path='/member' element={<Member/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
