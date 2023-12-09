import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

interface Upgrade {
  name: string;
  cost: number;
  rateBoost: number;
  purchased: number;
  description: string;
}

const gameName = "Goofy Ah Guy Collector";
const GOOFY_AH_GUY = "🤓☝️";
const GOOFY_AH_BUTTON_SIZE = "30px";
const AUTO_RATE_LABEL_SIZE = "25px";
const GOOFY_AH_COUNT_LABEL_SIZE = "35px";
const MILLISECOND_PER_SECOND = 1000;
const OUTPUT_DECIMAL_PLACES = 3;
const COST_DECIMAL_PLACES = 2;
const UPGRADES: Upgrade[] = [
  {
    name: "🦐\nHumorous Rice Frier",
    cost: 10,
    rateBoost: 0.1,
    purchased: 0,
    description: "You're telling me... a SHRIMP fried this rice???",
  },
  {
    name: "🐍\nSilly Danger Noodle",
    cost: 100,
    rateBoost: 2,
    purchased: 0,
    description: "Silly little man. If not friend, why friend shaped?",
  },
  {
    name: "🐀\nJeff",
    cost: 500,
    rateBoost: 25,
    purchased: 0,
    description: "My man Jeff. A mischevious fella. Goofy man extraordinaire.",
  },
  {
    name: "🎟\nTicket to silly town",
    cost: 2500,
    rateBoost: 100,
    purchased: 0,
    description: "A one way trip. Goofy will be all you know. For all time.",
  },
  {
    name: "🐙\nGlub Tubus Wepple",
    cost: 100000,
    rateBoost: 314159,
    purchased: 0,
    description:
      "The silliest of Bois. No one in the world can resist their silly-goofy aura.",
  },
];
const UPGRADE_COST_GROWTH_RATE: number = 1.15;

let GoofyAhCounter: number = 0;
let autoclickRatePerSec: number = 0;
let lastFrameTime: number = performance.now();

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

const upgradeHeader = document.createElement("h2");
upgradeHeader.innerText = "UPGRADE SHOP";

const upgradeRow = document.createElement("div");

const UPGRADE_BUTTONS: HTMLButtonElement[] = [];
for (let i = 0; i < UPGRADES.length; i++) {
  const purchaseButton = document.createElement("button");
  purchaseButton.innerText = getUpgradeButtonText(UPGRADES[i]);
  purchaseButton.onclick = () => {
    purchaseUpgrade(i);
    autoRateLabel.innerText = getAutoRateText();
  };
  purchaseButton.title = UPGRADES[i].description;
  UPGRADE_BUTTONS.push(purchaseButton);
  upgradeRow.appendChild(purchaseButton);
}

const autoRateLabel = document.createElement("div");
autoRateLabel.style.fontSize = AUTO_RATE_LABEL_SIZE;
autoRateLabel.innerText = getAutoRateText();

const goofyAhGuysButton = document.createElement("button");
goofyAhGuysButton.style.fontSize = GOOFY_AH_BUTTON_SIZE;
goofyAhGuysButton.innerText = GOOFY_AH_GUY;
goofyAhGuysButton.onclick = () => {
  addGoofyAhGuys(1);
};

const goofyAhGuysLabel = document.createElement("div");
goofyAhGuysLabel.style.fontSize = GOOFY_AH_COUNT_LABEL_SIZE;
goofyAhGuysLabel.innerText = getGuyCountText();

app.append(header);
app.append(upgradeHeader);
app.append(upgradeRow);
app.append(autoRateLabel);
app.append(goofyAhGuysButton);
app.append(goofyAhGuysLabel);

window.requestAnimationFrame(frameStep);

function frameStep() {
  const thisFrameTime = performance.now();
  const delta: number = thisFrameTime - lastFrameTime;

  addGoofyAhGuys((delta / MILLISECOND_PER_SECOND) * autoclickRatePerSec);
  updateUpgradeButtons();

  lastFrameTime = thisFrameTime;
  window.requestAnimationFrame(frameStep);
}

function purchaseUpgrade(index: number) {
  const upgrade = UPGRADES[index];
  GoofyAhCounter -= upgrade.cost;
  autoclickRatePerSec += upgrade.rateBoost;
  upgrade.purchased++;
  upgrade.cost *= UPGRADE_COST_GROWTH_RATE;
  UPGRADE_BUTTONS[index].innerText = getUpgradeButtonText(upgrade);
}

function updateUpgradeButtons() {
  for (let i = 0; i < UPGRADE_BUTTONS.length; i++) {
    UPGRADE_BUTTONS[i].disabled = GoofyAhCounter < UPGRADES[i].cost;
  }
}

function addGoofyAhGuys(numGuys: number) {
  GoofyAhCounter += numGuys;
  goofyAhGuysLabel.innerText = getGuyCountText();
}

function getGuyCountText(): string {
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

function getAutoRateText(): string {
  let text: string =
    "Collecting " +
    autoclickRatePerSec.toFixed(OUTPUT_DECIMAL_PLACES) +
    " Goofy Ah Guy" +
    (GoofyAhCounter != 1 ? "s" : "") +
    "/second";

  const exclamations = GoofyAhCounter > 0 ? Math.log(GoofyAhCounter) : 0;
  for (let i = 0; i < exclamations; i++) {
    text += "!";
  }
  return text;
}

function getUpgradeButtonText(upgrade: Upgrade): string {
  return (
    upgrade.name +
    "\n\n Cost: " +
    upgrade.cost.toFixed(COST_DECIMAL_PLACES) +
    "\n+" +
    upgrade.rateBoost +
    "/s\nHave: " +
    upgrade.purchased
  );
}
