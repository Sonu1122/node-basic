var fs = require('fs');
var events = require('events');
var express = require('express');
var app = express();

var obj = {'id':1,'name':'Sonveer','email':'er.sonveersingh.it.mit@gmail.com'};

var myEvent = new events.EventEmitter();

myEvent.on('speak',function(){
  console.log('Fuck Off!!!!');
});

myEvent.emit('speak');

fs.readFile('readme.txt','utf8',function(err,data){
  fs.writeFile('writeme.txt',data,function(data){
    console.log('data read and written');
  });
});

app.set('view engine','ejs');

app.get('/',function(req,res){
  res.sendFile(__dirname+'/home.html')
});

app.get('/about',function(req,res){
  res.send('About page');
});

app.get('/contact',function(req,res){
  res.end('Contact page');
});

app.get('/rest/:id?',function(req,res){
  res.end('You requested user with id '+req.params.id);
});

app.get('/query?id=5',function(req,res){
  res.end('You requested user with id '+req.query.id);
});

app.get('/json',function(req,res){
  res.writeHead(200,{'Content-Type':'text/plain'});
  res.end(JSON.stringify(obj));
});

var readStream = fs.createReadStream('readme.txt','utf8');
var writeStream = fs.createWriteStream('writeme.txt');
// readStream.on('data',function(chunk){
//   writeStream.write(chunk);
// });
// readStream.pipe(writeStream);

app.get('/stream',function(req,res){
  res.writeHead(200,{'Content-Type':'text/plain'});
    readStream.pipe(res);
});

app.listen(3000,'127.0.0.1');
console.log('listening to port 3000');
