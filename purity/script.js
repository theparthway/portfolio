const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const scoreElement = document.getElementById("score");
const virginCheckbox = document.getElementById("virgin");
const virginLabel = document.getElementById("virginlabel");
const header = document.querySelector(".header");

virginCheckbox.checked = false;

let isVirgin = false;
let score = 0;
let questions, currentQuestionIndex;
let nbutton, ybutton;

startButton.addEventListener('click', startGame)

function startGame() {
  startButton.classList.add('hide')
  virginCheckbox.classList.add('hide');
  virginLabel.classList.add('hide');
  header.classList.add('hide');
  if (virginCheckbox.checked) {
    questions = virgin;
    isVirgin = true;
  }
  else questions = nonvirgin;
//   shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  if (currentQuestionIndex < questions.length) showQuestion(questions[currentQuestionIndex]);
  else {
    let finalScore = isVirgin ? Math.round((score / 65) * 100) : score;
    let finalLabel = isVirgin ? "Virgin" : "Final";
    showQuestion(`Thank you for taking the quiz!\n${finalLabel} score: ${finalScore}`);
    ybutton.classList.add('hide');
    nbutton.classList.add('hide'); 
  }
  console.log(currentQuestionIndex);
}

function showQuestion(question) {
  questionElement.innerText = question;

  ybutton = document.createElement('button');
  ybutton.innerText = "Yes";
  ybutton.classList.add('btn');
  ybutton.addEventListener('click', () => {
      currentQuestionIndex++;
      setNextQuestion();
    });
    answerButtonsElement.appendChild(ybutton);
    
    nbutton = document.createElement('button');
    nbutton.innerText = "No";
    nbutton.classList.add('btn');
    nbutton.addEventListener('click', () => {
    score++;
    scoreElement.textContent = score;
    currentQuestionIndex++;
    setNextQuestion();
    });
  answerButtonsElement.appendChild(nbutton);

  console.log(score);

//   question.answers.forEach(answer => {
//     const button = document.createElement('button')
//     button.innerText = answer.text
//     button.classList.add('btn')
//     if (answer.correct) {
//       button.dataset.correct = answer.correct
//     }
//     button.addEventListener('click', selectAnswer)
//     answerButtonsElement.appendChild(button)
//   })
}

function resetState() {
//   clearStatusClass(document.body)
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

// function selectAnswer(e) {
//   const selectedButton = e.target
//   const correct = selectedButton.dataset.correct
//   setStatusClass(document.body, correct)
//   Array.from(answerButtonsElement.children).forEach(button => {
//     setStatusClass(button, button.dataset.correct)
//   })
//   if (shuffledQuestions.length > currentQuestionIndex + 1) {
//     nextButton.classList.remove('hide')
//   } else {
//     startButton.innerText = 'Restart'
//     startButton.classList.remove('hide')
//   }
// }

// function setStatusClass(element, correct) {
//   clearStatusClass(element)
//   if (correct) {
//     element.classList.add('correct')
//   } else {
//     element.classList.add('wrong')
//   }
// }

// function clearStatusClass(element) {
//   element.classList.remove('correct')
//   element.classList.remove('wrong')
// }

// const questions = [
//   {
//     question: 'What is 2 + 2?',
//     answers: [
//       { text: '4', correct: true },
//       { text: '22', correct: false }
//     ]
//   },
//   {
//     question: 'Who is the best YouTuber?',
//     answers: [
//       { text: 'Web Dev Simplified', correct: true },
//       { text: 'Traversy Media', correct: true },
//       { text: 'Dev Ed', correct: true },
//       { text: 'Fun Fun Function', correct: true }
//     ]
//   },
//   {
//     question: 'Is web development fun?',
//     answers: [
//       { text: 'Kinda', correct: false },
//       { text: 'YES!!!', correct: true },
//       { text: 'Um no', correct: false },
//       { text: 'IDK', correct: false }
//     ]
//   },
//   {
//     question: 'What is 4 * 2?',
//     answers: [
//       { text: '6', correct: false },
//       { text: '8', correct: true }
//     ]
//   }
// ]