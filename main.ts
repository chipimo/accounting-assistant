const electron = require('electron');
var jsonfile = require('jsonfile');
var userHome = require('user-home');
const fs = require('fs-extra');
const app = electron.app;
const Menu = electron.Menu;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const globalShortcut = electron.globalShortcut;
const { webContents } = require('electron');

let mainWindow;
const { dialog } = require('electron');

var baseDir = userHome + '/AppData/Roaming/Accounting Assitant files/Bootfiles';
var setupfile = baseDir + '/setup.json';
let app_files = '/app/index.html';
let win;

function screenLoader() {
  const modalPath = path.join('file://', __dirname, 'splashscreen.html');
  win = new BrowserWindow({
    width: 820,
    height: 500,
    frame: false,
    transparent: true,
    icon: path.join(__dirname, 'assets/img/icons/logo.png'),
    alwaysOnTop: true,
  });

  win.on('close', function() {
    win = null;
  });
  win.loadURL(modalPath);
  win.setResizable(false);
  win.show();
  win.setIgnoreMouseEvents(true);
}

function createWindow() {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    show: false,
    width,
    height,
    titleBarStyle: 'hiddenInset',
    icon: path.join(__dirname, 'assets/img/icons/logo.png'),
    backgroundColor: '#EBEBEB',
    webPreferences: {
      nativeWindowOpen: true
    }
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, app_files),
      protocol: 'file:',
      slashes: false,
    })
  );

  mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
    if (frameName === 'modal') {
      // open window as modal
      event.preventDefault()
      Object.assign(options, {
        modal: true,
        parent: mainWindow,
        width: 600,
        height: 500
      })
      event.newGuest = new BrowserWindow(options)
    }
  })



  mainWindow.webContents.once('dom-ready', () => {
    mainWindow.setMinimumSize(1200, 600);

    win.close();
    //mainWindow.setMenu(null);
    mainWindow.maximize();
    mainWindow.show();

    const ipc = require('electron').ipcMain;
    const dialog = require('electron').dialog;
    const ipc2 = require('electron').ipcRenderer;

    //const options = {
    // type: "info",
    // title: "Information",
    // message: "Press F11 to exit out of fullscreen",
    // buttons: ["Ok"]
    //};
    //dialog.showMessageBox(options, function(index) {});
  });

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  globalShortcut.register('CommandOrControl+Alt+f', function(focusedWindow) {
    focusedWindow.webContents.send('open-settings');
    if (mainWindow.isFullScreen()) {
      mainWindow.setFullScreen(false);
    } else {
      mainWindow.setFullScreen(true);
    }
  });
}

app.on('ready', () => {
  screenLoader();

  fs
    .ensureFile(setupfile)
    .then(() => {
      try {
        const odjr = jsonfile.readFileSync(setupfile);
        if (odjr.isRegistarted && odjr.isRegistarted === 'registared') {
          app_files = '/app/index.html';
        }
        createWindow();
      } catch (error) {
        var obj = { version: '0.20.0' };
        jsonfile.writeFileSync(setupfile, obj);
        createWindow();
      }
    })
    .catch(err => {
      console.error(err);
    });
});

app.on('will-quit', function() {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});
