import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])
  async function handleAddRepository() {
    const response = await api.post('repositories',
      {
        title: `Desafio ReactJS ${Date.now()}`,
        url: "https://github.com/eliakimnobre/desafio03-conceitos-reactjs",
        techs: ["NodeJS", "ReactJS", "PHP"]
      });
    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
      .then(setRepositories(repositories.filter(repository => repository.id !== id)))
  }

  return (
    <div>
      <button onClick={handleAddRepository}>Adicionar</button>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
