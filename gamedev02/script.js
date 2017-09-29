window.onload = function(){
  var canvas = document.getElementById("myCanvas");
  var restart = document.getElementById("restart");
  var ctx = canvas.getContext('2d');
  const GAME_WIDTH = 800;
  const GAME_HEIGHT = 590;
  canvas.height = GAME_HEIGHT;
  canvas.width = GAME_WIDTH;

  var isMoving = false;

  var game = {
    background: {
      x: 0, y: 0, h: GAME_HEIGHT, w: GAME_WIDTH, imgSrc: "Assets/background.jpg", speedX: 0, speedY: 0, flipImgSrc: "Assets/background_flipped.jpg", renderCount: 1
    },
    player: {
      x: 100, y: GAME_HEIGHT/2 -75, h: 80, w: 80, imgSrc:"Assets/pika.png", speedX: 5, speedY: 0
    },
    enemy: {
      x: 300, y: GAME_HEIGHT/2 -75, h: 80, w: 80, imgSrc:"Assets/gengar.png", speedX: 0, speedY: 5
    },
    enemy1: {
      x: 600, y: GAME_HEIGHT/2 -75, h: 80, w: 80, imgSrc:"Assets/drowsy.png", speedX: 0, speedY: 7
    },
    enemy2: {
      x: 900, y: GAME_HEIGHT/2 -75, h: 80, w: 80, imgSrc:"Assets/gengar.png", speedX: 0, speedY: 9
    },
    goal: {
      x: 1200, y: GAME_HEIGHT/2 -75, h: 80, w: 80, imgSrc:"Assets/ball.png", speedX: 0, speedY: 0
    },
    over: false
  }

  canvas.addEventListener('mousedown', function(){
    isMoving = true;
  });

  canvas.addEventListener('mouseup', function(){
    isMoving = false;
  });

  var isCollision = function(player, obj){
    var case1 = false, case2 = false;
    if(obj.x < player.x + player.w && obj.x + obj.w > player.x){
      case1 = true;
    }
    if(obj.y < player.y + player.h && obj.y + obj.h > player.y){
      case2 = true;
    }
    var collisionState =  case1 && case2;
    if(collisionState && obj == game.goal){
      window.alert("Congrats");
    } else if(collisionState){
      window.alert("Game Over");
    }
    return collisionState
  }

  var checkCollisions = function(){
    var enemyCollision = isCollision(game.player, game.enemy);
    var enemy1Collision = isCollision(game.player, game.enemy1);
    var enemy2Collision = isCollision(game.player, game.enemy2);
    var goalCollision = isCollision(game.player, game.goal);
    return enemyCollision || enemy1Collision || enemy2Collision || goalCollision
  }

  var updateObj = function(obj, isBg){
    obj.y += obj.speedY;
    if(obj.y > GAME_HEIGHT || obj.y < 0){
      obj.speedY *= -1;
    }
    if(isMoving){
      obj.x -= game.player.speedX;
      if(isBg){
        if(obj.w + obj.x < 0){
          obj.x = 0;
          obj.renderCount += 1;
        }
      }
    }
  }

  var update = function(){
    if(checkCollisions()){
      game.over = true;
    } else {
      updateObj(game.background, true);
      updateObj(game.enemy);
      updateObj(game.enemy1);
      updateObj(game.enemy2);
      updateObj(game.goal);
    }
  }

  var drawObj = function(obj){
    var image = new Image();
    image.src = obj.imgSrc;
    image.onload = function(){
      ctx.drawImage(image, 0, 0, obj.w, obj.h, obj.x, obj.y, obj.w, obj.h);
    }
  }

  var drawBg = function(obj){
    var image1 = new Image();
    var image2 = new Image();
    var parWid;

    if(obj.renderCount % 2 == 1){
      image1.src = obj.imgSrc;
      image2.src = obj.flipImgSrc;
    } else {
      image1.src = obj.flipImgSrc;
      image2.src = obj.imgSrc;;
    }
    image1.onload = function(){
      ctx.drawImage(image1, 0, 0, obj.w, obj.h, obj.x, obj.y, obj.w, obj.h);
    }

    image2.onload = function(){
      parWid = -1 * obj.x || obj.x;
      if(parWid > 0){
        ctx.drawImage(image2, 0, 0, parWid, obj.h, obj.w - parWid, obj.y, parWid, obj.h);
      }
    }
  }

  var draw = function(){
    drawBg(game.background);
    drawObj(game.player);
    drawObj(game.enemy);
    drawObj(game.enemy1);
    drawObj(game.enemy2);
    drawObj(game.goal);
  }

  var render = function(){
    draw();
    update();
    if(!game.over){
      window.requestAnimationFrame(render);
    }
  }

  render();

}
