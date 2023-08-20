const screen = document.querySelectorAll(".screen")
const insectButtons = document.querySelectorAll(".choose-insect-btn");
const startButton = document.getElementById("start-btn");
const time = document.getElementById("time");
const score = document.getElementById("score");
const message = document.getElementById("message");
const gameContainer  = document.getElementById("game-container")
const restartButton = document.querySelector(".restart-btn")
let seconds = 0;
let scoreKeeper = 0;
let selectedInsects = {}


restartButton.addEventListener("click", ()=>{
   window.location.reload()
})
startButton.addEventListener("click", ()=>
{
     screen[0].classList.add("up")
})

insectButtons.forEach(btn => 
    {
    btn.addEventListener("click" , ()=>{
        const image = btn.querySelector("img");
        const src = image.getAttribute("src")
        const alt = image.getAttribute("alt")
        selectedInsects = {src,alt}
        screen[1].classList.add("up")
        setTimeout(createInsect,1000)
        startGame(); 

    })
});

function startGame()
{
    setInterval(increaseTime,1000)
}
function increaseTime()
{
    let min = Math.floor(seconds / 60);
    let s = seconds%60;
    min = min<10?`0${min}`:min
    s = min<10?`0${s}`:s
    time.innerHTML = `Time: ${min}:${s}`
    seconds++
}
function createInsect ()
{
    const insect = document.createElement("div")
    insect.classList.add("insect");
    const {x,y} = getRandomLocation();
    insect.style.top = `${y}px`
    insect.style.left = `${x}px`
    insect.innerHTML = `<img src =" ${selectedInsects.src}" alt = "${selectedInsects.alt }" style = "transform:rotate(${Math.random()  *360}deg)"/>`

    gameContainer.append(insect)
    insect.addEventListener("click" , catchInsect)

}
function getRandomLocation()
{
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random()*(width - 200)+100
    const y = Math.random()*(height - 200)+100
    return {x,y}
}


function catchInsect()
{
    increaseScore()
    this.classList.add("caught")
    setTimeout(() => this.remove(), 2000);
    addInsects();

}
function addInsects()
{
    setTimeout(createInsect,1000)
    setTimeout(createInsect,1500)
}
function increaseScore()
{
    scoreKeeper++
    if(scoreKeeper>10)
    {
        message.classList.add("visible")
    }
    score.innerHTML = `Score:${scoreKeeper}`
}