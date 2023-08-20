// selector of setting box
let settingIcon = document.querySelector(".setting-options .toggle i");
let LevelsBtn = document.querySelectorAll(".setting-options button");
LevelsBtn.forEach((button) => {
  button.onclick = function () {
    LevelsBtn.forEach((el) => {
      el.classList.remove("active");
    });
    this.classList.add("active");
    window.localStorage.setItem("The Level is:", this.innerHTML);
    window.location.reload();
  };
});
settingIcon.onclick = function () {
  settingIcon.classList.toggle("fa-spin");
  settingIcon.parentElement.parentElement.classList.toggle("open");
};
if (window.localStorage.getItem("The Level is:")) {
  LevelsBtn.forEach((el) => {
    el.classList.remove("active");
  });
  let TheChoosenBtn = document.querySelector(
    `.${window.localStorage.getItem("The Level is:")}`
  );
  TheChoosenBtn.classList.add("active");
}
// Selector of the game
let LevelName = document.querySelector(".massage .lvl");
let LevelSeconds = document.querySelector(".massage .seconds");
let StartBtn = document.querySelector("button.start");
let TheWordThatMustBeWriten = document.querySelector(".the-word");
let TheWordsThatYouAreWriting = document.querySelector("input");
let TheComingWords = document.querySelector(".upcoming-words");
let WordsYouFinished = document.querySelector(".control .score .got");
let TotalWords = document.querySelector(".control .score .total");
let TheTimeLeftForGameToEnd = document.querySelector(".control .time span");
let WhenYouFinish = document.querySelector(".finish");
let TimeConter;
let TheArrayOfWords = [
  "Python",
  "JavaScript",
  "Rust",
  "Youtube",
  "Facebook",
  "What's app",
  "Twitter",
  "Coding",
  "Town",
  "Ruby",
  "Dell",
  "Task",
  "Playing",
];
// Setting Levels
const Levels = {
  Easy: 6,
  Normal: 4,
  Hard: 2,
};
// Default Levels
let DefaultLevelName = window.localStorage.getItem("The Level is:")
  ? window.localStorage.getItem("The Level is:")
  : "Normal";
console.log(DefaultLevelName);
let DefaultLevelTime = Levels[DefaultLevelName];
// Logic
// Disable past event
TheWordsThatYouAreWriting.onpaste = function () {
  return false;
};
// Adding the info
LevelName.innerHTML = DefaultLevelName;
LevelSeconds.innerHTML = DefaultLevelTime;
TotalWords.innerHTML = TheArrayOfWords.length;
TheTimeLeftForGameToEnd.innerHTML = DefaultLevelTime * TheArrayOfWords.length;
// Start the game
StartBtn.addEventListener("click", function () {
  this.remove();
  TheWordsThatYouAreWriting.focus();
  UpdateTheWords();
  // Calling of the Game is stated function
  GameIsStarted();
});
// Functions
function UpdateTheWords() {
  TheComingWords.textContent = "";
  let ARandomWord =
    TheArrayOfWords[Math.floor(Math.random() * TheArrayOfWords.length)];
  TheWordThatMustBeWriten.textContent = ARandomWord;
  TheArrayOfWords.splice(TheArrayOfWords.indexOf(ARandomWord), 1);
  for (word in TheArrayOfWords) {
    let Theword = document.createElement("div");
    Theword.textContent = TheArrayOfWords[word];
    TheComingWords.append(Theword);
  }
}
// Game is started
function GameIsStarted() {
  TimeConter = setInterval(() => {
    TheTimeLeftForGameToEnd.innerHTML--;
    CheckTheWord();
    arrayChecker();
    if (TheTimeLeftForGameToEnd.innerHTML == 0) {
      let massageDiv = document.createElement("div");
      WhenYouFinish.append(massageDiv);
      if (TheArrayOfWords.length == 0) {
        let massageText = document.createTextNode(`You have won`);
        massageDiv.className = "good";
        massageDiv.appendChild(massageText);
        clearInterval(TimeConter);
      } else {
        let massageText = document.createTextNode(`You have Lost`);
        massageDiv.className = "bad";
        massageDiv.appendChild(massageText);
      }
      clearInterval(TimeConter);
    }
  }, 1000);
}
// Checking the word
function CheckTheWord() {
  TheWordsThatYouAreWriting.oninput = function () {
    if (TheTimeLeftForGameToEnd.innerHTML != 0) {
      if (
        TheWordThatMustBeWriten.innerHTML.toLowerCase() ==
        TheWordsThatYouAreWriting.value.toLowerCase()
      ) {
        UpdateTheWords();
        TheWordsThatYouAreWriting.value = "";
        WordsYouFinished.innerHTML++;
      }
    } else {
      return false;
    }
  };
}
// Array checker
function arrayChecker() {
  if (TheArrayOfWords.length == 0 && TheWordThatMustBeWriten.innerHTML == "") {
    let massageDiv = document.createElement("div");
    let massageText = document.createTextNode(`You have won`);
    massageDiv.className = "good";
    massageDiv.appendChild(massageText);
    WhenYouFinish.append(massageDiv);
    clearInterval(TimeConter);
  }
}
// Message for my friend
if (window.localStorage.getItem("The Level is:") == "Easy") {
  let TheMessageToMyFriend = document.createElement("div");
  let theNameOfMyFriendspan = document.createElement("span");
  let theMainMessage = document.createTextNode(
    "I have made this level for nobs like you "
  );
  let TheNameItSelf = document.createTextNode("son of bakr");
  theNameOfMyFriendspan.className = "for-you";
  theNameOfMyFriendspan.append(TheNameItSelf);
  TheMessageToMyFriend.append(theMainMessage, theNameOfMyFriendspan);
  LevelName.parentElement.append(TheMessageToMyFriend);
}
