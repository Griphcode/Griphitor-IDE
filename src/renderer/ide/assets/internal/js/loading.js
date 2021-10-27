var Loadingtext = document.getElementById("LoadingText")
window.addEventListener('load', function () {
  setTimeout(function () {
    Loadingtext.innerHTML = "Loading Complete!"
    const loader = document.querySelector('.loader');
    loader.className += ' hidden';
  }, 1500);
});
