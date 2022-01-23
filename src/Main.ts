import {app, BrowserWindow, ipcMain, nativeTheme} from 'electron';
import * as path from 'path';
import electronReload from 'electron-reload';
electronReload(__dirname, {});

/* App Initializer */
let mainWindow: Electron.BrowserWindow;

function WindowCreate() {
    mainWindow = new BrowserWindow({
        width: 1080,
        height: 820,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'Preload.js')
        },
        autoHideMenuBar: false,
    });

    mainWindow.loadURL(path.join(__dirname,'assets/MainWindow.html'));
}

/* Custom Events */
ipcMain.handle('dark-mode:toggle', () => {
   if (nativeTheme.shouldUseDarkColors) {
       nativeTheme.themeSource = 'light';
    } else {
       nativeTheme.themeSource = 'dark';
    }
    return nativeTheme.shouldUseDarkColors; 
});

ipcMain.handle('dark-mode:system', ()=> {
    nativeTheme.themeSource = 'system';
});


/* App Lifecycle Events */
app.whenReady().then(() => {
    WindowCreate();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            WindowCreate();
        }
    });

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            
            app.quit();
        }
    });
});