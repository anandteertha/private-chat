var socket = io();

var teamNames = document.getElementById('teamNames');

socket.emit('getTeams','getTeams');
socket.on('teams',function(data){
  console.log('data recived is: ',data);
  for(var i=0;i<data.length;i++){
    var team = document.createElement('div');
    team.innerHTML = data[i].teamName;
    team.style.width = '100px';
    team.style.height = '20px';
    team.style.border = '1px dotted black';
    team.addEventListener('click',function(e){
      chatBox.innerHTML = '';
      this.style.backgroundColor = 'grey';
      this.style.border = '2px dotted red';
      localStorage.teamName = this.innerHTML;
      console.log('clicked teamname: ',this.innerHTML);
      chatBox.innerHTML = '<center>Team Name: '+ this.innerHTML + '</center>';
      socket.emit('join room',{
        teamName: this.innerHTML
      });
      window.alert(this.innerHTML);
      /*socket.on('recieveMessage',function(data){
        console.log('data recived message is: ',data);
        var msg = document.getElementById('msg');
        var chatBox = document.getElementById('chatBox');

        chatBox.innerHTML += '<br><left><strong>'+ data.teamName + ':</strong> '+ data.messages.message + '<br></left>';

      });*/
    });
    team.setAttribute('id',i);
    teamNames.appendChild(team);
  }
});
socket.on('recieveMessage',function(data){
  console.log('data recived message is: ',data);
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
  chatBox.animate({ scrollTop:'500px' }, 1000);
});




function sendMessage(){
  var msg = document.getElementById('msg');
  var chatBox = document.getElementById('chatBox');

  chatBox.innerHTML += '<br><left><strong>'+ 'ADMIN' + ':</strong> '+ msg.value + '<br></left>';
  chatBox.animate({ scrollTop: chatBox.scrollHeight}, 1000);
  var data = {
    teamName: localStorage.teamName,
    messages: {
      time: Number(new Date().getTime()),
      message: msg.value,
      sender: false  //true for user;
    }
  }
  socket.emit('sendMessage',data);
}
