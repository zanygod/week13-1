const startButton = document.getElementById('start-button');
const submitButton = document.getElementById('submit-button');
const restartButton = document.getElementById('restart-button');
const initialScreen = document.getElementById('initial-screen');
const quizContainer = document.getElementById('quiz-container');
const summaryScreen = document.getElementById('summary-screen');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');
const finalScoreDisplay = document.getElementById('final-score');
const timerDisplay = document.getElementById('timer');

let currentQuestionIndex = 0;
let score = 0;
let timer;
let countdown;
const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Markup Language"],
        correct: 0
    },
    {
        question: "Which HTML attribute is used to define inline styles?",
        options: ["class", "style", "font", "styles"],
        correct: 1
    },
    {
        question: "Which property is used to change the background color in CSS?",
        options: ["color", "bgcolor", "background-color", "background"],
        correct: 2
    },
    {
        question: "Which JavaScript function is used to write to an HTML element?",
        options: ["document.write()", "document.writeln()", "document.innerHTML", "document.getElementById()"],
        correct: 3
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        options: ["onchange", "onclick", "onmouseclick", "onmouseover"],
        correct: 1
    },
    {
        question: "What does CSS stand for?",
        options: ["Creative Style Sheets", "Colorful Style Sheets", "Cascading Style Sheets", "Computer Style Sheets"],
        correct: 2
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        options: ["<style>", "<script>", "<css>", "<head>"],
        correct: 0
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        options: ["The <body> section", "The <head> section", "Both <head> and <body> sections", "The <footer> section"],
        correct: 2
    },
    {
        question: "How do you create a function in JavaScript?",
        options: ["function myFunction()", "function = myFunction()", "function:myFunction()", "function => myFunction()"],
        correct: 0
    },
    {
        question: "How do you call a function named 'myFunction'?",
        options: ["call myFunction()", "call function myFunction()", "myFunction()", "execute myFunction()"],
        correct: 2
    }
];

startButton.addEventListener('click', startQuiz);
submitButton.addEventListener('click', submitAnswer);
restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
    initialScreen.style.display = 'none';
    quizContainer.style.display = 'block';
    currentQuestionIndex = 0;
    score = 0;
    scoreDisplay.textContent = score;
    startTimer();
    displayQuestion();
}

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.dataset.index = index;
        optionElement.addEventListener('click', selectOption);
        optionsContainer.appendChild(optionElement);
    });
}

function selectOption(event) {
    const selectedOption = optionsContainer.querySelector('.selected');
    if (selectedOption) {
        selectedOption.classList.remove('selected');
    }
    event.target.classList.add('selected');
}

function submitAnswer() {
    const selectedOption = optionsContainer.querySelector('.selected');
    if (!selectedOption) {
        alert('Please select an answer!');
        return;
    }

    const answerIndex = parseInt(selectedOption.dataset.index);
    const correctIndex = questions[currentQuestionIndex].correct;

    if (answerIndex === correctIndex) {
        score++;
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        selectedOption.classList.add('correct');
    } else {
        feedback.textContent = 'Incorrect!';
        feedback.style.color = 'red';
        selectedOption.classList.add('incorrect');
        optionsContainer.children[correctIndex].classList.add('correct');
    }

    scoreDisplay.textContent = score;

    setTimeout(() => {
        feedback.textContent = '';
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
            resetTimer();
        } else {
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    quizContainer.style.display = 'none';
    summaryScreen.style.display = 'block';
    finalScoreDisplay.textContent = score;
    clearInterval(countdown);
}

function restartQuiz() {
    summaryScreen.style.display = 'none';
    initialScreen.style.display = 'block';
}

function startTimer() {
    timer = 30;
    timerDisplay.textContent = timer;
    countdown = setInterval(() => {
        timer--;
        timerDisplay.textContent = timer;
        if (timer <= 0) {
            clearInterval(countdown);
            submitAnswer();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(countdown);
    startTimer();
}
