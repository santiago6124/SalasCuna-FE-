import React, { useState, useEffect } from "react";
import axios from "axios";
function SearchComponent() {

  const [chico, setChico] = useState([]);
  const [search, setSearch] = useState("");

  const URL = "/api/child/";

  async function showData() {
    const response = await axios.get(URL);
    const data = await response.data;
    //console.log(data)
    setChico(data);
  }
  //función de búsqueda
  function searcher(e) {
    setSearch(e.target.value);
  }

  const results = !search
    ? chico
    : chico.filter((dato) => dato.name.toLowerCase().includes(search.toLocaleLowerCase())
    );

  useEffect(() => {
    showData();
  }, []);

  //renderizamos la vista
  return (
    <div>
      <input
        value={search}
        onChange={searcher}
        type="text"
        placeholder="Search"
        className="form-control" />
      <table className="table table-striped table-hover mt-5 shadow-lg">
        <thead>
          <tr className="bg-curso text-white">
            <th>Nombre</th>
            <th>Apellido</th>
          </tr>
        </thead>
        <tbody>
          {results.map((user) => (
            <tr key={user.id}>
              <td>{chico.name}</td>
              <td>{chico.apellido}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default SearchComponent;
