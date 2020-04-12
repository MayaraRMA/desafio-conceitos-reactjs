import React, { useState, useEffect } from 'react';
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Desafio ${Date.now()}`,
      url: "http://github.com/...", 
      techs: ["Node.js", "..."], 
      likes: 0 
    });
    
    const repositorie = response.data;

    setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`)

    if (response.status === 204) {
      const repositorieIndex = [...repositories].findIndex(repositorie => repositorie.id === id)

      if(repositorieIndex > -1) {
        let newRepositories = [...repositories]
        newRepositories.splice(repositorieIndex, 1);
        setRepositories([...newRepositories]);
      }
      
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => <li key={repositorie.id}>
          { repositorie.title }
          <button onClick={() => handleRemoveRepository(repositorie.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
