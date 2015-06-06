// require('newrelic');
var express    = require('express'),                           // requiring the express framework
app            = express(),                                   //  every time the 'app' variable is called it will be using express
port           = process.env.PORT || 3000,                   //   defining the port that the app will run on
morgan         = require('morgan'),                         //    logging all requests in the console
mongoose       = require('mongoose'),                      //     using for mongo database
bodyParser     = require('body-parser'),                  //      parsing content in request body
methodOverride = require('method-override'),             //       DELETE and PUT simulation
session        = require('express-session'),            //        calling the express-session package to help with user sessions
cookieParser   = require('cookie-parser'),             //         parsing through cookies and helps store the session id into the browser
database       = require('./app/config/db/database'), //          making sure the database is required in the app by specifying the path to the database.js file here
flash          = require('connect-flash');           //           showing messages depending on what state of authentication you are in


// @TODO make newrelic environment variable
// @TODO API STUFF
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'html');
app.use(morgan('dev'));
app.listen(port);
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());                                      // gives the ability to use HTTP verbs in places where it is not normally supported
app.use(cookieParser());                                        // using cookie parser in the app for sessions
app.use(flash());                                               // flash messages that are stored inside of sessions
console.log('App listening on port: ' + port);


// connect to mongo database
// @TODO decide on a mongo provider like mongolab, gcloud datastore, or modulus
mongoose.connect(process.env.MONGO_REMOTE_URL || database.url);



require('./app/config/routes')(app, express);
