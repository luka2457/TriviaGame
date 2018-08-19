// question object
var questions = [
    {
        question: "what is the worlds longest river",
        answers: ["Amazon", "Nile", "Yangtze", "Mississippi"],
        answer: "Amazon"
    },
    {
        question: "Which Country has the highest population density",
        answers: ["Macau", "Monaco", "Singapore", "Hong Kong"],
        answer: "Macau"
    },
    {
        question: "what is the largest dessert on Earth",
        answers: ["Sahara", "Gobi", "Arabian", "Kalahari"],
        answer: "Sahara"
    },
    {
        question: "Which of these countries does <u>NOT</u> have a Monarch",
        answers: ["Portugal", "Denmark", "Belgium", "Spain"],
        answer: "Portugal"
    },
    {
        question: "What is the world's largest lake",
        answers: ["Caspian Sea", "Lake Superior", "Lake Victoria", "Lake Huron"],
        answer: "Caspian Sea"
    },
];

//variables
var timeLeft = 29;
var rightAnswer = 0;
var wrongAnswer = 0;
var timerId;
var i = 0;

//fun functions
$(document).ready(function () {

    function startGame() {
        i = 0;
        rightAnswer = 0;
        wrongAnswer = 0;
        $("#playAgain").empty();
        $("#wins").empty();
        $("#loses").empty();
        $("#answerDisplay").empty();
        $("#startButton").html("<button>Start Game</button>");
        $("#startButton").click(function () {
            $("#startButton").empty();
            timeStart();
            nextQuestion();
        });
    };

    function timeStart() {
        timeLeft = 29;
        clearInterval(timerId);
        $("#timeRemaining").html("Time Remaining: 30 seconds");
        timerId = setInterval(function () {
            if (timeLeft == -1) {
                viewResults(false);
                //function to show answers
            } else {
                $("#timeRemaining").html("Time Remaining: " + timeLeft + " seconds");
                timeLeft--;
            }
        }, 1000);
    };

    function nextQuestion() {
        $("#answerDisplay").empty();
        $("#questions").html(questions[i].question)
        $("#answerChoice1").html("<button>" + questions[i].answers[0] + "</button>");
        $("#answerChoice2").html("<button>" + questions[i].answers[1] + "</button>");
        $("#answerChoice3").html("<button>" + questions[i].answers[2] + "</button>");
        $("#answerChoice4").html("<button>" + questions[i].answers[3] + "</button>");
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

    function viewResults(answerGuessed) {

        $("#answerChoice1").empty();
        $("#answerChoice2").empty();
        $("#answerChoice3").empty();
        $("#answerChoice4").empty();

        clearInterval(timerId);
        if (answerGuessed === true) {
            $("#questions").html("Correct!");
            $("#answerDisplay").html("Answer: " + questions[i].answer);
        }
        if (answerGuessed === false) {
            $("#questions").html("Incorrect!");
            $("#answerDisplay").html("Answer: " + questions[i].answer);
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

    function gameOver() {
        $("#questions").empty();
        $("#timeRemaining").empty();
        $("#answerDisplay").html("Game Over");
        $("#wins").html("Answers Correct : " + rightAnswer);
        $("#loses").html("Answers Wrong : " + wrongAnswer);
        $("#playAgain").html("<button>Play Again</button>");
        $("#playAgain").click(function () {
            startGame();
        });


    }

    startGame();

});