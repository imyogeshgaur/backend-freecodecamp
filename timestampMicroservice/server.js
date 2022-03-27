// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { route } = require('express/lib/router');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  return res.sendFile(__dirname + '/views/index.html');
});

const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

// your first API endpoint... 
app.get("/api", function (req, res) {
  const data = new Date();
  const dinOfDay = data.getDate();
  const mahinaOfDay = month[data.getMonth()];
  const vaarOfDay = day[data.getDay()];
  const saalOfDay = data.getFullYear();
  let utcHours = data.getUTCHours();
  let utcMinutes = data.getUTCMinutes();
  let utcSeconds = data.getUTCSeconds();
  if(utcHours<10){
    utcHours = "0"+ utcHours;
  }
  if(utcMinutes<10){
    utcMinutes = "0"+ utcMinutes;
  }
  if(utcSeconds<10){
    utcSeconds = "0"+ utcSeconds;
  }
  res.json({ "unix": data.getTime(), "utc": `${vaarOfDay}, ${dinOfDay} ${mahinaOfDay} ${saalOfDay} ${utcHours}:${utcMinutes}:${utcSeconds} GMT}` });
})

app.get("/api/:date", function (req, res) {
  const dateReq = req.params.date;
  const dateObj = new Date(dateReq);
  try {
    if (dateObj) {
      const dinOfDay = dateObj.getDate();
      const mahinaOfDay = month[dateObj.getMonth()];
      const vaarOfDay = day[dateObj.getDay()];
      const saalOfDay = dateObj.getFullYear();
      const unix = dateObj.getTime();
      const utcHours = "0" + dateObj.getUTCHours();
      const utcMinutes = "0" + dateObj.getUTCMinutes();
      const utcSeconds = "0" + dateObj.getUTCSeconds();
      res.status(200).json({ "unix": `${unix}`, "utc": `${vaarOfDay}, ${dinOfDay} ${mahinaOfDay} ${saalOfDay} ${utcHours}:${utcMinutes}:${utcSeconds} GMT` })
    } else {
      res.status(400).json({ "error": "Invalid Date" })
    }
  } catch (error) {
    res.status(500).send("Internal Server Error !!!");
  }
});


// listen for requests :)
var listener = app.listen(5000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
