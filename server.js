const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors')
const mongoose = require('mongoose')

require('./app.js')
const uploader=require("./uploader")
const mongo_model=require("./mongo_model")
dotenv.config();
 
app.use(cors())
app.use(express.json({limit: '20mb'}))
app.use(express.urlencoded({ extended: false, limit: '20mb' }))
 
/* Initializing the path for routes */
app.post("/uploadCsv",uploader.upload.single("myFile"),async function (req, res) {
    res.send("Successfull upload of file")
    console.log(req.file.path)
    await sendFilePathToDb(req.file.path).then(val => {
        console.log(val)
    })
})

async function sendFilePathToDb(filePath){
    /* Initializing the schema and putting in CRUDcreate */
    mongo_model.createData ({
        uploaded_filepath: filePath,
    });
 
    /* Try Catch */
 
}

/* Setting up server */
app.listen(process.env.PORT, function(){
    console.log("This server port is up and running ");
})

const fileAddress = 'filePath';
const fileData = fs.readFileSync(fileAddress);

// Create form data
const formData = new FormData();
formData.append('file', fileData, {
  filename: 'file.txt',
});

// Define the Flask server endpoint
const flaskEndpoint = 'http://flask-server:5000/upload';

// Send the file to Flask
axios.post(flaskEndpoint, formData, {
  headers: formData.getHeaders(),
})
  .then(response => {
    console.log('File uploaded successfully!');
  })
  .catch(error => {
    console.error('Error uploading file:', error);
  });

