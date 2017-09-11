var MongoClient = require("mongodb").MongoClient;
var dburl = "mongodb://root:root@localhost:27017/meanhotel?authMechanism=DEFAULT&authSource=admin";

var _connection = null;

var open = function()   {
    //set connection
    MongoClient.connect(dburl, function(err, db)   {
        if(err) {
            console.log("DB connection failed");
            return;
        }
        _connection = db;
        console.log("DB connection open");
    });
};

var get = function()   {
    return _connection;
};

module.exports = {
    open: open,
    get: get
};
