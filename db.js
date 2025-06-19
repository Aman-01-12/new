const mongoose=require("mongoose");
const schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;

const user=new schema({
    email:{type:String,unique:true},
    password:String,
    name:String
})


const todo=new schema({
    todo_name:String,
    done:Boolean,
    userId:ObjectId
})



const UserModel=mongoose.model('users',user);
const TodoModel=mongoose.model('todo',todo);


module.exports={
    UserModel:UserModel,
    TodoModel:TodoModel
}