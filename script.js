const quote = document.querySelector(".kanye");

fetch("https://api.kanye.rest/")
    .then((response) => response.json())
    .then((data) => quote.textContent = data.quote);