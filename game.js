var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];

var started=0;
var level=0;

$(document).keypress(function(){
  if(started==0){
    $("#level-title").text("level "+level);
    newSequence();
    started=1;
  }
});


function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
  {
    console.log("success");
    if(gamePattern.length===userClickedPattern.length){
      setTimeout(function(){newSequence();},1000);
    }

  }
  else{
    console.log("failure");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}



function newSequence(){

  userClickedPattern=[];
  level++;
    $("#level-title").text("level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  var colorBox=$("#" + randomChosenColour);
  flash(colorBox);
  playSound(randomChosenColour);


}


$(".btn").click(function()
{
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);


});


function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}


function animatePress(currentColour){
$("#"+ currentColour).addClass("pressed");
setTimeout(function(){$("#"+ currentColour).removeClass("pressed");},100);

}
function flash(element){
  element.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function startOver(){
  level=0;
  started=0;
  gamePattern=[];
}
