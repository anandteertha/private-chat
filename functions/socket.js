const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const chat = require('../schema/chatSchema');
require('../db/mongoose');
io.on('connection',function(socket){
  console.log('a user just came online..');
  socket.on('join room',function(data){
    socket.join(data.teamName);
		console.log('join room request: ',data.teamName);
    chat.where({'teamName': data.teamName}).find(function(err,details){
      if(err){
        throw err;
      }
      else{
        console.log('emiting to: ',data.teamName);
        console.log('details emiting is: ',details[0]);
        socket.emit('recieveMessage',details[0]);
        if(data.email == 'csiemail.com'){
          chat.updateOne({'teamName': data.teamName},{'adminUnread': 0});
        }
        else{
          chat.updateOne({'teamName': data.teamName},{'userUnread': 0});
        }
      }
    });
  });
  socket.on('sendMessage',function(data){
    console.log('data from sendMessage is: ',data);
    socket.to(data.teamName).emit('recieveMessage',data);
    chat.where({'teamName': data.teamName}).findOne(function(err,res){
      if(err){
        throw err;
      }
      else{
        if(!res){
          console.log('sahi hai');
          res = new chat();
          res.teamName = data.teamName;
          res.messages.push(data.messages);
          res.username = data.teamName;
          res.save(function(err){
            if(err){
              throw err;
            }
            else{
              console.log('no error saved successfully');
            }
          });
        }
        else{
        console.log('here..');
        res.messages.push(data.messages);
        res.save(function(err){
          if(err){
            throw err;
          }
          else{
            console.log('no error saved successfully');
          }
        });
        }
      }
    });
  });

  socket.on('getTeams',function(data){
    console.log('inside getTeams');
    var details = chat.find({},function(err,res){
      if(err){
        throw err;
      }
      else{
        socket.emit('teams',res);
        console.log('res: ',res);
      }
    });
    //console.log('details are: ',details);
  });


});
module.exports = {
  io: io,
  http: http,
  app: app
};
