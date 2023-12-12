const questions = [
  {
    question: "Важно ли знать математику программисту?",
    answers: [
      { text: "Одночначно", correct: false },
      { text: "Скорее да, чем нет", correct: false },
      { text: "Необязательно", correct: true },
      { text: "Кому оно надо?", correct: false },
    ],
  },
  {
    question: "Я русская, почему мне не поставили 100 баллов на ЕГЭ по русскому?",
    answers: [
      { text: "А почему должны были", correct: false },
      { text: "хз", correct: false },
      { text: "Надо было готовиться", correct: false },
      { text: "Это ошибка экспертов, подай на аппеляцию", correct:  true },
    ],
  },
  {
    question: "Сколько нужно для комфортной жизни?",
    answers: [
      { text: "больше 10к", correct: false },
      { text: "больше 100к/мес", correct: true },
      { text: "Ничего не нужно, я аскет", correct: false },
      { text: "Лям", correct: false },
    ],
  },
  {
    question: "Врать плохо?",
    answers: [
      { text: "Одночначно", correct: false },
      { text: "Скорее да, чем нет", correct: false },
      { text: "Очень плохо", correct: false },
      { text: "Все средства хороши", correct: true },
    ],
  },
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion()
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.append(button);
        if(answer.correct){
          button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
    })
}

function resetState(){
  nextButton.style.display = 'none';
  while(answerButtons.firstChild){
    answerButtons.firstChild.remove()
  }
}

function selectAnswer(e){
  const selectedBtn = e.target
  const isCorrect = selectedBtn.dataset.correct === 'true'
  if(isCorrect){
    selectedBtn.classList.add('correct')
    score++
  }else{
    selectedBtn.classList.add('incorrect')
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === 'true') {
      button.classList.add('correct')
    }
    button.disabled = true
  })
  nextButton.style.display = 'block'
}

function showScore(){
  resetState()
  questionElement.innerHTML = `Вы набрали ${score} из ${questions.length}!`
  nextButton.innerHTML = 'Играть снова'
  nextButton.style.display = 'block'
}

function handleNextButton () {
  currentQuestionIndex++
  if(currentQuestionIndex < questions.length) {
    showQuestion()
  }else{
    showScore()
  }
}

nextButton.addEventListener('click', () => {
  if(currentQuestionIndex < questions.length ) {
    handleNextButton()
  } else {
    startQuiz()
  }
})

startQuiz()