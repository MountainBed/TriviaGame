var questionBank = [
{question: "Question 00", correct: "correctanswer00", distractor: ["distractor00", "distractor01", "distractor02"], correctgif: "assets/images/win.png", incorrectgif: "assets/images/loss.png"},  
{question: "Question 01", correct: "correctanswer01", distractor: ["distractor10", "distractor11", "distractor12"], correctgif: "assets/images/win.png", incorrectgif: "assets/images/loss.png"},  
{question: "Question 02", correct: "correctanswer02", distractor: ["distractor20", "distractor21", "distractor22"], correctgif: "assets/images/win.png", incorrectgif: "assets/images/loss.png"},  
{question: "Question 03", correct: "correctanswer03", distractor: ["distractor30", "distractor31", "distractor32"], correctgif: "assets/images/win.png", incorrectgif: "assets/images/loss.png"},  
{question: "Question 04", correct: "correctanswer04", distractor: ["distractor40", "distractor41", "distractor42"], correctgif: "assets/images/win.png", incorrectgif: "assets/images/loss.png"}
];

$(document).ready(function() {

  $("#openbutton").click(function(){
    var correctchoice = Math.floor(Math.random() * (4));
    var j = 0;
    console.log(correctchoice);

    for (var i = 0; i < 4; i++){
      var answerChoice = $("<div>");
      answerChoice.addClass("text-center choices");

      if (i === correctchoice){
        answerChoice.text(questionBank[0].correct);
        answerChoice.attr("value",1);
      }
      else{
        answerChoice.text(questionBank[0].distractor[j]);
        answerChoice.attr("value",0);
        j++;
      }

      $("#answerarea").append(answerChoice);
    }

  });


})
