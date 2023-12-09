import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Goofy Ah Guy Collector";
const GOOFY_AH_GUY = "🤓☝️";
const MILLISECOND_PER_SECOND = 1000;
const OUTPUT_DECIMAL_PLACES = 3;
const UPGRADE_COST = 10;
const UPGRADE_RATE_BOOST = 1;

let GoofyAhCounter: number = 0;
let autoclickRatePerSec: number = 0;
let lastFrameTime: number = performance.now();

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

const goofyAhGuysButton = document.createElement("button");
goofyAhGuysButton.innerText = GOOFY_AH_GUY;
goofyAhGuysButton.onclick = () => {
  addGoofyAhGuys(1);
};
const purchaseUpgradeButton = document.createElement("button");
purchaseUpgradeButton.innerText = "Upgrade\nCost: " + UPGRADE_COST;
purchaseUpgradeButton.onclick = () => {
  purchaseUpgrade();
};

const goofyAhGuysLabel = document.createElement("div");
goofyAhGuysLabel.innerText = getLabelText();

app.append(header);
app.append(goofyAhGuysButton);
app.append(purchaseUpgradeButton);
app.append(goofyAhGuysLabel);

window.requestAnimationFrame(frameStep);

function frameStep() {
  const thisFrameTime = performance.now();
  const delta: number = thisFrameTime - lastFrameTime;

  addGoofyAhGuys((delta / MILLISECOND_PER_SECOND) * autoclickRatePerSec);
  purchaseUpgradeButton.disabled = GoofyAhCounter < UPGRADE_COST;

  lastFrameTime = thisFrameTime;
  window.requestAnimationFrame(frameStep);
}

function purchaseUpgrade() {
  GoofyAhCounter -= UPGRADE_COST;
  autoclickRatePerSec += UPGRADE_RATE_BOOST;
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
