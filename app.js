const express = require('express');
const bodyParser = require('body-parser');
const places = require('./Routing/places-route');
const users = require('./Routing/users-route')
const app = express();


app.use(bodyParser.json())

app.use('/api/places', places);

app.use('/api/users', users);

app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error)
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'AN UNKNOWN ERROR OCCURED'})
})

app.listen(5000)