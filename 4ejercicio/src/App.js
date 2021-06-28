import { useEffect, useState } from "react";
import "./App.css";

function Cartas(props) {
  let cartas = props.cartas.map((carta, index) => {
    return (
      <div key={index} className="card">
        <img src={carta.imageUrl} alt={carta.name} />
        <h3>{carta.name}</h3>
        <h5>
          Tipo:{carta.type} | Coste: {carta.manaCost}
        </h5>
        <p>{carta.text}</p>
      </div>
    );
  });
  return <div className="tarjeta">{cartas}</div>;
}

function App() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [select, setSelect] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("https://api.magicthegathering.io/v1/sets")
      .then((res) => res.json())
      .then((res) => {
        setData(res.sets);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading2(true);
    fetch("https://api.magicthegathering.io/v1/cards?set=" + select)
      .then((res) => res.json())
      .then((datos) => {
        setData2(datos.cards);
        setLoading2(false);
      });
  }, [select]);

  const sets = data.map((set, index) => {
    return (
      <option key={index} value={set.code}>
        {set.name}
      </option>
    );
  });

  if (loading) {
    return <h1>Cargando.....</h1>;
  } else {
    return (
      <>
        <select
          key="select"
          onChange={(e) => {
            setSelect(e.target.value);
          }}
        >
          {sets}
        </select>
        {loading2 ? (
          <h1>Cargando.....</h1>
        ) : (
          <Cartas key="card" cartas={data2} />
        )}
      </>
    );
  }
}

export default App;
