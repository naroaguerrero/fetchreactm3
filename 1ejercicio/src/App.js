import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [url, setUrl] = useState("https://rickandmortyapi.com/api/character/");
  const [respuesta, setRespuesta] = useState([]);
  const [next, setNext] = useState("");
  const [anterior, setAnterior] = useState("");

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((datos) => {
        setNext(datos.info.next);
        setAnterior(datos.info.anterior);
        setRespuesta(datos.results);
      });
  }, [url]);

  let personajes = respuesta.map((personaje, index) => {
    if (index <= 9) {
      return (
        <div className="card" key={index}>
          <img src={personaje.image} alt=""></img>
          <h2>{personaje.name}</h2>
        </div>
      );
    }
  });

  return (
    <>
      <div id="tarjeta">{personajes}</div>
      <button
        onClick={() =>
          anterior !== null
            ? setUrl(anterior)
            : setUrl("https://rickandmortyapi.com/api/character/")
        }
      >
        Anterior
      </button>
      <button onClick={() => setUrl(next)}>Siguiente</button>
    </>
  );
}

export default App;
