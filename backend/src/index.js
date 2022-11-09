const express = require('express');
const cors = require('cors');
const { uuid } = require('uuidv4')

let port = 3333;

const app = express();

app.use(cors());
app.use(express.json()); 


/**
 * Tipos de paramêtros
 * Query Params: Geralmente para filtros e paginação, por exemplo cursos/:disciplina?title=react os ?title é uma query param
 * Route Params: Geralmente para identificar recursos na hora de atualizar ou deletar, tipo projeto/:id o id é o route param
 * Request body: Tudo que vai no corpo da requisição, geralmente usado para posts e puts
 * 
 * Esses tipos de paramêtros podem ser usados em conjunto
 */

const projects = [];

app.get('/projects', (req, res) => {
  // return res.send('Hello World');
  // return res.json(projects)
  const { title } = req.query;

  console.log(req.query);

  const results = title
  ? projects.filter(project => project.title.includes(title))
  : projects

  return res.json(results);
});


app.post('/projects', (req, res) => {
 
  const {title, owner} = req.body;

  const project = { id: uuid(), title, owner }
  projects.push(project);

  return res.json(project);
})

app.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const {url, title, owner} = req.body;

  const projectIndex = projects.findIndex(project => project.id === id);

  if(projectIndex < 0) {
    return res.status(400).json({
      error: 'Project not found'
    })
  }


  const project = {
    id,
    title,
    owner
  }

  projects[projectIndex] = project;

  return res.json(project)
});

app.delete('/projects/:id', (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  if(projectIndex < 0) {
    return res.status(400).json({
      error: 'Project not found'
    })
  }

  projects.splice(projectIndex, 1);

  return res.send();
})

app.listen(port, () => {
  console.log(`App Listening to ${port}`)
})