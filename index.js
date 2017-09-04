// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var cors = require('cors') // add this line below it

var ParseServer = require('parse-server').ParseServer;
var path = require('path');

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || '', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',  // Don't forget to change to https if needed
  javascriptKey: process.env.JAVASCRIPT_KEY || '',  //** add this line no need to set values, they will be overwritten by heroku config vars
 restAPIKey: process.env.REST_API_KEY || '', //** add this line
 dotNetKey: process.env.DOT_NET_KEY || '', //** add this line
 clientKey: process.env.CLIENT_KEY || '', //** add this line
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();
app.use(cors()); // add this line below it

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/kathyTest.html'));
});

// Texas Muck Map
app.get('/muckmap', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/mucked.html'));
});

// app.get('/muckmap/filterByHours/:hoursAgo', function(req, res){
//   var hoursAgo = req.params.hoursAgo;
//   res.sendFile(path.join(__dirname, '/public/muckedRecency.html'));
// });

app.get('/muckmap/hourFilter/0', function(req, res){
  res.sendFile(path.join(__dirname, '/public/mucked0.html'));
})

app.get('/muckmap/hourFilter/1', function(req, res){
  res.sendFile(path.join(__dirname, '/public/mucked1.html'));
})

app.get('/muckmap/hourFilter/2', function(req, res){
  res.sendFile(path.join(__dirname, '/public/mucked2.html'));
})

app.get('/muckmap/hourFilter/3', function(req, res){
  res.sendFile(path.join(__dirname, '/public/mucked3.html'));
})

app.get('/muckmap/hourFilter/4', function(req, res){
  res.sendFile(path.join(__dirname, '/public/mucked4.html'));
})

app.get('/muckmap/hourFilter/5', function(req, res){
  res.sendFile(path.join(__dirname, '/public/mucked5.html'));
})

app.get('/muckdispatcher', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/muckedDispatcher.html'));
});

// Texas Muck Map Only
app.get('/muckmap/map', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/muckedMapOnly.html'));
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/steeleTest', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/steeleTest.html'));
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/brianTest', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/brianTest.html'));
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/livedataTest', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/livedataTest.html'));
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/kathyTest', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/kathyTest.html'));
});

app.get('/alanTest', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/alanTest.html'));
});

app.get('/muckedTest', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/muckedTest.html'));
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/alpha1', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/alpha1.html'));
});

// Page for donation centers after flood
app.get('/donationMap', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/donationMap.html'));
});

// Dispatcher admin portal
app.get('/dhdgsushsbcb3526dispatcheradmin', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/dispatcher.html'));
});

var port = process.env.PORT || 1337;

var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});



// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
