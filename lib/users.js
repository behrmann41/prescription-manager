var db = require('monk')(process.env.MONGOLAB_URI || 'localhost/prescription-manager')
var Users = db.get('users')

var User = {

  find: function(){
    return Users.find({})
  },

  findById: function (id){
    return Users.findById(id)
  },

  findEmail: function (emailName){
    return Users.find({  email: emailName })
  },

  findOneEmail: function(emailName){
    return Users.findOne({ email: emailName })
  },

  insert: function (user, emailName, hash ){
    return Users.insert({username: user,
                        email: emailName,
                        passwordDigest: hash})
  },

  id: function (str){
    return Users.id(str)
  }
}

module.exports=User
