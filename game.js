$(document).ready(function(){
    var buttonColors = ["red", "blue", "green", "yellow"];
    var gamePattern = [];
    var userClickedPattern = [];
    var level = 0;
    var firsttime = true;
    $(".btn").on("click", function(){
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        animatePress(userChosenColor);
        
        playSound(userChosenColor);
        if(userClickedPattern.length > 0){
            checkAnswer(userClickedPattern.length - 1)
        }
    });
    
    

    $("body").on("keydown", function(){
        nextSequence();
    })
function nextSequence(){
    if(firsttime)
    {
        var randomNumber = Math.floor(Math.random(0,4)*4);

        var randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);
    
            $("#" + randomChosenColor).fadeOut(50).fadeIn(50);
        playSound(randomChosenColor);
        firsttime=false;
    }
    
    $("#level-title").text("Level " + (level + 1));
    level++;
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
}
function animatePress(userChosenColor){
    $("#" + userChosenColor).addClass("pressed");
    setTimeout(function(){
        $("#" + userChosenColor).removeClass("pressed"); 
    }, 100);
}

function checkAnswer(currentLevel){
    let failed = false;
    for(let j = 0 ; j <= currentLevel && j < gamePattern.length; j++){
        if(userClickedPattern[j]!==gamePattern[j])
        {
            failed=true;
            break
        }
    }
    if(failed){
        console.log("failed");
        $("#level-title").text("Game over!");
        setTimeout(()=>{
            $("#level-title").text("Press A Key to Start");
        },1000);
        firsttime = true;
        gamePattern=[];
        userClickedPattern=[];
        level=0;
    }

    else if(gamePattern.length - 1 === currentLevel){
        console.log("success");
        firsttime = true;
        setTimeout(()=>{
            nextSequence();
        },1000);
        userClickedPattern=[];
    }
    

}

});


