const timer = document.getElementById("timer");
const nextTimer = document.getElementById("nextTimer");
const startPauseButton = document.getElementById("pausa-start");
const resetButton = document.getElementById("reset");
const skipButton = document.getElementById("skip");
const ringSound = document.getElementById("ringSound");
const counterContainer = document.getElementById("counterContainer");

//todolist buttons
const addGoal = document.getElementById("addGoal");
const inputGoal = document.getElementById("inputGoal");
const todolist = document.getElementById("todolist");

let seconds = 1500; 
let intervalBigTimer;
let running = false;
let intervalNextTimer;
let secondsTimer = 1500;
let breakTimer = 1;

function updateTimer () {
    if (seconds === 0) {
        changeTimer();
    } else {
    seconds--;
    }
    timer.textContent = formatSeconds(seconds);
}

//change between the work time and the break time
function changeTimer () { 
    changeSound();
    if (breakTimer === 4) {
        breakTimer = 0;
        seconds = 900;
        secondsTimer = 900;
        timer.textContent = "15:00";
        nextTimer.textContent = "25:00";
    } else if (secondsTimer === 1500) {        
        seconds = 300;
        secondsTimer = 300;
        timer.textContent = "5:00";
        nextTimer.textContent = "25:00";
    } else if (secondsTimer === 300 || secondsTimer === 900) {
        seconds = 1500;
        secondsTimer = 1500;
        timer.textContent = "25:00";
        breakTimer++;
        if (breakTimer === 4) {
            nextTimer.textContent = "15:00";
        } else {
            nextTimer.textContent = "5:00";

        }
    }
    running = false;        
    startPauseButton.textContent = "S t a r t";        
    clearInterval(intervalBigTimer);
    changeColor(secondsTimer);
}

//play the alarm for the end
function changeSound() {
    ringSound.currentTime = 0;
    ringSound.volume = 1;
    ringSound.play();
}

//convert and represent the minutes and seconds
function formatSeconds () {
    let minutes = Math.floor(seconds / 60);
    let secondsInMinute = seconds % 60;
    return `${leftZero(minutes)}:${leftZero(secondsInMinute)}`;
}

function leftZero (number) {
    return number < 10 ? "0" + number : number;
}

//start and stop the timer 
function startBigTimer () {
    if (!running) {        
        intervalBigTimer = setInterval(updateTimer, 1000);
        running = true;        
        changeColor(secondsTimer);
    } else {
        clearInterval(intervalBigTimer);
        running = false;
        changeColor(secondsTimer);
    }
}

//This function reset the timer 
function resetBigTimer () {
    clearInterval(intervalBigTimer);
    running = false;
    startPauseButton.textContent = "S t a r t";
    seconds = secondsTimer;
    changeColor(secondsTimer);
    if (secondsTimer === 1500) {
        timer.textContent = "25:00";
    } else if (secondsTimer === 300) {
        timer.textContent = "5:00";
    } else if (secondsTimer === 900) {
        timer.textContent = "15:00";
    }
}

function changeColor(stageSeconds) {
    if (!running) {
        counterContainer.style.borderColor = "rgba(156, 156, 156, 1)"; 
        counterContainer.style.boxShadow = "inset 0px 0px 39px 32px rgba(255, 255, 255, 0.44)";
    } else if (stageSeconds === 1500) {
        counterContainer.style.borderColor = "rgba(255, 0, 0, 0.8)";
        counterContainer.style.boxShadow = "inset 0px 0px 39px 32px rgba(255, 0, 0, 0.20)";
    } else if (stageSeconds === 300 || stageSeconds === 900) {
        counterContainer.style.borderColor = "rgba(0, 92, 224, 0.8)";
        counterContainer.style.boxShadow = "inset 0px 0px 39px 32px rgba(0, 92, 224, 0.20)";
    }
}

startPauseButton.addEventListener('click', startBigTimer);
// Change the text from the button pausa-start
startPauseButton.addEventListener('click', function () {
    if (startPauseButton.textContent === "S t a r t") {
        startPauseButton.textContent = "P a u s e";
    } else {
        startPauseButton.textContent = "S t a r t";
    }
})
resetButton.addEventListener('click', resetBigTimer);
skipButton.addEventListener('click', changeTimer);

//todo list functions

function createGoal() {
    const descriptionGoal = inputGoal.value;
    todolist.style.display = "flex";
    if (descriptionGoal.trim() !== "") {        
        const listItem = document.createElement("li");
        const goalItem = document.createElement("div");
        goalItem.setAttribute("id", "goalItem");
        listItem.textContent = descriptionGoal;
        goalItem.appendChild(createCheck());        
        goalItem.appendChild(listItem);
        goalItem.appendChild(createEdit());
        goalItem.appendChild(createDelete());        
        todolist.appendChild(goalItem);
        inputGoal.value = "";
    }        
    todolist.style.display = "flex";
}

function createCheck() {
    const completeGoal = document.createElement("button");
    completeGoal.setAttribute("id", "completeGoal");
    completeGoal.setAttribute("class", "buttonsGoal");
    const iconCheck = document.createElement("i");
    iconCheck.setAttribute("class", "fa-solid fa-check");
    completeGoal.appendChild(iconCheck);
    return completeGoal;
}

function createDelete() {
    const deleteGoal = document.createElement("button");
    deleteGoal.setAttribute("id", "deleteGoal");
    deleteGoal.setAttribute("class", "buttonsGoal");
    const iconDelete = document.createElement("i");
    iconDelete.setAttribute("class", "fa-solid fa-trash");
    deleteGoal.appendChild(iconDelete);
    return deleteGoal;
}

function createEdit() {
    const editGoal = document.createElement("button");
    editGoal.setAttribute("id", "editGoal");
    editGoal.setAttribute("class", "buttonsGoal");
    const iconEdit = document.createElement("i");
    iconEdit.setAttribute("class", "fa-solid fa-pen-to-square");
    editGoal.appendChild(iconEdit);
    return editGoal;
}

addGoal.addEventListener("click", createGoal);
inputGoal.addEventListener("keypress", function(event) {
    if (event.keyCode === 13) {
        createGoal();
    }
})



//terminar el delete y los botones con el setAtribbute