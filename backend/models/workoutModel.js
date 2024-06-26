// MongoDB alone is schemaless so mongoose allows us to define one
const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Structure of document inside our db
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true })

// Now we need a model to use interact with this schema. First initialize collection: 
module.exports = mongoose.model('Workout', workoutSchema)