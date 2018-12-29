const mongoose =require('mongoose');
const Shema = mongoose.Schema;

const MovieShema=new Shema({
    director_id:Shema.Types.ObjectId,
    title:{
        type:String,
        required:[true, "`{PATH}` alani zorunludur"],
        maxlength:[100,"`{PATH}` alani alani maksimum 15 olmalidir"],
        minlength:1
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