'use strict'

// instanciando los objetos app y BrowserWindow
import { app, BrowserWindow } from 'electron'
import devtools from './devtools'
import setIpcMain from './ipcMainEvents'
import handleErrors from './handle-errors'

global.win // eslint-disable-line

if (process.env.NODE_ENV === 'development') {
  devtools()
}

// imprimiendo un mensaje en la consola antes de salir
app.on('before-quit', () => {
  console.log('Saliendo..')
})

// Ejecutando ordenes cuando la aplicación esta lista
app.on('ready', () => {
  // creando una ventana
  global.win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Hola Mundo!',
    center: true,
    maximizable: false,
    show: false
  })

  setIpcMain(global.win)
  handleErrors(global.win)

  // Mostrando la ventana solo cuando el contenido a mostrar sea cargado
  global.win.once('ready-to-show', () => {
    global.win.show()
  })

  // Escuchando el evento cuando la ventana es movida
  global.win.on('move', () => {
    const position = global.win.getPosition()
    console.log(`la posición es ${position}`)
  })

  // detectando el cierre de la ventana para cerrar el aplicativo
  global.win.on('closed', () => {
    global.win = null
    app.quit()
  })

  // Carga una url desde el folder renderer
  global.win.loadURL(`file://${__dirname}/renderer/index.html`)
})
