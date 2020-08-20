const express = require("express");
const cors = require("cors");
const { uuid } = require('uuidv4');

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/', (request, response) => {
  return response.json({ message: 'Repositories' });
});

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  //url = link para o github
  const repository = { id: uuid(), title, url, techs, likes: 0}

  repositories.push(repository);

  return response.json(repository);


});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  var { likes } = request.body;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.
  findIndex(repository => repository.id === id);

  if(repositoryIndex < 0) {
    return(response.status(400).json({error: 'Repository not found!'}));
  }

  if(likes > 0) {
    return(response.status(400).json({likes: repositories[repositoryIndex].likes}));
  }

  likes = repositories[repositoryIndex].likes;

  const repository = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.
  findIndex(repository => repository.id === id);

  if(repositoryIndex < 0) {
    return(response.status(400).json({error: 'Repository not found!'}));
  }

  repositories.splice(repositoryIndex, 1);

  
  return (response.status(204).send());
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.
  findIndex(repository => repository.id === id);

  if(repositoryIndex < 0) {
    return(response.status(400).json({error: 'Repository not found!'}));
  }

  repositories[repositoryIndex].likes++;

  return(response.json(repositories[repositoryIndex]));

});

module.exports = app;
