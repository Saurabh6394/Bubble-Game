let timer = 60;
var score = -10;

function makeBubble() {
let clutter = " ";
for(let i = 0; i<=167; i++){
  let rn = Math.floor(Math.random()*10);
    clutter += `<div class="bubble">${rn}</div>`;
}

document.querySelector("#panel-bottom").innerHTML = clutter;
}

makeBubble();


function runTimer() {
    let timerint = setInterval(function() {
        if(timer > 0){
            timer--;
            document.querySelector("#timervalue").textContent = timer;
        }  else {
            clearInterval(timerint);
            document.querySelector("#panel-bottom").innerText = ""
            document.querySelector("#panel-bottom").innerHTML = `<h1>Stop !!</h1> </br> <h1> Your Game is finish,Your Score is ${score} <h1>`;
            document.querySelector("#hitval").textContent = 0;
        }
    },1000)
}

runTimer();

let hitrn ;

function getNewHit() {
    hitrn = Math.floor(Math.random()*10);
    document.querySelector("#hitval").textContent = hitrn;
}
getNewHit();




function increaseScore(){
    score = score + 10;
    document.querySelector("#scoreval").textContent = score;
}

increaseScore();

let item = document.querySelector("#panel-bottom");

item.addEventListener("click",function (details) {
   let clickedNumber = Number(details.target.textContent); 
   if(clickedNumber === hitrn ) {
      increaseScore();
      makeBubble();
      getNewHit();
   }  else {
    document.querySelector("#panel-bottom").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("#panel-bottom").style.backgroundColor = "white";
        },150)
        reset();
      
   }
})

function reset() {
   document.querySelector("#hitval").innerText = 0;
    document.querySelector("#scoreval").textContent = 0;
    timer = 60;
    document.querySelector("#panel-bottom").innerHTML = `<h1> Wrong Choice !!, Your Score is <h1> ${score} </br>  <h1>, Please enter any key to start the new game </h1>.`
}







