var db = require('monk')('localhost/prescription-manager')
var Medications = db.get('medications')

var Medication = {
  find: function(){
    return Medications.find({})
  },

  insert: function(name){
    return Medications.insert({name: name})
  },

  findById: function(id){
    return Medications.findById(id)
  },

  findOne: function(name){
    return Medications.findOne({name: name})
  },

  id: function (str){
    return Medications.id(str)
  },

  findIdsIn: function(Ids){
    return Medications.find({_id: {$in: Ids }})
  }
}

module.exports = Medication