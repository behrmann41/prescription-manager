var socket = io()

$('#chatform').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});

socket.on('chat message', function(msg){
  var textdiv = $("#messagewindow");
  var chatdiv = $("#chatwindow");
  $('#messages').append($('<li>').text(msg));
  textdiv.scrollTop(textdiv.prop('scrollHeight'));
});
