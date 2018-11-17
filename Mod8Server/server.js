//START CONFIG//

//*only works if TEAMONLY does not equal 2

//SCPRADIUS*
//0: no ring of how close an SCP is to you
//1: yes ring, what to modulo the radius by (radius modulo scpradius)
//example of modulo is in(25 modulo 5), out(0); in(26 modulo 5), out(1)
var scpradius = 10;

//SCPRADIUSMIN*
//any: how small the radius of an scp ring can get
var scpradiusmin = 25;

//SCPRADIUSMAX*
//any: how large the radius of an scp ring can get before disappearing
var scpradiusmax = 100;

//TEAMONLY
//0: only show You
//1: only show who is on your team
//2: show everyone
//3: only show who is on your side
var teamonly = 3;

//END CONFIG//

//For input
var stdin = process.openStdin();

stdin.addListener("data", function(d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that
    // with toString() and then trim()
    console.log("you entered: [" +
        d.toString().trim() + "]");

    //TEAMONLY
    if (d.toString().trim().startsWith("teamonly")) {
      if (d.toString().trim().split(' ').length > 0) {
        teamonly = parseInt(d.toString().trim().split(' ')[1]);
        console.log("teamonly = " + parseInt(d.toString().trim().split(' ')[1]));
      }
    }
    //SCPRADIUS
    if (d.toString().trim().startsWith("scpradius")) {
      if (d.toString().trim().split(' ').length > 0) {
        scpradius = parseInt(d.toString().trim().split(' ')[1]);
        console.log("scpradius = " + parseInt(d.toString().trim().split(' ')[1]));
      }
    }
    //SCPRADIUSMIN
    if (d.toString().trim().startsWith("scpradiusmin")) {
      if (d.toString().trim().split(' ').length > 0) {
        scpradiusmin = parseInt(d.toString().trim().split(' ')[1]);
        console.log("scpradiusmin = " + parseInt(d.toString().trim().split(' ')[1]));
      }
    }
    //SCPRADIUSMAX
    if (d.toString().trim().startsWith("scpradiusmax")) {
      if (d.toString().trim().split(' ').length > 0) {
        scpradiusmax = parseInt(d.toString().trim().split(' ')[1]);
        console.log("scpradiusmax = " + parseInt(d.toString().trim().split(' ')[1]));
      }
    }
  });

var net = require('net');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var sio = require('socket.io');
var io = sio(http);

var HOST = '127.0.0.1';
var PORT = 8080;

var pdata;

var players = {};

app.use('/', express.static(__dirname + '/public'));

var interval = setInterval(function () {
  //if (pdata === "") run = false;
  var data;
  try {
    data = JSON.parse(pdata);
    try {
      if (teamonly == 1) {
        var asockets = io.sockets.connected;
        var sockets = Object.keys(asockets);

        for (var i = 0; i < sockets.length; i++) {

          var socketid = sockets[i].toString();
          var socket = asockets[socketid];

          if (Object.keys(players).indexOf(socketid) == -1) {
            var send = JSON.parse(JSON.stringify(data));
            send.players = [];
            socket.emit('map', JSON.stringify(send));
          }
          else {
            var send = JSON.parse(JSON.stringify(data));
            send.players = [];
            for (var j = 0; j < data.players.length; j++) {
              var player = data.players[j];
              if (players[socketid] === player.steamid.toString()) {
                for (var k = 0; k < data.players.length; k++) {
                  var otherplayer = data.players[k];
                  if (otherplayer.team === player.team) {
                    var newplayer = JSON.parse(JSON.stringify(otherplayer));
                    newplayer.key = "";
                    newplayer.ip = "";
                    send.players.push(newplayer);
                  }
                  else if (otherplayer.team === "SCP") {
                    var scpplayer = JSON.parse(JSON.stringify(otherplayer));
                    if (player.posy < -300 && otherplayer.posy >= -300) continue;
                    else if (player.posy >= -300 && otherplayer.posy < -300) continue;
                    var a = player.posx - otherplayer.posx;
                    var b = player.posz - otherplayer.posz;
                    var c = Math.sqrt( a*a + b*b );
                    scpplayer.key = "";
                    scpplayer.ip = "";
                    scpplayer.posx = player.posx;
                    scpplayer.posy = player.posy;
                    scpplayer.posz = player.posz;
                    scpplayer.radius = Math.max(c - (c % scpradius), scpradiusmin);
                    if (c - (c % scpradius) > scpradiusmax) scpplayer.radius = 0;
                    if (send.scpradii == undefined) send.scpradii = [];
                    send.scpradii.push(scpplayer);
                  }
                }
                socket.emit('map', JSON.stringify(send));
                //return;
              }

            }
            //socket.emit('map', JSON.stringify(send));
          }

        }
      }
      else if (teamonly == 2) {
        var send = JSON.parse(JSON.stringify(data));
        for (var i = 0; i < send.players.length; i++) {
          send.players[i].ip = "";
          send.players[i].key = "";
        }
        io.emit('map', JSON.stringify(send));
      }
      else if (teamonly == 0) {
        var asockets = io.sockets.connected;
        var sockets = Object.keys(asockets);

        for (var i = 0; i < sockets.length; i++) {

          var socketid = sockets[i].toString();
          var socket = asockets[socketid];

          if (Object.keys(players).indexOf(socketid) == -1)
          {
            var send = JSON.parse(JSON.stringify(data));
            send.players = [];
            socket.emit(send);
            continue;
          }

          if (players[socketid] != undefined || players[socketid] != null) {
            var send = JSON.parse(JSON.stringify(data));
            send.players = [];

            if (players[socketid] != undefined) {
              for (var j = 0; j < data.players.length; j++) {
                var player = data.players[j];
                if (players[socketid] === player.steamid) {
                  var newplayer = JSON.parse(JSON.stringify(player));
                  newplayer.key = "";
                  newplayer.ip = "";
                  send.players.push(newplayer);
                  if (scpradius == 0) break;
                }
                if (scpradius != 0) {
                  for (var k = 0; k < data.players.length; k++) {
                    var otherplayer = data.players[k];
                    if (otherplayer.team === "SCP") {
                      var scpplayer = JSON.parse(JSON.stringify(otherplayer));
                      if (player.posy < -300 && otherplayer.posy >= -300) continue;
                      else if (player.posy >= -300 && otherplayer.posy < -300) continue;
                      var a = player.posx - otherplayer.posx;
                      var b = player.posz - otherplayer.posz;
                      var c = Math.sqrt( a*a + b*b );
                      scpplayer.key = "";
                      scpplayer.ip = "";
                      scpplayer.posx = player.posx;
                      scpplayer.posy = player.posy;
                      scpplayer.posz = player.posz;
                      scpplayer.radius = Math.max(Math.min(c - (c % scpradius), scpradiusmax), scpradiusmin);
                      if (c - (c % scpradius) > scpradiusmax) scpplayer.radius = 0;
                      if (send.scpradii == undefined) send.scpradii = [];
                      send.scpradii.push(scpplayer);
                    }
                  }
                }
              }
              socket.emit('map', JSON.stringify(send));
            }

          }

        }
      }
      else if (teamonly == 3) {
        var asockets = io.sockets.connected;
        var sockets = Object.keys(asockets);

        for (var i = 0; i < sockets.length; i++) {

          var socketid = sockets[i].toString();
          var socket = asockets[socketid];

          if (!(socketid in players)) {
            var send = JSON.parse(JSON.stringify(data));
            send.players = [];
            socket.emit('map', JSON.stringify(send));
          }
          else {
            var send = JSON.parse(JSON.stringify(data));
            send.players = [];
            for (var j = 0; j < data.players.length; j++) {
              var player = data.players[j];
              if (players[socketid] === player.steamid.toString()) {
                for (var k = 0; k < data.players.length; k++) {
                  var otherplayer = data.players[k];
                  if ((otherplayer.team === player.team) ||
                    (player.team === "CLASSD" && otherplayer.team === "CHAOS_INSURGENCY") ||
                    (player.team === "CHAOS_INSURGENCY" && otherplayer.team === "CLASSD") ||
                    (player.team === "NINETAILFOX" && otherplayer.team === "SCIENTISTS") ||
                    (player.team === "SCIENTISTS" && otherplayer.team === "NINETAILFOX") ||
                    player.team === "SPECTATOR" ||
                    player.team === "NONE" ||
                    player.team === "TUTORIAL" ||
                    otherplayer.team === "TUTORIAL"
                  ) {
                    var newplayer = JSON.parse(JSON.stringify(otherplayer));
                    newplayer.key = "";
                    newplayer.ip = "";
                    send.players.push(newplayer);
                  }
                  else if (otherplayer.team === "SCP") {
                    var scpplayer = JSON.parse(JSON.stringify(otherplayer));
                    if (player.posy < -300 && otherplayer.posy >= -300) continue;
                    else if (player.posy >= -300 && otherplayer.posy < -300) continue;
                    var a = player.posx - otherplayer.posx;
                    var b = player.posz - otherplayer.posz;
                    var c = Math.sqrt( a*a + b*b );
                    scpplayer.key = "";
                    scpplayer.ip = "";
                    scpplayer.posx = player.posx;
                    scpplayer.posy = player.posy;
                    scpplayer.posz = player.posz;
                    scpplayer.radius = Math.max(Math.min(c - (c % scpradius), scpradiusmax), scpradiusmin);
                    if (c - (c % scpradius) > scpradiusmax) scpplayer.radius = 0;
                    if (send.scpradii == undefined) send.scpradii = [];
                    send.scpradii.push(scpplayer);
                  }
                }
                socket.emit('map', JSON.stringify(send));
                //return;
              }
              /*else {
                console.log(player);
                console.log("err: " + (socketid in players).toString());
              }*/
            }
            //socket.emit('map', JSON.stringify(send));
          }

        }
      }

      /*var ndata = JSON.stringify(data);*/
      //io.emit('map', ndata);
    }
    catch (e) {
      console.log(e + "error sending client data!");
    }

  } catch (e) {
  //console.log("error parsing JSON");
  run = false;
  }
}, 1000);

io.on('connection', function (socket) {

  var sockid = socket.id;

  socket.on('keyid', function (data) {
    try {
      var jdata;
      var run = true;
      try {
        jdata = JSON.parse(pdata);
      } catch (e) {
        console.log("error parsing JSON");
        run = false;
      }
      if (run) {
        for (var i = 0; i < jdata.players.length; i++) {
          var player = jdata.players[i];
          if (data.key === player.key && data.steamid === player.steamid)
          {
            players[socket.id.toString()] = player.steamid.toString();
            break;
          }
        }
      }
    } catch (e) {
      console.log("someone tried to crash the server!");
    }
  });

  socket.on('disconnect', function (reason) {
    try {
      //Free up RAM.
      console.log(reason);
      console.log(delete players[sockid.toString()]);
    } catch (e) {
      console.log(e);
    }
  });

});

http.listen(8000, function() {
  console.log('listening on *:8000');
});


// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {

    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);

    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        pdata = data.toString().split(";")[0];


        /*console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
        sock.write('You said "' + data + '"');*/

    });

    sock.on('error', function (error) {
      console.log(error);
    });

    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);

/*
{
  "rooms": [
    "hey",
    "larry",
    "scp 106 contained"
  ]
}
*/
