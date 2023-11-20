const addPersonBtn = document.querySelector(".addPerson");
const personInput = document.querySelector(".personInput");
const peopleInfo = document.querySelector(".peopleInfo");

const inputDiv = document.querySelector(".input");
const addItemBtn = document.querySelector(".addItem");
const itemInput = document.querySelector(".itemInput");
const qtyInput = document.querySelector(".qtyInput");
const priceInput = document.querySelector(".priceInput");
const itemInfo = document.querySelector(".itemInfo");

let people = [];
let items = [];

addPersonBtn.addEventListener("click", () => {
    people.push(personInput.value);
    
    let p = document.createElement("p");
    let textNode = document.createTextNode(people[people.length - 1]);
    p.appendChild(textNode);
    peopleInfo.appendChild(p);

    // checkboxes
    let input = document.createElement("input");
    input.type = "checkbox";
    input.name = people[people.length - 1];
    let label = document.createElement("label");
    label.for = people[people.length - 1];
    label.textContent = people[people.length - 1];
    inputDiv.appendChild(input);
    inputDiv.appendChild(label);

    personInput.value = "";
})

addItemBtn.addEventListener("click", () => {
    let arr = [];
    arr.push(itemInput.value);
    arr.push(qtyInput.value);
    arr.push(priceInput.value);
    items.push(arr);
    itemInput.value = "";
    qtyInput.value = "";
    priceInput.value = "";
    console.log(items);

    for (let i=0;i<items.length;i++) {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        let elem = tr.appendChild(td);
        elem.innerHTML = items[i][0];

        td = document.createElement("td");
        elem = tr.appendChild(td);
        elem.innerHTML = items[i][1];

        td = document.createElement("td");
        elem = tr.appendChild(td);
        elem.innerHTML = items[i][2];

        itemInfo.appendChild(tr);
    }
})