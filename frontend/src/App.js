import React, {useState} from 'react';
import Header from './components/Header';

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

  const [projects, setProjects] = useState(['App Development', 'Front-end App']);

  function handleAddProject() {
    // projects.push(`New Project ${Date.now()}`);

    setProjects([...projects, `New Project ${Date.now()}`]);

    console.log(projects)
  }

  return (
    <>
      <Header title="Projects" />

      <ul>
        {projects.map(project => <li key={project}>{project}</li>)}
      </ul>

      <button type='button' onClick={handleAddProject}>Add Project</button>
    </>
  )
}

export default App;