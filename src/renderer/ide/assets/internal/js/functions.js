/* Functions */
function storeData(name,value) {
  localStorage.setItem(name, value);
}

function updateData(name,value) {
  let data = localStorage.getItem(name);
  localStorage.setItem(name, value);
}

function getData(name) {
  let data = localStorage.getItem(name);
  return data;
}

function play(url) {
  var audio = new Audio(url);
  audio.play();
}

function choose(arr) {
  return arr[
    Math.floor(Math.random()*arr.length)
  ];
}

function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

function update(text) {
  let result_element = document.querySelector("#highlighting-content");
  // Handle final newlines (see article)
  if(text[text.length-1] == "\n") {
    text += " ";
  }
  // Update code
  result_element.innerHTML = text.replace(new RegExp("&", "g"), "&amp;").replace(new RegExp("<", "g"), "&lt;"); /* Global RegExp */
  // Syntax Highlight
  Prism.highlightElement(result_element);
}

function sync_scroll(element) {
  /* Scroll result to scroll coords of event - sync with textarea */
  let result_element = document.querySelector("#highlighting");
  // Get and set x and y
  result_element.scrollTop = element.scrollTop;
  result_element.scrollLeft = element.scrollLeft;
}

function check_tab(element, event) {
  let code = element.value;
  if(event.key == "Tab") {
    /* Tab key pressed */
    event.preventDefault(); // stop normal
    let before_tab = code.slice(0, element.selectionStart); // text before tab
    let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab
    let cursor_pos = element.selectionEnd + 1; // where cursor moves after tab - moving forward by 1 char to after tab
    element.value = before_tab + "\t" + after_tab; // add tab char
    // move cursor
    element.selectionStart = cursor_pos;
    element.selectionEnd = cursor_pos;
    update(element.value); // Update text to include indent
  }
}

// Function to download data to a file
function GenFile(data, filename, type) {
  if (type == '') {
    type = "text/plain;charset=utf-8";
  }
  var blob = new Blob([data], { type: type });
  saveAs(blob, filename);
}

function OpenFileDialog(elm) {
  elm.click(function() {
    var input = $(document.createElement('input'));
    input.attr("type", "file");
    input.trigger('click');
    return false;
  });
}

/*var zip = new JSZip();
zip.file("Hello.txt", "Hello World\n");
var img = zip.folder("images");
img.file("smile.gif", imgData, {base64: true});
zip.generateAsync({type:"blob"})
.then(function(content) {
    // see FileSaver.js
    saveAs(content, "example.zip");
});*/

function MakeZip(data) {
  var zip = new JSZip();
  zip.file("index.html", data.html);
  zip.file("style.html", data.css);
  zip.file("index.js", data.js);
  zip.generateAsync({
    type: "base64"
  }).then(function(content) {
    window.location.href = "data:application/zip;base64," + content;
  });
};
