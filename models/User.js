const mongose = require('mongoose');
const Shema = mongose.Schema;

const UserSchema = new Shema({
    username:{
        type:String,
        unique:true,
        unique:true
    },
    password:{
        type:String,
        minlength:5
    }    
});
module.exports=mongose.model('user', UserSchema);