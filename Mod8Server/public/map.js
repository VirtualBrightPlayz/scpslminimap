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
var svg_chkp = new Image();
var svg_914 = new Image();
var svg_crossing = new Image();
var svg_straight = new Image();
var svg_airlock = new Image();
var svg_tesla = new Image();
var svg_troom = new Image();
var svg_curve = new Image();
//svg_chkp.src = 'Chkp.png';
//svg_914.src = '914.png';
svg_crossing.src = 'Crossing.png';
svg_straight.src = 'Straight.png';
svg_airlock.src = 'Airlock.png';
svg_tesla.src = 'Tesla.png';
svg_troom.src = 'Troom.png';
svg_curve.src = 'Curve.png';

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
  });

  setInterval(function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 4;
    draw();
  }, 10);
}

function draw() {
  if (pdata == "" || pdata == null || pdata == undefined) return;

  var coffx = offsetx + (canvas.width / 2);
  var coffy = offsety + (canvas.height / 2);

  ctx.fillStyle = 'rgb(100,100,100)';
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  var cscale = scale//(scale + (scale - 4));
  ctx.translate(coffx, coffy);
  ctx.scale(cscale, cscale);
  var obj = JSON.parse(pdata);
  ctx.textAlign = "center";

  //Light Containment Zone Rooms
  for (var i = 0; i < obj.lczrooms.length; i++) {
    if (render != 1) break;
    var room = obj.lczrooms[i];
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(coffx, coffy);
    ctx.translate(offsetx * scale, offsety * scale);
    ctx.scale(cscale, cscale);
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.font = (2) + 'px serif';
    ctx.fillText(room.id, -room.posx, room.posz);
    var src = new Image();
    //if (room.id.startsWith("Root_Chkp")) src = svg_chkp;
    if (room.id.startsWith("Root_Crossing")) src = svg_crossing;
    if (room.id.startsWith("Root_Straight")) src = svg_straight;
    if (room.id.startsWith("Root_Airlock")) src = svg_airlock;
    if (room.id.startsWith("Root_Troom")) src = svg_troom;
    if (room.id.startsWith("Root_Curve")) src = svg_curve;
    //if (room.id.startsWith("Root_914")) src = svg_914;
    ctx.translate(-room.posx, room.posz);
    ctx.rotate(room.roty * Math.PI / 180);
    /*ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 10);
    ctx.strokeStyle = ctx.fillStyle;
    ctx.stroke();
    ctx.closePath();*/
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(src, -(/*src.width +*/ 21.3) / 2, -(/*src.height +*/ 21.3) / 2, 21.3, 21.3);
  }

  //Heavy Containment Zone Rooms
  for (var i = 0; i < obj.hczrooms.length; i++) {
    if (render != 2) break;
    var room = obj.hczrooms[i];
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(coffx, coffy);
    ctx.translate(offsetx * scale, offsety * scale);
    ctx.scale(cscale, cscale);
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.font = (2) + 'px serif';
    ctx.fillText(room.id, -room.posx, room.posz);
    var src = new Image();
    if (room.id.startsWith("Root_Crossing")) src = svg_crossing;
    if (room.id.startsWith("Root_Straight")) src = svg_straight;
    if (room.id.startsWith("Root_Tesla")) src = svg_tesla;
    if (room.id.startsWith("Root_Room3")) src = svg_troom;
    if (room.id.startsWith("Root_Curve")) src = svg_curve;
    ctx.translate(-room.posx, room.posz);
    ctx.rotate(room.roty * Math.PI / 180);
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(src, -(/*src.width +*/ 21.3) / 2, -(/*src.height +*/ 21.3) / 2, 21.3, 21.3);
  }

  //Entrance Zone Rooms
  for (var i = 0; i < obj.ezrooms.length; i++) {
    if (render != 2) break;
    var room = obj.ezrooms[i];
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(coffx, coffy);
    ctx.translate(offsetx * scale, offsety * scale);
    ctx.scale(cscale, cscale);
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.font = (2) + 'px serif';
    ctx.fillText(room.id, -room.posx, room.posz);
    var src = new Image();
    /*if (room.id.startsWith("Root_Chkp")) src = svg_chkp;
    if (room.id.startsWith("Root_Crossing")) src = svg_crossing;
    if (room.id.startsWith("Root_Straight") || room.id.startsWith("Root_Airlock")) src = svg_straight;
    if (room.id.startsWith("Root_Troom")) src = svg_troom;
    if (room.id.startsWith("Root_914")) src = svg_914;*/
    ctx.translate(-room.posx, room.posz);
    ctx.rotate(room.roty * Math.PI / 180);
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.drawImage(src, -(/*src.width +*/ 21.3) / 2, -(/*src.height +*/ 21.3) / 2, 21.3, 21.3);
  }

  //Players
  for (var i = 0; i < obj.players.length; i++) {
    var player = obj.players[i];
    if (player.posy < -300 && render == 1) continue;
    else if (player.posy >= -300 && render != 1) continue;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(coffx, coffy);
    ctx.translate(offsetx * scale, offsety * scale);
    ctx.scale(cscale, cscale);
    if (player.team == "CLASSD") ctx.fillStyle = 'rgb(244, 191, 66)';
    else if (player.team == "CHAOS_INSURGENCY") ctx.fillStyle = 'rgb(46, 130, 10)';
    else if (player.team == "NINETAILFOX") ctx.fillStyle = 'rgb(32, 76, 252)';
    else if (player.team == "SCIENTISTS") ctx.fillStyle = 'rgb(229, 218, 57)';
    else if (player.team == "SCP") ctx.fillStyle = 'rgb(255, 0, 0)';
    else ctx.fillStyle = 'rgb(255, 255, 255)';//continue;
    ctx.font = (4) + 'px serif';
    ctx.fillText(player.name + " - " + player.role, -player.posx, player.posz);
    ctx.translate(-player.posx, player.posz);
    ctx.rotate((player.roty) * Math.PI / 180);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 10);
    ctx.strokeStyle = ctx.fillStyle;
    ctx.stroke();
    ctx.closePath();
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
      ctx.translate(offsetx * scale, offsety * scale);
      ctx.scale(cscale, cscale);
      ctx.font = (3) + 'px serif';
      ctx.fillStyle = 'rgb(255, 0, 0)';
      ctx.strokeStyle = ctx.fillStyle;
      ctx.fillText(scp.name + " - " + scp.role, -1 * parseInt(scp.posx) - Math.abs(parseInt(scp.radius) / 3), parseInt(scp.posz) + Math.abs(parseInt(scp.radius) / 3));
      ctx.beginPath();
      ctx.arc(-scp.posx, scp.posz, scp.radius, 0, 2 * Math.PI);
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
  try {
    var obj = JSON.parse(pdata);
    var hasfound = false;
    var i = 0;
    while (!hasfound) {
      if (players[i].posy < -300 && render == 1) { i++; continue; }
      else if (players[i].posy >= -300 && render != 1) { i++; continue; }
      offsetx = parseInt(obj.players[i].posx);// + 100;// + parseInt(canvas.width/2);
      offsety = parseInt(obj.players[i].posz);// + 100;// + parseInt(canvas.height/2);
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
  }
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
