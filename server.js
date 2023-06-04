const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors')
const mongoose = require('mongoose')
const axios = require('axios');

require('./app.js')
const uploader=require("./uploader")
const mongo_model=require("./mongo_model")
dotenv.config();
 
app.use(cors())
app.use(express.json({limit: '20mb'}))
app.use(express.urlencoded({ extended: false, limit: '20mb' }))
 
/* Initializing the path for routes */
app.post("/uploadCsv",uploader.upload.single("myFile"),async function (req, res) {
    console.log(req.file.path)

    // Define the Flask server endpoint
    const flaskEndpoint = 'http://127.0.0.1:5000/processCsv';
// Send the file to Flask
var jsonData
await axios.get(flaskEndpoint, { params: { file_path: req.file.path} })
  .then(async response => {
    console.log('File processed successfully!')
    console.log(response);
    await sendFilePathToDb(req.file.path,response.data.processed_file_path).then(val => {
      console.log(val)
    jsonData=response.data
  })
  })
  .catch(error => {
    console.error('Error processing file:', error);
  });
  console.log(jsonData)
  res.json(jsonData)
})

async function sendFilePathToDb(filePath,processedFilePath){
    /* Initializing the schema and putting in CRUDcreate */
    mongo_model.createData ({
        uploaded_filepath: filePath,
        processed_filepath:processedFilePath,
    });
 
    /* Try Catch */
 
}

/* Setting up server */
app.listen(process.env.PORT, function(){
    console.log("This server port is up and running ");
})
