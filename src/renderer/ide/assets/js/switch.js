function Viewmode() {
  var checkBox = document.getElementById("drkmdbtn");
  var body = document.getElementById("body");
  if (checkBox.checked == true) {
    body.className += 'dark';
  } else {
    body.classList.remove("dark");
  };
};
