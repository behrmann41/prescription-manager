$(function() {
  function loadPrescriptions (){
    $.getJSON('/prescriptions/data', function (prescriptions){
        $('#tbody').html('');
        prescriptions.forEach(function(script){
          var med = script.medication,
              doc = script.doctor,
              date = script.date
          $('#scriptlist').append('<section><p><strong>' + med + ': ' + '</strong>Prescribed By ' + doc + ' on ' + date + '</p></section>')
        })
    })
  }
  $('#addscript').on('click', function(){
    event.preventDefault();
    var med = $('#medication').val(),
        doc = $('#doctor').val(),
        date = $('#date').val()

    var prescription = {medication: med, doctor: doc, date: date }
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
