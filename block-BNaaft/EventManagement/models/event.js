var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var eventSchema=new Schema({
    title:{type:String,required:true},
    summary:String,
    host:String,
    start_date:{type:Date},
    end_date:{type:Date},
    category:[{type:String}],
    location:String,
    likes:{type:Number,default:0},
    dislikes:{type:Number,default:0},
    remarks:[{type:Schema.Types.ObjectId,ref:'Remark'}],
    categoryId:[{type:Schema.Types.ObjectId,ref:'Category'}],
    locationId:{type:Schema.Types.ObjectId,ref:'Location'},

},{timestamps:true});


module.exports=mongoose.model('Event',eventSchema);





