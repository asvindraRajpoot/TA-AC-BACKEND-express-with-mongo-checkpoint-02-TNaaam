var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var categorySchema=new Schema({
    category:{type:String,required:true},
    eventId:[{type:Schema.Types.ObjectId,required:true,ref:'Event'}],
})

module.exports=mongoose.model('Category',categorySchema);