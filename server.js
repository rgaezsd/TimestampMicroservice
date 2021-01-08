// server.js
// where your node app starts

// init project
let express = require('express');
let app = express();

const moment = require('moment');
const utcFormat = 'ddd, DD MMM YYYY HH:mm:ss';


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
let cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp/', (req, res) => {
  let timeInUtc = `${moment().utc().local().format(utcFormat)} GMT`;
  let timeInUnix = moment().unix();

  res.json({
      "unix": timeInUnix,
      "utc": timeInUtc
  })
})

app.get('/api/timestamp/:date', (req, res) => {
  const time = req.params.date;
  const isTimeNaN = isNaN(time);

  let timestamp = moment(time);
  
  if (!timestamp.isValid()) { 
      res.json({ "error": "Invalid Date" });
  } else {
      let timeInUnix = isTimeNaN ? moment(timestamp).unix() : time;
      let timeInUtc = isTimeNaN ? moment(timestamp).format(utcFormat) : moment(timeInUnix * 1000).format(utcFormat);
  
      res.json({
          "unix": timeInUnix,
          "utc": timeInUtc
      });
  }
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

const port = process.env.PORT || 3000;

// listen for requests :)
let listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
