/*GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score*/

var questionAnswer1 = {
    question: "Commonly used data types do not include:",
    answers: ["strings", "booleans", "alerts", "numbers"]
};

var questionAnswer2 = {
    question: "What does the acronym www stand for?",
    answers: ["web wide wave", "world wide web", "web word wall", "wide wall wave"]
};

var questionAnswer3 = {
    question: "Which of the following tasks or elements would be considered backend?",
    answers: ["React script", "Jquery script", "HTML programming", "PHP script"]
};

var questionAnswer4 = {
    question: "What does a cascading style sheet do",
    answers: ["it makes your page cascade", "makes your browser window bigger", "controls the way your content looks (or is presented)", "controls the scripts in your webpage"]
};

var questionAnswer5 = {
    question: "What does the domain name systems (DNS) do on the web",
    answers: ["it handles HTTP transactions", "it is an internet markup language", "it makes numbers dizzyint", "it matches and connects domain names to ip addresses."]
};

var quiz = {
    questionAnswers: [questionAnswer1, questionAnswer2, questionAnswer3, questionAnswer4, questionAnswer5],
    maxTime: 60, //60 seconds
    highScores: [],


};

var timer = quiz.maxTime;
var score;
var round = 0;
var startBtn = document.querySelector('.start');
startBtn.addEventListener('click', startTime);
// Set the timer, hide start button and show the first question and its answers
function startTime(event) {
    event.preventDefault();
    var startBtn = document.getElementById('startSection');
    startBtn.className = "d-none";
    document.querySelector('.timeCount').textContent = "Time " + timer;
    score = setInterval(myTimer, 1000);
    document.querySelector('#Quest').textContent= quiz.questionAnswers[0].question;
    answers(0);
    answerResult();

}
// timer count down
function myTimer() {
    timer -=1;
    document.querySelector('.timeCount').textContent = "Time " + timer;
    if (timer==0){
        clearInterval(score);
        removeList();
        document.querySelector('.timeCount').textContent = "";
        handleResults();
    }
}

// create the answers in create_li function
function answers(index) {

    quiz.questionAnswers[index].answers.forEach(create_li);

}
var Answer, list, anchor;
// create the li and anchor tags (answers)
function create_li(item, i) {

    Answer = document.querySelector('#Answer');
    list = document.createElement('LI');
    anchor = document.createElement('A');
    anchor.setAttribute('href', '#');
    anchor.setAttribute('style', 'text-decoration:none;color:white;background-color:purple');
    anchor.textContent = i + 1 + '.' + item;
    anchor.className = "anchor";
    list.className = "list";

    list.appendChild(anchor);
    Answer.appendChild(list);


}
var correctAnswer;
// make the click events for answers in anchorLoop function
function answerResult() {

    var anchorClick= document.querySelectorAll('.anchor');
    anchorClick.forEach(anchorLoop);
    console.log(anchorClick);



}
var checkAnswer, index = 1;
var highScores = [];
var obj = {};
function anchorLoop(item , i) {

    item.addEventListener('click', function(event){
        event.preventDefault();
        // Identify the correct Answer
        if (round == 4){
            correctAnswer = 4 + '.' + "it matches and connects domain names to ip addresses.";

        }
        if (round == 3){
            correctAnswer = 1 + '.' + "it makes your page cascade";

        }
        if (round == 2){
            correctAnswer = 4 + '.' + "PHP script";

        }
        if (round == 1){
            correctAnswer = 2 + '.' + "world wide web";

        }
        if (round == 0){
            correctAnswer = 3 + '.' + 'alerts';

        }
        // end identify the correct Answer
        compareAnswer(item);
        removeList();
        // show questions
        document.querySelector('#Quest').textContent= quiz.questionAnswers[1].question;
        if (round==1){
            document.querySelector('#Quest').textContent= '';
            document.querySelector('#Quest').textContent= quiz.questionAnswers[2].question;

        }
        if (round ==2){
            document.querySelector('#Quest').textContent= '';
            document.querySelector('#Quest').textContent= quiz.questionAnswers[3].question;

        }
        if(round==3){
            document.querySelector('#Quest').textContent= '';
            document.querySelector('#Quest').textContent= quiz.questionAnswers[4].question;
        }
        if(round==4){
            document.querySelector('#Quest').textContent= '';


        }
        // show answers
        if (index==4){
            answers(4);
            answerResult();
            index++;
        }
        if (index==3){
            answers(3);
            answerResult();
            index++;
        }
        if (index==2){
            answers(2);
            answerResult();
            index++;
        }

        if (index==1){
            answers(1);
            answerResult();
            index++;
        }
        round++;
        if(round==5){
            // final Result page
            round = 0;
            index=1;
            timer= timer -1;
            document.querySelector('.timeCount').textContent = "Time " + timer;
            clearInterval(score);
            handleResults();

        }

    })
}
// Print Correct or Wrong for the answer and then hiding it
function printAnswer(checkAnswer) {

    var hrElement = document.createElement("HR");
    var hrLine = document.getElementById('hrLine');
    hrLine.setAttribute('style', 'color: gray; width:25%');
    hrLine.insertBefore(hrElement, hrLine.childNodes[0]);
    document.getElementById("demo").textContent = checkAnswer;
    removeText();

    function removeText() {
        setTimeout(function () {
            document.getElementById('demo').textContent = '';
            hrLine.removeChild(hrElement);
        }, 1000);
    }
}
// Remove the question and the answers
function removeList() {
    document.getElementById('Quest').textContent='';
    // Question.remove();
    var myList = document.getElementById('Answer');
    // myList.remove();
    var insideList = document.querySelectorAll('.list');
    insideList.forEach(function (item, j) {
        myList.removeChild(item);
    });
}
// check whether the answer is correct or wrong
function compareAnswer(item) {
    if(correctAnswer == item.textContent){
        checkAnswer="correct";
        printAnswer(checkAnswer);
    } else {
        checkAnswer="wrong";
        timer= timer-9;
        printAnswer(checkAnswer);
    }
}
//Handle Result and High Scores
function handleResults(){
    document.getElementById('finalResult').classList.remove('d-none');
    document.querySelector('.finalScore').textContent = 'Your final score is ' + timer;
    document.getElementById('submit').onclick = function () {
        var initials = document.getElementById('initials').value;
        document.getElementById('finalResult').classList.add('d-none');
        document.querySelector('.timeCount').textContent = "";
        // end final Result page
        // High score page
        document.getElementById('highScore').classList.remove('d-none');
        obj = {};
        obj['initials']= initials;
        obj['timerScore'] = timer;
        highScores.push(obj);
        console.log(highScores);
        document.getElementById('printScore').textContent = '';
        highScores.forEach(function(item, index){
            document.getElementById('printScore').textContent += index + 1 + '-' + item.initials + ' - ' + item.timerScore + "\r\n";
        })
        //Jump back to start quiz
        document.getElementById('back').onclick = function(){
            timer=60;
            document.getElementById('highScore').classList.add('d-none');
            var startBtn = document.getElementById('startSection');
            startBtn.classList.remove('d-none');
        }
        //clear the high scores
        document.getElementById('clear').onclick = function () {
            highScores = [];
            document.getElementById('printScore').textContent= '';
        }
        // end of High Score page

    }
}