/** FEEDBACK: Great job! */
const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const fetchData = require('./utils');



console.log(process.env.API_KEY);

//set-up
const app = express();
const pathToDistFolder = path.join(__dirname, '../giphy-search/dist');



//controllers
const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

const serveStatic = express.static(pathToDistFolder);

const serveGifs = async (req, res, next) => {
  const API_URL = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=25&rating=g`;
  const [data, error] = await fetchData(API_URL);
  if (error) {
    console.log(error.message);
    return res.status(404).send(error);
  }
  res.send(data);
}

//endpoints
app.use(logRoutes);
app.use(serveStatic);
app.get('/api/gifs', serveGifs)



const port = 8080;
app.listen(port, () => {
  console.log(`Server is now running on http://localhost:${port}`);
});