const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://moviUser:abc123@ds243344.mlab.com:43344/movi-api',{ useNewUrlParser: true });
  
    mongoose.connection.on('open', () => {
        // console.log('MongoDB: Connected');
      });
      mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Error', err);
      });
    
      mongoose.Promise = global.Promise;
    };