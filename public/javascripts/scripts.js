$(function() {
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
      success: function (scription){
        $.ajax({
          type: 'GET',
          url: '/patients/' + scription.patientId + '/data',
          success: function (data){
            console.log(data, "GET REQUEST")
          },
          error: function (error){
            console.log('error', error)
          }
        })
        // $('#scriptlist').append('<section><p><strong>' + med + ': ' + '</strong>Prescribed By ' + doc + ' on ' + date + '</p></section>')
      },
      error: function (error){
        console.log('error', error)
      }
    })
  })
});
