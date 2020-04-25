var mode = document.getElementById('mode');

var numOfBoxes = 0;

function mbclick() {

  localStorage.setItem("numofboxes", 16)

  if(mode.value == "4x4") {
    numOfBoxes = 16;
    console.log("16 boxes");
  }

  else if(mode.value == "5x5") {
    numOfBoxes = 25;
    console.log("25 boxes");
  }

  else {
    numOfBoxes = 36;
    console.log("36 boxes");
  }

  localStorage.setItem("numofboxes", numOfBoxes);

  location.href='game.html';
}
