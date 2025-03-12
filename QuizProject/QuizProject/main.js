let quizData = [
    {
        question: "What is Java primarily used for?",
        options: 
        [
            "Web development",
            "Mobile applications",
            "Game development",
            "All of the above",
        ],
        correct: "All of the above",
    },
    {
        question: "Which keyword is used to define a class in Java?",
        options: 
        [
            "Define",
            "Class",
            "Object",
            "Struct",
        ],
        correct: "Class",
    },
    {
        question: "Which data type is used to store decimal numbers in Java?",
        options: 
        [
            "Int",
            "Double",
            "Char",
            "Boolean",
        ],
        correct: "Double",
    },
    {
        question: "Which of the following is NOT a valid Java identifier?",
        options: 
        [
            "myVariable",
            "123var",
            "_variable",
            "$name",
        ],
        correct: "123var",
    },
    {
        question: "Which symbol is used for single-line comments in Java?",
        options: 
        [
            "//",
            "/**/",
            "<!---->",
            "##",
        ],
        correct: "//",
    },
    {
        question: "What will System.out.println(5+'5')?",
        options: 
        [
            "10",
            "55",
            "Error",
            "5+5",
        ],
        correct: "55",
    },
    {
        question: "Which keyword is used to create an object in Java?",
        options: 
        [
            "Create",
            "Make",
            "New",
            "Object",
        ],
        correct: "New",
    },
    {
        question:"Which loop is used when the number of iterations is known beforehand?",
        options:
        [
            "While",
            "Do-while",
            "For",
            "Switch",
        ],
        correct:"For",
    },
    {
        question:"What is the default value of a boolean variable in Java",
        options:
        [
            "True",
            "False",
            "0",
            "Null",

        ],
        correct:"False",
    },
    {
        question:"Which Java feature allows multiple methods with the same name but different parameters?",
        options:
        [
            "Inheritence",
            "Polymorphism",
            "Method Overloading",
            "Encapsulation",
        ],
        correct: "Method Overloading",
    },

];

const quizContainer = document.querySelector(".quiz-container");
const questionElement = document.querySelector(".quiz-container .question");
const optionsContainer = document.querySelector(".quiz-container .options");
const nextBtn = document.querySelector(".quiz-container .next-btn");
const quizResult = document.querySelector(".quiz-result");
const resultContainer = document.querySelector(".quiz-result"); // Select result container
const retakeBtn = document.querySelector(".retake-btn");

let questionNumber = 0;
let score = 0;
let userAnswers = []; // Store user answers

const createQuestion = () => {
    let currentQuestion = quizData[questionNumber];
    questionElement.innerHTML = currentQuestion.question;

    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach(option => {
        let button = document.createElement("button");
        button.classList.add("option");
        button.innerText = option;
        button.addEventListener("click", () => selectAnswer(option, button));
        optionsContainer.appendChild(button);
    });
};

const selectAnswer = (selectedOption, button) => {
    let correctAnswer = quizData[questionNumber].correct;
    userAnswers.push({ // Store selected answer
        question: quizData[questionNumber].question,
        selected: selectedOption,
        correct: correctAnswer
    });

    if (selectedOption === correctAnswer) {
        score++;
        button.style.backgroundColor = "green";
    } else {
        button.style.backgroundColor = "red";
    }

    document.querySelectorAll(".option").forEach(btn => btn.disabled = true);
};

nextBtn.addEventListener("click", () => {
    if (questionNumber < quizData.length - 1) { 
        questionNumber++;
        createQuestion();
    } else {
        showResult();
    }
});

const showResult = () => {
    quizContainer.style.display = "none";
    quizResult.style.display = "block";
    resultContainer.innerHTML = `<h2>You have scored ${score} out of ${quizData.length}</h2>`;

    userAnswers.forEach((answer) => {
        let questionDiv = document.createElement("div");
        questionDiv.classList.add("question-container");
        if (answer.selected !== answer.correct) {
            questionDiv.classList.add("incorrect");
        }

        questionDiv.innerHTML = `
            <div class="question">${answer.question}</div>
            <div class="user-answer">Your answer: ${answer.selected || "Not answered"}</div>
            <div class="correct-answer">Correct answer: ${answer.correct}</div>
        `;

        resultContainer.appendChild(questionDiv);
    });

    resultContainer.appendChild(retakeBtn); // Ensure retake button is added
};

retakeBtn.addEventListener("click", () => {
    questionNumber = 0;
    score = 0;
    userAnswers = [];
    quizContainer.style.display = "block";
    quizResult.style.display = "none";
    createQuestion();
});

createQuestion();
