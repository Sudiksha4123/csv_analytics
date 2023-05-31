const mongoose = require('mongoose');
 
/**
 * Creating the schema with username, identifier,
   firstName, lastName and updated
 */
const csvInDb = new mongoose.Schema({
    uploaded_filepath: {
        type: String,
        required:true,
        default: "hello",
    },
    processed_filepath: {
      type: String,
      required:false,
  },
});

const csvModel = mongoose.model('csvInDb', csvInDb);
/**
 * Exporting schema with collection as csvInDb
 */      
module.exports={
     createData:async function(inputData, callback){
        try{
          userData= new csvModel(inputData);
          await userData.save();
        } catch(err) {
          throw err;
        }
        console.lo
     }
}