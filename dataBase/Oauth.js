const {Schema,model}=require('mongoose');


const OauthSchema=new Schema({
    _user_id:{type:Schema.Types.ObjectId, ref:'User'},
    accessToken:{type: String},
    refreshToken:{type:String}

},{
    timestamps:true
})

module.exports=model('O_Auth',OauthSchema)