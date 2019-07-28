var scale;
var mousedownis = false;
var offsetx = 0;
var offsety = 0;
var pdata;
var canvas;
var ctx;
var socket = io.connect();
var render = 1;
var svgpath = window.location.protocol + "//" + window.location.host;

var imageslist = {};
for (var i = 0; i < Object.keys(images).length; i++) {
  var img = imageslist[Object.keys(images)[i]] = new Image();
  img.src = images[Object.keys(images)[i]];
}

var svg_chkp = new Image();
var svg_914 = new Image();
var svg_crossing = new Image();
var svg_straight = new Image();
var svg_airlock = new Image();
var svg_tesla = new Image();
var svg_troom = new Image();
var svg_curve = new Image();
var svg_intercom = new Image();
var svg_testroom = new Image();
var svg_servers = new Image();
var svg_012 = new Image();
var svg_079 = new Image();
var svg_096 = new Image();
var svg_106 = new Image();
var svg_173 = new Image();
var svg_372 = new Image();
var svg_049 = new Image();
var svg_hid = new Image();
var svg_cafe = new Image();
var svg_lift = new Image();
var svg_nuke = new Image();
var svg_toilets = new Image();
var svg_dspawn = new Image();
//svg_chkp.src = 'Chkp.png';
//svg_914.src = '914.png';
svg_crossing.src = 'Crossing.png';
svg_straight.src = 'Straight.png';
svg_airlock.src = 'Airlock.png';
svg_tesla.src = 'Tesla.png';
svg_troom.src = 'Troom.png';
svg_curve.src = 'Curve.png';
svg_intercom.src = 'Curve.png';
svg_testroom.src = 'Testroom.png';
svg_servers.src = 'Servers.png';

window.onload = function () {
  document.getElementById('steamid').value = getCookie("steamid");
  canvas = document.getElementById('map');
  if (!detectmob()) {
    canvas.addEventListener('mousedown', mousedown);
    canvas.addEventListener('mouseup', mouseup);
    canvas.addEventListener('mousemove', mousemove);
    canvas.addEventListener('mousewheel', mousewheel);
  }
  ctx = canvas.getContext('2d');
  scale = 5;

  socket.on('map', (data) => {
    if (data == "") return;
    pdata = data;
    //console.log(data);
  });

  setInterval(function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 4;
    draw();
  }, 10);
}

function draw() {
  if (pdata == "" || pdata == null || pdata == undefined) return;

  var coffx = offsetx * scale + (canvas.width / 2);
  var coffy = offsety * scale + (canvas.height / 2);

  ctx.fillStyle = 'rgb(100,100,100)';
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  var cscale = scale//(scale + (scale - 4));
  ctx.translate(coffx, coffy);
  ctx.scale(cscale, cscale);
  var obj = JSON.parse(pdata);
  ctx.textAlign = "center";


  for (var i = 0; i < obj.rooms.length; i++) {
    var room = obj.rooms[i];
    if (room.posy < -300 && render == 1) continue;
    else if (room.posy >= -300 && render != 1) continue;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(coffx, coffy);
    //ctx.translate(offsetx * scale, offsety * scale);
    ctx.scale(cscale, cscale);
    ctx.translate(/*-*/room.posx, -room.posz);
    ctx.scale(1, -1);
    ctx.rotate((-room.roty + 180) * Math.PI / 180);
    // //START: Debug rotation lines
    // ctx.beginPath();
    // ctx.moveTo(0, 0);
    // ctx.lineTo(0, 10);
    // ctx.strokeStyle = ctx.fillStyle;
    // ctx.stroke();
    // ctx.closePath();
    // //END: Debug rotation lines
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.imageSmoothingEnabled = false;
    var w = 21.3;
    var h = 21.3;
    var posx = 0;
    var posy = 0;
    var src = new Image();
    for (var k = 0; k < Object.keys(imageslist).length; k++) {
      var roomid = Object.keys(imageslist)[k];
      if (room.id.startsWith(roomid)) {
        src = imageslist[roomid];
        break;
      }
    }
    for (var k = 0; k < Object.keys(imagesizes).length; k++) {
      var roomid = Object.keys(imagesizes)[k];
      if (room.id.startsWith(roomid)) {
        w = imagesizes[roomid].x;
        h = imagesizes[roomid].y;
        posx = imagesizes[roomid].posx;
        posy = imagesizes[roomid].posy;
        break;
      }
    }
    if (src.width > src.height && w == 21.3) {
      w = src.width / (src.height / 21.3);
    }
    else if (src.width < src.height && h == 21.3) {
      h = src.height / (src.width / 21.3);
    }
    //ctx.scale(1, -1);
    ctx.drawImage(src, (/*src.width +*/-w / 2) + posx, (/*src.height +*/-h / 2) + posy, w, h);
    ctx.rotate(room.roty * Math.PI / 180);
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.font = (2) + 'px serif';
    var foundRoomName = false;
    var roomtrans = translations[translation].Rooms;
    for (var k = 0; k < Object.keys(roomtrans).length; k++) {
      var roomid = Object.keys(roomtrans)[k];
      var roomname = roomtrans[roomid];
      if (room.id.startsWith(roomid)) {
        foundRoomName = true;
        ctx.scale(-1, 1);
        ctx.fillText(roomname, /*-room.posx*/0, /*room.posz*/0);
        break;
      }
    }
    if (!foundRoomName) {
      ctx.scale(-1, 1);
      ctx.fillText(room.id, /*-room.posx*/0, /*room.posz*/0);
    }
    // ctx.fillText(room.id, -room.posx, room.posz);
  }

  //Players
  for (var i = 0; i < obj.players.length; i++) {
    var player = obj.players[i];
    if (player.posy < -300 && render == 1) continue;
    else if (player.posy >= -300 && render != 1) continue;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(coffx, coffy);
    // ctx.translate(offsetx * scale, offsety * scale);
    ctx.scale(cscale, cscale);
    if (player.team == "CLASSD") ctx.fillStyle = 'rgb(244, 191, 66)';
    else if (player.team == "CHAOS_INSURGENCY") ctx.fillStyle = 'rgb(46, 130, 10)';
    else if (player.team == "NINETAILFOX") ctx.fillStyle = 'rgb(32, 76, 252)';
    else if (player.team == "SCIENTISTS") ctx.fillStyle = 'rgb(229, 218, 57)';
    else if (player.team == "SCP") ctx.fillStyle = 'rgb(255, 0, 0)';
    else ctx.fillStyle = 'rgb(255, 255, 255)';//continue;
    ctx.translate(/*-*/player.posx, -player.posz);
    ctx.scale(1, -1);
    ctx.rotate((-player.roty + 180) * Math.PI / 180);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -10);
    ctx.strokeStyle = ctx.fillStyle;
    ctx.stroke();
    ctx.closePath();
    ctx.scale(1, -1);
    ctx.rotate((-player.roty + 180) * Math.PI / 180);
    var role = player.role;
    if (Object.keys(translations[translation].Roles).indexOf(player.role) != -1) role = translations[translation].Roles[player.role];
    ctx.font = (4) + 'px serif';
    ctx.fillText(player.name + " - " + role, 0, 0/*-player.posx, player.posz*/);
  }

  //SCP Rings
  if (obj.scpradii != undefined)
  {
    for (var i = 0; i < obj.scpradii.length; i++) {
      var scp = obj.scpradii[i];
      if (scp.posy < -300 && render == 1) continue;
      else if (scp.posy >= -300 && render != 1) continue;
      if (scp.radius == 0) continue;
      //console.log(scp);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.translate(coffx, coffy);
      // ctx.translate(offsetx * scale, offsety * scale);
      ctx.scale(cscale, cscale);
      ctx.font = (3) + 'px serif';
      ctx.fillStyle = 'rgb(255, 0, 0)';
      ctx.strokeStyle = ctx.fillStyle;
      var role = scp.role;
      if (Object.keys(translations[translation].Roles).indexOf(scp.role) != -1) role = translations[translation].Roles[scp.role];
      ctx.fillText(scp.name + " - " + role, -1 * parseInt(scp.posx) - Math.abs(parseInt(scp.radius) / 3), parseInt(scp.posz) + Math.abs(parseInt(scp.radius) / 3));
      ctx.beginPath();
      ctx.arc(scp.posx, -scp.posz, scp.radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.closePath();
    }
  }
}

function toggleSavedCookies() {
  var steamid = document.getElementById('steamid').value;
  if (getCookie("steamid") === "")
    setCookie("steamid", steamid, 52);
  else
    setCookie("steamid", steamid, -1);
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function login() {
  var steamid = document.getElementById('steamid').value;
  var key = document.getElementById('key').value;
  socket.emit('keyid', {
    "key": key,
    "steamid": steamid
  });
  document.getElementById('login').style.display = "none";
}

function scaleIn(zoom) {
  for (var i = 0; i < zoom; i++) {
    scale++;
    //offsetx += (canvas.width) / 2;
    //offsety += (canvas.height) / 2;
  }
}

function scaleOut(zoom) {
  for (var i = 0; i < zoom; i++) {
    scale--;
    if (scale < 1) {
      scale = 1;
      return;
    }
    //offsetx -= (canvas.width * (scale - 4)) / 2;
    //offsety -= (canvas.height * (scale - 4)) / 2;
  }
}

function changeRender() {
  render++;
  if (render > 2) render = 1;
}

function center() {
  /*try {
    var obj = JSON.parse(pdata);
    var hasfound = false;
    var i = 0;
    var players = obj.players;
    while (!hasfound) {
      if (i >= players.length) { hasfound = true; throw new ReferenceError("OOF."); }
      if (players[i].posy < -300 && render == 1) { i++; continue; }
      else if (players[i].posy >= -300 && render != 1) { i++; continue; }
      offsetx = parseInt(players[i].posx);// / scale - (canvas.width / 2);// + parseInt(canvas.width/2);
      offsety = parseInt(players[i].posz);// / scale - (canvas.height / 2);// + parseInt(canvas.height/2);
      hasfound = true;
    }
  } catch (e) {
    try {
      if (render == 1) {
        offsetx = parseInt(obj.lczrooms[0].posx);// + 100;// + parseInt(canvas.width/3);
        offsety = parseInt(obj.lczrooms[0].posz);// + 100;// + parseInt(canvas.height/3);
      }
      if (render == 2) {
        offsetx = parseInt(obj.hczrooms[0].posx);// + 100;// + parseInt(canvas.width/3);
        offsety = parseInt(obj.hczrooms[0].posz);// + 100;// + parseInt(canvas.height/3);
      }
      if (render == 3) {
        offsetx = parseInt(obj.ezrooms[0].posx);// + 100;// + parseInt(canvas.width/3);
        offsety = parseInt(obj.ezrooms[0].posz);// + 100;// + parseInt(canvas.height/3);
      }
    } catch (e) {
      console.log(e + " - no place to reset to.");
    }
  }*/
}

function mousedown(e) {
  if (e.which == 1) {
    mousedownis = true;
  }
  else if (e.which == 2) {
    changeRender();
  }
  else if (e.which == 3) {
    center();
  }
}

function mouseup(e) {
  mousedownis = false;
}

function mousewheel(e) {
  var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
  if (delta > 0)
    scaleIn(1);
  else
    scaleOut(1);
}

function mousemove(e) {
  if (mousedownis) {
    offsetx += e.movementX / scale;
    offsety += e.movementY / scale;
  }
}

function detectmob() {
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}
