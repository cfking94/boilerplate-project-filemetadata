var express = require('express');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var cors = require('cors');
require('dotenv').config();

var app = express();

// Basic configuration
app.use(cors());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

// API endpoint
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const getName = req.file.originalname,
  getType = req.file.mimetype,
  getSize = req.file.size

  return res.json({
    name: getName,
    type: getType,
    size: getSize
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
