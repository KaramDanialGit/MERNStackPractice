require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts')

// Scans every request that comes in with a json object and attaches it to the req handler
app.use(express.json())

// This is a global piece of middleware code executed before other commands
// we must invoke 'next' or else nothing after use will be executed.
app.use((req, res, next) => {
    // Just use this as a middleware logger
    console.log(req.path, req.method)
    next()
})

// Simply calls the workoutRoutes middlware from the file 
app.use('/api/workouts', workoutRoutes)

// Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Connected to Mongo and listening")
        })
    }).catch(error => console.log(error))