const User = require("../dataBase/User");
module.exports={

    createUser: async (userInfo)=>{

         return User.create(userInfo)
    },

    findByParams:async (filter={})=>{
        return User.find(filter)
    },

    findOneByParams:async (filter={})=>{
        return User.findOne(filter)
    },

    updateOne:async (userId,newUserInfo)=>{
        return User.findByIdAndUpdate(userId,newUserInfo)
    },

    delete:async (userId)=>{
      return User.deleteOne({_id:userId})
    }
}