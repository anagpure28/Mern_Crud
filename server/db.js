const mongoose = require("mongoose");

const connection = () => {
    // useNewUrlParser : true is in place because there’s a piece of the MongoDB code that 
    // they won’t be using/supporting in the future. Putting this in your code ensures that 
    // your code won’t break when that change is eventually made.
    const connectionParams = { useNewUrlParser: true };
    mongoose.connect(process.env.DB, connectionParams);

    mongoose.connection.on("connected",()=> {
        console.log("Connected to database successfully");
    })

    mongoose.connection.on("error",()=> {
        console.log("Error while connecting to database:" + err);
    })

    mongoose.connection.on("disconnected",()=> {
        console.log("Mongodb connection disconnected");
    })
}

module.exports = connection;