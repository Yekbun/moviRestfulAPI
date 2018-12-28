const mongoose =require('mongoose');
const Shema = mongoose.Schema;

const MovieShema=new Shema({
    directorId:Shema.Types.ObjectId,
    title:{
        type:String,
        required:true
    },
    category:String,
    country:String,
    year:Number,
    imdb_score:Number,
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('movie', MovieShema);