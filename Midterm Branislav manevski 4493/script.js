var entertimertimezone = new Date();
function shtoperica(){
    return (new Date()-entertimertimezone)/1000;
}

(function(){
  // Functions
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){
    name=document.getElementById("name").value;
    if(name==""){
        alert("input your name and surname")
    }else{
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}` + shtoperica() + ' seconds';
  }
  }
  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "Inside which HTML element do we put the JavaScript (choose one)",
      answers: {
        a: "&ltscripting&gt",
        b: "&ltjs&gt",
        c: "&ltjavascript&gt",
        d: "&ltscript&gt"
      },
      correctAnswer: "d"
    },
    {
      question: "The external JavaScript file must contain the &ltscript&gt tag (check all that apply)",
      answers: {
        a: "True",
        b: "False",
        c: "None",
        d: "Both"
      },
      correctAnswer: "b"
    },
    {
      question: "How do you write 'Hello World' in an alert box? (Select option)",
      answers: {
        a: "Alert(“Hello World”);",
        b: 'alertBox("Hello World");',
        c: "msg(“Hello World”);",
        d: "msgBoxl(“Hello World”);"
      },
      correctAnswer: "a"
    }
  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();

function save() {
    surname=document.getElementById("surname").value,
    name=document.getElementById("name").value,
    id=document.getElementById("id").value,
    email=document.getElementById("email").value,
    note=document.getElementById("note").value
    let object={surname,name,email,id,note};
    localStorage.setItem("jsonobject", JSON.stringify(object));
}