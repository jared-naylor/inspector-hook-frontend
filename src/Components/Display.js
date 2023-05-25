function Display({ payload }) {
  function idColumn(key) {
    return key.indexOf("id") != -1 ? "green" : "red";
  }

  if (payload) {
    return (
      <div className="payload">
        <ul>
          {Object.keys(payload).map((key, index) => (
            <li key={index}>
              {key} : <span className={idColumn(key)}>{payload[key]}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Display;

///We just need to retrieve from the database
