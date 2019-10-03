var socket = io("http://localhost:3000");

socket.on("server-send-login-fail", function(){
  alert("Username exist!!!");
});
socket.on("server-send-login-success", function(data){
  $("#loginForm").hide(1000);
  $("#chatForm").show(1000);
  $("#currentUser").empty();
  $("#currentUser").append(data);
  $("#currentUser").val(data);
});
socket.on("server-send-login-user", function(data){
  $("#boxContent").empty();
  data.forEach(function(i){
    $("#boxContent").append('<div class="userOnline">'+i+'</div>');
  });
});
socket.on("server-send-user-message", function(data){
    $("#listMessage").append('<div class="msg">'+ data.user + ' : ' + data.message +'</div>');
});

// socket.on("server-send-user-typing", function(data){
//     $("#typingMessage").append('<div>'+ data +' is typing...</div>');
// });
//
// socket.on("server-send-user-stop-typing", function(data){
//     $("#"+data).remove();
// });

 $(document).ready(function(){
   init();
   login();
   logout();
   sendMessage();
   // $("#textMessage").focusin(function(){
   //   socket.emit("client-send-user-typing");
   // });
   // $("#textMessage").focusout(function(){
   //   socket.emit("client-send-user-stop-typing");
   // });
 });

 function init(){
   $("#loginForm").show();
   $("#chatForm").hide();
 }

function login(){
  $("#login").click(function(){
    socket.emit("client-send-username", $("#username").val());
  });
}

function logout(){
  $("#logout").click(function(){
    socket.emit("client-send-logout-username");
    init();
  });
}

function sendMessage(){
  $("#sendMessage").click(function(){
    socket.emit("client-send-user-message", $("#textMessage").val());
  });
}
