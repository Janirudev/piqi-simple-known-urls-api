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

function addMock() {
  add('www.asos.com');
  add('www.zara.com');
  add('www.mango.com');
  add('www.pullandbear.com');
  add('www1.hm.com');
  add('www2.hm.com');
  add('www3.hm.com');
  add('www.weekday.com');
  add('www.nike.com');
  add('www.urbanoutfitters.com');
  add('www.bape.com');
  add('www.aelfriceden.co.uk');

  for (let i = 0; i < 1000; i++) {
    add(`${makeid(12)}.com`);
  }

}

app.get('/', (req, res) => {

  if(map.size == 0) {
    addMock();
  }
  res.json({ size: map.size, urls: Object.fromEntries(map) });
});

app.get('/add', (req, res) => {
  addMock();
  res.json({ size: map.size, urls: Object.fromEntries(map) });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
