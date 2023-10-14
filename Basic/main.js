const { app, BrowserWindow } = require("electron")
const windowStateKeeper = require('electron-window-state')
let win;

// setTimeout(() => {
//     console.log(app.isReady())
// }, 1);
// // this funn tell us app is ready or not
// setTimeout(() => {
//     console.log(app.isReady(createWindow()))
// }, 1000);

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
    // render  child window
    // let child = new BrowserWindow({ parent: win })
    win.loadFile("index.html");
    let wc = win.webContents;
    mainWindowState.manage(win)
    // win.webContents.openDevTools();
    // child.loadFile("childindex.html")
    // child.show()
    wc.on('dom-ready', () => {
        console.warn(" dom is ready")
    })

    wc.on('did-finished-load', () => {
        console.warn("content loaded")
    })

    wc.on('new-window', () => {
        console.warn("new window loaded")
    })
    wc.on('before-input-event', () => {
        console.warn("some key is pressed")
    })
}



// we stop bydefault feature of quit on exit btn click and run that code before click
// app.on('before-quit', (e) => {
//     console.log("hello")
//     e.preventDefault();
// })

// default stopage donot wirk
// app.on('will-quit', (e) => {
//     console.log("You quit")
//     e.preventDefault();
// })

// app.on('browser-window-focus', () => {
//     console.log(" Programm start succesfully .........")
// })

// app.on('browser-window-blur', () => {
//     console.log(" Programm stop succesfully .........")
// })


app.whenReady().then(createWindow);








