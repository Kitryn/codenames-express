const express = require('express');
const fs = require('fs');

const pub = __dirname + '/public';
const wordList = fs.readFileSync("words-duet.txt", "utf8").split("\n");
const PORT = process.env.PORT || 3000;

let game = {};

const app = express();
app.use(express.static(pub));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

function randomFromList(list, n) {
    let length = list.length;
    let shuffled = list.slice(0);
    
    for (let i=0; i<n; i++) {
        let index = Math.floor(Math.random() * (length - 1));
        let temp = shuffled[index];
        shuffled[index] = shuffled[length - 1 - i];
        shuffled[length - 1 - i] = temp;
    }
    
    let output = shuffled.slice(length - n, length);
    
    return output;
}

function newGame() {
    game = {};
    // game.player = Math.floor(Math.random() * 2);  // 0 for blue, 1 for red
    game.wordList = randomFromList(wordList, 25);
    
    let answers = randomFromList(game.wordList, 20);
    game.rawAnswers = answers.slice(0);
    game.answers = [answers.slice(0, 9), answers.slice(6, 15), answers.slice(15, 18), answers.slice(17,20)];
    // Index 0 = side A answers, 1 = side B answers, 2 = side A bombs, 3 = side B bombs
    
    let counter = 0;
    game.gameBoard = [];
    for (let i=0; i < 5; i++) {
        let row = [];
        for (let j=0; j < 5; j++) {
            row.push(game.wordList[counter]);
            counter++;
        }
        game.gameBoard[i] = row;
    }
}

newGame();

app.get('/', function(req, res) {
    res.render('board', {
        gameBoard: game.gameBoard,
        answers: game.rawAnswers.slice(0, 15),
        bomb: game.rawAnswers.slice(15,20)
    });
});

app.get('/a', function(req, res) {
    res.render('spymaster', {
        gameBoard: game.gameBoard,
        answers: game.answers[0],
        bomb: game.answers[2],
        player: 'a'
    });
});

app.get('/b', function(req, res) {
    res.render('spymaster', {
        gameBoard: game.gameBoard,
        answers: game.answers[1],
        bomb: game.answers[3],
        player: 'b'
    });
});

/*
app.get('/spymaster', function(req, res) {
    res.render('spymaster', {
        gameBoard: game.gameBoard,
        answersBlue: game.answers[0],
        answersRed: game.answers[1],
        bomb: game.answers[2],
        player: game.player
    });
});
*/
app.get('/newgame', function(req, res) {
    newGame();
    res.redirect('/');
});

app.listen(PORT);
console.log('Express started on port ' + PORT);