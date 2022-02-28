const { app, BrowserWindow, ipcMain, Tray, Menu, shell, Notification } = require("electron");
const Store = require("electron-store");
const contextMenu = require("electron-context-menu");
const path = require("path");
const fenster = require("@electron/remote/main");

const store = new Store();

class Window {
  constructor(windowOptions) {
    this.main = new BrowserWindow({
      icon: this.appIcon,
      ...windowOptions,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        ...windowOptions.webPreferences,
      },
    });
    this.app = app;
    this.appIcon = path.join(app.getAppPath(), "/build/ic_launcher.ico");
    this.webContents = this.main.webContents;
    this.app_whenReady();
    this.app_render();
    this.contextMenu();
    this.windowAllClosed();
  }

  whenReady() {}

  render() {}

  app_render() {
    Store.initRenderer();
    fenster.initialize();
    fenster.enable(this.webContents);
    this.render();
  }

  app_whenReady() {
    app.whenReady().then(() => {
      this.main;

      this.whenReady();

      app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
      });
    });
  }

  contextMenu() {
    contextMenu({
      showLookUpSelection: false,
      showSearchWithGoogle: false,
      showCopyImage: false,
      showCopyImageAddress: false,
      showSaveImageAs: true,
      showSaveLinkAs: false,
      showInspectElement: false,
      showServices: false,
    });
  }

  windowAllClosed() {
    // Set app name
    this.app.setAppUserModelId("Hentai Web Windows");

    // Quit when all windows are closed, except on macOS. There, it's common
    // for applications and their menu bar to stay active until the user quits
    // explicitly with Cmd + Q.
    this.app.on("window-all-closed", function () {
      if (process.platform !== "darwin") app.quit();
    });
  }
}

module.exports = Window;
