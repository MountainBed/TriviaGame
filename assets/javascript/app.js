var questionBank = [
{question: "Question 00", correct: "correctanswer00", distractor: ["distractor00", "distractor01", "distractor02"], correctgif: "assets/images/win.png", incorrectgif: "assets/images/loss.png"},  
{question: "Question 01", correct: "correctanswer01", distractor: ["distractor10", "distractor11", "distractor12"], correctgif: "assets/images/win.png", incorrectgif: "assets/images/loss.png"},  
{question: "Question 02", correct: "correctanswer02", distractor: ["distractor20", "distractor21", "distractor22"], correctgif: "assets/images/win.png", incorrectgif: "assets/images/loss.png"},  
{question: "Question 03", correct: "correctanswer03", distractor: ["distractor30", "distractor31", "distractor32"], correctgif: "assets/images/win.png", incorrectgif: "assets/images/loss.png"},  
{question: "Question 04", correct: "correctanswer04", distractor: ["distractor40", "distractor41", "distractor42"], correctgif: "assets/images/win.png", incorrectgif: "assets/images/loss.png"}
];

var questionNum = 0;
var win = 0;
var loss = 0;
var unanswered = 0;
var timerBetween = 5;
var answerGiven = false;
var timeLeft = 10;
var intervalId;

var displayQuestion = function() {
  answerGiven = false;
  timeLeft = 10;

  var correctchoice = Math.floor(Math.random() * (4));
  var j = 0;
  $("#questionarea").empty();
  $("#questionarea").html(questionBank[questionNum].question);


  $("#timearea").html("Time remaining: " + timeLeft);
  intervalId = setInterval(timer, 1000);

  for (var i = 0; i < 4; i++){
    var answerChoice = $("<div>");
    answerChoice.addClass("text-center choices");

    if (i === correctchoice){
      answerChoice.text(questionBank[questionNum].correct);
      answerChoice.attr("correctvalue",1);
    }
    else{
      answerChoice.text(questionBank[questionNum].distractor[j]);
      answerChoice.attr("correctvalue",0);
      j++;
    }

    $("#answerarea").append(answerChoice);
  }

};

var timer = function() {

  if ( timeLeft === 0) {
    $("#timearea").html("Time remaining: " + timeLeft);
    lossScreenUn();
    timeLeft = 10;
  }
  else{
    $("#timearea").html("Time remaining: " + timeLeft);
    timeLeft--;
  }
};

var resetscreen = function() {
  var finalMsg = $("<div>");
  var correctTotalMsg = $("<div>");
  var incorrectTotalMsg = $("<div>");
  var unansweredMsg = $("<div>");
  var startoverbtn = $("<button>");

  $("#answerarea").empty();

  startoverbtn.addClass("btn btn-danger");
  startoverbtn.attr("id", "redo");

  finalMsg.text("All was well.");
  correctTotalMsg.text("Correct answers: " + win);
  incorrectTotalMsg.text("Incorrect answers: " + loss);
  unansweredMsg.text("Unanswered: " + unanswered);
  startoverbtn.text("Use the Time Turner!");

  $("#questionarea").empty();
  $("#questionarea").append(finalMsg, correctTotalMsg, incorrectTotalMsg, unansweredMsg, '<br>', startoverbtn);

};
var resetValues = function() {
  questionNum = 0;
  win = 0;
  loss = 0;
  unanswered = 0;
  answerGiven = false;
  timeLeft = 10;
}
var lossScreen = function() {
  var displayLossMsg = $("<div>");
  var incorrectImg = $("<img>");
  answerGiven = true;

  clearInterval(intervalId);
  $("#timearea").html("Time remaining: " + timeLeft);

  displayLossMsg.html("The correct answer was: " + questionBank[questionNum].correct);
  incorrectImg.attr('src', questionBank[questionNum].incorrectgif);

  $("#answerarea").empty();
  $("#questionarea").append(displayLossMsg, incorrectImg);
  
  loss++;
  questionNum++;

  console.log("questionNum " + questionNum);
  console.log("question bank length " + questionBank.length);

  if ( questionNum == questionBank.length){
    setTimeout(resetscreen, 1000 * timerBetween);
  }
  else{
    setTimeout(displayQuestion, 1000 * timerBetween);
  }
  
};
var lossScreenUn = function() {
  var displayLossMsg = $("<div>");
  var incorrectImg = $("<img>");
  answerGiven = true;

  clearInterval(intervalId);
  $("#timearea").html("Time remaining: " + timeLeft);

  displayLossMsg.html("You did not answer! The correct answer was: " + questionBank[questionNum].correct);
  incorrectImg.attr('src', questionBank[questionNum].incorrectgif);

  $("#answerarea").empty();
  $("#questionarea").append(displayLossMsg, incorrectImg);
  
  unanswered++;
  questionNum++;

  console.log("questionNum " + questionNum);
  console.log("question bank length " + questionBank.length);

  if ( questionNum == questionBank.length){
    setTimeout(resetscreen, 1000 * timerBetween);
  }
  else{
    setTimeout(displayQuestion, 1000 * timerBetween);
  }
  
};
var winScreen = function() {
  var displayWinMsg = $("<div>");
  var correctImg = $("<img>");
  answerGiven = true;

  clearInterval(intervalId);
  $("#timearea").html("Time remaining: " + timeLeft);

  displayWinMsg.html("One point for Gryffindor!");
  correctImg.attr('src', questionBank[questionNum].correctgif);

  $("#answerarea").empty();
  $("#questionarea").append(displayWinMsg, correctImg);

  win++;
  questionNum++;
  console.log("questionNum " + questionNum);
  console.log("question bank length " + questionBank.length);

  if ( questionNum == questionBank.length){
    setTimeout(resetscreen, 1000 * timerBetween);
  }
  else{
    setTimeout(displayQuestion, 1000 * timerBetween);
  }
};


$(document).ready(function() {

  $("#openbutton").click(function(){
    displayQuestion();
  });

  $("#answerarea").on("click", function(e) {
    console.log(this);

    var check = e.target.getAttribute("correctvalue");
    check = parseInt(check);


    console.log(check);

    if(check === 1){
      console.log("correct choice");
      if(!answerGiven){
        winScreen();
      }
    }

    else {
      console.log("incorrect choice");
      if(!answerGiven){
        lossScreen();
      }
    }

  });

  $('#questionarea').on('click', '#redo', function(){
    resetValues();
    displayQuestion();
  });

});
