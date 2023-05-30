const express = require("express")
const path = require("path")
const multer = require("multer")
const request = require('request');
const app = express();
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
app.use(express.json());


var storage = multer.diskStorage({
  destination: function (req, file, cb) {

      // Uploads is the Upload_folder_name
      cb(null, "uploads")
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now()+".jpg")
  }
})
     
// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional
const maxSize = 1 * 1000 * 1000;
  
var upload = multer({ 
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb){
  
      // Set the filetypes, it is optional
      var filetypes = /jpeg|jpg|png/;
      var mimetype = filetypes.test(file.mimetype);

      var extname = filetypes.test(path.extname(
                  file.originalname).toLowerCase());
      
      if (mimetype && extname) {
          return cb(null, true);
      }
    
      cb("Error: File upload only supports the "
              + "following filetypes - " + filetypes);
    } 

// mypic is the name of file attribute
}).single("mypic");       

app.get("/",function(req,res){
 console.log("yo")
})
  
app.post("/uploadProfilePicture",function (req, res, next) {
      
  // Error MiddleWare for multer file upload, so if any
  // error occurs, the image would not be uploaded!
  upload(req,res,function(err) {

      if(err) {

          // ERROR occurred (here it can be occurred due
          // to uploading image of size greater than
          // 1MB or uploading different file type)
          res.send(err)
      }
      else {

          // SUCCESS, image successfully uploaded
          res.send("Success, Image uploaded!")
      }
  })
})
app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});

const PORT = 3000;

app.get('/home', function(req, res) {
    request('http://127.0.0.1:5000/flask', function (error, response, body) {
        console.error('error:', error); // Print the error
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the data received
        res.send(body); //Display the response on the website
      });      
});

app.listen(PORT, function (){ 
    console.log('Listening on Port 3000');
});  
