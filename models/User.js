const mongoose = require('mongoose');
const Question = require('./Question');

const User = mongoose.model('User',{
    email: String,
    username: String,
    password: String,
    
    tests: [
        {
            dateTime: Date,
            questions: [Question.schema],
            performance: [{
                Subject: String,
                acurracy: Number,
            }]
        }
    ]
});
module.exports = User;