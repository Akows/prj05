import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import Menubar from './pages/menubar';
import Main from './pages/main';
import Callapi from './pages/callapi';
import Todolist from './pages/todolist';
import Board from './pages/board';
import Member from './pages/member';

function App() {
  return (
    <>
      <BrowserRouter>
        <Menubar/>
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
