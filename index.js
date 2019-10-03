var express = require("express");
var app = express();
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io").listen(server);
server.listen(3000);
var user = [];

io.on("connection", function(socket){
  socket.on("disconnect", function(){
    //console.log("dis: " + socket.id);
  });

  socket.on("client-send-username", function(data){
    if(user.indexOf(data) >= 0){
      // fail
      socket.emit("server-send-login-fail");
    }
    else {
      // success
      user.push(data);
      socket.username = data;
      socket.emit("server-send-login-success", data);
      io.sockets.emit("server-send-login-user", user);
    }
  });

  socket.on("client-send-logout-username", function(){
    user.splice(user.indexOf(socket.username),1);
    socket.broadcast.emit("server-send-login-user", user);
  });

  socket.on("client-send-user-message", function(data){
    //console.log(data);
    io.sockets.emit("server-send-user-message", {user: socket.username, message: data});
  });

  // socket.on("client-send-user-typing", function(){
  //   console.log(socket.username + ' typing');
  //   socket.broadcast.emit("server-send-user-typing", socket.username);
  // });
  //
  // socket.on("client-send-user-stop-typing", function(){
  //   socket.broadcast.emit("server-send-user-stop-typing", socket.username);
  // });

/*
  socket.on("Client-send-data", function(data){
    console.log(socket.id + " send :" + data);

    // server send data back to all clients
    io.sockets.emit("Server-send-data", "Send to all: "+ data +" 888");

    // server send data back to sender
    socket.emit("Server-send-data", "Send to sender: "+ data +" 999");

    // server send data back to all other clients
    socket.broadcast.emit("Server-send-data", "Send to others: "+ data +" 000");

    // server send data back to specific username
    //io.to("id").emit("Server-send-data", "Send to one user: "+ data +" 111")
  });
*/
});

app.get("/", function(reg, res){
  res.render("home");
});
