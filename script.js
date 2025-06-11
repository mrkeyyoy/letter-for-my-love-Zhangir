const clickSound = new Audio('click.mp3');
function playSound() {
    clickSound.play();
}
document.getElementById("startButton").addEventListener("click", function() {
    document.getElementById("screen1").style.display = "none";
    document.getElementById("screen2").style.display = "block";
    playSound();
});
document.getElementById("no-button").addEventListener("click", function() {
    document.getElementById("screen2").style.display = "none";
    document.getElementById("screen3no").style.display = "block";
    playSound();
});
document.getElementById("repeat-button").addEventListener("click", function() {
    document.getElementById("screen3no").style.display = "none";
    document.getElementById("screen1").style.display = "block";
    playSound();
});
document.getElementById("yes-button").addEventListener("click", function() {
    document.getElementById("modal").classList.remove("hidden");
    playSound();
});
