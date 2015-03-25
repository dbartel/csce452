var express = require("express");
var app = express();
var http = require("http").Server(app);

var io = require("socket.io")(http);

io.on("connection", function(socket) {
	console.log("A user connected")
})


app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

http.listen(3000, function() {
    console.log("Listening on port 3000");
});
