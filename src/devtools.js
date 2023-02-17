const { enableLiveReload } = ("electron-compile");
const electronDebug = ("electron-debug");

module.exports = function devtools() {
  enableLiveReload();
  // Mostrando las herramientas de DevTools para las diferentes ventanas
  electronDebug({ showDevTools: true });
};
