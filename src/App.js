import "./App.css";
import Display from "./Components/Display";
import { useEffect, useState } from "react";
import Request from "./Components/Request";
import requests from "./requests";
import { Table } from "react-bootstrap";
// import axios from "axios";

function App() {
  let [payloadData, setPayloadData] = useState([]);
  let [displayedPayload, setDisplayPayload] = useState();

  useEffect(() => {
    // let pathname = window.location.pathname;
    // console.log(pathname);
    // axios
    //   .get(`http://localhost:3001/`)
    //   .then((res) => res.json())
    //   .then((data) => setPayloadData(data.message))
    //   .catch((error) => {
    //     console.log(pathname + " doesn't exist");
    //   });
    setPayloadData(requests);
  }, []);

  return (
    <div className="container">
      <Request setDisplay={setDisplayPayload}></Request>;
      <Display payload={displayedPayload}></Display>
    </div>
  );
}

export default App;
