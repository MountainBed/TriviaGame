// Question bank that is an array of objectives. Each element is a different questions. Code set up in such a way to change dymanically based on number of elements
var questionBank = [
{question: "First think of the person who lives in disguise, who deals in secrets and tells naught but lies. Next, tell me what’s always the last thing to mend, the middle of middle and end of the end? And finally give me the sound often heard during the search for a hard-to-find word. Now string them together, and answer me this, which creature would you be unwilling to kiss?", correct: "A spider", distractor: ["An imposter", "A liger", "A badger"], correctgif: "assets/images/correct0.gif", incorrectgif: "assets/images/incorrect0.gif"},  
{question: "What is the core of the Elder wand?", correct: "A tail hair of a Thestral", distractor: ["A Veela hair", "A dragon heartstring", "A giant's beard hair"], correctgif: "assets/images/correct1.gif", incorrectgif: "assets/images/incorrect1.gif"}, 
{question: "Which of the following is NOT a Horcrux?", correct: "Gryffindor's sword", distractor: ["Harry Potter", "Ravenclaw's Diadem", "Nagini"], correctgif: "assets/images/correct2.gif", incorrectgif: "assets/images/incorrect2.gif"},
{question: "How many Knuts to a Sickle?", correct: "29 Knuts", distractor: ["10 Knuts", "31 Knuts", "5 Knuts"], correctgif: "assets/images/correct3.gif", incorrectgif: "assets/images/incorrect3.gif"}, 
{question: "What form did Ron's patronus take?", correct: "A Jack Russell Terrier", distractor: ["A serpent", "A weasel", "A griffin"], correctgif: "assets/images/correct4.gif", incorrectgif: "assets/images/incorrect4.gif"}
];

// Variable declaration
var questionNum = 0;
var win = 0;
var loss = 0;
var unanswered = 0;
var timerBetween = 5;
var answerGiven = false;
var timeLeft = 20;
var intervalId;

// Function to display questions, can be used on inital and reset
var displayQuestion = function() {
  answerGiven = false;
  timeLeft = 20;

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

// Timer function, triggers non-answer when hits zero
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

// Final screen after all questions have been displayed
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
  startoverbtn.text("Use the Time-Turner!");

  $("#questionarea").empty();
  $("#questionarea").append(finalMsg, correctTotalMsg, incorrectTotalMsg, unansweredMsg, '<br>', startoverbtn);

};

// reset values to initial values for start of new game
var resetValues = function() {
  questionNum = 0;
  win = 0;
  loss = 0;
  unanswered = 0;
  answerGiven = false;
  timeLeft = 20;
};

// Displays loss screen with answer
var lossScreen = function() {
  var displayLossMsg = $("<div>");
  var incorrectImg = $("<img>");
  answerGiven = true;

  clearInterval(intervalId);
  $("#timearea").html("Time remaining: " + timeLeft);

  displayLossMsg.html("<br>The correct answer was: " + questionBank[questionNum].correct);
  incorrectImg.attr('src', questionBank[questionNum].incorrectgif);

  $("#answerarea").empty();
  $("#questionarea").append(displayLossMsg, '<br>', incorrectImg);
  
  loss++;
  questionNum++;


  if ( questionNum == questionBank.length){
    setTimeout(resetscreen, 1000 * timerBetween);
  }
  else{
    setTimeout(displayQuestion, 1000 * timerBetween);
  }
  
};

// Displays loss screen with non-answer
var lossScreenUn = function() {
  var displayLossMsg = $("<div>");
  var incorrectImg = $("<img>");
  answerGiven = true;

  clearInterval(intervalId);
  $("#timearea").html("Time remaining: " + timeLeft);

  displayLossMsg.html("<br>You did not answer! The correct answer was: " + questionBank[questionNum].correct);
  incorrectImg.attr('src', questionBank[questionNum].incorrectgif);

  $("#answerarea").empty();
  $("#questionarea").append(displayLossMsg, '<br>', incorrectImg);
  
  unanswered++;
  questionNum++;

  if ( questionNum == questionBank.length){
    setTimeout(resetscreen, 1000 * timerBetween);
  }
  else{
    setTimeout(displayQuestion, 1000 * timerBetween);
  }
  
};

// Displays screen on correct answer
var winScreen = function() {
  var displayWinMsg = $("<div>");
  var correctImg = $("<img>");
  answerGiven = true;

  clearInterval(intervalId);
  $("#timearea").html("Time remaining: " + timeLeft);

  displayWinMsg.html("<br>One point for Gryffindor!");
  correctImg.attr('src', questionBank[questionNum].correctgif);

  $("#answerarea").empty();
  $("#questionarea").append(displayWinMsg, '<br>', correctImg);

  win++;
  questionNum++;

  if ( questionNum == questionBank.length){
    setTimeout(resetscreen, 1000 * timerBetween);
  }
  else{
    setTimeout(displayQuestion, 1000 * timerBetween);
  }
};

// Main body that reads user input
$(document).ready(function() {

// Start button
$("#openbutton").click(function(){
  displayQuestion();
});


// Reads user input after choices have been generated
$("#answerarea").on("click", function(e) {

  var check = e.target.getAttribute("correctvalue");
  check = parseInt(check);

  if(check === 1){
    if(!answerGiven){
      winScreen();
    }
  }

  else {
    if(!answerGiven){
      lossScreen();
    }
  }

});

// Reads user input for startover button at end of game
$('#questionarea').on('click', '#redo', function(){
  resetValues();
  displayQuestion();
});

});
