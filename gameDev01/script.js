window.onload = function(){
  var canvas = document.getElementById("myCanvas");
  canvas.height = 400;
  canvas.width = 400;
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'blue';
  ctx.fillRect(0, 0, 100, 100);
}
