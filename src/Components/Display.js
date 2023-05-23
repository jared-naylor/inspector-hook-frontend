function Display({ payload }) {
  return (
    <ul>
      {payload.map((data) => (
        <li>{data}</li>
      ))}
    </ul>
  );
}

export default Display;

///We just need to retrieve from the database
