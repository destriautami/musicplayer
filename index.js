const path = require("path");
const { app, BrowserWindow } = require("electron");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 600,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.removeMenu(); // hilangkan menu bar default
  win.loadFile("index.html"); // load file html utama
}

app.whenReady().then(createWindow);

// Tutup app kalau semua window ditutup
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});


