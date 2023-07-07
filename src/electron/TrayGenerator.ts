import { Tray, type BrowserWindow, KeyboardEvent, Menu, MenuItem } from "electron";
import path from "path";

export class TrayGenerator {
    tray: Tray;
    mainWindow: BrowserWindow;
    toggleWindow: Function;
    
    constructor(mainWindow: BrowserWindow, toggleWindow: Function) {
        this.tray = this.createTray();
        this.mainWindow = mainWindow;
        this.toggleWindow = toggleWindow
    }

    getWindowPosition = () => {
        const windowBounds = this.mainWindow.getBounds();
        const trayBounds = this.tray.getBounds();
        const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2));
        const y = Math.round(trayBounds.y + trayBounds.height);
        return { x, y };
    };

    createMenu = () => {
        let menuItems = [
            {
                label: 'Open',
                click: (_menuItem: MenuItem, _browserWindow: BrowserWindow | undefined, _event: KeyboardEvent) => { this.toggleWindow() }
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
