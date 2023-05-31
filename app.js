global.dbconn = "";
const dotenv = require('dotenv');

dotenv.config()
/* Connected the app with mongoose */
const mongoose = require('mongoose')

mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
).then( value => {
  console.log(value.connection.readyState);
}).catch(err => {
  console.log(err);
})