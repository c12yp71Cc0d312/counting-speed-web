var gridNumbers = null;
var topScores = window.localStorage;
scoreboard = document.querySelectorAll('.scoreBoard');
var modeButton = document.getElementById('modeButton');
var numOfBoxes = parseInt(localStorage.getItem("numofboxes"));
var boxlayout = document.getElementById('boxes');
var gamesound = new Audio();
gamesound.src = "sounds/entergame.mp3";
//topScores.clear();

(function() {
  gamesound.play();
  noboxes();
  loadNums();
  loadGrid();
  setScores();
})();




function noboxes() {

  if(numOfBoxes == 25)
    addtill25();
  else if(numOfBoxes == 36) {
    addtill25();
    addtill36();
  }
  console.log(numOfBoxes);
  console.log(boxlayout);

}

function loadNums() {
  let arr = [];
  let arr1toX = [];

  gridNumbers = document.querySelectorAll('.nums');
  console.log(gridNumbers);


  for (let i = 1; i <= numOfBoxes; i++)
    arr1toX.push(i);

  let randomIndex = 0;

  do {
    randomIndex = Math.floor((Math.random() * arr1toX.length));
    arr.push(arr1toX[randomIndex]);
    arr1toX.splice(randomIndex, 1);
  } while (arr.length < numOfBoxes);

  for (let i = 0; i < numOfBoxes; i++)
    gridNumbers[i].textContent = arr[i];
}


function loadGrid() {

    if(numOfBoxes == 25) {
        boxlayout.style.gridTemplateColumns = "repeat(5,1fr)"
        boxlayout.style.gridAutoRows = "96px";
        for(let i = 0; i < gridNumbers.length; i ++) {
          gridNumbers[i].style.padding = "30px";
          gridNumbers[i].style.fontSize = "30px";
        }
    }

    else if (numOfBoxes == 36) {
      boxlayout.style.gridTemplateColumns = "repeat(6,1fr)"
      boxlayout.style.gridAutoRows = "79.16px";
      for(let i = 0; i < gridNumbers.length; i ++) {
        gridNumbers[i].style.padding = "20px";
        gridNumbers[i].style.fontSize = "30px";
      }
    }

    else if(numOfBoxes == 16){
      boxlayout.style.gridTemplateColumns = "repeat(4,1fr)"
      boxlayout.style.gridAutoRows = "121.25px";
      for(let i = 0; i < gridNumbers.length; i ++) {
        gridNumbers[i].style.padding = "35px";
        gridNumbers[i].style.fontSize = "40px";
      }
    }
}




function setScores() {
  if(numOfBoxes == 16) {
    if (topScores.getItem("first4x4") == null) {
      topScores.setItem("first4x4", "--");
      topScores.setItem("second4x4", "--");
      topScores.setItem("third4x4", "--");
      topScores.setItem("fourth4x4", "--");
      topScores.setItem("fifth4x4", "--");
    } else if (topScores.getItem("first4x4").localeCompare("--") != 0) {
      console.log("score exists");
      scoreboard[0].textContent = topScores.getItem("first4x4");
      scoreboard[1].textContent = topScores.getItem("second4x4");
      scoreboard[2].textContent = topScores.getItem("third4x4");
      scoreboard[3].textContent = topScores.getItem("fourth4x4");
      scoreboard[4].textContent = topScores.getItem("fifth4x4");
    }
  }

  else if(numOfBoxes == 25) {
    if (topScores.getItem("first5x5") == null) {
      topScores.setItem("first5x5", "--");
      topScores.setItem("second5x5", "--");
      topScores.setItem("third5x5", "--");
      topScores.setItem("fourth5x5", "--");
      topScores.setItem("fifth5x5", "--");
    } else if (topScores.getItem("first5x5").localeCompare("--") != 0) {
      console.log("score exists");
      scoreboard[0].textContent = topScores.getItem("first5x5");
      scoreboard[1].textContent = topScores.getItem("second5x5");
      scoreboard[2].textContent = topScores.getItem("third5x5");
      scoreboard[3].textContent = topScores.getItem("fourth5x5");
      scoreboard[4].textContent = topScores.getItem("fifth5x5");
    }
  }

  else {
    if (topScores.getItem("first6x6") == null) {
      topScores.setItem("first6x6", "--");
      topScores.setItem("second6x6", "--");
      topScores.setItem("third6x6", "--");
      topScores.setItem("fourth6x6", "--");
      topScores.setItem("fifth6x6", "--");
    } else if (topScores.getItem("first6x6").localeCompare("--") != 0) {
      console.log("score exists");
      scoreboard[0].textContent = topScores.getItem("first6x6");
      scoreboard[1].textContent = topScores.getItem("second6x6");
      scoreboard[2].textContent = topScores.getItem("third6x6");
      scoreboard[3].textContent = topScores.getItem("fourth6x6");
      scoreboard[4].textContent = topScores.getItem("fifth6x6");
    }
  }

}


for (let i = 0, len = gridNumbers.length; i < len; i++)
  gridNumbers[i].onclick = clicker;

var currentNumber = 0;

var numClickSound = new Audio();
var gameOverSound = new Audio();
var completedSound = new Audio();
var timerSound = new Audio();
numClickSound.src = "sounds/numbertap.wav";
gameOverSound.src = "sounds/gameover.wav";
completedSound.src = "sounds/completed.mp3";
timerSound.src = "sounds/321go.mp3";


function clicker() {
  if (gameState == true) {
    let initialNum = parseInt(this.textContent)
    if (initialNum == currentNumber + 1) {
      numClickSound.play();
      if (initialNum < (40 - numOfBoxes + 1) ) {
        this.textContent = initialNum + numOfBoxes;
      } else {
        this.textContent = "99";
        this.style.color = "red";
      }
      if(currentNumber == 39 && initialNum == 40) {
        completedSound.play();
        completed();
      }
      currentNumber++;
    } else if (initialNum != 99) {
      gameOverSound.play();
      gameOver();
    }
  }
}

var startState = false;
var countdownTimer = null;

var start = document.getElementById('startButton');

start.onclick = function() {
  if (startState == false) {
    startState = true;
    timerSound.play();
    countdownTimer = setInterval(updateTimer, 1000);
    cd.style.opacity = "1";
  }
}

var cd = document.getElementById("countdown");

function updateTimer() {
  let currentTime = parseInt(cd.textContent);
  if (currentTime <= 0) {
    startScoreTimer();
    clearInterval(countdownTimer);
    cd.style.opacity = "0";
    cd.style.zIndex = "-1";
  } else
    cd.textContent = currentTime - 1;
}

var scoreTimerText = document.getElementById('time');

var gameState = false;
var scoreTimer = null;

var startScoreTimer = function() {
  gameState = true;
  scoreTimer = setInterval(updateScoreTimer, 4);
  for (let i = 0, len = gridNumbers.length; i < len; i++) {
    gridNumbers[i].style.color = "black";
    gridNumbers[i].style.opacity = "1";
  }

}

var ms = 0,
  s = 0;

function updateScoreTimer() {
  ms += 4;
  if (ms >= 1000) {
    s++;
    ms = 0;
  }
  scoreTimerText.textContent = s + "." + ms;
}

var finishedtext = document.getElementById('finished');

var gameOver = function() {
  clearInterval(scoreTimer);
  for (let i = 0, len = gridNumbers.length; i < len; i++)
    gridNumbers[i].onclick = null;
    finished.zIndex = "0";
  finishedtext.textContent = "Game Over!"
  finishedtext.style.opacity = "1";
  for (let i = 0, len = gridNumbers.length; i < len; i++)
    gridNumbers[i].style.opacity = "0";
}


var completed = function() {
  clearInterval(scoreTimer);
  for (let i = 0, len = gridNumbers.length; i < len; i++)
    gridNumbers[i].onclick = null;
  finishedtext.zIndex = "0";
  finishedtext.textContent = "Completed!";
  finishedtext.style.opacity = "1";
  for (let i = 0, len = gridNumbers.length; i < len; i++)
    gridNumbers[i].style.opacity = "0";
  checkScore();
  updateScores();
}

var checkScore = function() {
  let score = parseFloat(scoreTimerText.textContent);

  for (let i = 0; i < scoreboard.length; i++) {
    if (scoreboard[i].textContent.localeCompare("--") == 0 || score <= parseFloat(scoreboard[i].textContent)) {
      for (let j = scoreboard.length - 1; j > i; j--) {
        scoreboard[j].textContent = scoreboard[j - 1].textContent;
      }
      scoreboard[i].textContent = score;
      break;
    }
  }
}

var updateScores = function() {
  if(numOfBoxes == 16) {
    topScores.setItem("first4x4", scoreboard[0].textContent);
    topScores.setItem("second4x4", scoreboard[1].textContent);
    topScores.setItem("third4x4", scoreboard[2].textContent);
    topScores.setItem("fourth4x4", scoreboard[3].textContent);
    topScores.setItem("fifth4x4", scoreboard[4].textContent);
  }

  else if(numOfBoxes == 25) {
    topScores.setItem("first5x5", scoreboard[0].textContent);
    topScores.setItem("second5x5", scoreboard[1].textContent);
    topScores.setItem("third5x5", scoreboard[2].textContent);
    topScores.setItem("fourth5x5", scoreboard[3].textContent);
    topScores.setItem("fifth5x5", scoreboard[4].textContent);
  }

  else {
    topScores.setItem("first6x6", scoreboard[0].textContent);
    topScores.setItem("second6x6", scoreboard[1].textContent);
    topScores.setItem("third6x6", scoreboard[2].textContent);
    topScores.setItem("fourth6x6", scoreboard[3].textContent);
    topScores.setItem("fifth6x6", scoreboard[4].textContent);
  }
}

function addtill25() {
    var no16 = document.getElementById('no16');
    no16.insertAdjacentHTML("afterend","<div class='nums'>17</div><div class='nums'>18</div><div class='nums'>19</div><div class='nums'>20</div><div class='nums'>21</div><div class='nums'>22</div><div class='nums'>23</div><div class='nums'>24</div><div class='nums' id='no25'>25</div>");
}


function addtill36() {
    var no25 = document.getElementById('no25');
    no25.insertAdjacentHTML("afterend","<div class='nums'>26</div><div class='nums'>27</div><div class='nums'>28</div><div class='nums'>29</div><div class='nums'>30</div><div class='nums'>31</div><div class='nums'>32</div><div class='nums'>33</div><div class='nums'>34</div><div class='nums'>35</div><div class='nums'>36</div>");
}
