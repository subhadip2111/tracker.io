const { contextBridge, ipcRenderer } = require("electron");

// contextBridge.exposeInMainWorld("electronAPI", {
//   onTrackerUpdate: (cb) => ipcRenderer.on("tracker-update", (event, data) => cb(data)),
// });



contextBridge.exposeInMainWorld("electronAPI", {
  onTrackerUpdate: (cb) => ipcRenderer.on("tracker-update", (event, data) => cb(data)),
  sendCommand: (command) => ipcRenderer.send("tracker-command", command)
});
