var express = require("express");
var app = express();
var http = require("http").Server(app);

var io = require("socket.io")(http);

io.on("connection", function(socket) {
	console.log("A user connected");
	socket.on("robot", function(msg) {
		console.log("Robot command received: " + msg);
		io.emit('robot', msg);
	});

	socket.on("paint", function(msg) {
		console.log("Paint command received");
		io.emit("paint", msg);
	});

});



app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/server", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/client", function(req, res) {
    res.sendFile(__dirname + "/public/client.html");
});



http.listen(3000, function() {
    console.log("Listening on port 3000");
});

