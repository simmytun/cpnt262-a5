// Load dependencies
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Import models
const Pictures = require('./models/picture.js');

// Create express app
const app = express();



// app.use is for using middleware
app.use(express.static(path.join(__dirname, 'public')));

// Set up mongoose connection
mongoose.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {
    console.log('Connected to DB...');
});

// index endpoint
app.get('/', (req, res) => {
    res.send(`<h1>hello </h1><p> Please enter '/api/v0/pictures' to the current endpoint/url to return an array of objects.</p><h2>or</h2><p>Please enter '/api/v0/pictures/(any number' to return object  with the id.</p>`);
});

// JSON endpoint
app.get('/api/v0/pictures', (req, res) => {
    Pictures.find({}, (err, data) => {

        err ? res.send('error') : res.json(data);
    });
});

// JSON endpoint entering id
app.get('/api/v0/pictures/:id', (req, res) => {
    let pictureId = req.params.id;
    pictures.findOne({ id: pictureId }, (err, data) => {
        if (err || data === null) {
            res.send('error');
            console.log(err);
        }
        else {
            res.json(data);
        }
    });
});

// Add more middleware
app.use(function (req, res, next) {
    res.status(404);
    res.send('404: File Not Found');
});

// Set port preferrence with default
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});
