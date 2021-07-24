var http = require('http');
var fs = require('fs');
var url = require('url');
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    if(_url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    fs.readFile(`data/${queryData.id}`, 'utf8', function(err, text){
        var template = `
        <!doctype html>
        <html>
        <head>
          <title>${title}</title>
          <meta charset="utf-8">
          <style>
        body {
            margin:0;
        }
        h1 {
            font-size:45px;
            text-align: center;
            border-bottom:1px solid gray;
            margin:0;
            padding:20px;
        }
        ul {
            border-right:1px solid gray;
            width:200px;
            margin:0;
            padding:20px;
            padding-top: 0px;
        }
        .main {
            display:grid;
            grid-template-columns: 300px 1fr;
        }
          </style>
          <script>
          var Links = {
            setColor: function(color){
              var alist = document.querySelectorAll('a');
              for(var i = 0; i < alist.length; i++){
                alist[i].style.color = color;
              }
            }
          }
          var Body = {
            setBackgroundColor: function(color){
              document.querySelector('body').style.backgroundColor = color;
            },
            setColor: function(color){
              document.querySelector('body').style.color = color;
            }
          }
          function NightShifter(self){
            if(self.value === 'Night'){
              Body.setBackgroundColor('black');
              Body.setColor('white');
              self.value = 'Day';
              Links.setColor('powderblue');
            } else {
              Body.setBackgroundColor('white');
              Body.setColor('black');
              self.value = 'Night';
              Links.setColor('blue');
            }
          }
          </script>
        </head>
        <body>
          <h1><a href="/?id=Lorem Ipsum">Lorem Ipsum</a></h1>
          <div class="main">
          <ul>
            <h3>Index</h3>
            <li><a href="/?id=What is Lorem Ipsum?">What is Lorem Ipsum?</a></li>
            <li><a href="/?id=Why do we use it?">Why do we use it?</a></li>
            <li><a href="/?id=Where does it come from?">Where does it come from?</a></li>
            <li><a href="/?id=Where can I get some?">Where can I get some?</a></li>
            <br><input type="button" value="Night" onclick="NightShifter(this)">
          </ul>
          <div><h2>${title}</h2>
          <p>${text}</p></div>
        </div>
        </body>
        </html>
        `;
        response.end(template);
    });
});
app.listen(3000);
