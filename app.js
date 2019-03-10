const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/database');
const PORT = process.env.PORT || 5000
const app = express();


var connection_options = {user: 'sadam', pass: 'sadam12345'};
let connection = mongoose.connect(config.database, connection_options, function(err, db){
  if(err){
    console.log("Can not connect to DB");
    console.log(err);
  }
  else {
    console.log("Connected to DB");
    isMongoDBConnected = true;
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '5mb', extended: true }));
// Create link to Angular build directory

app.set('port', (process.env.PORT || 3000));
app.use(express.static(path.join(__dirname, '/dist')));
// require('./routes/routesAPI').MSAPP.Routes.UserRoutes.initUserRoutes(app);
const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
];


app.get('*', (req, res) => {
  if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
    res.sendFile(path.resolve(`dist/music-store-bv/${req.url}`));
  } else {
    res.sendFile(process.cwd() +'/dist/music-store-bv/index.html');
  }
});

require('./routes/userRoutes').MSAPP.Routes.UserRoutes.initUserRoutes(app);

// app.get('/', function (req, res) {
//     res.render('pages/index')
// });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
