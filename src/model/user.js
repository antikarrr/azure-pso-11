import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

name:{
type:String
},

avatar:{
type:String
},

email:{
type:String
},

salary:{
type:String
},

date:{
type:String
},

status:{
type:String
},

role:{
type:String,
default:"Staff"
},

managerName:{
type:String,
default:"-"
}

})

export default mongoose.models.User ||
mongoose.model(
"User",
UserSchema
)