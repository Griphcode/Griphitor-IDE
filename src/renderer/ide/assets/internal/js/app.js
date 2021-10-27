/*NodeJS Modules*/
var fs = require('fs');
var path = require('path');
const { ipcRenderer, ipcMain } = require('electron')

/*Get textarea values*/
var htmltextbox = document.getElementById('html');
var csstextbox = document.getElementById('css');
var jstextbox = document.getElementById('js');

/*Get iframe*/
var CodeView = document.getElementById('code');

/*Get buttons*/
var RunCodeBtn = document.getElementById('RunCodeBtn');
var ExprtBtn = document.getElementById('ExprtBtn');
var ExprtBtn1 = document.getElementById('ExprtBtn1');
var CloseErrorBtn = document.getElementById('CloseErrorBtn');

/*Get notification boxes*/
var NotifBox = document.getElementById('Notif');
var NotifBoxTitle = document.getElementById('NotifTitle');
var NotifBoxMessage = document.getElementById('NotifMessage');
var NotifCheckbox = document.getElementById('NotifCheckbox');
var NotifCheckbox1 = document.getElementById('NotifCheckbox1');
var NotifCheckbox2 = document.getElementById('NotifCheckbox2');

/*DEBUG*/
function logval() {
  console.log(htmltextbox.value);
  console.log(csstextbox.value);
  console.log(jstextbox.value);
}

/* Buttons */
RunCodeBtn.addEventListener("click", () => {
  if (htmltextbox.value == '' && csstextbox.value == '' && jstextbox.value == '') {
    play('assets/internal/sound/error.mp3');
    console.log("All inputs are empty.");
    NotifTitle.innerHTML = 'Error:';
    NotifMessage.innerHTML = 'No code to execute, please fill in the textboxes.';
    Notif.style.display='block';
  } else {
    logval();
    try {
      var codeview = {
        "html": `${htmltextbox.value}`,
        "css": `${csstextbox.value}`,
        "js": `${jstextbox.value}`
      }
      var content = `<style>${codeview.css}</style>
${codeview.html}
<script type="text/javascript">${codeview.js}</script>`;
      console.log(content);
      fs.writeFile(path.join(__dirname, 'user-created.html'), content, function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
      });
      ipcRenderer.send('Editor', 'ShowCode');
      play('assets/internal/sound/success.mp3');
    } catch (e) {
      console.log(e);
      play('assets/internal/sound/error.mp3');
      NotifTitle.innerHTML = 'Error:';
      NotifMessage.innerHTML = `An error has accured, here is the error: ${e}`;
      NotifCheckbox.style.display='none';
      Notif.style.display='block';
    }
  }
});

CloseErrorBtn.addEventListener("click", () => {
  Notif.style.display='none';
});

ExprtBtn.addEventListener("click", () => {
  if (htmltextbox.value == '' && csstextbox.value == '' && jstextbox.value == '') {
    play('assets/internal/sound/error.mp3');
    console.log("All inputs are empty.");
    NotifTitle.innerHTML = 'Error:';
    NotifMessage.innerHTML = 'No code to export, please fill in the textboxes.';
    NotifCheckbox.style.display='none';
    Notif.style.display='block';
  } else {
    NotifBoxTitle.innerHTML = 'What do you want to export this as?';
    NotifMessage.innerHTML = '';
    NotifCheckbox.style.display='block';
    NotifBox.style.display='block';
    var codeview = {
      "html": `${htmltextbox.value}`,
      "css": `${csstextbox.value}`,
      "js": `${jstextbox.value}`
    }
    console.log(codeview);
    ExprtBtn1.addEventListener("click", () => {
      if (NotifCheckbox1.checked == true) {
        console.log("Exporting as individual file");
        NotifTitle.innerHTML = 'Exporting';
        NotifMessage.innerHTML = 'Exporting files...';
        NotifCheckbox.style.display='none';
        try {
          GenFile(codeview.html, "html");
          GenFile(codeview.css, "css");
          GenFile(codeview.js, "js");
          play('assets/internal/sound/success.mp3');
          NotifTitle.innerHTML = 'Export Complete!';
          NotifMessage.innerHTML = 'Exporting Completed!';
          NotifCheckbox.style.display='none';
          Notif.style.display='block';
        } catch (e) {
          console.log(e);
          play('assets/internal/sound/error.mp3');
          NotifTitle.innerHTML = 'Error:';
          NotifMessage.innerHTML = `An error has accured, here is the error: \n${e}`;
          NotifCheckbox.style.display='none';
          Notif.style.display='block';
        };
      } else if (NotifCheckbox2.checked == true) {
        console.log("Exporting as zip");
        NotifTitle.innerHTML = 'Exporting';
        NotifMessage.innerHTML = 'Exporting files...';
        NotifCheckbox.style.display='none';
        try {
          MakeZip(codeview);
          play('assets/internal/sound/success.mp3');
          NotifTitle.innerHTML = 'Export Complete!';
          NotifMessage.innerHTML = 'Exporting Completed!';
          NotifCheckbox.style.display='none';
          Notif.style.display='block';
        } catch (e) {
          console.log(e);
          play('assets/internal/sound/error.mp3');
          NotifTitle.innerHTML = 'Error:';
          NotifMessage.innerHTML = `An error has accured, here is the error: \n${e}`;
          NotifCheckbox.style.display='none';
          Notif.style.display='block';
        };
      } else if (NotifCheckbox3.checked == true) {
        console.log("Exporting as json");
        NotifTitle.innerHTML = 'Exporting';
        NotifMessage.innerHTML = 'Exporting files...';
        NotifCheckbox.style.display='none';
        try {
          GenFile(JSON.stringify(codeview), "export.json");
          play('assets/internal/sound/success.mp3');
          NotifTitle.innerHTML = 'Export Complete!';
          NotifMessage.innerHTML = 'Exporting Completed!';
          NotifCheckbox.style.display='none';
          Notif.style.display='block';
        } catch (e) {
          console.log(e);
          play('assets/internal/sound/error.mp3');
          NotifTitle.innerHTML = 'Error:';
          NotifMessage.innerHTML = `An error has accured, here is the error: \n${e}`;
          NotifCheckbox.style.display='none';
          Notif.style.display='block';
        };
      };
    });
  };
})
