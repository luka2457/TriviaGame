// questions object
var questions = [
    {
        question: 'Why is Michael given a gold medal at the end of "Office Olympics"?',
        answers: ["for cruising in his Chrystler", "for being the flonkerton champion", "for closing on his condo", "for the most 'that's what she said' uses"],
        answer: "for closing on his condo",
        gifs: '<iframe src="https://giphy.com/embed/HSKfJVqTM6MOQ" width="480" height="249" frameBorder="0" class="giphy-embed" allowFullScreen style="margin:2%"></iframe><a href="https://giphy.com/gifs/the-office-HSKfJVqTM6MOQ"></a>'
    },
    {
        question: 'In the episode "Money", what themed room do Jim and Pam stay in at Schrute Farms?',
        answers: ["America Room", "Irrigation Room", "Amish Tranquility", "Night Time"],
        answer: "Irrigation Room",
        gifs: '<iframe src="https://giphy.com/embed/pdAweEZArTA76" width="480" height="273" frameBorder="0" class="giphy-embed" allowFullScreen style="margin:2%"></iframe><a href="https://giphy.com/gifs/reaction-smile-the-office-pdAweEZArTA76"></a>'
    },
    {
        question: "What was the drink Jim Halpert consistently bought from the breakroom's vending machine before returning to the Scranton branch from his brief time at the Stamford branch?",
        answers: ["bottled water", "Coca-Cola", "peach iced tea", "grape soda"],
        answer: "grape soda",
        gifs: '<iframe src="https://giphy.com/embed/13jghlUIB6FHZm" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen style="margin:2%"></iframe><a href="https://giphy.com/gifs/13jghlUIB6FHZm"></a>'
    },
    {
        question: "What movie does Michael say that Dwight cried during?",
        answers: ["Love Story", "Pearl Harbor", "Titanic", "Armageddon"],
        answer: "Armageddon",
        gifs: '<iframe src="https://giphy.com/embed/5xtDarxOHIVfDcAoiqI" width="480" height="278" frameBorder="0" class="giphy-embed" allowFullScreen style="margin:2%"></iframe><a href="https://giphy.com/gifs/editingandlayout-the-office-cry-dwight-5xtDarxOHIVfDcAoiqI"></a>'
    },
    {
        question: "In Season 2: Episode 12 'The Injury', what is Michael's reasoning behind not staying home the day he burned his foot on a George Foreman grill?",
        answers: ["He wanted his co-workers to worry and fuss over him.", "There was no toilet paper in his condominium.", "He wanted to be treated like it was a normal day.", "He did not want any special treatment."],
        answer: "There was no toilet paper in his condominium.",
        gifs: '<iframe src="https://giphy.com/embed/y1FoIhs0WnEkw" width="480" height="277" frameBorder="0" class="giphy-embed" allowFullScreen style="margin:2%"></iframe><a href="https://giphy.com/gifs/the-office-y1FoIhs0WnEkw"></a>'
    },
    {
        question: "Which series regular was a member of a real life band called The Grass Roots?",
        answers: ["Craig Robinson", "Creed Bratton", "Leslie David Baker", "Rainn Wilson"],
        answer: "Creed Bratton",
        gifs: '<iframe src="https://giphy.com/embed/ecGJ5mcN3kAZW" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen style="margin:2%"></iframe><a href="https://giphy.com/gifs/the-office-creed-bratton-a-benihana-christmas-ecGJ5mcN3kAZW"></a>'
    },
];

//variables
var timeLeft;
var rightAnswer = 0;
var wrongAnswer = 0;
var timerId;
var i = 0;

//functions
$(document).ready(function () {

    function startGame() { //to start game
        i = 0;
        rightAnswer = 0;
        wrongAnswer = 0;
        $("#playAgain").empty();
        $("#wins").empty();
        $("#loses").empty();
        $("#answerDisplay").empty();
        $("#startButton").html('<button class="btn btn-outline-secondary btn-lg">Start Game</button>');
        $("#startButton").click(function () {
            $("#startButton").empty();
            timeStart();
            nextQuestion();
        });
    };

    function timeStart() {  //to start timer
        timeLeft = 14;
        clearInterval(timerId);
        $("#timeRemaining").html("Time Remaining: 15 seconds");
        timerId = setInterval(function () {
            if (timeLeft == -1) {
                viewResults(false);
                wrongAnswer++;
                i++;
            } else {
                $("#timeRemaining").html("Time Remaining: " + timeLeft + " seconds");
                timeLeft--;
            }
        }, 1000);
    };

    function nextQuestion() {  //to continue to next question
        $("#gifsId").empty();
        $("#answerDisplay").empty();
        $("#questions").html(questions[i].question)
        $("#answerChoice1").html('<button class="btn btn-outline-secondary w3-animate-left">' + questions[i].answers[0] + '</button>');
        $("#answerChoice2").html('<button class="btn btn-outline-secondary w3-animate-right">' + questions[i].answers[1] + '</button>');
        $("#answerChoice3").html('<button class="btn btn-outline-secondary w3-animate-left">' + questions[i].answers[2] + '</button>');
        $("#answerChoice4").html('<button class="btn btn-outline-secondary w3-animate-right">' + questions[i].answers[3] + '</button>');
        $("button").click(function () {
            if (this.innerHTML === questions[i].answer) {
                viewResults(true);
                rightAnswer++;
                i++;
            } else {
                viewResults(false);
                wrongAnswer++;
                i++;
            }
        })
    }

    function viewResults(answerGuessed) { // to show answer after each question

        $("#answerChoice1").empty();
        $("#answerChoice2").empty();
        $("#answerChoice3").empty();
        $("#answerChoice4").empty();
        $("#answerDisplay").html("Answer: " + questions[i].answer);
        $("#gifsId").html(questions[i].gifs);

        clearInterval(timerId);
        if (answerGuessed === true) {
            $("#questions").html("Correct!");
        }
        if (answerGuessed === false) {
            $("#questions").html("Incorrect!");
        }
        resultTimer = setTimeout(function () {
            if (i == questions.length) {
                gameOver();
            } else {
                timeStart();
                nextQuestion();
            }
        }, 5000);
    }

    function gameOver() {  //shows final score and allows player to play again
        $("#questions").empty();
        $("#timeRemaining").empty();
        $("#gifsId").empty();
        $("#answerDisplay").html("Game Over");
        $("#wins").html("Answers Correct : " + rightAnswer);
        $("#loses").html("Answers Wrong : " + wrongAnswer);
        $("#playAgain").html('<button class="btn btn-outline-secondary btn-lg">Play Again</button>');
        $("#playAgain").click(function () {
            startGame();
        });
    }
    startGame(); // to display first start button 
});