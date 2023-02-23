const cells = document.querySelectorAll(".cell");
const label = document.querySelector(".label");
const btn = document.querySelector(".btn");
const rem = document.querySelector(".remaining");
const buzzer = document.getElementById("buzzer");
const winner = document.getElementById("winner");
const type = document.getElementById("type");
const blind = document.getElementById("color-blind");
const body = document.getElementsByTagName("BODY")[0];
var labels = [];
var attempt = 1;
var currentCell = 0;
var word = words[Math.floor(Math.random() * words.length)].toUpperCase();
var inGame = true;
var correctColour = "rgb(106, 170, 100)";
var halfCorrectColour = "rgb(201, 180, 88)";

var incorrectColour = "#787C7E";
var remaining = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z';
rem.textContent = remaining;

btn.addEventListener('click', function () {
    location.reload();
})

document.addEventListener('keydown', (event) => {
    if(inGame){
        if (event.code == "Backspace" && currentCell > (attempt - 1) * 5) {
            labels[labels.length - 1].remove();
            labels.pop();
            currentCell -= 1;
            label.textContent = '';
        } else if (event.code == "Enter" && currentCell == attempt * 5) {
            type.play();
            checkWord();
        } else if (currentCell + 1 <= attempt * 5 && currentCell + 1 > (attempt - 1) * 5) {
            
            if (event.keyCode >= 97 && event.keyCode <= 122) {
                labels.push(document.createElement("Label"));
                labels[labels.length - 1].style.fontSize = "30px";
                labels[labels.length - 1].innerHTML = event.key.toUpperCase();
                cells[currentCell].appendChild(labels[labels.length - 1]);
                currentCell += 1;
            } else if(event.keyCode >= 65 && event.keyCode <= 90) {
                labels.push(document.createElement("Label"));
                labels[labels.length - 1].style.fontSize = "30px";
                labels[labels.length - 1].innerHTML = event.key.toUpperCase();
                cells[currentCell].appendChild(labels[labels.length - 1]);
                currentCell += 1;
            }
            
        }
    }
})

function checkWord() {
    let guess = '';
    for (let i=0;i<=4;i++) {
        let cellNumber = currentCell - (5 - i);
        guess += cells[cellNumber].textContent;
    }
    if (!words.includes(guess.toLowerCase())) {
        label.textContent = "Not a valid word";
        buzzer.play();
        return;
    }
    let word1 = word;
    for (let i=0;i<=4;i++) {
        let cellNumber = currentCell - (5 - i);
        let guessLetter = cells[cellNumber].textContent;
        let solutionLetter = word1[i];
        if (guessLetter == solutionLetter) {
            word1 = word1.substring(0, i) + ' ' + word1.substring(i + 1);
            cells[cellNumber].style.background = correctColour;
        } else if (word1.indexOf(guessLetter) != -1) {
            word1 = word1.replace(guessLetter, '.');
            cells[cellNumber].style.background = halfCorrectColour;
        } else {
            cells[cellNumber].style.background = incorrectColour;
            remaining = remaining.replace(cells[cellNumber].textContent, '');
            rem.textContent = remaining;
        }
    }

    if (word1 == '     ') {
        label.textContent = "You Won!";
        winner.play();
        inGame = false;
    } else if (attempt == 6) {
        label.textContent = "You Lost, the word was: " + word;
        inGame = false;
    }

    attempt += 1;
}

function blindMode(checkbox) {
    if (checkbox.checked) {
        correctColour = "rgb(255, 80, 80)";
        halfCorrectColour = "rgb(0, 0, 153)";
        body.style.background = "black";
        cells.forEach(cell => {
            console.log(cell.style.background);
            if (cell.style.background == "rgb(106, 170, 100)") {
                console.log("changed to dark");
                cell.style.background = correctColour;
            } else if (cell.style.background == "rgb(201, 180, 88)") {
                cell.style.background = halfCorrectColour;
            }
        });
    } else {
        correctColour = "rgb(106, 170, 100)";
        halfCorrectColour = "rgb(201, 180, 88)";
        body.style.backgroundImage = "linear-gradient(315deg, #29539b 0%, #1e3b70 74%)";
        cells.forEach(cell => {
            if (cell.style.background == "rgb(255, 80, 80)") cell.style.background = correctColour;
            else if (cell.style.background == "rgb(0, 0, 153)") cell.style.background = halfCorrectColour;
        });
    }
}