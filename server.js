const express = require('express');
const app = express();

require('dotenv').config({ path: './.env' })

const cors = require('cors');
app.use(cors({
  optionsSuccessStatus: 200
}));

app.use(express.static('public'));

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

const port = process.env.PORT || 3000;

let listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});