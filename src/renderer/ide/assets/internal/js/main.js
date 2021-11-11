//Old way
/*chrome.runtime.onInstalled.addListener(async () => {
  let url = chrome.runtime.getURL("index.html");
  let tab = await chrome.tabs.create({ url });
  console.log(`Created tab ${tab.id}`);
});
chrome.browserAction.onClicked.addListener(async function(tab) {
    alert('working?');
    let url = chrome.runtime.getURL("index.html");
    let tab = await chrome.tabs.create({ url });
    console.log(`Created tab ${tab.id}`);
});*/

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({ url: chrome.extension.getURL('index.html'), selected: true });
});
