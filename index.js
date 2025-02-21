var express = require('express');
var app = express();
var path = require('path');
const shortid = require('shortid');
var PORT = 3000;
const { v4: uuidv4 } = require('uuid');
const Database = require("easy-json-database");
const links = new Database('./links.json')
const info = new Database('./INFO')
const fs = require('fs')
const router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link href="https://pidgon.com/style.css" rel="stylesheet" type="text/css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${info.get('name')}</title>
</head>
<body align="center">
  <h1 align="center">${info.get('name')}</h1>
  <p align="center">A free custom link redirector.</p>
  <p>Type in a link, and add a custom path after it. You can leave it blank for an automatically generated one.</p>
  <form class="pure-form" action='/' method="POST">
    <input type="url" placeholder="Type or paste in a link" name="link"> <i class="fas fa-arrow-right"></i> https://${info.get('url')}/<input type="text" name="path" class="path" placeholder="type in an optional path.">
    <button>Go!</button>
  </form>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

  <script>$(".path").keyup(function(){
    var text=$(this).val();
    $(this).val(text.replace(/[^A-Za-z0-9]/g,''));
})

$(".path").keyup(function(){
    var text=$(this).val();
    $(this).val(text.replace(/ /g,''));
})
</script>
  </body>
</html>`)
})

app.post('/', function(req, res) {
  var link = req.body.link
  var path = req.body.path
if(path === null || path == '') {path = shortid.generate()}
  
  if(links.has(path)) {
    var npath = shortid.generate()
    links.set(npath, link)
    res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><link href="https://pidgon.com/style.css" rel="stylesheet" type="text/css" /><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossorigin="anonymous" referrerpolicy="no-referrer" /><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${info.get('name')}!</title></head><body align="center"><h1 align="center">${info.get('name')}</h1><p align="center">A free custom link redirector.</p><p>The path "${path}" already exists, so your link has an automatically generated path. Here it is:</p><input type="text" value="https://${info.get('url')}/${npath}" id="myInput" readonly><button onclick="myFunction()">Copy text</button> <g id="cop"></g><br><p>Or, create a new one.</p><form class="pure-form" action='/' method="POST"><input type="url" placeholder="Type or paste in a link" name="link" value="${link}"> <i class="fas fa-arrow-right"></i> https://${info.get('url')}/<input type="text" name="path" class="path" placeholder="type in an optional path."><button>Go!</button></form><script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script>$(".path").keyup(function(){
    var text=$(this).val();
    $(this).val(text.replace(/[^A-Za-z0-9]/g,''));})$(".path").keyup(function(){var text=$(this).val(); $(this).val(text.replace(/ /g,''));})</script></body><script>function myFunction() {var copyText=document.getElementById("myInput");copyText.select(); copyText.setSelectionRange(0, 99999);navigator.clipboard.writeText(copyText.value);document.getElementById('cop').innerHTML = 'Copied!';}</script></html>`)
  } else {
    links.set(path, link)
 res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><link href="https://pidgon.com/style.css" rel="stylesheet" type="text/css" /><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossorigin="anonymous" referrerpolicy="no-referrer" /><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${info.get('name')}</title></head><body align="center"><h1 align="center">${info.get('name')}</h1><p align="center">A free custom link redirector.</p><br><p>Your link redirecting to ${link} has been created! Here it is:</p><input type="text" value="https://${info.get('url')}/${path}" id="myInput" readonly><button onclick="myFunction()">Copy text</button> <g id="cop"></g><br><br><p>Or, create a new link!</p><br><form class="pure-form" action='/' method="POST"><input type="url" placeholder="Type or paste in a link" name="link"> <i class="fas fa-arrow-right"></i> https://${info.get('url')}/<input type="text" name="path" class="path" placeholder="type in an optional path."><button>Go!</button></form><script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

  <script>$(".path").keyup(function(){
    var text=$(this).val();
    $(this).val(text.replace(/[^A-Za-z0-9]/g,''));
})

$(".path").keyup(function(){
    var text=$(this).val();
    $(this).val(text.replace(/ /g,''));
})</script></body><script>function myFunction() {var copyText=document.getElementById("myInput");copyText.select(); copyText.setSelectionRange(0, 99999);navigator.clipboard.writeText(copyText.value);document.getElementById('cop').innerHTML = 'Copied!';}</script></html>`)
  }
})

app.get('/:path', function(req, res) {
  var path = req.params.path
 if(links.has(path)) {
   res.send(`<html><script>window.location.replace('${links.get(path)}')</script></html>`)
 } else {
   res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><link href="https://pidgon.com/style.css" rel="stylesheet" type="text/css" /><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossorigin="anonymous" referrerpolicy="no-referrer" /><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>404 | ${info.get('name')}</title></head><body align="center"><h1 align="center">404 | ${info.get('name')}</h1><p>Your link doesn't exist. Check for any typos or ask the person who sent this link to you to resend it.</p></body></html>`)
 }
})
//porting
app.use('/', router);
app.listen(3000);
console.log('App initiated and running at port 3000!');
