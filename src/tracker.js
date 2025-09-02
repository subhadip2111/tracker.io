const activeWin = require("active-win");

let logs = {};
let currentApp = null;
let startTime = null;

async function trackApps(callback) {
  const window = await activeWin();
  if (!window) return;

  const appName = window.owner.name;
  const title = window.title;

  if (currentApp !== appName) {
    if (currentApp) {
      const duration = Date.now() - startTime;
      if (!logs[currentApp]) logs[currentApp] = [];
      logs[currentApp].push({ duration, at: new Date().toISOString() });
    }

    currentApp = appName;
    startTime = Date.now();
  }

  callback({
    current: { app: appName, title, startTime },
    logs,
  });
}

function startTracking(callback) {
  setInterval(() => trackApps(callback), 2000); // check every 2s
}

module.exports = { startTracking };
