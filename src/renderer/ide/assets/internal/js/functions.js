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
  zip.file("index.html", data);
  zip.file("info.txt", "Zipped by Griphitor-IDE");
  zip.generateAsync({
    type: "base64"
  }).then(function(content) {
    window.location.href = "data:application/zip;base64," + content;
  });
};

function rightRotate(value, amount) {
    return (value>>>amount) | (value<<(32 - amount));
};

function sha256(ascii) {
  var mathPow = Math.pow;
  var maxWord = mathPow(2, 32);
  var lengthProperty = 'length'
  var i, j; // Used as a counter across the whole file
  var result = ''
  var words = [];
  var asciiBitLength = ascii[lengthProperty]*8;
  var hash = sha256.h = sha256.h || [];
  var k = sha256.k = sha256.k || [];
  var primeCounter = k[lengthProperty];
  var isComposite = {};
  for (var candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
          for (i = 0; i < 313; i += candidate) {
              isComposite[i] = candidate;
          }
          hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
          k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
      }
  }
  ascii += '\x80' // Append Ƈ' bit (plus zero padding)
  while (ascii[lengthProperty]%64 - 56) ascii += '\x00' // More zero padding
  for (i = 0; i < ascii[lengthProperty]; i++) {
      j = ascii.charCodeAt(i);
      if (j>>8) return; // ASCII check: only accept characters in range 0-255
      words[i>>2] |= j << ((3 - i)%4)*8;
  }
  words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
  words[words[lengthProperty]] = (asciiBitLength)
  for (j = 0; j < words[lengthProperty];) {
      var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
      var oldHash = hash;
      hash = hash.slice(0, 8);
      for (i = 0; i < 64; i++) {
          var i2 = i + j;
          var w15 = w[i - 15], w2 = w[i - 2];
          var a = hash[0], e = hash[4];
          var temp1 = hash[7]
              + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
              + ((e&hash[5])^((~e)&hash[6])) // ch
              + k[i]
              + (w[i] = (i < 16) ? w[i] : (
                      w[i - 16]
                      + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
                      + w[i - 7]
                      + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
                  )|0
              );
          var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
              + ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj
          hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
          hash[4] = (hash[4] + temp1)|0;
      }
      for (i = 0; i < 8; i++) {
          hash[i] = (hash[i] + oldHash[i])|0;
      }
  }
  for (i = 0; i < 8; i++) {
      for (j = 3; j + 1; j--) {
          var b = (hash[i]>>(j*8))&255;
          result += ((b < 16) ? 0 : '') + b.toString(16);
      }
  }
  return result;
};
