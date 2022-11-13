const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid, v4 } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  return res.status(201).json(repositories);
});

app.post("/repositories", (req, res) => {
  const {title, techs, url} = req.body;

  // url: "https://github.com/Rocketseat/umbriel",
  // title: "Umbriel",
  // techs: ["Node", "Express", "TypeScript"],
  // likes: 0

  const repository = {
    id: uuid(),
    url,
    title,
    techs,
    likes: 0
  }

  repositories.push(repository);
  
  return res.json(repository)

});

app.put("/repositories/:id", (req, res) => {
  
  const { id } = req.params;
  const { url, title, techs } = req.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0) {
    return res.status(400).send("Repository not found");
  }

  const repository = {
    ...repositories[repositoryIndex],
    url,
    title,
    techs
  }

  repositories[repositoryIndex] = repository;

  
  return res.json(repository);
  
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0) {
    return res.status(400).json({error: "Repository not found"});
  }

  repositories.splice(repositoryIndex, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0) {
    return res.status(400).json({error: "Repository not found"});
  }

  repositories[repositoryIndex].likes++;

  return res.status(200).json(repositories[repositoryIndex]);
});

module.exports = app;
