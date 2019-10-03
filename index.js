var express = require("express");
var app = express();
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io").listen(server);
server.listen(3000);

io.on("connection", function(socket){
  console.log("testing");

  socket.on("disconnect", function(){
    console.log("dis");
  });
});

app.get("/", function(reg, res){
  res.render("home");
});
