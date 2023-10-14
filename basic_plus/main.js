const { app, BrowserWindow, globalShortcut, dialog, Tray, Menu, ipcMain } = require('electron')
const windowStateKeeper = require('electron-window-state')
let win;

ipcMain.on('msg', (event, agr) => {
    event.reply("back-msg", "Thankyou to send message")
})

let isMac = process.platform == "darwin"
let template = [
    ...isMac ? { label: 'Blog', submenu: [{ label: "About" }, { label: 'Version' }] } :
        [], { label: 'File' },
    {
        label: 'Operation', submenu: [
            isMac ? { role: 'close', label: 'Close' } :
                { role: 'quit', label: 'Quit' },
            { label: 'Zoom' }
        ]
    }
]
let menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu)

// menue show on right click
let template2 = [{ label: 'item 1' }, { label: 'item 2' }, { role: "minimize" }];
let contextMenu = Menu.buildFromTemplate(template2)

const createWindow = () => {
    let mainWindowState = windowStateKeeper({
        defaultHeight: 500,
        defaultWidth: 500
    })

    win = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        alwaysOnTop: true,
        // frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile("index.html");
    win.webContents.openDevTools();
    // context menue on right click
    win.webContents.on("context-menu", () => {
        contextMenu.popup();
    })
    //tray = show app on (status bar in taskbar)
    tray = new Tray('orbit.png')
    tray.setToolTip("Tray to electron app")
    // tray.on('click', () => {
    //     win.isVisible() ? win.hide() : win.show();
    // })
    // let template = [{ label: 'item 1', type: "radio" }, { label: 'item2' }]
    // const contextMenu = Menu.buildFromTemplate(template);
    // tray.setContextMenu(contextMenu)

    // dialog box open on key press
    globalShortcut.register("Shift+k", () => {
        dialog.showOpenDialog({
            defaultPath: app.getPath('desktop'),
            buttonLabel: "select file"
        });
    })
}

//event call on key press

// app.whenReady().then(() => {
//     createWindow();
//     globalShortcut.register("Shift+k", () => {
//         console.log(" K Key pressesd after app ready")
//     })
// });




app.whenReady().then(createWindow)
