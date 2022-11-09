const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid, v4 } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(201).json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, techs, url} = request.body;

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
  
  return response.json(repository)

});

app.put("/repositories/:id", (request, response) => {
  
  const { id } = req.

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
