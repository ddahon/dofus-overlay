import {
  app,
  BrowserWindow,
  globalShortcut,
} from "electron";
import { join } from "path";
import { TrayGenerator } from './TrayGenerator';

const isProd = process.env.NODE_ENV === "production" || app.isPackaged;

let mainWindow: BrowserWindow | null;


const createWindow = () => {
  mainWindow = new BrowserWindow({
    alwaysOnTop: true,
    titleBarStyle: 'hidden',
    movable: true,
    autoHideMenuBar: true,
    frame: false,
    transparent: true,
    fullscreen: true
  });

  const url =
    // process.env.NODE_ENV === "production"
    isProd
      ? // in production, use the statically build version of our application
      `file://${join(__dirname, "public", "index.html")}`
      : // in dev, target the host and port of the local rollup web server
      "http://localhost:5000";

  mainWindow.loadURL(url).catch((err) => {
    console.log(JSON.stringify(err));
    app.quit();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

const toggleWindow = () => {
  if (mainWindow?.isMaximized) {
    console.log('visible => hidden')
    mainWindow?.minimize()
  } else {
    console.log('hidden => visible')
    mainWindow?.show()
  }
}

const createShortcut = () => {
  const ret = globalShortcut.register('Alt+Insert', () => {
    toggleWindow()
  })

  if (!ret) {
    console.log('shortcut registration failed.')
    app.quit()
  }
}

app.whenReady().then(() => {

  createShortcut()
  createWindow()
  if (mainWindow == null) throw Error("Error while creating mainWindow")
  new TrayGenerator(mainWindow, toggleWindow)
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})