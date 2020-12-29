//window.alert('hello');

var socket = io();
var details = {
  teamName: localStorage.teamName
}
socket.emit('join room',details);

function sendMessage(){
  var msg = document.getElementById('msg');
  var chatBox = document.getElementById('chatBox');

  chatBox.innerHTML += '<br><left><strong>'+ localStorage.teamName + ':</strong> '+ msg.value + '<br></left>';
  chatBox.animate({ scrollTop: chatBox.scrollHeight}, 1000);
  var data = {
    teamName: localStorage.teamName,
    messages: {
      time: Number(new Date().getTime()),
      message: msg.value,
      sender: true  //true for user;
    }
  }
  socket.emit('sendMessage',data);
}

socket.on('recieveMessage',function(data){
  console.log('data recived from recieve message is: ',data);
  console.log('inside recieveMessage');
  var msg = document.getElementById('msg');
  var chatBox = document.getElementById('chatBox');
  if(Array.isArray(data.messages)){
    for(var i=0;i<data.messages.length;i++){
      if(data.messages[i].sender == true){
        chatBox.innerHTML += '<br><left><strong>'+ localStorage.teamName + ':</strong> '+ data.messages[i].message + '<br></left>';
      }
      else{
        chatBox.innerHTML += '<br><left><strong>'+ 'ADMIN' + ':</strong> '+ data.messages[i].message + '<br></left>';
      }
    }
  }
  else{
    if(data.messages.sender == true){
      chatBox.innerHTML += '<br><left><strong>'+ localStorage.teamName + ':</strong> '+ data.messages.message + '<br></left>';
    }
    else{
      chatBox.innerHTML += '<br><left><strong>'+ 'ADMIN' + ':</strong> '+ data.messages.message + '<br></left>';
    }
  }
  chatBox.animate({ scrollTop: chatBox.scrollHeight}, 1000);
});
