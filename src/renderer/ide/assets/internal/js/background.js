var appConfig = {
  "hostname": "discord.com",
  "userAgent": "",
  "behavior": {
    "internalLinks": true
  },
  "chromeAppWindow": {
    "id": "embed",
    "frame": {
      "type": "chrome",
      "color": "#7289da"
    },
    "innerBounds": {
      "width": 1180,
      "height": 900
    }
  }
};
chrome.app.runtime.onLaunched.addListener(function () {
  runApp();
});
chrome.app.runtime.onRestarted.addListener(function () {
  runApp();
});
function runApp() {
  // Creat a new Chrome app window
  chrome.app.window.create('html/embed.html', appConfig.chromeAppWindow, onWindowLoaded());
}
function onWindowLoaded(popup) {
    return function (win) {
        // On window loaded event
        win.contentWindow.onload = function () {
            // Get webview
            var webview = win.contentWindow.document.getElementById('webview');
            // Override default user agent if provided
            if (appConfig.userAgent) {
                webview.setUserAgentOverride(appConfig.userAgent);
            }
            // Sign up for 'permissionrequest' event
            webview.addEventListener('permissionrequest', function (e) {
                // Allow all permission requests
                e.request.allow();
            });
            // Sign up for 'newwindow' event
            // Emitted when a target='_blank' link is clicked within the webview
            webview.addEventListener('newwindow', function (e) {
                // Parse target window URL to extract hostname
                var parsedUrl = document.createElement('a');
                parsedUrl.href = e.targetUrl;
                // Popup?
                if (e.initialWidth > 0 && e.initialHeight > 0) {
                    // Open it in a popup window with a set width and height
                    return chrome.app.window.create('html/embed.html', { frame: { type: 'chrome' }, innerBounds: { width: e.initialWidth, height: e.initialHeight } }, onWindowLoaded(e));
                }
                // Open app links internally?
                else if (appConfig.behavior.internalLinks && parsedUrl.hostname.includes(appConfig.hostname)) {
                    return chrome.app.window.create('html/embed.html', { frame: { type: 'chrome' }, innerBounds: appConfig.chromeAppWindow.innerBounds }, onWindowLoaded(e));
                }
                // Open the link in a new browser tab/window
                win.contentWindow.open(e.targetUrl);
            });
            // Is this a popup window?
            if (popup) {
                // Override webview source with popup's target URL
                webview.src = popup.targetUrl;
                // Attach original calling window to popup webview (accessible via window.opener)
                popup.window.attach(webview);
            }
        };
    };
}
/*ChromeOS Only*/
chrome.fileBrowserHandler.onExecute.addListener(async (id, details) => {
  if (id !== 'upload') {
    return;  // check if you have multiple file_browser_handlers
  }
  for (const entry of detail.entries) {
    // the FileSystemFileEntry doesn't have a Promise API, wrap in one
    const file = await new Promise((resolve, reject) => {
      entry.file(resolve, reject);
    });
    const buffer = await file.arrayBuffer();
    // do something with buffer
  }
});
/*Options*/
// Watch for changes to the user's options & apply them
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.options?.newValue) {
    const debugMode = Boolean(changes.options.newValue.debug);
    console.log('enable debug mode?', debugMode);
    setDebugMode(debugMode);
  }
});
