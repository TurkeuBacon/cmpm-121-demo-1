import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Goofy Ah Guy Collector";
const GOOFY_AH_GUY = "🤓☝️";

let GoofyAhCounter: number = 0;
const autoclickDelay: number = 1000;

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

setInterval(addGoofyAhGuys, autoclickDelay, 1);

function addGoofyAhGuys(numGuys: number) {
  GoofyAhCounter += numGuys;
  goofyAhGuysLabel.innerText = getLabelText();
}

function getLabelText(): string {
  let text: string =
    "You have " +
    GoofyAhCounter +
    " Goofy Ah Guy" +
    (GoofyAhCounter != 1 ? "s" : "");

  const exclamations = GoofyAhCounter > 0 ? Math.log(GoofyAhCounter) : 0;
  for (let i = 0; i < exclamations; i++) {
    text += "!";
  }

  return text;
}
