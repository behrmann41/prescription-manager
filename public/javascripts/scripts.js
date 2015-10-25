$(function() {
  function loadPrescriptions (){
    $.getJSON('/prescriptions/data', function (prescriptions){
        $('#scriptlist').html('');
        prescriptions.forEach(function(script){
          var med = script.medication,
              doc = script.doctor,
              date = script.date,
              id = script.patientId,
              url = $(location).attr('pathname'),
              path;
          path = url.split('patients/')
          if (path[1] === id){
            $('#scriptlist').append('<section><p><strong>' + med + ': ' + '</strong>Prescribed By ' + doc + ' on ' + date + '</p></section>')
          }
        })
    })
  }
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
  loadPrescriptions()
});
