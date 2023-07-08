import { app, BrowserWindow, globalShortcut } from "electron";
import { join } from "path";
import { TrayGenerator } from "./TrayGenerator";
import { MainWindow } from "./MainWindow";

const isProd = process.env.NODE_ENV === "production" || app.isPackaged;

let mainWindow: MainWindow | null;

const createWindow = () => {
  mainWindow = new MainWindow({
    titleBarStyle: "hidden",
    movable: true,
    autoHideMenuBar: true,
    frame: false,
    transparent: true,
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

const createShortcut = () => {
  const ret = globalShortcut.register("Alt+Insert", () => {
    mainWindow?.toggle();
  });

  if (!ret) {
    console.log("shortcut registration failed.");
    app.quit();
  }
};

app.whenReady().then(() => {
  createShortcut();
  createWindow();
  if (mainWindow == null) throw Error("Error while creating mainWindow");
  mainWindow.maximize();
  mainWindow.hide();
  new TrayGenerator(mainWindow);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
