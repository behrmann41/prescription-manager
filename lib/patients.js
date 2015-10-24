var db = require('monk')('localhost/prescription-manager')
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
  }
}

module.exports = Patient