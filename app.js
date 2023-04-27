//grabing all required html element

const wrongltr = document.getElementById("wrong-letters");
const word = document.getElementById("word");
const popupcntner = document.getElementById("popup-container");
const notifycntner = document.getElementById("notification-container");
const playbutton = document.getElementById("button");
const finalmsg = document.getElementById("final-massage");
const figureparts = document.querySelectorAll(".figure-part");

//word array for the game
const words = [
  "application",
  "programming",
  "interface",
  "wizard",
  "hangmen",
  "internet",
  "weather",
];

// selecting rander word from above word list
let selectedword = words[Math.floor(Math.random() * words.length)];

//array to collect all correct letters
let correctletter = [];

//arrey to collect all wrong letters
let worngletter = [];

//function to render correct letter to its respect area start here
function displayword() {
  //correct word display
  word.innerHTML = `${selectedword
    .split("")
    .map(
      (letr) => `<span class="letters">
  ${correctletter.includes(letr) ? letr : ""}
  </span>
     `
    )
    .join("")}
 `;
  // conversation of vertical multi line words to horizontal  single line words
  const innerword = word.innerText.replace(/\n/g, "");
  //winning condition
  if (innerword == selectedword) {
    finalmsg.innerText = "Congratulation You Won!";
    popupcntner.style.display = "flex";
  }
}
//function to render correct letter to its respect area ends here

//function to render wrong letter to its respect area starts here
function updateWrongLetter() {
  //wrong letter display
  wrongltr.innerHTML = `${worngletter.length > 0 ? "<p>wrong letter</p>" : ""}
     ${worngletter.map((letter) => `<span>${letter}</span>`)}
   `;
  //body part display one by one
  figureparts.forEach((part, index) => {
    const error = worngletter.length;

    if (index < error) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  //lose check
  if (worngletter.length === figureparts.length) {
    finalmsg.innerText = "Men dead!! You lose";
    popupcntner.style.display = "flex";
  }
}
//function to render wrong letter to its respect area ends here

// notify function for already entered many times
function showNotification() {
  //adding show class to notification-container
  notifycntner.classList.add("show");
  //removing show class from notification-container
  setTimeout(function () {
    notifycntner.classList.remove("show");
  }, 2000);
}

//window event listener to listen for key down event
window.addEventListener("keydown", (e) => {
  //pressed small a to z key code
  if (e.keyCode >= 60 && e.keyCode <= 90) {
    let letter = e.key;

    //correction of entered word checkup
    if (selectedword.includes(letter)) {
      //addind word correctletter array if word not already exists
      if (!correctletter.includes(letter)) {
        correctletter.push(letter);

        displayword();
      } else {
        //showing notification-container
        showNotification();
      }
    } else {
      //add entered word to wrong array if  word not initialy exists
      if (!worngletter.includes(letter)) {
        worngletter.push(letter);
        //updating wrong letter
        updateWrongLetter();
      } else {
        //showing notification-container
        showNotification();
      }
    }
  }
});

//playbutton listener for resting the game once player hit play again
playbutton.addEventListener("click", () => {
  //deleting intial cotebt present in correctletter and worngletter array
  correctletter.splice(0);
  worngletter.splice(0);

  //regenerating words
  selectedword = words[Math.floor(Math.random() * words.length)];

  //call word display
  displayword();

  //updating updateWrongLetter
  updateWrongLetter();

  // hiding popupcntner
  popupcntner.style.display = "none";
});

displayword();
