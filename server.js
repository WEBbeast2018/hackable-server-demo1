const path = require('path');
const express = require('express');
const members = require('./data/members');
const app = express();

app.use(express.urlencoded({ extended: true }));

// json log middleware
app.use(function (req, res, next) {
  console.log(`request url: ${req.url}`);
  next()
});

// index file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/checkme', (req, res) => {
  const id = req.body['myId'] ? parseInt(req.body['myId']) : null;
  const member = isNaN(id) ? null: members.find(m => m.id === id);
  if(id && member) {
    res.end(`${member.id} is a valid id, member name is : ${member.name}`);
  } else {
    res.end(`${id} is not a valid id`);
  }
});


app.all('*', (req, res) => {
  res.status(404);
  res.end('invalid resource');
});

app.listen(8080,
  () => console.log('data server listening on port 8080')
);