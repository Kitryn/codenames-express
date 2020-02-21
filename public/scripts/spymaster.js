function loadAnswers(elemId) {
    var text = $(elemId).text();
    return text.split(",");
}

var answers;
var bomb;

$(document).ready(function() {
    answers = loadAnswers("#answers.answer");
    bomb = loadAnswers("#answers.bomb");
    
    $("td").each(function(i, elem) {
        var text = $(this).text();
        
        if (answers.indexOf(text) > -1) {
            $(this).addClass("answer");
        } else if (bomb.indexOf(text) > -1) {
            $(this).addClass("bomb");
        } else {
            $(this).addClass("grey");
        }
    })
});