
// basic
const cookies = document.querySelector(".cookies");
const image = document.querySelector(".cookieimg");
const perSecond = document.querySelector(".perSecond");


const quantities = document.querySelectorAll(".qty");
const buttons = document.querySelectorAll(".buysell");
const costs = document.querySelectorAll(".Cost");
const rowsQty = document.getElementsByTagName("table")[0].rows;
const rowsStore = document.getElementsByTagName("table")[1].rows;

const items = ["Cursor", "Grandma", "Farm", "Mine", "Factory", "Bank", "Temple", "Wizardtower"];
const cps = [1, 2, 47, 260, 1400, 7800, 44000];

var clickValue = 1;
var hiddenItem = 1;

function bought (btn) {
    index = items.findIndex(item => item == btn.innerHTML);
    console.log(index);
    cookies.textContent = (parseInt(cookies.innerHTML) - parseInt(costs[index].innerHTML));
    perSecond.textContent = (parseInt(perSecond.innerHTML) + cps[index]);
    costs[index].textContent = Math.floor((parseFloat(costs[index].innerHTML) * 1.15));
    quantities[index].textContent = parseInt(quantities[index].innerHTML) + 1;
}

image.addEventListener('click', function () {
    if (parseInt(perSecond.innerHTML) >= 4) {
        clickValue = Math.floor(parseInt(perSecond.innerHTML) / 4);
    }
    cookies.textContent = (parseInt(cookies.textContent) + clickValue);
})

buttons.forEach(function (btn, i) {
    btn.addEventListener('click', function () {
        if (parseInt(cookies.innerHTML) > parseInt(costs[i].innerHTML)) bought(btn);
    })
})

setInterval (function () {
    cookies.textContent = (parseInt(cookies.innerHTML) + parseInt(perSecond.innerHTML));
    costs.forEach(function (cost) {
        var btn = buttons[items.findIndex(item => item == cost.dataset.item)];
        if (btn) {
            if (parseInt(cookies.innerHTML) >= parseInt(cost.innerHTML)) {
                btn.disabled = false;
            } else {
                btn.disabled = true;
            }
        }
    })

    if (parseInt(cookies.innerHTML) >= (0.7 * parseInt(costs[hiddenItem].innerHTML))) {
        rowsQty[hiddenItem+1].style.visibility = "visible";
        rowsStore[hiddenItem+1].style.visibility = "visible";
        console.log("visible");
        hiddenItem += 1;
    }
}, 1000);