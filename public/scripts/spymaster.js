function loadAnswers(elemId) {
    var text = $(elemId).text();
    return text.split(",");
}

var redAnswers;
var blueAnswers;
var bomb;

$(document).ready(function() {
    redAnswers = loadAnswers("#answers.red");
    blueAnswers = loadAnswers("#answers.blue");
    bomb = loadAnswers("#answers.bomb");
    
    $("td").each(function(i, elem) {
        var text = $(this).text();
        
        if (redAnswers.indexOf(text) > -1) {
            $(this).addClass("red");
        } else if (blueAnswers.indexOf(text) > -1) {
            $(this).addClass("blue");
        } else if (bomb.indexOf(text) > -1) {
            $(this).addClass("bomb");
        } else {
            $(this).addClass("grey");
        }
    })
});