const { ipcRenderer, ipcMain } = require('electron')
const os = require('os');
const { WebLinksAddon } = require('xterm-addon-web-links');
const { FitAddon } = require('xterm-addon-fit');

/*Create terminal*/
const term = new Terminal({
  cursorBlink: true
});
const fitAddon = new FitAddon();
/*Load addons*/
term.loadAddon(new WebLinksAddon());
term.loadAddon(new FitAddon());
/*Fit terminal*/
term.open(document.getElementById('terminal-container'));
term.resize(200, 13);
/*Make terminal work*/
term.onData(e => {
    ipcRenderer.send("terminal-into", e);
} );
ipcRenderer.on('terminal-incData', (event, data) => {
    term.write(data);
})
/*Write message*/
term.write('Hello from \x1B[1;3;32mGriphitor!\x1B[0m $ ');
term.focus();
//document.getElementById('termtype').innerHTML = os.platform();
