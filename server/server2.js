const express = require('express');
const app = express();
// const https = require('https');
// const path = require('path');
const cors = require('cors');
// const request = require('request');

app.use(cors())

app.listen(5000, () => {
  console.log('Express started!')
})

app.use('/api/getdata', (req, res) => {
    console.log('hithit');
    
    res.sendFile('../data/livecad.xml');
})
