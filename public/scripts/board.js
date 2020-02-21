function loadAnswers(elemId) {
    var text = $(elemId).text();
    return text.split(",");
}

var answers;
var bomb;
var wordsLeft;
var gameEnded = false;

$(document).ready(function() {
    answers = loadAnswers("#answers.answer");
    bomb = loadAnswers("#answers.bomb");
    
    wordsLeft = answers.length;
    
    $("td").click(function() {
        if ($(this).hasClass("answer") || $(this).hasClass("bomb") || $(this).hasClass("grey")) {
            return;
        }
        
        if (gameEnded) {
            return;
        }
        
        
        if ($(this).hasClass("hover")) {
            $(this).removeClass("hover");
        }
        
        var text = $(this).text();
        
        if (answers.indexOf(text) > -1) {
            $(this).addClass("answer");
            wordsLeft--;
        } else if (bomb.indexOf(text) > -1) {
            $(this).addClass("bomb");
            $("body").addClass("black");
            $("#status").text("GAME OVER").removeClass("answer").addClass("bomb");
            gameEnded = true;
        } else {
            $(this).addClass("grey");
        }
        
        if (wordsLeft <= 0) {
            $("body").addClass("answer");
            $("#status").text("You win!").addClass("red");
            gameEnded = true;
        }
    });
    
    $("td").hover(
        function() {
            // handlerIn
            if ($(this).hasClass("answer") || $(this).hasClass("bomb") || $(this).hasClass("grey")) {
                return;
            }
            
            $(this).addClass("hover");
        },
        function() {
            $(this).removeClass("hover")
        }
    );
});