import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Goofy Ah Guy Collector";
const GOOFY_AH_GUY = "🤓☝️";
const MILLISECOND_PER_SECOND = 1000;
const OUTPUT_DECIMAL_PLACES = 3;

let GoofyAhCounter: number = 0;
const autoclickRatePerSec: number = 1;
let lastFrameTime: number = performance.now();

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

const goofyAhGuysButton = document.createElement("button");
goofyAhGuysButton.innerText = GOOFY_AH_GUY;
goofyAhGuysButton.onclick = () => {
  addGoofyAhGuys(1);
};

const goofyAhGuysLabel = document.createElement("div");
goofyAhGuysLabel.innerText = getLabelText();

app.append(header);
app.append(goofyAhGuysButton);
app.append(goofyAhGuysLabel);

window.requestAnimationFrame(frameStep);

function frameStep() {
  const thisFrameTime = performance.now();
  const delta: number = thisFrameTime - lastFrameTime;

  addGoofyAhGuys((delta / MILLISECOND_PER_SECOND) * autoclickRatePerSec);

  lastFrameTime = thisFrameTime;
  window.requestAnimationFrame(frameStep);
}

function addGoofyAhGuys(numGuys: number) {
  GoofyAhCounter += numGuys;
  goofyAhGuysLabel.innerText = getLabelText();
}

function getLabelText(): string {
  let text: string =
    "You have " +
    GoofyAhCounter.toFixed(OUTPUT_DECIMAL_PLACES) +
    " Goofy Ah Guy" +
    (GoofyAhCounter != 1 ? "s" : "");

  const exclamations = GoofyAhCounter > 0 ? Math.log(GoofyAhCounter) : 0;
  for (let i = 0; i < exclamations; i++) {
    text += "!";
  }

  return text;
}
