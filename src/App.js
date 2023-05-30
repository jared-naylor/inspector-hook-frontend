import { useEffect, useState } from "react";
import PayloadDetails from "./components/PayloadDetails";
import PayloadList from "./components/PayloadList";
import "./App.css";
import NewURL from "./components/newUrl";
import binService from "./services/bin";
import { io } from "socket.io-client";

// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";

const Domain = "http://localhost:3003";// production = "https://psh.pp.ua/"

const socket = io(Domain);

const DisplayPath = ({ uuid }) => {
  return <h2>Current Endpint: {Domain + uuid}</h2>;
};

function App() {
  let [binIds, setBinIds] = useState([]);
  let [payloads, setPayloads] = useState([]);
  let [displayedPayload, setDisplayPayload] = useState();
  let [uuid, setUuid] = useState("");

  useEffect(() => {
    (async () => {
      try {
        let data = await binService.getAllBins();
        setBinIds(data.map((pair) => pair["endpoint"]));
      } catch {
        console.log("Couldn't fetch payloads");
      }
    })();
  }, []);

  async function onSelect(event) {
    const ul = event.target.parentNode;
    const selected = ul.querySelector(".selected-bin");
    if (selected) {
      selected.classList.remove("selected-bin");
    }
    event.target.classList.add("selected-bin");
    let uuid = event.target.textContent;
    setPayloads([]);
    setDisplayPayload();
    setUuid(uuid);
    if (uuid) {
      try {
        let data = await binService.getAllPayloads(uuid);
        setPayloads(data);
      } catch (error) {
        console.log("Couldn't fetch payloads");
      }
    }
  }

  // receive a message from the server
  socket.on("webhook received", async (data) => {
    if (uuid === data) {
      let data = await binService.getAllPayloads(uuid);
      setPayloads(data);
    }
  });

  socket.on("new bin", async () => {
    (async () => {
      try {
        let data = await binService.getAllBins();
        setBinIds(data.map((pair) => pair["endpoint"]));
      } catch {
        console.log("Couldn't fetch payloads");
      }
    })();
  });

  return (
    <div className="wrapper">
      <header>
        <h1>NRecall Bin</h1>
      </header>
      <div className="container">
        <aside>
          <NewURL domain={Domain} />
          <div className="bin-list">
            <ul name="uuids">
              {binIds.map((bin) => {
                return (
                  <li key={bin} onClick={onSelect}>
                    {bin}
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
        <main>
          <DisplayPath uuid={uuid} />
          <div className="payload_container">
            <PayloadList
              setDisplayPayload={setDisplayPayload}
              payloads={payloads}
            ></PayloadList>
            <PayloadDetails payload={displayedPayload}></PayloadDetails>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
