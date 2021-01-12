// server.js
// where your node app starts

// init project
let express = require('express');
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
let cors = require('cors');
app.use(cors({
  optionsSuccessStatus: 200
})); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp/', (req, res) => {
  res.json({
    unix: Date.now(),
    utc: Date()
  });
});

app.get('/api/timestamp/:date', (req, res) => {
  const time = req.params.date;

  if (/\d{5,}/.test(time)) {
    let parsedTime = parseInt(time);

    res.json({
      unix: parsedTime,
      utc: new Date(parsedTime).toUTCString()
    });
  } else {
    let object = new Date(time)

    if (object.toString() === "Invalid Date") {
      res.json({
        error: "Invalid Date"
      });
    } else {
      res.json({
        unix: object.valueOf(),
        utc: object.toUTCString()
      });
    }
  }
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({
    greeting: 'hello API'
  });
});

const port = process.env.PORT || 3000;

// listen for requests :)
let listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});