const { app, BrowserWindow, contextBridge  } = require('electron');
const path = require('path');


function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: true,
            nodeIntegration: true,
        }
    });
    mainWindow.webContents.openDevTools()

    mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();
    console.log(path.join(__dirname, 'renderer.js'))
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
