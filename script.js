// Elementos del DOM
const timerDisplay = document.getElementById("timer");
const playButton = document.querySelector(".fa-play");
const resetButton = document.querySelector(".fa-rotate-right");
const settingsButton = document.querySelector(".fa-gear");
const modeDisplay = document.querySelector(".modo-actual p");
const nextModeDisplay = document.querySelector(".proximo-modo p");
const addTaskButton = document.getElementById("add");
const taskInput = document.querySelector(".input-container input");
const taskList = document.querySelector(".list-todo");

// Elementos del modal de configuración
const modal = document.getElementById("configModal");
const closeModalBtn = document.getElementById("closeModal");
const saveConfig = document.getElementById("saveConfig");
const studyTimeInput = document.getElementById("studyTime");
const breakTimeInput = document.getElementById("breakTime");

console.log("Modal:", modal);
console.log("Close button:", closeModalBtn);
console.log("Save button:", saveConfig);
console.log("Study time input:", studyTimeInput);
console.log("Break time input:", breakTimeInput);

// Variables del temporizador
let timer;
let timeLeft = 25 * 60; // 25 minutos en segundos
let isRunning = false;
let currentMode = "Focus";
let cycleCount = 0;

let modes = {
  Focus: { time: 25 * 60, next: "Pausa corta" },
  "Pausa corta": { time: 5 * 60, next: "Focus" },
  "Pausa larga": { time: 15 * 60, next: "Focus" },
};

// Funciones del temporizador
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    playButton.classList.replace("fa-play", "fa-pause");
    timer = setInterval(() => {
      timeLeft--;
      updateDisplay();
      if (timeLeft === 0) {
        clearInterval(timer);
        isRunning = false;
        cycleCount++;
        if (currentMode === "Focus" && cycleCount % 4 === 0) {
          switchMode("Pausa larga");
        } else {
          switchMode(modes[currentMode].next);
        }
      }
    }, 1000);
  } else {
    clearInterval(timer);
    isRunning = false;
    playButton.classList.replace("fa-pause", "fa-play");
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = modes[currentMode].time;
  updateDisplay();
  playButton.classList.replace("fa-pause", "fa-play");
}

function switchMode(newMode) {
  currentMode = newMode;
  timeLeft = modes[newMode].time;
  modeDisplay.textContent = newMode;
  nextModeDisplay.textContent = modes[newMode].next;
  updateDisplay();
  resetTimer();
}

// Funciones de la lista de tareas
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const taskElement = document.createElement("label");
    taskElement.classList.add("task");
    taskElement.innerHTML = `
      <input type="checkbox" class="my-checkbox">
      <p>${taskText}</p>
    `;
    taskList.appendChild(taskElement);
    taskInput.value = "";
  }
}

// Funciones de configuración y modal
function openModal() {
  console.log("Opening modal");
  if (modal) {
    modal.style.display = "block";
    console.log("Modal display set to block");

    console.log("Close button in modal:", modal.querySelector("#closeModal"));
    console.log("Save button in modal:", modal.querySelector("#saveConfig"));

    if (studyTimeInput && breakTimeInput) {
      studyTimeInput.value = Math.floor(modes.Focus.time / 60);
      breakTimeInput.value = Math.floor(modes["Pausa corta"].time / 60);
      console.log("Input values set");
    } else {
      console.error("Study time or break time input not found");
    }
  } else {
    console.error("Modal element not found");
  }
  logModalContent();
}

function closeModal() {
  console.log("Closing modal");
  if (modal) {
    modal.style.display = "none";
    console.log("Modal display set to none");
  } else {
    console.error("Modal element not found in closeModal");
  }
}

function saveConfiguration() {
  console.log("Saving configuration");
  if (studyTimeInput && breakTimeInput) {
    const newStudyTime = parseInt(studyTimeInput.value) * 60;
    const newBreakTime = parseInt(breakTimeInput.value) * 60;

    modes.Focus.time = newStudyTime;
    modes["Pausa corta"].time = newBreakTime;
    modes["Pausa larga"].time = newBreakTime * 3;

    if (currentMode === "Focus") {
      timeLeft = newStudyTime;
    } else if (currentMode === "Pausa corta") {
      timeLeft = newBreakTime;
    } else {
      timeLeft = newBreakTime * 3;
    }

    updateDisplay();
    closeModal();
    console.log("Configuration saved and modal closed");
  } else {
    console.error(
      "Study time or break time input not found in saveConfiguration"
    );
  }
}

function logModalContent() {
  if (modal) {
    console.log("Modal HTML content:", modal.innerHTML);
  } else {
    console.error("Modal not found for logging content");
  }
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");

  const closeModalBtn = document.getElementById("closeModal");
  const saveConfig = document.getElementById("saveConfig");

  console.log("Close button (outside modal):", closeModalBtn);
  console.log("Save button (outside modal):", saveConfig);

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      console.log("Close button clicked");
      closeModal();
    });
    console.log("Close button event listener added");
  } else {
    console.error("Close button not found, cannot add event listener");
  }

  if (saveConfig) {
    saveConfig.addEventListener("click", () => {
      console.log("Save button clicked");
      saveConfiguration();
    });
    console.log("Save button event listener added");
  } else {
    console.error("Save button not found, cannot add event listener");
  }

  playButton.addEventListener("click", startTimer);
  resetButton.addEventListener("click", resetTimer);
  settingsButton.addEventListener("click", openModal);
  addTaskButton.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });
});

// Cerrar el modal al hacer clic fuera de él
window.onclick = function (event) {
  if (event.target == modal) {
    console.log("Clicked outside modal");
    closeModal();
  }
};

// Inicialización
updateDisplay();
modeDisplay.textContent = currentMode;
nextModeDisplay.textContent = modes[currentMode].next;

console.log("Script initialization completed");
