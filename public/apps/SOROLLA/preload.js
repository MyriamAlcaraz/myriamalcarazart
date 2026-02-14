const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onNavigate: (callback) => ipcRenderer.on('navigate', (event, module) => callback(module)),
  getAppVersion: () => '1.0.0',
  platform: process.platform
});
