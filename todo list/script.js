const tb = document.querySelector('input[type="text"]');
const ul = document.querySelector('.list');
const label = document.querySelector('.error');

tb.focus();

tb.addEventListener('keyup', function(event) {
    label.textContent = "";
    if (event.keyCode === 13) {
        event.preventDefault();
        if(tb.value == "") {
            label.textContent = "Please enter some task";
            return;
        }
        let li = document.createElement('li');
        li.textContent = tb.value;
        li.style.fontSize = "25px";
        ul.appendChild(li);
        tb.value = "";
        tb.focus();
        li.addEventListener('click', function () {
            li.remove();
            tb.focus();
        })
    }
})