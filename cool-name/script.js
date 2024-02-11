const tb = document.querySelector('input[type="text"');
const submit = document.querySelector(".btn");
const label = document.querySelector(".name");
const result = document.querySelector(".result");
const back = document.querySelector(".back");


submit.addEventListener('click', function () {
    result.style.visibility = "visible";
    let name = tb.value;
    if (tb.value === "") {
        return;
        console.log("empty");
    }
    let rn = name.substring(1, name.length-1);
    console.log(rn);
    label.innerHTML = rn;
})

back.addEventListener('click', function () {
    result.style.visibility = "hidden";
    tb.value = "";
    label.innerHTML = "Enter your name!";
})