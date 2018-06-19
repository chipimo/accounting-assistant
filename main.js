var electron = require('electron');
var jsonfile = require('jsonfile');
var userHome = require('user-home');
var fs = require('fs-extra');
var app = electron.app;
var Menu = electron.Menu;
var BrowserWindow = electron.BrowserWindow;
var path = require('path');
var url = require('url');
var globalShortcut = electron.globalShortcut;
var webContents = require('electron').webContents;
var mainWindow;
var dialog = require('electron').dialog;
var baseDir = userHome + '/AppData/Roaming/Accounting Assitant files/Bootfiles';
var setupfile = baseDir + '/setup.json';
var app_files = '/app/index.html';
var win;
function screenLoader() {
    var modalPath = path.join('file://', __dirname, 'splashscreen.html');
    win = new BrowserWindow({
        width: 820,
        height: 500,
        frame: false,
        transparent: true,
        icon: path.join(__dirname, 'assets/img/icons/logo.png'),
        alwaysOnTop: true,
    });
    win.on('close', function () {
        win = null;
    });
    win.loadURL(modalPath);
    win.setResizable(false);
    win.show();
    win.setIgnoreMouseEvents(true);
}
function createWindow() {
    var _a = electron.screen.getPrimaryDisplay().workAreaSize, width = _a.width, height = _a.height;
    mainWindow = new BrowserWindow({
        show: false,
        width: width,
        height: height,
        titleBarStyle: 'hiddenInset',
        icon: path.join(__dirname, 'assets/img/icons/logo.png'),
        backgroundColor: '#EBEBEB',
        webPreferences: {
            nativeWindowOpen: true
        }
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, app_files),
        protocol: 'file:',
        slashes: false,
    }));
    mainWindow.webContents.on('new-window', function (event, url, frameName, disposition, options, additionalFeatures) {
        if (frameName === 'modal') {
            // open window as modal
            event.preventDefault();
            Object.assign(options, {
                modal: true,
                parent: mainWindow,
                width: 600,
                height: 500
            });
            event.newGuest = new BrowserWindow(options);
        }
    });
    mainWindow.webContents.once('dom-ready', function () {
        mainWindow.setMinimumSize(1200, 600);
        win.close();
        //mainWindow.setMenu(null);
        mainWindow.maximize();
        mainWindow.show();
        var ipc = require('electron').ipcMain;
        var dialog = require('electron').dialog;
        var ipc2 = require('electron').ipcRenderer;
        //const options = {
        // type: "info",
        // title: "Information",
        // message: "Press F11 to exit out of fullscreen",
        // buttons: ["Ok"]
        //};
        //dialog.showMessageBox(options, function(index) {});
    });
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
    globalShortcut.register('CommandOrControl+Alt+f', function (focusedWindow) {
        focusedWindow.webContents.send('open-settings');
        if (mainWindow.isFullScreen()) {
            mainWindow.setFullScreen(false);
        }
        else {
            mainWindow.setFullScreen(true);
        }
    });
}
app.on('ready', function () {
    screenLoader();
    fs
        .ensureFile(setupfile)
        .then(function () {
        try {
            var odjr = jsonfile.readFileSync(setupfile);
            if (odjr.isRegistarted && odjr.isRegistarted === 'registared') {
                app_files = '/app/index.html';
            }
            createWindow();
        }
        catch (error) {
            var obj = { version: '0.20.0' };
            jsonfile.writeFileSync(setupfile, obj);
            createWindow();
        }
    })
        .catch(function (err) {
        console.error(err);
    });
});
app.on('will-quit', function () {
    globalShortcut.unregisterAll();
});
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
//# sourceMappingURL=main.js.map