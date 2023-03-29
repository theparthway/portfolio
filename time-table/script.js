const container = document.querySelector(".container");
const sectionButtons = document.querySelector(".section");
const dayButtons = document.querySelector(".day");
const yearButtons = document.querySelector(".year");

const cols = [];



const timings = ['8:25-9:20', '9:25-10:20', '10:35-11:30', '11:35-12:30', '12:35-1:30', '1:35-2:30', '2:35-3:30', '3:35-4:30', '4:35-5:30', '5:35-6:30'];
const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const meals = ["Breakfast", "Lunch", "Dinner", "Snacks"];

for (let i=0;i<10;i++) {
    let cell = document.createElement("div");
    cols.push(cell);
    container.appendChild(cell);
}


var currentTime = new Date();

var currentOffset = currentTime.getTimezoneOffset();

var ISTOffset = 330;   // IST offset UTC +5:30 

var ist = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);


let finishedColor = "grey";
let currentColor = "green";


let hour = ist.getHours();
let minute = ist.getMinutes();
let day = ist.getDay();
let tt = tt1;
let section = 1;
let noOfSections = 14;
const section_buttons = [];

function setBoxes(secParam, hourParam) {
    for (let i=0;i<10;i++) {
        let courseCode = tt[secParam][i + 1];

        cols[i].innerHTML = "";
        cols[i].innerHTML += timings[i];
        
        cols[i].innerHTML += "<hr>";
        cols[i].innerHTML += courseCode;

        const courseKeys = Object.keys(courses);

        courseKeys.forEach((key) => {
            if (courseCode.includes(key)) {
                cols[i].innerHTML += "<hr>";
                cols[i].innerHTML += courses[key];
            }
        });

        const linkKeys = Object.keys(links);

        linkKeys.forEach((key) => {
            if (courseCode.includes(key)) {
                cols[i].innerHTML += "<hr>";
                const link = document.createElement("a");
                link.href = links[key];
                link.textContent = "Link";
                link.target = "_blank";
                cols[i].appendChild(link);
            }
        });

        if (hourParam > i) cols[i].style.color = finishedColor;
    }
}

function setLabels() {
    tt = tt1;
    noOfSections = 14;
    if (section_buttons.length != 0) {
        for (let i=0;i<section_buttons.length;i++) {
            section_buttons[i].textContent = tt[i][0];
        }
    }
    if (day == 0) {
        cols[5].textContent = "Sunday";
        return;
    }
    let secParam = (day - 1) * noOfSections + section;
    let hourParam = hours.indexOf(hour);
    if (minute < 30 && hourParam != -1) hourParam -= 1;


    setBoxes(secParam, hourParam);


    if ((hour == 18 && minute > 30) || (hour == 8 && minute < 30)) return;

    if (hourParam != -1 && day == ist.getDay()) {
        cols[hourParam].style.color = currentColor;
    }

    if (day != ist.getDay()) {
        for (let i=0;i<9;i++) {
            cols[i].style.color = finishedColor;
        }
    }
}

function changeButton(old_button, new_button) {
    if (old_button) {
        old_button.classList.remove("current");
    }
    new_button.classList.add("current");
}

setLabels();

for (let i=0;i<noOfSections;i++) {
    let button = document.createElement("button");
    section_buttons.push(button);
    button.appendChild(document.createTextNode(tt[i][0]));
    sectionButtons.appendChild(button);
    
    button.addEventListener('click', function() {
        changeButton(section_buttons[section], button);
        section = i;
        setLabels();
    });
}

const day_buttons = [];
for (let i=1;i<7;i++) {
    let button = document.createElement("button");
    day_buttons.push(button);
    button.appendChild(document.createTextNode(days[i]));
    dayButtons.appendChild(button);
    
    button.addEventListener('click', function() {
        changeButton(day_buttons[day - 1], button);
        day = i;
        setLabels()
    })
}

changeButton(null, section_buttons[1]);
changeButton(null, day_buttons[day - 1]);
