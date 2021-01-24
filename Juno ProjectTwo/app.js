//https://opentdb.com/api_config.php

const app = {};

app.counterCorrect = 0;
app.currentQuestionCounter = 0;

//
app.getData = (difficultySelected, categorySelected) => {
  $.ajax({
    type: "GET",
    url: `https://opentdb.com/api.php?amount=5&category=${categorySelected}&difficulty=${difficultySelected}&type=multiple`,
    dataType: "JSON",
  }).then((data) => {
    app.startQuiz(data);
  });
};

app.startQuiz = (data) => {
  const questionArray = data.results;
  const totalNumberOfQuestions = data.results.length;
  const randomizedAnswers = app.questionAnswersMixup(
    questionArray[app.currentQuestionCounter]
  );

  //show the next-btn on right screen
  $("#next-btn").toggle();
  //load the initial quesion & answers
  $(".quiz-question").text(
    app.decodeHTML(questionArray[app.currentQuestionCounter].question)
  );
  randomizedAnswers.forEach((answer) => {
    const removeSpacing = app.removeWhiteSpace(answer);
    const cleanedUpString = app.decodeHTML(answer);
    const answersHtml = `
    <input type="radio" id=${removeSpacing} name="radioGroup" value=${removeSpacing}>
    <label for=${answer}>${cleanedUpString}</label><br>
  `;
    $(".quiz-answer-selection").append(answersHtml);
  });

  //load next question after hitting 'next-btn'
  $("#next-btn").on("click", function () {
    if (app.currentQuestionCounter < totalNumberOfQuestions - 1) {
      //increase counter
      app.currentQuestionCounter++;
      //capture answers and calculate score
      app.calculateScores(questionArray);
      //display next question
      $(".quiz-question").text(
        app.decodeHTML(questionArray[app.currentQuestionCounter].question)
      );
      //display next set of answers
      $(".quiz-answer-selection").empty();
      app
        .questionAnswersMixup(questionArray[app.currentQuestionCounter])
        .forEach((answer) => {
          const removeSpacing = app.removeWhiteSpace(answer);
          const cleanedUpString = app.decodeHTML(answer);
          const answersHtml = `
          <input type="radio" id=${removeSpacing} name="radioGroup" value=${removeSpacing}>
          <label for=${answer}>${cleanedUpString}</label><br>
          `;
          $(".quiz-answer-selection").append(answersHtml);
        });
    }
    // final screen, modal and score. Close and reset quiz
    else {
      app.currentQuestionCounter++;
      //add up score
      app.calculateScores(questionArray);
      //open final screen
      app.finalScoreOverlay(totalNumberOfQuestions);
    }
  });
};

//calculate # of correct & incorrect responses for final screen
app.calculateScores = (data) => {
  const selectedValue = $("input[type='radio']:checked").val();

  const correctAnswer = data[app.currentQuestionCounter - 1].correct_answer;
  const correctAnswerRemoveSpacing = app.removeWhiteSpace(correctAnswer);

  //increase correctAnswer counter
  if (selectedValue === correctAnswerRemoveSpacing) {
    app.counterCorrect++;
  }
};

//final screen & reset
app.finalScoreOverlay = (totalNumberOfQuestions) => {
  //reset and display overlay w/ score
  $(".quiz-question").empty();
  $(".quiz-answer-selection").empty();
  $("#next-btn").toggle();
  $(".final-overlay-container").fadeIn(1500);

  //display # answered correctly on final overlay
  $(".questions-correctly-answered").text(app.counterCorrect);
  $(".questions-total").text(totalNumberOfQuestions);

  //close all and reset
  $("#close-btn").on("click", function () {
    location.reload();
  });
};

//join arrays of answers and randomize their order
app.questionAnswersMixup = (data) => {
  const incorrect_answers = data.incorrect_answers;
  const correct_answer = data.correct_answer;
  incorrect_answers.push(correct_answer);
  newArray = incorrect_answers;

  //shuffle thanks to https://gomakethings.com/how-to-shuffle-an-array-with-vanilla-js/
  const shuffle = function (array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };
  return shuffle(newArray);
};

//user make selection of difficulty and category
app.userSelection = () => {
  let selectedDifficulty;
  let selectedCategory;
  $("select#selection-difficulty").on("change", function () {
    selectedDifficulty = $("#selection-difficulty option:selected").val();
  });
  $("select#selection-category").on("change", function () {
    selectedCategory = $("#selection-category option:selected").val();
  });

  //ajax call  once selection is made & start button selected
  $("#start-btn").on("click", function () {
    if (selectedDifficulty && selectedCategory) {
      app.getData(selectedDifficulty, selectedCategory);
    } else {
      alert("Please both a Difficulty Level and a Category");
    }
  });
};

//remove whitespace (for cleaner id's on form vales/names)
app.removeWhiteSpace = (response) => {
  return response.split(" ").join("");
};

//decode HTML (json returned messy response)
app.decodeHTML = (string) => {
  let cleanedUpString = string
    .replace(/&quot;/g, "'")
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&shy;/g, "-")
    .replace(/&rsquo;/g, "'");
  return cleanedUpString;
};

//initialized functions
app.init = () => {
  app.userSelection();
};
$(document).ready(function () {
  app.init();
});
