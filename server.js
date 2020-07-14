// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
var express = require('express');

// Start up an instance of app
var app = express();
var cors = require('cors');
const port = 8000;
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

app.use(express.static('website'));


// Setup Server

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

app.get('/all', function(request,response){
    response.send(projectData);
});

app.post('/send', function(request,respose){
    const data=request.body;
    userData={
    temperature:data.temperature,
    date:data.date,
    resposeData:data.responseData
    };
    projectData.unshift(userData);
});