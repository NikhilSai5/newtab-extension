const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
    console.log(`connection with mongoDB successful`);
}).catch((err) => {
    console.log(`error: ${err} occured connection failed`);
})