import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My game";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

const button = document.createElement("button");
button.innerText = "🤓";

app.append(header);
app.append(button);
