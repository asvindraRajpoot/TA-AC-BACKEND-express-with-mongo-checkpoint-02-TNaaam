var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var locationSchema=new Schema({
    location:{type:String,required:true},
    eventId:[{type:Schema.Types.ObjectId,required:true,ref:'Event'}],
})

module.exports=mongoose.model('Location',locationSchema);