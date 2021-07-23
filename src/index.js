const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.post("/repositories", (request, response) => {
  
  const { title, url, techs } = request.body

  
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.status(201).json(repository);
});


app.get("/repositories", (request, response) => {
 const {repository} = request;
 
  return response.json(repositories);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {likes, ...updatedRepository} = request.body;

 const repository = repositories.find(repository => repository.id === id);

  if (!repository) {
    return response.status(404).json({ error: "Repository not found" });
  }

  Object.assign(repository, updatedRepository);


  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

 
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex == -1) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  repository = repositories.find(repository => repository.id === id);

  if (!repository) {
    return response.status(404).json({ error: "Repository not found" });
  }

   repository.likes = repository.likes + 1;

  return response.json({likes: repository.likes});
});

module.exports = app;
