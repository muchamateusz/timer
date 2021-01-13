const btn_element = document.getElementById("btn");
const workout_time_element = document.getElementById("workout_time");
const rest_time_element = document.getElementById("rest_time");
const iteration_element = document.getElementById("iteration");
const log_element = document.getElementById("log");
const get_ready_overlay_element = document.getElementById("get_ready_overlay");
const defaults = {
  workout_time: 30,
  rest_time: 60,
  iteration: 1,
  btn_start: "START",
  btn_stop: "STOP",
};

let intervalID = "";
let isRunning = false;
let current_iteration = 1;

const startFun = () => {
  if (isRunning) {
    toggleBtn(!isRunning);
    clearInterval(intervalID);
    log();
    isRunning = !isRunning;
  } else {
    toggleBtn(!isRunning);
    resetState();
    showGetReady();
    isRunning = !isRunning;
  }
};

const setNewDefaults = () => {
  defaults.rest_time = document.getElementById("rest_value").value;
  defaults.workout_time = document.getElementById("work_value").value;
}

const resetState = () => {
  iteration_element.textContent = defaults.iteration;
  workout_time_element.textContent = defaults.workout_time;
  rest_time_element.textContent = defaults.rest_time;
};

const log = () => {
  let li = document.createElement("li");
  li.appendChild(
    document.createTextNode(
      `${current_iteration}:${workout_time_element.textContent}:${rest_time_element.textContent}`
    )
  );
  li.setAttribute("id", current_iteration);
  log_element.appendChild(li);
};

const showGetReady = () => {
  get_ready_overlay_element.classList.add("shown");
  let timer = 5;
  intervalID = setInterval(() => {
    get_ready_overlay_element.textContent = timer;
    if (--timer < 0) {
      get_ready_overlay_element.classList.remove("shown");
      clearInterval(intervalID);
      startCountdown();
    }
  }, 1000);
};

const startCountdown = () => {
  startTimer(defaults.workout_time, workout_time_element, () => {
    new Audio("rest.mp3").play();
    startTimer(defaults.rest_time, rest_time_element, increaseIteration);
  });
};

const startTimer = (duration, display, callback) => {
  let timer = duration;
  intervalID = setInterval(() => {
    display.textContent = timer;
    if (--timer < 0) {
      clearInterval(intervalID);
      callback();
    }
  }, 1000);
};

const increaseIteration = () => {
  current_iteration += 1;
  iteration_element.textContent = current_iteration;
  new Audio("work.mp3").play();
  startCountdown();
};

const toggleBtn = (stop) => {
  btn_element.textContent = defaults[stop ? "btn_stop" : "btn_start"];
  btn_element.style.backgroundColor = stop ? "red" : "green";
};
