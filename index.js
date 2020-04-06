
var canv= document.getElementById("canv");
var ctx = canv.getContext("2d");
var scor=document.getElementById("score");
var randx,randy,score=0,tail=[],x=0,posX=10,posY=0,y=0;
//RANDOM VARIABLE FOR FOOD
var rand=()=>{
randx=Math.round((Math.random()*(canv.width-0)+0)/10)*10;
randy=Math.round((Math.random()*(canv.height-0)+0)/10)*10;
};

//Snake Creation(SQUARE BOX)
var snake = (a,b) => 
{
    for (let i=0; i<tail.length; i++) 
    {
        ctx.fillRect(tail[i].x,tail[i].y, 15, 15);
        ctx.strokeStyle="black";
        ctx.lineWidth=2;
        ctx.strokeRect(tail[i].x,tail[i].y,15,15);
    }
    ctx.fillRect(a,b,15,15);
    ctx.strokeStyle="black";
    ctx.lineWidth=2;
    ctx.strokeRect(a,b,15,15);

}

//Collision Check
var checkCollision = ()=> {
    for (var i=0; i<tail.length; i++) {
      if (x === tail[i].x &&
        y === tail[i].y) {
        score = 0;
        tail = [];
      }
    }
  }
//FOOD GENERATOR
var food = () => 
    {
        snake(randx,randy);
    }

//Snake moveS
snakeMove = () => 
{
    for (let i=0; i<tail.length - 1; i++) 
    {
        tail[i] = tail[i+1];
    }
  
      tail[score - 1] = { x:x, y:y };
    x+=posX;
    y+=posY;
    if(x>canv.width)
    {
        x=0;
    }
    if(x<0)
    {
        x=canv.width;
    }
    if(y>canv.height)
    {
        y=0;
    }
    if(y<0)
    {
        y=canv.height;
    }
     
    if(x==randx&&y==randy){
        score++;
        console.log("snake ate",score);
        scor.innerHTML="Score : "+score;

        rand();
    }
    console.log(x,y,randx,randy);
    ctx.fillStyle ="brown"; 
    ctx.fillRect(0, 0, canv.width-10, canv.height-10);
    ctx.fillStyle="yellow";
    snake(x,y); 
}
rand();
window.setInterval(() => 
{
    ctx.clearRect(0, 0, canv.width, canv.height);
    
    snakeMove();
    ctx.fillStyle="white";
    food();
    checkCollision();

}, 1000/15); 
window.addEventListener("keydown",(e)=>{ 
     switch(e.keyCode)
    {
        case 40: 
        posY=10;
        posX=0; 
        break;
        case 38: 
        posY=-10;
        posX=0;
        break;
        case 37: 
        posY=0;
        posX=-10;
        break;
        case 39: 
        posY=0;
        posX=10; 
        break;
    } 
    });
