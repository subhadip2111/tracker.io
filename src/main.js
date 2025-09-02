const { app, BrowserWindow,ipcMain } = require("electron");
const path = require("path");
const tracker = require("./tracker");

let mainWindow;
let tracking = false; // <-- define tracking here

// Disable GPU acceleration (fixes Linux VSync warnings)
app.disableHardwareAcceleration();

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Start tracking and send updates to renderer
  tracker.startTracking((data) => {
    mainWindow.webContents.send("tracker-update", data);
  });
});



ipcMain.on("tracker-command", (event, command) => {
  if (command === "start-tracking" && !tracking) {
    tracker.startTracking((data) => {
      if (mainWindow) mainWindow.webContents.send("tracker-update", data);
    });
    tracking = true;
  }
  if (command === "stop-tracking" && tracking) {
    tracker.stopTracking();
    tracking = false;
  }
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }

});
