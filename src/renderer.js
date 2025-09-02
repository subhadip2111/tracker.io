// const currentDiv = document.getElementById("current");
// const logsDiv = document.getElementById("logs");

// window.electronAPI.onTrackerUpdate((data) => {
//   const { current, logs } = data;
//   currentDiv.innerHTML = `<b>Now Using:</b> ${current.app} - ${current.title}`;

//   logsDiv.innerHTML = "";
//   Object.keys(logs).forEach((app) => {
//     logsDiv.innerHTML += `<div class="log">
//       <b>${app}</b> <br/>
//       ${logs[app].map(l => `🕒 ${Math.round(l.duration / 1000)}s at ${l.at}`).join("<br/>")}
//     </div>`;
//   });
// });



const currentDiv = document.getElementById("current");
const logsDiv = document.getElementById("logs");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

window.electronAPI.onTrackerUpdate((data) => {
  const { current, logs } = data;
  currentDiv.innerHTML = `<b>Now Using:</b> ${current.app} - ${current.title}`;

  logsDiv.innerHTML = "";
  Object.keys(logs).forEach((app) => {
    logsDiv.innerHTML += `<div class="log">
      <b>${app}</b> <br/>
      ${logs[app].map(
        (l) => `🕒 ${Math.round(l.duration / 1000)}s at ${l.at}`
      ).join("<br/>")}
    </div>`;
  });
});

// Send commands to main
startBtn.addEventListener("click", () => {
  window.electronAPI.sendCommand("start-tracking");
});

stopBtn.addEventListener("click", () => {
  window.electronAPI.sendCommand("stop-tracking");
});
