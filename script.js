const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language", "Hypertext Transfer Protocol"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which of the following is not a valid JavaScript data type?",
        options: ["Number", "Boolean", "Undefined", "String Array"],
        answer: "String Array"
    },
    {
        question: "What is the primary purpose of CSS?",
        options: ["Manipulating the DOM", "Defining the structure of a webpage", "Styling web pages", "Handling server requests"],
        answer: "Styling web pages"
    },
    {
        question: "Which of the following is a valid way to declare a variable in JavaScript?",
        options: ["variable myVar;", "var myVar;", "let myVar;", "const myVar;"],
        answer: "var myVar;"
    },
    {
        question: "Which HTML tag is used for embedding JavaScript code directly within an HTML document?",
        options: ["script", "js", "code", "javascript"],
        answer: "script"
    },
    {
        question: "What is the purpose of the 'getElementById' method in JavaScript?",
        options: ["To select elements by class name", "To select elements by tag name", "To select elements by their ID attribute", "To select elements by their data attribute"],
        answer: "To select elements by their ID attribute"
    },
    {
        question: "Which of the following is a valid event in JavaScript related to user input?",
        options: ["keydown", "animationend", "windowresize", "datafetch"],
        answer: "keydown"
    },
    {
        question: "What is the result of 10 + '5' in JavaScript?",
        options: ["15", "105", "Error", "1050"],
        answer: "105"
    },
    {
        question: "Which CSS property is used to control the spacing between lines of text?",
        options: ["margin", "padding", "line-height", "font-size"],
        answer: "line-height"
    },
    {
        question: "What does the 'localStorage' object in JavaScript allow you to do?",
        options: ["Send HTTP requests", "Store data in the browser for later use", "Manipulate the DOM", "Access the user's location"],
        answer: "Store data in the browser for later use"
    }
];


const startButton = document.getElementById("start-button");
const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result-container");
const scoreContainer = document.getElementById("score-container");
const highscoresList = document.getElementById("highscores-list");
let countdownContainer; // Declare countdownContainer as a global variable

let currentQuestionIndex = 0;
let timeLeft = 60;
let score = 0;
let timerInterval;
let highScores = [];

function startQuiz() {
    countdownContainer = document.getElementById("countdown-container"); // Assign countdownContainer here
    startButton.style.display = "none";
    countdownContainer.style.display = "block"; // Show the countdown container
    showQuestion();
    startTimer();
}

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        questionContainer.innerHTML = `
            <h2>${question.question}</h2>
            <ul>
                ${question.options.map(option => `<li onclick="checkAnswer('${option}')">${option}</li>`).join("")}
            </ul>
        `;
    } else {
        endQuiz();
    }
}

function checkAnswer(selectedOption) {
    const question = questions[currentQuestionIndex];
    if (selectedOption === question.answer) {
        score += 10;
        resultContainer.textContent = "Correct!";
    } else {
        timeLeft -= 10;
        resultContainer.textContent = "Wrong!";
    }

    currentQuestionIndex++;
    showQuestion();
}

function startTimer() {
    timerInterval = setInterval(function () {
        timeLeft--;
        if (timeLeft <= 0) {
            endQuiz();
        }
        updateCountdown();
    }, 1000);
}

function updateCountdown() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    countdownContainer.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function endQuiz() {
    clearInterval(timerInterval);
    questionContainer.innerHTML = "";
    resultContainer.innerHTML = "";
    scoreContainer.innerHTML = `<p>Your score: ${score}</p>`;

    // Save the high score to local storage
    const initials = prompt("Enter your initials:");
    if (initials) {
        const highscore = { initials, score };
        highScores.push(highscore);
        localStorage.setItem("highScores", JSON.stringify(highScores));
        displayHighScores();
    }
}

function displayHighScores() {
    highscoresList.innerHTML = "";
    const sortedHighScores = highScores.sort((a, b) => b.score - a.score);

    sortedHighScores.forEach((highscore, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${highscore.initials} - ${highscore.score}`;
        highscoresList.appendChild(listItem);
    });
}

startButton.addEventListener("click", startQuiz);
