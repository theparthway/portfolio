const nametb = document.getElementById("name");
const idtb = document.getElementById("id");
const intimetb = document.getElementById("intime");
const reasontb = document.getElementById("reason");
const result = document.getElementById("result");

const date = new Date();
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let Name = "Parth Shah"
let id = "SE21UCSE145"
let pm = date.getHours() >= 12 ? "PM": "AM";
let hour = pm == "PM" ? date.getHours() - 12 : date.getHours();
let outtime = date.getDate() + " " + months[date.getMonth()] + ", " + hour +":"+ date.getMinutes() + " " + pm;
let intime = (date.getDate() + (date.getDay() - 1)) + " " + months[date.getMonth()] + ", 9 AM";
let reason = "home";

nametb.placeholder = Name;
idtb.placeholder = id;
reasontb.placeholder = reason;
intimetb.placeholder = intime;

function submit() {
    result.innerHTML = '';

    const br = document.createElement("br");
    const p1 = document.createTextNode("Respected sir,")
    result.appendChild(p1);
    result.appendChild(br);
    
    const br2 = document.createElement("br");
    const p2 = document.createTextNode("Name: " + (nametb.value == "" ? Name : nametb.value));
    result.appendChild(p2);
    result.appendChild(br2);

    const br3 = document.createElement("br");
    const p3 = document.createTextNode("ID No: " + (idtb.value == "" ? id : idtb.value));
    result.appendChild(p3);
    result.appendChild(br3);

    const br4 = document.createElement("br");
    const p4 = document.createTextNode("Out time: " + outtime);
    result.appendChild(p4);
    result.appendChild(br4);

    const br5 = document.createElement("br");
    const p5 = document.createTextNode("In time: " + (intimetb.value == "" ? intime : intimetb.value));
    result.appendChild(p5);
    result.appendChild(br5);

    const br6 = document.createElement("br");
    const p6 = document.createTextNode("Reason: " + (reasontb.value == "" ? reason : reasontb.value));
    result.appendChild(p6);
    result.appendChild(br6);

    const br7 = document.createElement("br");
    result.appendChild(br7)
    const p7 = document.createTextNode("Kindly grant me permission for the leave.");
    result.appendChild(p7);
}
