var db = require('monk')(process.env.MONGOLAB_URI || 'localhost/prescription-manager')
var appointments = db.get('appointments')

var Appointment = {
  insert: function (userId, patientId){
    return appointments.insert({userId: userId, patientId: patientId})
  },

  find: function (userId){
    return appointments.find({userId: userId})
  }
}

module.exports = Appointment
