console.log("running")

const answerButtons = document.querySelector(".answerButtons")

// create object of questions with their answers
const triviaQuestions = [
    {"name": "plant1",
    "family": "plant-family1",
    "imageSource": "img/plant1.jpg"},
    {"name": "plant2",
    "family": "plant-family2",
    "imageSource": "img/plant2.jpg"},
    {"name": "plant3",
    "family": "plant-family3",
    "imageSource": "img/plant3.jpg"},
    {"name": "plant4",
    "family": "plant-family4",
    "imageSource": "img/plant4.jpg"},
    {"name": "plant5",
    "family": "plant-family5",
    "imageSource": "img/plant5.jpg"},
    {"name": "plant6",
    "family": "plant-family6",
    "imageSource": "img/plant6.jpg"},
]

// wrong answers to fill in the other buttons
let wrongAnswers = [
    "Murphy's Oil Soap",
    "Pine",
    "Apples",
    "Rose",
    "Aquinas",
    "Rabbits",
    "Snake oil"
]

// define buttons
const buttonA = document.getElementById("buttonA")
const buttonB = document.getElementById("buttonB")
const buttonC = document.getElementById("buttonC")
const buttonD = document.getElementById("buttonD")
const resetButton = document.getElementById("resetButton")

// event listeners for button clicks
answerButtons.addEventListener("click", userClick)
resetButton.addEventListener("click", reset)


// action to take once a user clicks on an answer
function userClick(e) {
    const currentButton = document.getElementById(e.target.id)

    // only do something if a button is pressed
    if (e.target.tagName == "BUTTON") {
        console.log(`currentButton = ${currentButton.id}`)
    }
}

// reset the game
function reset(e) {
    // reset score
    // reset question counter
    // go to new question
    newQuestion()
    console.log("Reset button pressed")
}

function newQuestion() {
    // define current plantObj
    let randArrIndex = Math.floor(Math.random() * triviaQuestions.length)
    let currentPlant = triviaQuestions[randArrIndex]
    let currentName = currentPlant.name
    let currentImgSrc = currentPlant.imageSource
    let currentFamily = currentPlant.family

    // load image

    // load correct answer into one of the buttons
    let answerArray = [null, null, null, null]

    // random num for placement of answer in answerArray
    let randAnsIndex = Math.floor(Math.random() * answerArray.length)

    // place the currentFamily variable randomly in the answerArray
    answerArray[randAnsIndex] = currentFamily

    // returns an array of 3 nonidentical, wrong answers
    // function fillCurrentWrongAnswers(){
    //     function rFill (i, currentWrongAnswers) {
    //         if (currentWrongAnswers.includes(null) == false) {
    //             return currentWrongAnswers
    //         } else {
    //             let randWrongAnswer = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)]
    //             if ((currentWrongAnswers[i] == null) && 
    //                 (currentWrongAnswers.includes(randWrongAnswer) == false)) {
    //                 currentWrongAnswers[i] = randWrongAnswer
    //                 return rFill(i + 1, currentWrongAnswers)
    //             }
    //         }
    //     }
    //     return rFill(0, [null, null, null])
    // }

    // make array of 3 wrong answers that are nonidentical
    // currentWrongAnswers = fillCurrentWrongAnswers()

    // console.log(`currentWrongAnswers: ${currentWrongAnswers}`)

    // add the incorrect answers to the answerArray
    // this sometimes works and sometimes causes an error
    // I think the error is caused by somehow removing too many items from the list
    // for (let i = 0; i < answerArray.length; i++) {
    //     if (answerArray[i] == null) {
    //         answerArray[i] = currentWrongAnswers[currentWrongAnswers.length - 1]
    //         currentWrongAnswers.pop()
    //     }
    // }

    console.log(answerArray)

    // load wrong answers into the remaining buttons
}

function threeWrongAnswers(){
    function rThree (wrongArr) {
        if (wrongArr.length = 3) {
            return wrongArr
        } else {
            let randWrongAnswerIndex = Math.floor(Math.random() * wrongAnswers.length)
            let randWrongAnswer = wrongAnswers[randWrongAnswerIndex]
            if (wrongArr.includes(randWrongAnswer) == false) {
                wrongArr.push(randWrongAnswer)
                return rThree(wrongArr)
            } else if (wrongArr.includes(randWrongAnswer) == true) {
                return rThree(wrongArr)
            }
        }
    }
    return rThree([])
}

// trying to rewrite threeWrongAnswers() in the most basic way
function threeNonidenticalItems(){
    let myArr = ["a", "b", "c", "d", "e", "f", "g"]
    function rThree (newArr) {
        if (newArr.length == 3) {
            return newArr
        } else {
            let randIndex = Math.floor(Math.random() * myArr.length)
            let randItem = myArr[randIndex]
            if (newArr.includes(randItem) == false) {
                newArr.push(randItem)
                return rThree(newArr)
            } else if (newArr.includes(randItem) == true) {
                return rThree(newArr)
            } else {
                console.log("something went wrong")
            }
        }
    }
    rThree([])
}

// get API information


