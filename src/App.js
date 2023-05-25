import { useEffect, useState } from "react";

import PayloadDetails from "./components/PayloadDetails";
import PayloadList from "./components/PayloadList";
import "./App.css";

import binService from "./services/bin";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function App() {
  let [binIds, setBinIds] = useState([]);
  let [payloads, setPayloads] = useState([]);
  let [displayedPayload, setDisplayPayload] = useState();
  let [url, setUrl] = useState();

  // let pathname = window.location.pathname;
  // let dirs = pathname.split("/");
  // let uuid = dirs[dirs.length - 1];

  async function onSelect(event) {
    let uuid = event.target.value;
    try {
      let data = await binService.getAllPayloads(uuid);
      setPayloads(data);
    } catch (error) {
      console.log("Couldn't fetch payloads");
    }
  }

  async function createURL(event) {
    try {
      let data = await binService.createBin();
      setUrl(data);
    } catch (error) {
      console.log("URL not created");
    }
  }

  useEffect(() => {
    (async () => {
      try {
        let data = await binService.getAllBins();
        console.log(data);
      } catch {
        console.log("Couldn't fetch payloads");
      }
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       let data = await binService.getAllPayloads(uuid);
  //       setPayloads(data);
  //     } catch {
  //       console.log("Couldn't fetch payloads");
  //     }
  //   })();
  // }, [uuid]);

  return (
    <div className="container">
      <PayloadList
        setDisplayPayload={setDisplayPayload}
        payloads={payloads}
      ></PayloadList>
      <PayloadDetails payload={displayedPayload}></PayloadDetails>
      <Form.Select aria-label="Default select example" onChange={onSelect}>
        <option></option>
        <option value="abc123">One</option>
      </Form.Select>
      <Button onClick={createURL}>Create URL</Button>
      {url && <span>{url}</span>}
    </div>
  );
}

export default App;
