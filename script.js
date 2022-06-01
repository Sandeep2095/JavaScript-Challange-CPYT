function ageInDays() {
  var birthYear = prompt("What year were you born... Good Morning");
  var ageInDayz = (2022 - birthYear) * 365;
  var h1 = document.createElement("h1");
  var textAnswer = document.createTextNode(
    "You are " + ageInDayz + " days old."
  );
  h1.setAttribute("id", "ageInDays");
  h1.appendChild(textAnswer);
  document.getElementById("flex-box-result").appendChild(h1);
}

function reset() {
  document.getElementById("ageInDays").remove();
}

// -----------------------------------------------
// Challenge 2 : The Cat Generator

function generateCat() {
  var image = document.createElement("img");
  var div = document.getElementById("flex-cat-gen");
  image.src = "https://cdn2.thecatapi.com/images/7sd.gif";
  div.appendChild(image);
}

// -----------------------------------------------
// Challenge 3 : Rock, Paper and Scissors.

function rpsGame(yourChoice) {
  console.log(yourChoice);
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = numberToChoice(randToRpsInt());

  results = decideWinner(humanChoice, botChoice);
  message = finalMessage(results); // {'message':'you won', 'color': 'green'}
  console.log(message);
  rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt() {
  return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
  return ["rock", "paper", "scissors"][number];
}

function decideWinner(yourChoice, computerChoice) {
  var rpsDatabase = {
    rock: { scissors: 1, rock: 0.5, paper: 0 },
    paper: { rock: 1, paper: 0.5, scissors: 0 },
    scissors: { paper: 1, scissors: 0.5, rock: 0 },
  };

  var yourScore = rpsDatabase[yourChoice][computerChoice];
  var computerScore = rpsDatabase[yourChoice][computerChoice];

  return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
  if (yourScore === 0) {
    return { message: "You lost!", color: "red" };
  } else if (yourScore === 0.5) {
    return { message: "Match Draw", color: "yellow" };
  } else if (yourScore === 1) {
    return { message: "Bravo! You Won", color: "green" };
  }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
  var imagesDatabase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissors: document.getElementById("scissors").src,
  };
  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissors").remove();

  var humanDiv = document.createElement("div");
  var botDiv = document.createElement("div");
  var messageDiv = document.createElement("div");

  humanDiv.innerHTML =
    "<img src='" +
    imagesDatabase[humanImageChoice] +
    "' height=150 width=150 style='box-shadow: 0px 10px 50px blue'>";
  messageDiv.innerHTML =
    "<h1 style='color: " +
    finalMessage["color"] +
    "; font-size: 60px; padding: 30px; '>" +
    finalMessage["message"] +
    "</h1>";
  botDiv.innerHTML =
    "<img src='" +
    imagesDatabase[botImageChoice] +
    "' height=150 width=150 style='box-shadow: 0px 10px 50px red'>";

  document.getElementById("flex-box-rps-div").appendChild(humanDiv);
  document.getElementById("flex-box-rps-div").appendChild(messageDiv);
  document.getElementById("flex-box-rps-div").appendChild(botDiv);
}

// ---------------------------------------------------
// Challenge 4: Change the color of all buttons

var all_buttons = document.getElementsByTagName("button");

var copyAllButtons = [];
for (let i = 0; i < all_buttons.length; i++) {
  copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonSelect) {
  if (buttonSelect.value === "red") {
    buttonRed();
  } else if (buttonSelect.value === "green") {
    buttonGreen();
  } else if (buttonSelect.value === "reset") {
    buttonReset();
  } else if (buttonSelect.value === "random") {
    buttonRandom();
  } else if (buttonSelect.value === "yellow") {
    buttonYellow();
  } else if (buttonSelect.value === "blue") {
    buttonBlue();
  }

  function buttonRed() {
    for (let i = 0; i < all_buttons.length; i++) {
      all_buttons[i].classList.remove(all_buttons[i].classList[1]);
      all_buttons[i].classList.add("btn-danger");
    }
  }

  function buttonGreen() {
    for (let i = 0; i < all_buttons.length; i++) {
      all_buttons[i].classList.remove(all_buttons[i].classList[1]);
      all_buttons[i].classList.add("btn-success");
    }
  }

  function buttonYellow() {
    for (let i = 0; i < all_buttons.length; i++) {
      all_buttons[i].classList.remove(all_buttons[i].classList[1]);
      all_buttons[i].classList.add("btn-warning");
    }
  }

  function buttonBlue() {
    for (let i = 0; i < all_buttons.length; i++) {
      all_buttons[i].classList.remove(all_buttons[i].classList[1]);
      all_buttons[i].classList.add("btn-primary");
    }
  }

  function buttonReset() {
    for (let i = 0; i < all_buttons.length; i++) {
      all_buttons[i].classList.remove(all_buttons[i].classList[1]);
      all_buttons[i].classList.add(copyAllButtons[i]);
    }
  }

  function buttonRandom() {
    var choices = [
      "btn-primary",
      "btn-danger",
      "btn-success",
      "btn-warning",
      "btn-primary",
      "btn-warning",
    ];

    for (let i = 0; i < all_buttons.length; i++) {
      var randomNumber = Math.floor(Math.random() * 6);
      all_buttons[i].classList.remove(all_buttons[i].classList[1]);
      all_buttons[i].classList.add(choices[randomNumber]);
    }
  }
}

// ------------------------------------------------------

// Challenge 5: Black Jack

let blackjackGame = {
  you: { scoreSpan: "#your-blackjack-result", div: "#your-box", score: 0 },
  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    score: 0,
  },
  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "Q", "J", "A"],
  cardMaps: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    K: 10,
    Q: 10,
    J: 10,
    A: [1, 11],
  },
  wins: 0,
  losses: 0,
  draws: 0,
  isStand: false,
  turnOver: false,
};

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];

const hitSound = new Audio("/sounds/swish.m4a");
const winSound = new Audio("/sounds/cash.mp3");
const lossSound = new Audio("/sounds/aww.mp3");

document
  .querySelector("#blackjack-hit-button")
  .addEventListener("click", blackjackHit);

document
  .querySelector("#blackjack-stand-button")
  .addEventListener("click", dealerLogic);

document
  .querySelector("#blackjack-deal-button")
  .addEventListener("click", blackjackDeal);

function blackjackHit() {
  if (blackjackGame["isStand"] === false) {
    let cards = randomCard();
    showCard(cards, YOU);
    updateScore(cards, YOU);
    showScore(YOU);
  }
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame["cards"][randomIndex];
}

function showCard(cards, activePlayer) {
  if (activePlayer["score"] <= 21) {
    let cardImage = document.createElement("img");
    cardImage.src = `images/${cards}.png`;
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
    hitSound.play();
  }
}

function blackjackDeal() {
  // let winner = computeWinner()
  // showResult(winner)

  // showResult(computeWinner());

  if (blackjackGame["turnOver"] === true) {
    blackjackGame["isStand"] = false;

    let yourImages = document
      .querySelector("#your-box")
      .querySelectorAll("img");

    let dealerImages = document
      .querySelector("#dealer-box")
      .querySelectorAll("img");

    for (i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
    }

    for (i = 0; i < dealerImages.length; i++) {
      dealerImages[i].remove();
    }

    YOU["score"] = 0;
    DEALER["score"] = 0;

    document.querySelector("#your-blackjack-result").textContent = 0;
    document.querySelector("#dealer-blackjack-result").textContent = 0;

    document.querySelector("#your-blackjack-result").style.color = "black";
    document.querySelector("#dealer-blackjack-result").style.color = "black";

    document.querySelector("#blackjack_result").textContent = "Let's Play";
    document.querySelector("#blackjack_result").style.color = "black";

    blackjackGame["turnOver"] = true;
  }
}

function updateScore(cards, activePlayer) {
  if (cards === "A") {
    // if adding 11 keeps me below 21, add 11 otherwise add 1
    if (activePlayer["score"] + blackjackGame["cardMaps"][cards][1] <= 21) {
      activePlayer["score"] += blackjackGame["cardMaps"][cards][1];
    } else {
      activePlayer["score"] += blackjackGame["cardMaps"][cards][0];
    }
  } else {
    activePlayer["score"] += blackjackGame["cardMaps"][cards];
  }
}

function showScore(activePlayer) {
  if (activePlayer["score"] > 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["score"];
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function dealerLogic() {
  blackjackGame["isStand"] = true;

  while (DEALER["score"] < 16 && blackjackGame["isStand"] === true) {
    let cards = randomCard();
    showCard(cards, DEALER);
    updateScore(cards, DEALER);
    showScore(DEALER);
    await sleep(1000);
  }

  blackjackGame["turnOver"] = true;
  let winner = computeWinner();
  showResult(winner);
}

// WHO WIN THE GAME
// update the wims draws and losses

function computeWinner() {
  let winner;

  if (YOU["score"] <= 21) {
    if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
      console.log("you won");
      blackjackGame["wins"]++;
      winner = YOU;
    } else if (YOU["score"] < DEALER["score"]) {
      console.log("you lost");
      blackjackGame["losses"]++;
      winner = DEALER;
    } else if (YOU["score"] === DEALER["score"]) {
      blackjackGame["draws"]++;
    }

    // condition: when user busts but dealer doesnt
  } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
    blackjackGame["losses"]++;
    winner = DEALER;

    // condition: when you & the dealer busts
  } else if (YOU["score"] > 21 && DEALER["score"] > 21) {
    blackjackGame["draws"]++;
  }

  console.log(blackjackGame);
  return winner;
}

function showResult(winner) {
  let message, messageColor;

  if (blackjackGame["turnOver"] === true) {
    if (winner === YOU) {
      document.querySelector("#wins").textContent = blackjackGame["wins"];
      message = "You Won";
      messageColor = "green";
      winSound.play();
    } else if (winner === DEALER) {
      document.querySelector("#losses").textContent = blackjackGame["losses"];
      message = "You Lost";
      messageColor = "red";
      lossSound.play();
    } else {
      document.querySelector("#draws").textContent = blackjackGame["draws"];
      message = "You Drew";
      messageColor = "blue";
    }

    document.querySelector("#blackjack_result").textContent = message;
    document.querySelector("#blackjack_result").style.color = messageColor;
  }
}

//Challenge 6 : Ajax Api's
function showUsers() {
  var input = prompt("Number of Users");
  const url = `https://randomuser.me/api/?results=${input}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let users = data.results;
      console.log(users);
      for (let i = 0; i <= users.length; i++) {
        var div = document.createElement("div");
        div.classList.add("user");
        var image = document.createElement("img");
        let p = document.createElement("p");
        p.append(
          document.createTextNode(
            `${users[i].name.title} ${users[i].name.first} ${users[i].name.last}`
          )
        );
        image.src = users[i].picture.large;
        div.appendChild(image);
        div.appendChild(p);
        document.getElementById("show-users").appendChild(div);
      }
    });
}
