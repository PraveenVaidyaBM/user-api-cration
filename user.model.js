var mongoose = require('mongoose');

const userSchema = mongoose.Schema({
userId:{type:Number, required:true},
name:{type:String, required:true},
email:{type:String, required:true},
profileImage:{type:String, required:true},
communicationAddress:{type:String, required:true},
locality:{type:String, required:true},
city:{type:String, required:true},
pin:{type:Number, required:true},
state:{type:String, required:true},
phoneNumber:{type:Number, required:true},
})

module.exports =mongoose.Schema('user',userSchema)


