import { Tray, type BrowserWindow, KeyboardEvent, Menu, MenuItem } from "electron";
import path from "path";
import { MainWindow } from "./MainWindow";

export class TrayGenerator {
    tray: Tray;
    mainWindow: MainWindow;

    constructor(mainWindow: MainWindow) {
        this.tray = this.createTray();
        this.mainWindow = mainWindow;
    }

    createMenu = () => {
        let menuItems = [
            {
                label: 'Open',
                click: (_menuItem: MenuItem, _browserWindow: BrowserWindow | undefined, _event: KeyboardEvent) => { this.mainWindow.toggle() }
            },
            {
                label: 'Settings'
            }
        ]
        return Menu.buildFromTemplate(menuItems)
    }

    createTray = () => {
        let tray = new Tray(path.join(__dirname, '../assets/tray.png'));
        tray.setContextMenu(this.createMenu())
        return tray
    };
}
