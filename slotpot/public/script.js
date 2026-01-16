const push = document.getElementById("push");
const slot = document.getElementsByClassName("slot");
const bob = document.getElementById("bob");
const mute = document.getElementById("mute-button");
let score = document.getElementById("score");
let chances = document.getElementById("chance");
var chance = parseInt(chances.innerHTML);
let display = document.getElementById("display");
var clicksound = document.getElementById("clicksound");
var stopwon = document.getElementById("won");
var coinin = document.getElementById("coin-in");
var coinisnert = document.getElementById("coin-insert");
var turns = document.getElementById("turns");
var turnint = parseInt(turns.innerHTML.substring(1));
// var draggable = document.getElementById("draggable");
// console.log(turnint);

let stopping_list = [
  0, 260, 520, 780, 1040, 1300, 1560, 1820, 2080, 2340, 2600, 2860, 3120, 3380,
  3640, 3900, 4160, 4420, 4680, 4940, 5200, 5460, 5720, 5980,
];

var scorecount = 0;

push.onclick= function () {
  push.style.pointerEvents = "none";
  if (chance != 0) {
    let cmplist = [];
    for (let i = 0; i < slot.length; i++) {
      let randnum =
        stopping_list[Math.floor(Math.random() * stopping_list.length)];
      slot[i].style.transform = `translate(0,${-randnum}px)`;
      clicksound.playbackRate = 6;
      clicksound.play();

      if (!cmplist.includes(randnum)) {
        cmplist.push(randnum);
      }
    }
    scorecount += cmplist.length === 2 ? 1500 : cmplist === 1 ? 3000 : 0;

    bob.classList.add("active");
    setTimeout(() => {
      bob.classList.remove("active");
    }, 1000);
    push.classList.add("active");
    setTimeout(() => {
      push.style.pointerEvents = "all";
      push.classList.remove("active");
      clicksound.pause();
      stopwon.play();
      $("#fake").boom();
      score.innerHTML = scorecount;
    }, 5000);
    chance--;
  } else {
    display.innerHTML = "NO CHANCES";
    coinin.style.background = "radial-gradient(orange,red)";
    coinin.style.boxShadow = "0 0 5px 2px red";
  }
  chances.innerHTML = chance;
};

$.fn.boom = function () {
  console.log("working");
  var colors = ["#ffea00", "#ffdd00", "#333", "#ffd000", "#FF9300", "#ff7b00"];
  var shapes = [
    '<polygon class="star" points="21,0,28.053423027509677,11.29179606750063,40.97218684219823,14.510643118126104,32.412678195541844,24.70820393249937,33.34349029814194,37.989356881873896,21,33,8.656509701858067,37.989356881873896,9.587321804458158,24.70820393249937,1.0278131578017735,14.510643118126108,13.94657697249032,11.291796067500632"></polygon>',
    '<polygon class="other-star" points="18,0,22.242640687119284,13.757359312880714,36,18,22.242640687119284,22.242640687119284,18.000000000000004,36,13.757359312880716,22.242640687119284,0,18.000000000000004,13.757359312880714,13.757359312880716"></polygon>',
    '<polygon class="diamond" points="18,0,27.192388155425117,8.80761184457488,36,18,27.19238815542512,27.192388155425117,18.000000000000004,36,8.807611844574883,27.19238815542512,0,18.000000000000004,8.80761184457488,8.807611844574884"></polygon>',
  ];

  var btn = $(this);
  var group = [];
  var num = Math.floor(Math.random() * 50) + 100;

  for (let i = 0; i < num; i++) {
    var randBG = Math.floor(Math.random() * colors.length);
    var getShape = Math.floor(Math.random() * shapes.length);
    var c = Math.floor(Math.random() * 10) + 5;
    var scale = Math.floor(Math.random() * (3 - 2 + 0.5)) + 1.5;
    var x = Math.floor(Math.random() * (1500 + 1000)) - 1000;
    var y = Math.floor(Math.random() * (1500 + 1000)) - 1000;
    var sec = Math.floor(Math.random() * 1700) + 1000;
    var cir = $('<div class="cir" style="position: absolute"></div>');
    var shape = $('<svg class="shape" style="position: absolute">' + shapes[getShape] + "</svg>");

    shape.css({
      top: 0,
      left: btn.offset().left - 300,
      transform: "scale(0" + scale + ")",
      transition: sec + "ms",
      fill: colors[randBG],
    });

    btn.siblings(".btn-particles").append(shape);

    group.push({ shape: shape, x: x, y: y });
  }

  for (var a = 0; a < group.length; a++) {
    var shape = group[a].shape;
    var x = group[a].x,
      y = group[a].y;
    shape.css({
      left: x + 50,
      top: y + 15,
      transform: "scale(0)",
    });
  }

  setTimeout(function () {
    for (var b = 0; b < group.length; b++) {
      var shape = group[b].shape;
      shape.remove();
    }
    group = [];
  }, 2000);
  console.log("All working");
};

mute.onclick = function () {
  clicksound.muted = !clicksound.muted;
  stopwon.muted = !stopwon.muted;
  mute.classList.toggle("active");
};

window.onbeforeunload = function () {
  return "You are closing all tabs!";
};

// // --------------------------DRAG DROP--------------------------
// const draggable = document.getElementById("draggable");
// const dropzone = document.getElementById("dropzone");
// // var eledrag = draggable;
// // if (turnint != 0) {
// //   draggable.setAttribute('draggable',true);
// //   console.log('true');
// // }else{
// //   console.log('true');
// //   draggable.setAttribute('draggable',false);
// // }

// // Event listener for the draggable element when dragging starts
// draggable.addEventListener("dragstart", (e) => {
//   e.dataTransfer.setData("text/plain", draggable.id);
//   draggable.style.cursor = "grabbing"; // Change cursor style
// });

// // Event listener for the draggable element when dragging ends
// draggable.addEventListener("dragend", () => {
//   draggable.style.cursor = "grab"; // Reset cursor style
// });

// // Event listener for the drop zone when the draggable element enters
// dropzone.addEventListener("dragenter", () => {
//   dropzone.style.boxShadow = "0 0 10px 5px white"; // Change drop zone appearance
//   draggable.style.cursor = "grabbing"; // Change cursor style
// });

// // Event listener for the drop zone when the draggable element leaves
// dropzone.addEventListener("dragleave", () => {
//   dropzone.style.boxShadow =
//     "3px 3px 5px 1px rgba(0, 0, 0, 0.703),inset 3px 3px 10px -5px white"; // Reset drop zone appearance
//   draggable.style.cursor = "grab"; // Reset cursor style
// });

// // Prevent the default behavior for the drop event
// dropzone.addEventListener("dragover", (e) => {
//   e.preventDefault();
// });

// // Event listener for the drop zone when a draggable element is dropped
// dropzone.addEventListener("drop", (e) => {
//   e.preventDefault();
//   const data = e.dataTransfer.getData("text/plain");
//   const draggedElement = document.getElementById(data);

//   if (draggedElement) {
//     const clone = draggedElement.cloneNode(true);
//     dropzone.appendChild(clone);
//     dropzone.style.boxShadow =
//       "3px 3px 5px 1px rgba(0, 0, 0, 0.703),inset 3px 3px 10px -5px white"; // Reset drop zone appearance
//     coinisnert.play();
//     turnint--;
//     chance += 10;
//     chances.innerHTML = chance;
//     turns.innerHTML = `x${turnint}`;
//     draggable.style.cursor = "grab"; // Reset cursor style
//     if (coinin.style.background != "radial-gradient(lightgreen,green)") {
//       coinin.style.background = "radial-gradient(lightgreen,green)";
//       coinin.style.boxShadow = "0 0 5px 2px lightgreen";
//     }
//   }
// });
