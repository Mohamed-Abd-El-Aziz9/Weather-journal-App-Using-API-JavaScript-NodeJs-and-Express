
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
/*	
Node and Express should be installed on the local machine.
The project file server.js should require express(), 
and should create an instance of their app using express. */
const express = require('express')
const app = express();

//The ‘cors’ package should be installed in the project from the command line, required in the project file server.js, and the instance of the app should be setup to use cors().

const cors = require('cors');
const bodyParser = require('body-parser');

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// Cors for cross origin allowance

//The Express app instance should be pointed to the project folder with .html, .css, and .js files.
app.use(express.static('website'));


// Setup Server
// Local server should be running and producing feedback to the Command Line through a working callback function.
// here I used a listen function to run the local server and print some words on terminal to insure that the server is work fine!
const port = 3000;
app.listen(port, () => {
    console.log(`Stuff Worked! you on => localhost:${port}`)
})
app.post('/SaveData', (req, res) => {
    projectData = {...req.body}
    res.send()
})
app.get('/GetData', (req, res) => {
    res.send(projectData)
})


