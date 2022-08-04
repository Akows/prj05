import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import Main from './pages/main';
import Board from './pages/board';

function App() {

  // const callApi = async () => {
  //   axios
  //   .get("/prj05/2")
  //   .then((res) =>
  //     console.log(res.data));
  // };

  // useEffect(() => {
  //   callApi();
  // }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Main/>}/>

          <Route path='/board' element={<Board/>}/>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
