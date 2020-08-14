const { app, BrowserWindow } = require('electron');
const path = require('path')

let win;
let windowConfig = {
  width: 1080,
  height: 712,
  webPreferences: {
    javascript: true,
    plugins: true,
    nodeIntegration: false, // 是否集成 Nodejs
    // webSecurity: false,
    preload: path.join(__dirname, 'preload.js'),
  }
};

function createWindow() {
  win = new BrowserWindow(windowConfig);
  
  win.loadURL(`file://${__dirname}/index.html`)
  
  win.on('close', () => {
    //回收BrowserWindow对象
    win = null;
  });
  win.on('resize', () => {
    // win.reload();
  })
  win.webContents.openDevTools()
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  app.quit();
});
app.on('activate', () => {
  if (win == null) {
    createWindow();
  }
})

require('./main_process/mysql_main')
