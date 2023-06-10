const video = document.getElementById("myVideo");
const btn = document.getElementById("myBtn");
const text = document.getElementById("text");

function myFunction() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    text.style.display = "block";
    btn.style.display = "none";
}