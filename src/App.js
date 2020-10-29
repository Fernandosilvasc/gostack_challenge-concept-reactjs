import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api
      .get("/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/projects", {
      title: `Front-end with ReactJS ${Date.now()}`,
      owner: "Fernando Correa da Silva"
    })
    
    const project = response.data;
    setProjects([...projects, project])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`projects/${id}`);

    setProjects(projects.filter(project => project.id !== id))
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {projects.map(({ id, title }) => (
          <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
