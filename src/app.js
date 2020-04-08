const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const newProject = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(newProject);

  return response.status(200).json(newProject);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repoIndex = repositories.findIndex(repository => repository.id === id);

  if( repoIndex < 0){
    return response.status(400).json({ error: 'Repository not found.'});
  }

  repoToUpdate = {
    id,
    title,
    url,
    techs,
    likes: repositories[repoIndex].likes
  };

  repositories[repoIndex] = repoToUpdate;

  return response.status(200).json(repoToUpdate);

});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repoIndex = repositories.findIndex( repository => repository.id === id );

  if( repoIndex < 0 ){ 
    return res.status(400).json({ error: 'Repository not found.'});
  }

  repositories.splice(repoIndex, 1);

  return res.status(204).send();


});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  // const { likes } = request.body;

  const repoIndex = repositories.findIndex(repository => repository.id === id);

  if( repoIndex < 0 ){
    return response.status(400).json({ error: 'Repository not found.'});
  }

  const numberOfLikes = repositories[repoIndex].likes += 1;

  const likes = {
    likes: numberOfLikes
  }

  return response.status(200).json(likes);


});

module.exports = app;
