const mongoose = require('mongoose');

const Question = mongoose.model('Question',{
    body: String,
    answers: [
        {
            body: String,
            correct: Boolean
        }
    ],
    tags: [
        {
            tag: String
        }
    ],
    subject: String,
});

module.exports = Question;