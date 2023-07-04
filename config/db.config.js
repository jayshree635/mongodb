const mongoose = require('mongoose')
const db = require('./config')

const dbConnection = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/demo", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("connect mongodb database");
    } catch (error) {
      console.log(error);
    }
}
module.exports = {
    dbConnection
}