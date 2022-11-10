import React, {useState, useEffect} from 'react';
import api from './services/api'

import Header from './components/Header';
import './App.css'

/**
 *  Conceitos mais importantes
 * Componente
 * Propriedade
 *  . Alguma informação que podemos passar de um componente pai para um componente filho, por exemplo passar do componente
 *  App para o componente Header
 * Estado & Imutabilidade
 * .  
 * 
 
 */

export function App() {
  /* useState retorna um array com 2 posições
  
  1 Variável com seu valor inicial
  2. Função para atualizarmos esse valor

  */

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data)
    });
  }, [])

  async function handleAddProject() {

    const response = await api.post('projects', {
      title: `New Project ${Date.now()}`,
      owner: 'Caio Ceretta'
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="Projects" />

      <ul>
        {projects.map((project) => <li key={project.id}>{project.title}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Add Project</button>
    </>
  )
}

export default App;