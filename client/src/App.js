import axios from 'axios';
import { useEffect } from "react";
import './App.css';

function App() {

  const callApi = async () => {
    axios
    .get("/prj05/2")
    .then((res) =>
      console.log(res.data));
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
