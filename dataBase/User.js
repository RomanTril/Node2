const {Schema,model}=require('mongoose');

const userSchema=new Schema({
    name:{type:String, require:true, default:''},
    email:{type:String,require:true,trim:true,lowercase:true,unique:true},
    password:{type:String},
    age:{type:Number,default: 18}
},{
    timestamps:true
})

module.exports=model('User',userSchema)