var db = require('monk')('localhost/prescription-manager')
var Prescriptions = db.get('prescriptions')

var Prescription = {
  insert: function(med, doc, date){
    return Prescriptions.insert({ medication: med,
                                  doctor: doc,
                                  date: date
                                })
  },

  find: function (){
    return Prescriptions.find({})
  }
}

module.exports = Prescription 