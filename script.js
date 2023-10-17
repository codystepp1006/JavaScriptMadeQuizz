const questions = [
    {
        question: "What language includes style sheets that adds style to a page?",
        answers: [
            {text: "HTML", correct:false},
            {text: "CSS", correct:true},
            {text: "JavaScript", correct:false},
            {text: "C++", correct:false},
        ]
    },
    {
        question: "What does every HTML document start with?",
        answers: [
            {text: "<head>", correct:false},
            {text: "<p>", correct:false},
            {text: "<!Doctype>", correct:true},
            {text: "var", correct:false},
        ]
    },
    {
        question: "what language are you excited to learn next?",
        answers: [
            {text: "JavaScript", correct:true},
            {text: "HTML", correct:true},
            {text: "CSS", correct:true},
            {text: "C++", correct:true},
        ]
    }
];

var questionElement = document.getElementById("question");
var answerButtons = document.getElementById("answer-buttons");
var nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innterHTML = "Next";
    showQuestion();
};
function showQuestion(){
    resetState();
    var currentQuestion = questions[currentQuestionIndex];
    var questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
};

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    };
}

function selectAnswer(e){
    var selectedBtn =e.target;
    var isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
   Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
        });
        nextButton.style.display = "block";
    };


    nextButton.addEventListener("click", ()=>{
        if(currentQuestionIndex < questions.length){
            handleNextButton();
        }else{
            startQuiz();
        }
    });
startQuiz();

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.lenth){
        showQuestion();
    } else {
        scoreboard();
    }
}

function scoreboard(){
    resetState();
    questionElement.innerHTML = `Your Score: ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Want to Play Again?";
    nextButton.style.display = "block";
};