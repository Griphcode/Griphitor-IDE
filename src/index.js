/* Import node modules */
const { app, BrowserWindow, Tray, Menu, ipcMain, ipcRenderer, protocol } = require("electron");
const fs = require("fs");
const path = require("path");
const request = require("request");
const notifier = require('node-notifier');
const exec = require('child_process').exec;
require('v8-compile-cache');

/* Info about app */
var appdir = app.getAppPath();
var appname = app.getName();
var appversion = app.getVersion();
const config = require(`${appdir}/src/main/config.json`);

/* Import custom functions */
require("./main/cpuinfo");
require("./main/shortcut");
const { createMainWindow } = require("./main/window");

async function notification(mode, arg1) {
  if (mode == "1") {
    notifier.notify({
        title: 'Update availible.',
        message: 'An update is availible, Downloading now....',
        icon: `${appdir}/src/renderer/assets/download.png`,
        sound: true,
        wait: true
    });
  } else if (mode == "2") {
    notifier.notify({
        title: 'Update downloaded.',
        message: 'An update has been downloaded, Restarting app...',
        icon: `${appdir}/src/renderer/assets/tray-small.png`,
        sound: true,
        wait: true
      },
      function (err, response2) {
        if (response2 == "activate") {
          console.log("An update has been downloaded.");
          app.quit();
        }
      }
    );
  } else if (mode == "3") {
    notifier.notify({
        title: 'Not connected.',
        message: `You are not connected to the internet, you can not use ${appname} without the internet.`,
        icon: `${appdir}/src/renderer/assets/warning.png`,
        sound: true,
        wait: true
      },
      function (err, response3) {
        if (response3 == "activate") {
          console.log("User clicked on no wifi notification.");
        }
      }
    );
  } else if (mode == "4") {
    notifier.notify({
        title: 'Error downloading.',
        message: `Unable to download latest update file: '${arg1}'`,
        icon: `${appdir}/src/renderer/assets/warning.png`,
        sound: true,
        wait: true
      },
      function (err, response4) {
        if (response4 == "activate") {
          console.log("User clicked on unable to download notification.");
        } else {
	        notifier.on('timeout', function (notifierObject, options) {
	          // Triggers if notification closes
	          console.log("User did not click on unable to download notification.");
	        });
        }
      }
    );
  } else if (mode == "5") {
    notifier.notify({
        title: 'Error extracting files.',
        message: 'There was an error extracting some files.',
        icon: `${appdir}/src/renderer/assets/warning.png`,
        sound: true,
        wait: true
      },
      function (err, response5) {
        if (response5 == "activate") {
          console.log("User clicked on unable to extract notification.");
        } else {
	        notifier.on('timeout', function (notifierObject, options) {
	          // Triggers if notification closes
	          console.log("User did not click on unable to extract notification.");
	        });
        }
      }
    );
  } else if (mode == "6") {
    notifier.notify({
        title: 'Error checking for update.',
        message: 'There was an error checking for updates, continuing as normal.',
        icon: `${appdir}/src/renderer/assets/warning.png`,
        sound: true,
        wait: true
      },
      function (err, response5) {
        if (response5 == "activate") {
          console.log("User clicked on unable to check for update notification.");
        } else {
	        notifier.on('timeout', function (notifierObject, options) {
	          // Triggers if notification closes
	          console.log("User did not click on unable to check for update notification.");
	        });
        }
      }
    );
  }
}

/* Functions */
function checkInternet(cb) {
    require('dns').lookup('google.com',function(err) {
        if (err && err.code == "ENOTFOUND") {
            cb(false);
        } else {
            cb(true);
        }
    })
}

function execute(command, callback) {
    exec(command, (error, stdout, stderr) => {
        callback(stdout);
    });
};

/* Disable gpu and transparent visuals if not win32 or darwin */
if (process.platform !== "win32" && process.platform !== "darwin") {
  app.commandLine.appendSwitch("enable-transparent-visuals");
  app.commandLine.appendSwitch("disable-gpu");
  app.disableHardwareAcceleration();
}

/* Menu tray and about window */
var packageJson = require(`${appdir}/package.json`)/* Read package.json */
var contrib = require(`${appdir}/src/main/contributors.json`)/* Read contributors.json */
var repoLink = packageJson.repository.url
var appAuthor = packageJson.author.name
if (Array.isArray(contrib.contributors) && contrib.contributors.length) {
  var appContributors = [ appAuthor, ...contrib.contributors ]
  var stringContributors = appContributors.join(', ')
} else {
  var stringContributors = appAuthor
}
var appYear = '2021' /* The year since this app exists */
var currentYear = new Date().getFullYear()
/* Year format for copyright */
if (appYear == currentYear){
  var copyYear = appYear
} else {
  var copyYear = `${appYear}-${currentYear}`
}
/* Tray Menu */
const createTray = () => {
  var creditText = stringContributors
  var trayMenuTemplate = [
    { label: appname, enabled: false },
    { type: 'separator' },
	  { label: "Open source on github!", enabled: false},
    { type: 'separator' },
	  { label: 'About', role: 'about', click: function() { app.showAboutPanel();}},
	  { label: 'Quit', role: 'quit', click: function() { app.quit();}}
  ]
  tray = new Tray(`${appdir}/src/renderer/assets/tray-icon.png`)
  let trayMenu = Menu.buildFromTemplate(trayMenuTemplate)
  tray.setContextMenu(trayMenu)
  const aboutWindow = app.setAboutPanelOptions({
	  applicationName: appname,
	  iconPath: `${appdir}/src/renderer/assets/app.png`,
	  applicationVersion: 'Version: ' + appversion,
	  authors: appContributors,
	  website: repoLink,
	  credits: 'Credits: ' + creditText,
	  copyright: 'Copyright © ' + copyYear + ' ' + appAuthor
  })
  return aboutWindow
}

/* When app ready, check for internet, then ask for permison */
app.whenReady().then(async () => {
  /* Create main window and tray */
  createMainWindow();
  createTray();
  /* Custom URI handler for linux and windows */
  app.setAsDefaultProtocolClient("griph");
  protocol.registerHttpProtocol('griph', (req, cb) => {
    const url = req.url.substr(10)
    var data = new Array ();
    let str2 = url.replace(":", " ");
    let arr2 = str2.split(' ',2);
    mode = arr2[0]
    data[0] = arr2[1]
    if (mode == "aylist") {
      console.log("Opening playlist: "+data[0]);
      PageView.webContents.loadURL(`${config.URL}playlist/${data[0]}`);
    } else if (mode == "bum") {
      console.log("Opening album: "+data[0]);
      PageView.webContents.loadURL(`${config.URL}album/${data[0]}`);
    } else if (mode == "rack") {
      console.log("Opening track: "+data[0]);
      PageView.webContents.loadURL(`${config.URL}track/${data[0]}`);
    } else if (mode == "about") {
      console.log("Showing about window");
      app.showAboutPanel();
    }
  })
  app.on("open-url", (event, url) => {
    const url2 = url.substr(10)
    var data = new Array ();
    let str2 = url2.replace(":", " ");
    let arr2 = str2.split(' ',2);
    mode = arr2[0]
    data[0] = arr2[1]
    if (mode == "aylist") {
      console.log("Opening playlist: "+data[0]);
      PageView.webContents.loadURL(`${config.URL}playlist/${data[0]}`);
    } else if (mode == "bum") {
      console.log("Opening album: "+data[0]);
      PageView.webContents.loadURL(`${config.URL}album/${data[0]}`);
    } else if (mode == "rack") {
      console.log("Opening track: "+data[0]);
      PageView.webContents.loadURL(`${config.URL}track/${data[0]}`);
    } else if (mode == "about") {
      console.log("Showing about window");
      app.showAboutPanel();
    }
  });
  /* Check for internet */
  checkInternet(function(isConnected) {
    if (isConnected) {
      SplashWindow.webContents.on("did-finish-load", () => {
        /* Get latest version from GitHub */
        console.log("Initilize Updater:");
        request(config.github, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var verfile = JSON.parse(body);
            const verstring = JSON.stringify(verfile);
            const ver = verfile.version;
            const onlineversion = ver.replace(/"([^"]+)":/g, '$1:');
            console.log(`Online version: '${onlineversion}'`);
            console.log(`Local version: '${appversion}'`);
            /* If Online version is greater than local version, show update dialog */
            if (onlineversion > appversion) {
              mainWindow.close();
              console.log("\x1b[1m", "\x1b[31m", "Version is not up to date!", "\x1b[0m");
              SplashWindow.webContents.send('SplashWindow', 'Update')
            } else {
              console.log("\x1b[1m", "\x1b[32m", "Version is up to date!", "\x1b[0m");
              SplashWindow.webContents.send('SplashWindow', 'Latest')
            }
          } else if (!error && response.statusCode == 404) {
            console.log("\x1b[1m", "\x1b[31m", "Unable to check latest version from main server!\nIt may be because the server is down, moved, or does not exist.", "\x1b[0m");
            notification(6);
            SplashWindow.webContents.send('SplashWindow', 'Unknown')
          };
        });
      });
      ipcMain.on('FromSplashWindow', function (event, arg) {
        //console.log(arg);
        if (arg == "Restart") {
          if (os.platform() == "win32") {
            execute(`${app.getPath('home')}/${appname}.exe`);
          } else if (os.platform() == "darwin") {
            execute(`open -a ${app.getPath('home')}/${appname}.app`);
          } else if (os.platform() == "linux") {
            execute(`chmod +x ${app.getPath('home')}/${appname}.appimage`);
            execute(`${app.getPath('home')}/${appname}.appimage`);
          };
        } else if (arg == "ShowMainWindow") {
          console.log("Loading complete, Showing main window.");
          mainWindow.show();
          SplashWindow.close();
          PageView.webContents.on('did-finish-load', () => {
            PageView.webContents.executeJavaScript(fs.readFileSync(`${appdir}/src/renderer/preload-2.js`).toString(), true);
          })
          mainWindow.center();
        }
      })
      ipcMain.on('Editor', function (event, arg) {
        //console.log(arg);
        if (arg == "ShowCode") {
          const CodeWin  = new BrowserWindow({
            title: "Your code",
            webPreferences: {
              nodeIntegration: true,
              contextIsolation: false
            },
          });
          CodeWin.webContents.loadFile(`${appdir}/src/renderer/ide/user-created.html`);
        }
      })
    } else {
      /* User not connected */
      console.log("\x1b[1m", "\x1b[31m", "ERROR: User is not connected to internet, showing NotConnectedNotification", "\x1b[0m");
      notification(3);
      SplashWindow.close();
      PageView.webContents.loadFile(appdir + '/src/renderer/nowifi.html');
      mainWindow.show();
    }
  });
});

/* If all windows are closed, quit app, exept if on darwin */
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

/* Widevine stuff */
app.on('widevine-update-pending', (currentVersion, pendingVersion) => {
  console.log('Widevine ' + currentVersion + ' is ready to be upgraded to ' + pendingVersion + '!')
})
app.on('widevine-error', (error) => {
  console.log('Widevine installation encountered an error: ' + error)
  process.exit(1)
})

/* App ready */
app.on('widevine-ready', (version, lastVersion) => {
  /* Check widevine version */
  if (null !== lastVersion) {
    console.log('Widevine ' + version + ', upgraded from ' + lastVersion + ', is ready to be used!')
  } else {
    console.log('Widevine ' + version + ' is ready to be used!')
  }
  /* Create windows and tray */
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
    createTray();
  } else {
    global.mainWindow && global.mainWindow.focus();
  }
})
