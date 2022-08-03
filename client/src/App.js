import axios from 'axios';
import { useEffect } from "react";
import './App.css';

function App() {

  const callApi = async () => {
    axios
    .get("/prj05")
    .then((res) =>
      console.log(res.data.test));
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div className="App">
      <div>test</div>
    </div>
  );
}

export default App;
