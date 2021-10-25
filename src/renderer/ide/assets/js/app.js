/*Get textarea values*/
var htmltextbox = document.getElementById('html');
var csstextbox = document.getElementById('css');
var jstextbox = document.getElementById('js');

/*Get iframe*/
var codeview = document.getElementById('code');

/*Get buttons*/
var RunCodeBtn = document.getElementById('RunCodeBtn');

/*Get notification boxes*/
var ErrorBox = document.getElementById('alert');
var ErrorBoxTitle = document.getElementById('alerttitle');
var ErrorBoxMessage = document.getElementById('alertmessage');

/*DEBUG*/
function logval() {
  console.log(htmltextbox.value);
  console.log(csstextbox.value);
  console.log(jstextbox.value);
}

/* Buttons */
RunCodeBtn.addEventListener("click", () => {
  if (htmltextbox.value == '' && csstextbox.value == '' && jstextbox.value == '') {
    play('./assets/sound/error.mp3');
    console.log("All inputs are empty.");
    ErrorBoxTitle.innerHTML = 'Error:';
    ErrorBoxMessage.innerHTML = 'No code to execute, please fill in the textboxes.';
    ErrorBox.style.display='block';
  } else {
    logval();
    /*Make file*/
    var header = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">`;
    document.getElementsByTagName("head").id = 'head';
    console.log();
    try {
      console.log(g);
      //GenFile(file, "test");
      play('./assets/sound/success.mp3');
    } catch (e) {
      console.log(e);
      play('./assets/sound/error.mp3');
      ErrorBoxTitle.innerHTML = 'Error:';
      ErrorBoxMessage.innerHTML = `An error has accured, here is the error: ${e}`;
      ErrorBox.style.display='block';
    }

    //codeview.contentWindow.document.head.appendChild(html);
    //codeview.contentWindow.document.head.appendChild(css);
    //codeview.contentWindow.document.head.appendChild(script);
  }
});
