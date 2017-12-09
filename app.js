'use strict';

var express= require("express");
var app= express();
var jsonParser = require("body-parser").json;
var routes = require("./routes");
var logger = require("morgan");

app.use(logger("dev"));
app.use(jsonParser());

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/library");

var db = mongoose.connection;

db.on("error", function(err){
	console.error("connection error", err);
});

db.once("open", function(){
	console.log("db connection successful");
});

app.use("/books", routes);

app.use(function(req, res, next){
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next){
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	})
});

var port = process.env.PORT || 4000;

app.listen(port,function(){
	console.log("Server listening on port ",port);
});