import { useEffect, useState } from "react";

import PayloadDetails from "./components/PayloadDetails";
import PayloadList from "./components/PayloadList";
import "./App.css";

import binService from './services/bin';

function App() {
  let [payloads, setPayloads] = useState([]);
  let [displayedPayload, setDisplayPayload] = useState();

  let pathname = window.location.pathname;
  let dirs = pathname.split('/')
  let uuid = dirs[dirs.length-1]

  useEffect(() => {
    (async () => {
      try {
        let data = await binService.getAllPayloads(uuid);
        setPayloads(data);
      } catch {
        console.log("Couldn't fetch payloads");
      }
    })();
  }, [uuid]);

  return (
    <div className="container">
      <PayloadList
        setDisplayPayload={setDisplayPayload}
        payloads={payloads}
      ></PayloadList>
      <PayloadDetails payload={displayedPayload}></PayloadDetails>
    </div>
  );
}

export default App;
