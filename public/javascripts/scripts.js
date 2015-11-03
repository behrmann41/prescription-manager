$(function() {

  function loadPrescriptions (id){
    $.getJSON('/patients/' + id + '/data', function (data){
      $('#scriptlist').html('')
      for (var i = 0; i < data.length; i++){
        var date = data[i].date;
        var med = data[i].name;
        var doctor = data[i].user
        $('#scriptlist').append('<section><p><strong>' + med + ': ' + '</strong>Prescribed By ' + doctor + ' on ' + date + '</p></section>')
      }
    })
  }
  var currentUrl = $(location).attr('pathname')

  if (currentUrl.match('/patients/')) {
    var number = currentUrl.split('patients/')
    loadPrescriptions(number[1])
  }
  $('#addscript').on('click', function(){
    event.preventDefault();
    var med = $('#drug').val(),
        doc = $('#doctor').val(),
        date = $('#date').val(),
        id,
        url = $(location).attr('pathname');

    id = url.split('patients/')

    var prescription = {medicationId: med, userId: doc, date: date, patientId: id[1]}
    $.ajax({
      type: 'POST',
      url: '/prescriptions',
      dataType: 'JSON',
      data: prescription,
      success: function (prescriptionData){
        loadPrescriptions(prescriptionData.patientId)
      //   $.ajax({
      //     type: 'GET',
      //     url: '/patients/' + prescriptionData.patientId + '/data',
      //     success: function (data){
      //       console.log(data, "GET REQUEST")
      //     },
      //     error: function (error){
      //       console.log('error', error)
      //     }
      //   })
      //   // $('#scriptlist').append('<section><p><strong>' + med + ': ' + '</strong>Prescribed By ' + doc + ' on ' + date + '</p></section>')
      },
      error: function (error){
        console.log('error', error)
      }
    })
  })
});
