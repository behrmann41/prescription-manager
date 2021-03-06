var db = require('monk')(process.env.MONGOLAB_URI || 'localhost/prescription-manager')
var Patients = db.get('patients')

var Patient = {
  insert: function(first,last,date){
    return Patients.insert({firstname: first,
                            lastname: last,
                            DoB: date
                          })
  },

  find: function(){
    return Patients.find({})
  },

  findOne: function(id) {
    return Patients.findOne({_id: id})
  },

  update: function(id, doctorId){
    return Patients.update({_id: id }, {$set: {doctor: doctorId}})
  },

  findById: function(id){
    return Patients.findById(id)
  },

  findIn: function (id){
    return Patients.find({ _id: id })
  },

  id: function (str){
    return Patients.id(str)
  }
}

module.exports = Patient
