import { useEffect, useState } from "react";
import "./App.css";

function Lista(props) {
  let listaFinal = props.pokemon.map((pokemito) => {
    return <li>{pokemito}</li>;
  });
  return <ul>{listaFinal}</ul>;
}

function App() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [select, setSelect] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/type")
      .then((res) => res.json())
      .then((datos) => setData(datos.results));
  }, []);

  useEffect(() => {
    fetch(select)
      .then((res) => res.json())
      .then((datos) => {
        let arrayPokemon = [];
        if (datos.pokemon.length >= 1) {
          for (let i = 0; i < 3; i++) {
            let rnd = Math.floor(Math.random() * datos.pokemon.length);
            arrayPokemon.push(datos.pokemon[rnd].pokemon.name);
          }
        } else {
          arrayPokemon.push(["No hay pokemon de este tipo"]);
        }
        setData2(arrayPokemon);
      });
  }, [select]);

  let tipos = data.map((tipo) => {
    return <option value={tipo.url}>{tipo.name}</option>;
  });

  return <select onChange={(e) => setSelect(e.target.value)}>{tipos}</select>;
}

export default App;
