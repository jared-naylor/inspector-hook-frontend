import requests from "../requests";
import { Table } from "react-bootstrap";

function Request({ setDisplay }) {
  function removeSelected() {
    [...document.querySelectorAll("li.http")].forEach((li) =>
      li.classList.remove("selected")
    );
  }
  function updateDisplay(event) {
    removeSelected();
    let string = event.target.textContent.split("/ ");
    let timeStamp = string[string.length - 1];
    let payload = requests.filter((obj) => obj[timeStamp])[0][timeStamp];
    event.target.classList.add("selected");
    setDisplay(payload);
  }
  return (
    <ul className="request">
      {requests.map((request, index) => (
        <li key={index} onClick={updateDisplay} className="http">
          HTTP POST / {Object.keys(request)[0]}
        </li>
      ))}
    </ul>
  );
}

export default Request;
