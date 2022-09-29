var playground = document.getElementById("playground");
var flips = 0, memory = [], matched = [], erase = true, moves = 0;
var characters = ["I", "T", "C", "H", '"', '!', "B", "A"]
var available = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
var time = 0;

for (var n = 0; n < 16; n++) {
  const box = document.createElement("button"),
    boxInner = document.createElement("div"),
    boxFront = document.createElement("div"),
    boxBack = document.createElement("div");
  box.classList.add("box")
  box.setAttribute("onclick", "flip(this)")
  playground.appendChild(box);
  boxInner.classList.add("box-inner")
  box.appendChild(boxInner);
  boxFront.classList.add("box-front")
  boxInner.appendChild(boxFront);
  boxBack.classList.add("box-back")
  boxInner.appendChild(boxBack);
}
var over = false;

function flip(e) {
  if (time === 0) {
    startTimer();
  }
  if (e.children[0] !== memory[1] && e.children[0] !== memory[0]) {
    flips++;
    e.children[0].style.transform = "rotateY(180deg)"
    memory.push(e.children[0]);
  }
  if (flips === 2) {
    if (memory[0].children[1].innerHTML === memory[1].children[1].innerHTML) {
      matched.push(memory[0])
      matched.push(memory[1])
      erase = false;
      if (matched.length === 16) {
        alert("you win!")
        startTimer("end");
      }
    }
  } else if (flips > 2) {
    moves += 1
    var move = moves < 10 ? "0" + moves : moves;
    document.getElementById("moves").innerHTML = "moves: " + move;
    if (erase) {
      memory[0].style.transform = "rotateY(0deg)"
      memory[1].style.transform = "rotateY(0deg)"
      memory = memory.filter(item => (item !== memory[0]) && (item !== memory[1]))
      flips = 1;
    } else {
      memory = memory.filter(item => (item !== memory[0]) && (item !== memory[1]))
      flips = 1;
      erase = true;
    }
  }
}

for (const char of characters) {
  let index = available[Math.floor(Math.random() * available.length)];
  let boxBack = document.getElementsByClassName("box-back");
  available = available.filter(item => item !== index);
  boxBack[index].innerHTML = char;
  let index2 = available[Math.floor(Math.random() * available.length)];
  available = available.filter(item => item !== index2);
  boxBack[index2].innerHTML = char;
}

function startTimer(command) {
  if (command === "end") {
    clearInterval(watch)
    over = true;
  } else {
    var watch = setInterval(timer, 1000)
  }
}

function msToTime(duration) {
  var milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}

function timer() {
  if (!over) {
    time += 1000;
    document.getElementById("timer").innerHTML = msToTime(time)
  }
}