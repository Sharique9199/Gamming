import teamArr from './gameDetails.js';

var data = document.querySelectorAll(".card");
data.forEach((elem, i) => {
    elem.addEventListener("click", () => {
        displayPopupAndBlur(i)
    });
})
function displayPopupAndBlur(index) {
    setPopupData(index);
    document.querySelector("#blur").style.display = "block";
    document.querySelector("#popup-wraper").style.display = "block";
}

// close popup

document.querySelector("#close-popup").addEventListener("click", closePopUp)
function closePopUp() {
    // console.log("Sharique");
    document.querySelector("#popup-wraper").style.display = 'none';
    document.querySelector("#blur").style.display = "none";
}


function setPopupData(indexArr) {
    let myFilteredData = teamArr[indexArr];
    let gamePath=["/dragon_game/index.html","/MAZE_GAME/index.html","/breakout/index.html","/SnakeGame/index.html","/stone/index.html","/TicTacToe/index.html"]
    let popup = document.querySelector('#popup');
   

    popup.firstElementChild.nextElementSibling.firstElementChild.src = myFilteredData.designerImg;

    popup.lastElementChild.firstElementChild.innerText = myFilteredData.designer;

    popup.lastElementChild.firstElementChild.nextElementSibling.innerText = myFilteredData.gameNAme

    popup.lastElementChild.lastElementChild.previousElementSibling.innerText = myFilteredData.desc;
    popup.lastElementChild.lastElementChild.addEventListener("click",()=>{
        playGame(gamePath[indexArr])
    })
}
// document.querySelector()

var userData=JSON.parse(localStorage.getItem("gameUserData"));
var userName=userData[0].name;
document.querySelector("#UserName").innerHTML=userName;
document.querySelector("#home").addEventListener("click",()=>{
    window.location.href="../index.html"
    // console.log("SomeOne Clicked me");
})
function playGame(index){
    location.href=index;
}



