import React from "react";

import "./styles.css";
import api from "./services/api";
import { useState } from "react";
import { useEffect } from "react";

function App() {

  const [repositories, setRepository] = useState([])

  useEffect(()=>{
    api.get('repositories').then(response => {
      setRepository(response.data)
    })
  },[])
  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: `Novo Repositorio ${Date.now()}`,
      url:'http://www.com.br',
      techs:'[]'
    })

    const repositorio = response.data
    setRepository([...repositories,repositorio])
    
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`)
    setRepository(repositories.filter(repo => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
        <li  key={repository.id}>
        {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
