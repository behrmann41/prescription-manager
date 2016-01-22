var socket = io()

$('#chatform').submit(function(){
  var name = $('.dropdown-menu li:first-child a').text();
  socket.emit('chat message', $('#m').val(), name);
  $('#m').val('');
  return false;
});

socket.on('chat message', function(msg, personname){
  var textdiv = $("#messagewindow");
  $('#messages').append($('<li>').text(personname + " says " + msg));
  textdiv.scrollTop(textdiv.prop('scrollHeight'));
});
