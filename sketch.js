const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope,rope2,rope3;
var fruit_con,fruit_con2,fruit_con3;
var bg, food, rabbit;
var bunny;
var button,button2,button3;
var blink,eat,sad;
var airSound,eatingSound,ropecutSound,bgSound;
var balloon;
var airButton;
var soundButton;
var sadSound;
var canvasW,canvasH;
var starImg,star, star2,emptyStar,oneStar,twoStar;
var starMeter;
var starFlag=0;


function preload(){
  bg=loadImage("background.png");
  rabbit=loadImage("Rabbit-01.png");
  food = loadImage("melon.png");
  balloon = loadImage("balloon.png")
  starImg= loadImage("StarImages/star.png")
  
  twoStar = loadAnimation("StarImages/g_stars.png")
  oneStar = loadAnimation("StarImages/one_star.png")
  emptyStar = loadAnimation("StarImages/stars.png")
  eat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
  
  airSound= loadSound("air.wav");
  eatingSound = loadSound("eating_sound.mp3");
  ropecutSound=loadSound("rope_cut.mp3");
  bgSound= loadSound("sound1.mp3");
  sadSound=loadSound("sad.wav")

  blink.playing=true;
  eat.playing=true;
  eat.looping = false;
  sad.looping =false;

}
function setup() 
{
  createCanvas(600,700)
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  starMeter=createSprite(540,50)
  starMeter.addAnimation("empty",emptyStar)
  starMeter.scale=0.2
  starMeter.addAnimation("one",oneStar)
  starMeter.addAnimation("two",twoStar)

  star=createSprite(300,50)
  star.addImage(starImg)
  star.scale=0.02

  star2=createSprite(370,400)
  star2.addImage(starImg)
  star2.scale=0.02

  blink.frameDelay=20
  sad.frameDelay=20
  eat.frameDelay=30
  bunny=createSprite(350,height-80,100,100)
  bunny.addAnimation("blink",blink)
  bunny.addAnimation("sad",sad)
  bunny.addAnimation("eat",eat)
  bunny.scale=0.2

  
  button2=createImg("cut_btn.png")
  button2.position(40,30)
  button2.size(50,50)
  button2.mouseClicked(drop2)

  button3=createImg("cut_btn.png")
  button3.position(360,190)
  button3.size(50,50)
  button3.mouseClicked(drop3)

  ground = new Ground(300,height,width,20);  


  soundButton=createImg("mute.png")
  soundButton.position(460,0)
  soundButton.size(40,40)
  soundButton.mouseClicked(bgButton)


  bgSound.play()
  bgSound.setVolume(0.2)

  airButton=createImg("balloon2.png")
  airButton.position(250,300)
  airButton.size(100,150)
  airButton.mouseClicked(airBlow)


  

 
  rope2= new Rope(8,{x:50 ,y:30});
  rope3= new Rope(5,{x:400,y:200})
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope2.body,fruit);

   
  fruit_con2 = new Link(rope2,fruit);
  fruit_con3 = new Link(rope3,fruit);
  


  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg,width/2,height/2,width,height)
  rope2.show();
  rope3.show();
  
  if(fruit != null){
    image(food,fruit.position.x,fruit.position.y,75,75);
  }
  
  Engine.update(engine);
  ground.show();
  
  
  if(collide(fruit,bunny,80)==true){
    bunny.changeAnimation("eat")
    eatingSound.play()
    eatingSound.setVolume(0.6)
    bgSound.stop()
    World.remove(world,fruit)
    fruit=null
  }

  if(collide(fruit,ground.body,80)==true){
    bunny.changeAnimation("sad")
    //console.log("bunnysad")
    sadSound.play()
    sadSound.setVolume(0.2)
    bgSound.stop()
    World.remove(world,fruit)
    fruit=null
  }
  //console.log(fruit.position.x)
  if( fruit!=null && fruit.position.x>600 ){
    World.remove(world,fruit)
    fruit=null
    bunny.changeAnimation("sad")
    bgSound.stop()
    sadSound.play()
    sadSound.setVolume(0.2)
    
  }
  if(starFlag==1){
    starMeter.changeAnimation("one")

  }
  else if(starFlag==2){
    starMeter.changeAnimation("two")

  }
  //console.log(starFlag)
  if(collide(fruit,star,30)== true){
    star.x=width+20
    starFlag+=1;
  }
  if(collide(fruit,star2,30)== true){
    star2.x=width+20
    starFlag+=1;
  }
  
 
   drawSprites()
}

 
function drop2(){
  ropecutSound.play()
  ropecutSound.setVolume(0.9)
  rope2.break()
  fruit_con2.detach()
  fruit_con2=null
  button2.hide()
}
function drop3(){
  ropecutSound.play()
  ropecutSound.setVolume(0.9)
  rope3.break()
  fruit_con3.detach()
  fruit_con3=null
  button3.hide()
}
function collide(body,sprite,x){
  if(body != null){

    var d=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if(d<x){
     
      return true
    }
    else{
      return false
    }
  }

}


function airBlow(){
  if(fruit != null){
    Body.applyForce(fruit,{x:0,y:0},{x:0 ,y:-0.03})
  }
    
  airSound.play()
  airSound.setVolume(0.25)
}



function bgButton(){
  if(bgSound.isPlaying()){
    bgSound.stop()

  }
  else{
    bgSound.play()
  }
}