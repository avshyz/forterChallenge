var express = require('express');
var app = express();
var port = 3000;

app.use(express.static(__dirname + '/client'));
app.set('views', __dirname + '/client/templates');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
require('./server/routes.js')(app);

app.listen(port);
console.log("Web server listening on port " + port);
