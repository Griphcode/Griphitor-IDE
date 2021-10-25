/* Handle global keyboard shortcuts */
const { globalShortcut, app } = require("electron");

app.on("ready", () => {
  globalShortcut.register("CommandOrControl+Alt+A", () => {
    app.showAboutPanel();
  });
  globalShortcut.register("CommandOrControl+Alt+I", () => {
    global.PageView.webContents.toggleDevTools();
  });
  globalShortcut.register("CommandOrControl+Alt+R", () => {
    global.PageView.reload();
  });
  globalShortcut.register("CommandOrControl+Alt+Space", () => {
    global.PageView.reload();
  });
});
