const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const cookieparser = require('cookie-parser');
const uploadRoutes = require('./routes/upload-routes');
const path = require('path');

require('dotenv').config()

const app = express()

app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    next();
});

app.use(cookieparser());
app.use(bodyParser.json())
app.use('/images/gallery', express.static(path.join('images', 'gallery')))

app.use('/api/upload', uploadRoutes);

const url = `${process.env.MONGO_URI}`
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('App Started')
        app.listen(5000)
    })
    .catch((err) => console.log(err))