import "./App.css";
import Display from "./Components/Display";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  let [payloadData, setPayloadData] = useState([]);

  useEffect(() => {
    axios("get", window.location.href)
      .then((res) => res.json())
      .then((data) => setPayloadData(data.message));
  }, []);

  return <Display payload={payloadData}></Display>;
}

export default App;
