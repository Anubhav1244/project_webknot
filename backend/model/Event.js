const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    people: [
        {
            name: {
                type: String,
            },
            email: {
                type: String,
            },
            role: {
                type: String,
            },
        },
    ],
    tasks: [
        {
            name: {
                type: String,
                required: [true, 'Task name is required'],
            },
            status: {
                type: String,
                enum: ['pending', 'completed'],
                default: 'pending',
            },
        },
    ],
});

module.exports = mongoose.model('Event', eventSchema);
