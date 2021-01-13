const defaults = {
  btn_start: "START",
  btn_stop: "STOP",
  iteration: 1,
  rest_time: 60,
  workout_time: 30,
};
const rest_audio = new Audio("rest.mp3");
const work_audio = new Audio("work.mp3");
const btn_element = document.getElementById("btn");
const defaults_saved = document.getElementById("defaults_saved");
const get_ready_overlay_element = document.getElementById("get_ready_overlay");
const iteration_element = document.getElementById("iteration");
const log_element = document.getElementById("log");
const rest_time_element = document.getElementById("rest_time");
const workout_time_element = document.getElementById("workout_time");

let current_iteration = 1;
let interval_id = "";
let is_running = false;

const workoutCallback = () => {
  ++current_iteration;
  rest_time_element.textContent = defaults.rest_time;
  iteration_element.textContent = current_iteration;
  work_audio.play();
  startCountdown();
};

const log = () => {
  const table = document.getElementById("log");
  table.classList.add("log-table--show");
  const row = table.insertRow(-1);
  row.insertCell(0).innerHTML = defaults.workout_time + " sek.";
  row.insertCell(1).innerHTML = defaults.rest_time + " sek.";
  row.insertCell(2).innerHTML = current_iteration;
};

const resetState = () => {
  iteration_element.textContent = defaults.iteration;
  workout_time_element.textContent = defaults.workout_time;
  rest_time_element.textContent = defaults.rest_time;
};

const restingCallback = () => {
  workout_time_element.textContent = defaults.workout_time;
  rest_audio.play();
  startTimer(defaults.rest_time, rest_time_element, workoutCallback);
};

const setNewDefaults = () => {
  const restTime = document.getElementById("rest_value").value;
  const workTime = document.getElementById("work_value").value;
  if (restTime) {
    defaults.rest_time = restTime;
  }
  if (workTime) {
    defaults.workout_time = workTime;
  }
  if (workTime || restTime) {
    defaults_saved.classList.remove("hidden");
    setTimeout(() => defaults_saved.classList.add("hidden"), 3000);
  }
};

const showGetReady = () => {
  let timer = 5;
  get_ready_overlay_element.textContent = timer;
  get_ready_overlay_element.classList.add("shown");
  interval_id = setInterval(() => {
    get_ready_overlay_element.textContent = --timer;
    if (timer === 0) {
      get_ready_overlay_element.classList.remove("shown");
      clearInterval(interval_id);
      startCountdown();
    }
  }, 1000);
};

const startCountdown = () => {
  startTimer(defaults.workout_time, workout_time_element, restingCallback);
};

const startFun = () => {
  stopSounds();
  if (is_running) {
    is_running = !is_running;
    toggleBtn(is_running);
    clearInterval(interval_id);
    log();
  } else {
    is_running = !is_running;
    toggleBtn(is_running);
    resetState();
    showGetReady();
  }
};

const startTimer = (duration, display, callback) => {
  let timer = duration;
  display.textContent = timer;
  interval_id = setInterval(() => {
    display.textContent = --timer;
    if (timer === 0) {
      clearInterval(interval_id);
      callback();
    }
  }, 1000);
};

const stopSounds = () => {
  rest_audio.pause();
  rest_audio.currentTime = 0;
  work_audio.pause();
  work_audio.currentTime = 0;
};

const toggleBtn = stop => {
  btn_element.textContent = defaults[stop ? "btn_stop" : "btn_start"];
  btn_element.style.backgroundColor = stop ? "red" : "green";
};
