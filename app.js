var express    = require('express'); // require express server
var cors       = require('cors');
var bodyParser = require('body-parser');
var fs         = require('fs');

var routes     = require('./server/routes');

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public/'));

routes.connectRoutes(app);

//set port to 9000
app.set('port', process.env.PORT || 9000);

// listen at port and log port #
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
