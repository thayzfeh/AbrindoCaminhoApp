const mongoose = require('mongoose');

const Tag = mongoose.model('Tag',{
    tag: String,
    subject: String,
});

module.exports = Tag;