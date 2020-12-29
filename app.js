const chat = require('./schema/chatSchema');
require('./db/mongoose');

//const io = require('socket.io');
const app = require('./functions/socket').app;
const http = require('./functions/socket').http;
const io = require('./functions/socket').io;
const bodyParser = require('body-parser');
const session = require('express-session');
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
	// eslint-disable-next-line no-undef
	secret: 'hello world',
	resave: false,
	saveUninitialized: false
}));
//get requests here..
app.get('/',function(req,res){
  res.sendfile('index.html');
});

app.get('/admin',function(req,res){
  res.sendfile('admin.html');
});

app.get('/user',function(req,res){
  res.sendfile('user.html');
});

app.get('/css',function(req,res){
  res.sendfile('main.css');
});

app.get('/adminJS',function(req,res){
  res.sendfile('adminJS.js');
});

app.get('/userJS',function(req,res){
  res.sendfile('userJS.js');
});


//post requests here..

app.post('/login',function(req,res){
  console.log('data recieved from index.html',req.body);
  console.log('teamName: ',req.body.teamname);
  console.log('email: ',req.body.email);
  console.log('password: ',req.body.password);

  if(req.body.email == 'csiemail.com'){
    res.redirect('/admin');
  }
  else{
    res.redirect('/user');
  }

});


//socket connections here...



http.listen(3000,function(){
  console.log('listening on port 3000..');
});
