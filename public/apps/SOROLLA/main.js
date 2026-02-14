const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    title: 'Academia Técnica Sorolla',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    backgroundColor: '#0c1929',
    show: false,
    titleBarStyle: 'hiddenInset',
  });

  // Cargar el archivo HTML
  mainWindow.loadFile('index.html');

  // Mostrar ventana cuando esté lista
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.webContents.openDevTools(); // DEBUG: ver errores
  });

  // Capturar errores de carga
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Error cargando página:', errorCode, errorDescription);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Menú personalizado
const menuTemplate = [
  {
    label: 'Academia Sorolla',
    submenu: [
      {
        label: 'Acerca de',
        click: () => {
          const { dialog } = require('electron');
          dialog.showMessageBox(mainWindow, {
            type: 'info',
            title: 'Academia Técnica Sorolla',
            message: 'Academia Técnica: Joaquín Sorolla',
            detail: 'Versión 1.0.0\n\nUna aplicación educativa sobre la técnica pictórica del maestro valenciano.\n\n© 2026 Myriam Alcaraz\nwww.myriamalcaraz.com'
          });
        }
      },
      { type: 'separator' },
      {
        label: 'Salir',
        accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Alt+F4',
        click: () => app.quit()
      }
    ]
  },
  {
    label: 'Ver',
    submenu: [
      { role: 'reload', label: 'Recargar' },
      { role: 'forceReload', label: 'Forzar Recarga' },
      { type: 'separator' },
      { role: 'resetZoom', label: 'Zoom Normal' },
      { role: 'zoomIn', label: 'Acercar' },
      { role: 'zoomOut', label: 'Alejar' },
      { type: 'separator' },
      { role: 'togglefullscreen', label: 'Pantalla Completa' }
    ]
  },
  {
    label: 'Módulos',
    submenu: [
      {
        label: '🎨 La Paleta del Maestro',
        click: () => mainWindow.webContents.send('navigate', 'paleta')
      },
      {
        label: '🖌️ Técnica Pictórica',
        click: () => mainWindow.webContents.send('navigate', 'tecnica')
      },
      {
        label: '🖼️ Análisis de Obras',
        click: () => mainWindow.webContents.send('navigate', 'obras')
      },
      {
        label: '☀️ Capturar la Luz',
        click: () => mainWindow.webContents.send('navigate', 'luz')
      },
      {
        label: '📈 Evolución Artística',
        click: () => mainWindow.webContents.send('navigate', 'evolucion')
      }
    ]
  },
  {
    label: 'Ayuda',
    submenu: [
      {
        label: 'Documentación',
        click: async () => {
          const { shell } = require('electron');
          await shell.openExternal('https://myriamalcaraz.com');
        }
      }
    ]
  }
];

app.whenReady().then(() => {
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
  
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
