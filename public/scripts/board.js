function loadAnswers(elemId) {
    var text = $(elemId).text();
    return text.split(",");
}

var redAnswers;
var blueAnswers;
var bomb;
var redWordsLeft;
var blueWordsLeft;
var gameEnded = false;

$(document).ready(function() {
    redAnswers = loadAnswers("#answers.red");
    blueAnswers = loadAnswers("#answers.blue");
    bomb = loadAnswers("#answers.bomb");
    
    redWordsLeft = redAnswers.length;
    blueWordsLeft = blueAnswers.length;
    
    $("td").click(function() {
        if ($(this).hasClass("red") || $(this).hasClass("blue") || $(this).hasClass("bomb") || $(this).hasClass("grey")) {
            return;
        }
        
        if (gameEnded) {
            return;
        }
        
        $("#status").text("").removeClass("blue").removeClass("red");
        
        if ($(this).hasClass("hover")) {
            $(this).removeClass("hover");
        }
        
        var text = $(this).text();
        
        if (redAnswers.indexOf(text) > -1) {
            $(this).addClass("red");
            redWordsLeft--;
        } else if (blueAnswers.indexOf(text) > -1) {
            $(this).addClass("blue");
            blueWordsLeft--;
        } else if (bomb.indexOf(text) > -1) {
            $(this).addClass("bomb");
            $("body").addClass("black");
            $("#status").text("GAME OVER").removeClass("blue").removeClass("red").addClass("bomb");
            gameEnded = true;
        } else {
            $(this).addClass("grey");
        }
        
        if (redWordsLeft <= 0) {
            $("body").addClass("red");
            $("#status").text("Red wins!").removeClass("blue").addClass("red");
            gameEnded = true;
        } else if (blueWordsLeft <= 0) {
            $("body").addClass("blue");
            $("#status").text("Blue wins!").removeClass("red").addClass("blue");
            gameEnded = true;
        }
    });
    
    $("td").hover(
        function() {
            // handlerIn
            if ($(this).hasClass("red") || $(this).hasClass("blue") || $(this).hasClass("bomb") || $(this).hasClass("grey")) {
                return;
            }
            
            $(this).addClass("hover");
        },
        function() {
            $(this).removeClass("hover")
        }
    );
});