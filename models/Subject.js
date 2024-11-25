const mongoose = require('mongoose');

const Subject = mongoose.model('Subject',{
    name: String,
})

module.exports = Subject;