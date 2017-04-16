var sphero = require("sphero");
var orb = sphero("COM5");
var keypress = require("keypress");
var EventEmitter = require("events").EventEmitter;

keypress(process.stdin);

var rolls = [
  // [255, 90],
  // [255, 0],
  // [255, 270],
  // [255, 145],
  // [255, 270],
  // [255, 180],
  // [255, 270],
  [255, 0],
  [255, 270],
  [255, 180]
// meiro
//   [120, 0],
//   [255, 90],
//   [255, 315],
//   [255, 0],
//   [255, 90],
//   [255, 0],
//   [255, 270]
// hoge
//   [255, 100],
//   [255, 90]
];

let count = 0;
orb.connect(() => {
  console.log("Connected");
  orb.startCalibration();
  setTimeout(() => {
    orb.finishCalibration();
    orb.detectCollisions();
    orb.color("green");
    run();
  }, 5000);
});

let timeoutId = null;
function run() {
  if (count >= rolls.length) return;
  const args = rolls[count++];
  console.log(args[0], args[1]);
  orb.roll(args[0], args[1]);
  // timeoutId = setInterval(() => { timeoutId = null; orb.roll(args[0], args[1]); }, 500);
  onPress.once("pressed", () => {
    // if (timeoutId) {
    //   clearTimeout(timeoutId);
    // }
    run();
  });
}

var onPress = new EventEmitter();
// listen for the "keypress" event 
process.stdin.on('keypress', function (ch, key) {
  console.log('got "keypress"', key);
  if (key && key.name === "return") {
    console.log("space");
    onPress.emit("pressed");
  }
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
    process.exit();
  }
});
 
process.stdin.setRawMode(true);
process.stdin.resume();