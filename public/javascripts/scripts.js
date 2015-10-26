$(function() {
  $('#addscript').on('click', function(){
    event.preventDefault();
    var med = $('#medication').val(),
        doc = $('#doctor').val(),
        date = $('#date').val(),
        id,
        url = $(location).attr('pathname');

    id = url.split('patients/')
    var prescription = {medication: med, doctor: doc, date: date, patientId: id[1]}
    $.ajax({
      type: 'POST',
      url: '/prescriptions/new',
      dataType: 'JSON',
      data: prescription,
      success: function (data){
        $('#scriptlist').append('<section><p><strong>' + med + ': ' + '</strong>Prescribed By ' + doc + ' on ' + date + '</p></section>')
      },
      error: function (error){
        console.log('error', error)
      }
    })
  })
});
