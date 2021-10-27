/* All window creation functions */
const { BrowserWindow, BrowserView, ipcMain, app } = require("electron");
const windowStateKeeper = require("electron-window-state");
const path = require("path");
const fs = require("fs");
var appdir = app.getAppPath();
const config = require(`${appdir}/src/main/config.json`);

/* Window functions */
function createMainWindow() {
  const SplashWindow = (global.SplashWindow = new BrowserWindow({
    width: 390,
    height: 370,
    frame: false,
    transparent: false,
    skipTaskbar: true,
    center: true,
    icon: `${appdir}/src/main/renderer/assets/app.png`,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  }));
  SplashWindow.loadFile(`${appdir}/src/renderer/splash.html`);
  //SplashWindow.webContents.openDevTools();
  const mainWindowState = windowStateKeeper({
    defaultWidth: 1200,
    defaultHeight: 700,
    fullScreen: false,
    maximize: true,
  });
  const mainWindow = (global.mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    minWidth: 800,
    minHeight: 400,
    frame: false,
    center: true,
    webPreferences: {
      contextIsolation: true,
      preload: `${appdir}/src/renderer/preload.js`,
    },
  }));
  mainWindowState.manage(mainWindow);
  mainWindow.loadFile(`${appdir}/src/renderer/index.html`);
  //mainWindow.webContents.openDevTools();
  mainWindow.hide();
  const PageView = (global.PageView = new BrowserView({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  }));
  mainWindow.setBrowserView(PageView);
  PageView.webContents.loadFile(`${appdir}/src/renderer/ide/index.html`);
  PageView.setBounds({
    x: 0,
    y: 40,
    width: mainWindow.getBounds().width,
    height: mainWindow.getBounds().height - 40,
  });
  PageView.webContents.on("did-finish-load", () => {
    /* Add Custom CSS */
    //PageView.webContents.insertCSS(
    //  fs.readFileSync(`${appdir}/src/renderer/css/screen.css`).toString()
    //);
  });
  //PageView.webContents.openDevTools();
  mainWindow.on("resize", () => {
    PageView.setBounds({
      x: 0,
      y: 40,
      width: mainWindow.getBounds().width,
      height: mainWindow.getBounds().height - 40,
    });
  });
  /* Buttons */
  mainWindow.on("maximize", () => {
    mainWindow.webContents.send("window.maximized");
  });
  mainWindow.on("unmaximize", () => {
    mainWindow.webContents.send("window.restored");
  });
  ipcMain.on("window.minimize", (event) => {
    mainWindow.minimize();
  });
  ipcMain.on("window.maximize", (event) => {
    mainWindow.maximize();
    event.sender.send("window.maximized");
  });
  ipcMain.on("window.restore", (event) => {
    mainWindow.unmaximize();
    event.sender.send("window.restored");
  });
  ipcMain.on("window.close", () => {
    mainWindow.close();
    app.quit();
  });
  ipcMain.on("window.home", () => {
    PageView.webContents.loadURL(config.URL);
  });
}
/* Export functions */
module.exports = { createMainWindow };
