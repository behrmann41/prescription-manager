var db = require('monk')('localhost/prescription-manager')
var Users = db.get('users')

var User = {

  find: function(){
    return Users.find({})
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
  }
}

module.exports=User
