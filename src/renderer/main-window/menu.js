import { remote } from 'electron'
import { openDirectory, saveFile, openPreferences, uploadImage, pasteImage } from './ipcRendererEvents'
import { print } from './images-ui'

function createMenu () {
  const template = [
    {
      label: 'Archivo',
      submenu: [
        {
          label: 'Abrir ubicación',
          accelerator: 'CmdOrCtrl+O',
          click () { openDirectory() }
        },
        {
          label: 'Guardar',
          accelerator: 'CmdOrCtrl+G',
          click () { saveFile() }
        },
        {
          label: 'Preferencias',
          accelerator: 'CmdOrCtrl+,',
          click () { openPreferences() }
        },
        {
          label: 'Cerrar',
          role: 'quit'
        }
      ]
    }
  ]
  const menu = remote.Menu.buildFromTemplate(template)
  remote.Menu.setApplicationMenu(menu)
}

module.exports = createMenu
