// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
port = 8080;
app.listen(port, function() {
    console.log(`Server running at localhost: ${port}`);
});

// GET Route
app.get('/all', function(req, res) {
    res.send(projectData);
})

// POST Route
app.post('/add', addData);
function addData(req, res) {
    projectData['date'] = req.body.date;
    projectData['temp'] = req.body.temp;
    projectData['feeling'] = req.body.content;
    return projectData;
}