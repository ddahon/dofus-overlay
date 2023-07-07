import { BrowserWindow, BrowserWindowConstructorOptions } from "electron"

export class MainWindow extends BrowserWindow {
    constructor(options?: BrowserWindowConstructorOptions) {
        super(options);
    }

    toggle = () => {
        console.log(`isVisible: ${this.isVisible()}; isMinimized: ${this.isMinimized()}; isFocused: ${this.isFocused()};`)
        if (this.isVisible()) {
            console.log('visible => hidden')
            this.hide()
        } else {
            console.log('hidden => visible')
            this.show()
        }
        console.log(`isVisible: ${this.isVisible()}; isMinimized: ${this.isMinimized()}; isFocused: ${this.isFocused()};`)
    }
}