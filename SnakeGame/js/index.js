// Game Constants & Variables
let inputDir = {x: 0, y: 0}; 
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');

let t1 = 0;
let t2 = 0;


let obstacles=[{x:4,y:4},{x:14,y:14},{x:4,y:4},{x:14,y:14},{x:4,y:4},{x:14,y:14}]
let speed=8

function easy(){
     speed = 6;
     obstacles=[{x:4,y:4},{x:14,y:14},{x:4,y:4},{x:14,y:14},{x:4,y:4},{x:14,y:14}]
     
}
function medium(){
     speed = 12;
     obstacles=[{x:4,y:4},{x:14,y:14},{x:9,y:17},{x:12,y:3},{x:4,y:4},{x:14,y:14}]
}
function hard(){
     speed = 16;
     obstacles=[{x:3,y:15},{x:16,y:14},{x:9,y:17},{x:16,y:3},{x:2,y:7},{x:7,y:2}]
}

let score = 0;
let arr1=[0,0];
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];

let kno="ArrowUp";
food = {x: 6, y: 7};

// Game Functions
function main(ctime) {
     
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            
            return true;
        }
    }

    // If the snake bump to the obstrucaals

    if((snake[0].x==obstacles[0].x)&&(snake[0].y==obstacles[0].y)||
    (snake[0].x==obstacles[1].x)&&(snake[0].y==obstacles[1].y)||
    (snake[0].x==obstacles[2].x)&&(snake[0].y==obstacles[2].y)||
    (snake[0].x==obstacles[3].x)&&(snake[0].y==obstacles[3].y)||
    (snake[0].x==obstacles[4].x)&&(snake[0].y==obstacles[4].y)||
    (snake[0].x==obstacles[5].x)&&(snake[0].y==obstacles[5].y)){
   
        return true;
    }


    // If you bump into the wall
    if(snake[0].x >18 || snake[0].x <0 || snake[0].y >18 || snake[0].y <0){
        
        return true;
    }
        
    return false;
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){

        gameOverSound.play();
        musicSound.pause();
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        //musicSound.play();
        score = 0; 
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();

        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        function fx(){
           let fx1= Math.round((b-a)* Math.random())
            return fx1;
        }
        function fy(){
            let fy1= Math.round(a + (b-a)* Math.random())
             return fy1;
         }
         function fz(){
            let fx11=fx();
            let fy11=fy();
            // console.log(fx11);
            // console.log(fy11);
            arr1[0]=fx11;
            arr1[1]=fy11;
            for(let i=0;i<snakeArr.length;i++){
                if((fx11==snakeArr[i].x) &&(fy11==snakeArr[i].y)||
                (fx11==obstacles[0].x)&&(fy11==obstacles[0].y)||
                (fx11==obstacles[1].x)&&(fy11==obstacles[1].y)||
                (fx11==obstacles[2].x)&&(fy11==obstacles[2].y)||
                (fx11==obstacles[3].x)&&(fy11==obstacles[3].y)||
                (fx11==obstacles[4].x)&&(fy11==obstacles[4].y)||
                (fx11==obstacles[5].x)&&(fy11==obstacles[5].y)){
                    console.log("changed the place.")
                    fx();fy();fz();
                }
            }
            // console.log(arr1);
         }
         fz();

        food = {x: arr1[0], y:arr1[1]}
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

    
    for(let i=0;i<obstacles.length;i++){
        obsElement = document.createElement('div');
        obsElement.style.gridRowStart = obstacles[i].y;
        obsElement.style.gridColumnStart = obstacles[i].x;
        obsElement.classList.add('obstacles')
        board.appendChild(obsElement);
    }
   
   
}

// Main logic starts here
//musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);

window.addEventListener('keydown', e =>{
   
    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();
    if(e.key=="ArrowUp"){
        if(kno!="ArrowDown"){
           inputDir.x = 0;
           inputDir.y =-1; 
           }
           else{
               inputDir.x = 0;
               inputDir.y =1;   
           }
       }
       else if(e.key=="ArrowDown"){
           if(kno!="ArrowUp"){
           inputDir.x = 0;
           inputDir.y = 1; 
           }
           else{
               inputDir.x = 0;
               inputDir.y = -1;   
           }
       }
       else if(e.key=="ArrowLeft" ){
           
           if( kno!="ArrowRight"){
               inputDir.x = -1;
               inputDir.y = 0;
               }
               else{
                   inputDir.x = 1;
                   inputDir.y = 0;   
               }
       }
       else if(e.key=="ArrowRight" && kno!="ArrowLeft"){
           if( kno!="ArrowLeft"){
               inputDir.x = 1;
               inputDir.y = 0;
               }
               else{
                   inputDir.x = -1;
                   inputDir.y = 0;   
               }
       }
       else{
       
       }
       kno=e.key;
       });
