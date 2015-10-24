$(function() {
  function loadPrescriptions (){
    $.getJSON('/prescriptions/data', function (prescriptions){
        $('#tbody').html('');
        prescriptions.forEach(function(script){
          var med = script.medication,
              doc = script.doctor,
              date = script.date
          $('#tbody').append('<tr><td>' + med + '</td><td>' + doc + '</td><td>' + date + '</td></tr>')
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
        $('#tbody').append('<tr><td>' + data.medication + '</td><td>' + data.doctor + '</td><td>' + data.date + '</td></tr>')
      },
      error: function (error){
        console.log('error', error)
      }
    })
  })
  loadPrescriptions()
});
