import { remote } from 'electron';
const electron = require('electron');

const { dialog } = electron.remote;

const win = remote.getCurrentWindow();

const WinDialog = function(params) {
  if (params.Action) {
    dialog.showMessageBox(
      win,
      {
        type: params.type,
        title: params.title,
        message: params.message,
        buttons: ['Cancel', 'OK'],
      },
      response => {
        if (params.Action) {
          if (response === 1) {
            win.reload();
          }
        }
      }
    );
  } else {
    dialog.showMessageBox(
      win,
      {
        type: params.type,
        title: params.title,
        message: params.message,
        buttons: ['OK'],
      },
      response => {}
    );
  }
};

export default WinDialog;
