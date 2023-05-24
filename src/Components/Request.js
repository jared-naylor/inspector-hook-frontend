import requests from "../requests";

function Request({ setDisplay }) {
  function updateDisplay(event) {
    let string = event.target.textContent.split("/ ");
    let timeStamp = string[string.length - 1];
    let payload = requests.filter((obj) => obj[timeStamp])[0][timeStamp];
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
