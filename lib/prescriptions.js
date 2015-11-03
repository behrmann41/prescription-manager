var db = require('monk')('localhost/prescription-manager')
var Prescriptions = db.get('prescriptions')
var Patients = db.get('patients')

var Prescription = {
  insert: function(data){
    return Prescriptions.insert(data)
  },

  find: function (){
    return Prescriptions.find({})
  },

  findIn: function (id){
    return Prescriptions.find({ patientId: id })
  }
}

module.exports = Prescription 

// ,{sort : {_id:-1}}