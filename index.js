const express = require('express');
var cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const port = 3010;
const map = new Map();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

// Just creates a string of random values
function makeid(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function sanitizeUrl(url) {
  return url
    .trim()
    .toLowerCase()
    .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|\:\|\&\|\!\|[0-9]/g, '');
}

// Parse string url to integer func
function URLtoInteger(url) {
  var sanitizedUrl = sanitizeUrl(url);
  var int = 17;

  for (let i = 0; i < sanitizedUrl.length; i++) {
    int = int * sanitizedUrl.charCodeAt(i);
  }

  return int;
}

function add(url) {
  let key = URLtoInteger(url);
  map.set(key, url);
}

app.get('/', (req, res) => {
  res.json({ size: map.size, urls: Object.fromEntries(map) });
});

app.get('/add', (req, res) => {
  add('asos.com');
  add('zara.com');
  add('mango.com');
  add('pullandbear.com');
  add('hm.com');
  add('weekday.com');
  add('nike.com');
  add('urbanoutfitters.com');
  add('bape.com');
  add('aelfriceden.co.uk');

  for (let i = 0; i < 1000; i++) {
    add(`${makeid(12)}.com`);
  }

  res.json({ size: map.size, urls: Object.fromEntries(map) });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
