projectData = {};

const express = require('express');
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('website'));

const port = 3000;

const server = app.listen(port, listening);

function listening(){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
}

app.post('/push', callBack);

function callBack(req,res){
  console.log(req.body);

  projectData.date = req.body.date;
  projectData.temp = req.body.temp;
  projectData.content = req.body.content;
}

app.get('/pull', (request, response)=> {
  response.send(projectData);
});
