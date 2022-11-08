const { response } = require('express');
const express = require('express');

let port = 3333;

const app = express();

app.use(express.json()); 

/**
 * Tipos de paramêtros
 * Query Params: Geralmente para filtros e paginação, por exemplo cursos/:disciplina?title=react os ?title é uma query param
 * Route Params: Geralmente para identificar recursos na hora de atualizar ou deletar, tipo projeto/:id o id é o route param
 * Request body: Tudo que vai no corpo da requisição, geralmente usado para posts e puts
 * 
 * Esses tipos de paramêtros podem ser usados em conjunto
 */

app.get('/projects', (req, res) => {
  // return res.send('Hello World');
  return res.json({
    msg: 'Hello GoStack'
  })
})


app.post('/projects', (req, res) => {
  return response.json([
    'project1',
    'project2',
    'project3',
  ])
})

app.listen(port, () => {
  console.log(`App Listening to ${port}`)
})