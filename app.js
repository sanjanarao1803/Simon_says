let gameseq = [];
let userseq = [];
let high = 0;

let started = false;
let level = 0;

let btns = ["one" , "two" , "three" , "four"];

let h2 = document.querySelector("h2");

//any key press to start game

document.addEventListener("keypress" , function(){
    if(started == false){
        console.log("game started");
        started = true;

        levelUp();
    }
});

//when btn is selected - flash it by changing its bg colour

function gameFlash(btn){
    btn.classList.add("gameflash");
    setTimeout(function(){
        btn.classList.remove("gameflash");
    }, 250);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250);
}


function levelUp(){
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    //choose random button
    let randIdx = Math.floor(Math.random() * 3);
    let randCol = btns[randIdx];
    let randBtn = document.querySelector(`.${randCol}`);

    gameseq.push(randCol);
    console.log(gameseq);

    gameFlash(randBtn);
}

//user clicking the button
function checkans(idx){

    if(userseq[idx]==gameseq[idx]){
        if(userseq.length == gameseq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        if(level > high){
            high=level;
            h2.innerHTML = `Game over! Congrats on crossing your high score.<br>Your score is <b>${level}</b>.<br>Press any key to start again`;
        }
        else{
            h2.innerHTML = `Game over! Your score is <b>${level}</b>.<br>High score is ${high}.</br>Press any key to start again`;
        }
        
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "bisque";
        },300);
        reset();
    }
}
function btnPress(){
    // console.log("Button pressed");
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userseq.push(userColor);

    checkans(userseq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

//reset game

function reset(){
    level=0;
    gameseq=[];
    userseq=[];
    started=false;
}