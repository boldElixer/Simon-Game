var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var press = false;
var level = 0;
$(document).on("keydown", function() {
    if(press===false){
        $("h1").text("Level "+level);
        nextSequence();
        press = true;
    }
});
$(".btn").click(function() {
    var userChosenColor = (this.id);
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.indexOf(userChosenColor));
});
function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    press = false;
}
function nextSequence () {
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);
    $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
};
function playSound(name) {
    const audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    }, 100)
}
function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(gamePattern.length===userClickedPattern.length){
            userClickedPattern=[];
            setTimeout(function() {
                nextSequence();
            }, 1000)
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}