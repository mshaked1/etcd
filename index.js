var express = require('express');
var app = express();
var Etcd = require('node-etcd');
var etcd = new Etcd("http://127.0.0.1:2379");
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('*', (req, res) => {
  etcd.get('/dir1/a', (err, res1) => {
    console.log(res1.node.value);
    res.end();
  });
});

app.put('*', (req, res) => {
  etcd.set('/dir1/a', req.body.value, (err, res1) => {
    console.log(res1.node.value);
    res.end();
  });
});

app.listen(3000);