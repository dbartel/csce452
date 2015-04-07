var express = require("express");
var app = express();
var http = require("http").Server(app);

var io = require("socket.io")(http);

// Server stores current position
var current_position = {
    paint: [],
    position: [
    {
	x: 400,
	y: 250
    },
    {
	x: 400,
	y: 150
    },
    {
	x: 400,
	y: 75
    }]
};

var reset_position = current_position;

io.on("connection", function(socket) {
	//console.log("A user connected");
	io.emit("init_position", current_position);
	socket.on("robot", function(msg) {
		//console.log("Robot command received: " + msg);
		io.emit('robot', msg);
	});

	socket.on("paint", function(msg) {
		//console.log("Paint command received");
		io.emit("paint", msg);
	});
    
    socket.on("position", function(msg) {
	current_position = msg;
    });

    socket.on("reset", function(msg) {
        current_position = reset_position;
        socket.emit("init_position", current_position);
    })

});



app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/home.html");
});

app.get("/slave", function(req, res) {
    res.sendFile(__dirname + "/public/server.html");
});

app.get("/master", function(req, res) {
    res.sendFile(__dirname + "/public/client.html");
});



var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || 'localhost';


http.listen(server_port, server_ip_address, function() {
    console.log("Listening on port " + server_port);
});

