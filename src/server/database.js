// database.js
const mongoose = require('mongoose');

// const dbUrl = `mongodb+srv://${process.env.ATLAS_USER_NAME}:${process.env.ATLAS_PASSWORD}@${process.env.ATLAS_URL}/${process.env.ATLAS_DB_NAME}?retryWrites=true&w=majority`;
const dbUrl = `mongodb+srv://${process.env.ATLAS_USER_NAME}:${process.env.ATLAS_PASSWORD}@${process.env.ATLAS_URL}/?retryWrites=true&w=majority`;

console.log("dbUrl", dbUrl);
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

module.exports = db;
