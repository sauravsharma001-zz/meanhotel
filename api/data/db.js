var mongoose = require("mongoose");
var dburl = "mongodb://root:root@localhost:27017/meanhotel?authMechanism=DEFAULT&authSource=admin";

mongoose.connect(dburl);

mongoose.connection.on("connected", function ()  {
    console.log("Mongoose connected to", dburl)
});

mongoose.connection.on("disconnected", function ()  {
    console.log("Mongoose disconnected to", dburl)
});

mongoose.connection.on("error", function (err)  {
    console.log("Mongoose connection error: ", err)
});
// For termination in linux and unix
process.on("SIGINT", function () {
    mongoose.connection.close(function () {
        console.log("Mongoose disconnected through app termination (SIGINT)");
        process.exit(0);
    });
});
// for termination in Heroku
process.on("SIGTERM", function () {
    mongoose.connection.close(function () {
        console.log("Mongoose disconnected through app termination (SIGTERM)");
        process.exit(0);
    });
});
// for termination in Nodemon
process.once("SIGUSR2", function () {
    mongoose.connection.close(function () {
        console.log("Mongoose disconnected through app termination (SIGUSR2)");
        process.kill(process.pid, 'SIGUSR2');
    });
});

// Bring in Schemas and Models
require("./hotel.model.js");
require("./user.model.js");
