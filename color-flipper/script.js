const colors = ["red", "green", "blue", "orange", "yellow", "cyan", "purple", "white", "black", "brown", "magenta", "tan", "olive", "maroon", "navy", "aquamarine"];
const btn = document.querySelector(".btn");
const color = document.querySelector(".color");
const colorsInput = document.querySelector('input[value="colors"]');
const hexInput = document.querySelector('input[value="hex"]');
const input = document.querySelector('input[value="input"]');
const tb = document.querySelector('input[type="text"]');

input.onclick = function() {
    console.log("input");
    tb.style.visibility = "visible";
    btn.style.top = "70%";
}

colorsInput.onclick = function() {
    console.log("color input");
    tb.style.visibility = "hidden";
    btn.style.top = "50%";
}

hexInput.onclick = function() {
    console.log("hex input");
    tb.style.visibility = "hidden";
    btn.style.top = "50%";
}

btn.addEventListener("click", function () {
    const rbs = document.querySelectorAll('input[type="radio"]');
    let selected;
    for (const rb of rbs) {
        if (rb.checked) {
            if (rb.value == "colors") {
                setColor();
            } else if (rb.value == "hex") {
                setHex();
            } else {
                setUserInput();
            }
        }
    }
});

function setColor () {
    const randomNumber = (Math.floor(Math.random() * 10));
    console.log(randomNumber);
    document.body.style.backgroundColor = colors[randomNumber];
    color.textContent = colors[randomNumber];
}

function setHex () {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    document.body.style.backgroundColor = "#" + randomColor;
    color.textContent = "#" + randomColor;
    console.log(randomColor);
}

function setUserInput () {
    const tb = document.querySelector('input[type="text"]');
    let chosenColor = tb.value;
    console.log(chosenColor);
    document.body.style.backgroundColor = chosenColor;
    color.textContent = chosenColor;
    tb.value = "";
}