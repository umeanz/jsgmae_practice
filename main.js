var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight -100;

var img2 = new Image();
img2.src = 'dino.png'

var dino = {
    x: 10,
    y: 200,
    width: 50,
    height: 50,
    draw(){
        ctx.fillStyle ='green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img2, this.x, this.y)
    }
}

var img1 = new Image();
img1.src = 'cactus.png'

class Cactus{
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img1, this.x, this.y)
    }

}

var timer = 0; // 
var cactusArray = [];
var jumpTimer = 0;
var animation;

function eachFrameWroks(){
    animation = requestAnimationFrame(eachFrameWroks);
    timer++;
    ctx.clearRect(0, 0, canvas.width, canvas.height); //잔상지우기
    
    if (timer % 120 === 0){ //creat cactus every 60 and push in array 
     var cactus = new Cactus();
      cactusArray.push(cactus);
     }

    cactusArray.forEach((a, i, o) => {
        if(a.x < 0){
             o.splice(i, 1) //remove element from array
        }
         a.x--;
         crashEachOther(dino, a);// in the loop keep cheking the crash

         a.draw();//draw all object from array
     })


    //jump function
    if(jump == true){
        dino.y --; 
        jumpTimer++;
    }
    if (jump == false){
        if(dino.y < 200)
        dino.y++;
        }
    if(jumpTimer > 100){
        jump = false;
        jumpTimer = 0
    }
       
    dino.draw();
}

eachFrameWroks();

//collision check
function crashEachOther(dino, cactus){
  var xdiff = cactus.x - (dino.x+dino.width)
  var ydiff = cactus.y - (dino.y+dino.height)
  if(xdiff < 0 && ydiff <0){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animation)
  }

}



var jump = false;
document.addEventListener('keydown', function(e){
    if(e.code === 'Space'){
        jump = true;
    }
})
