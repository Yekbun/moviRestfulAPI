const mongoose =require('mongoose');
const Shema = mongoose.Schema;

const DirectorShema=new Shema({
    name:String,
    surname:String,
    bio:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('director', DirectorShema);