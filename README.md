# Google Meet Desktop (Unofficial)

**Unofficial desktop application for Google Meet built with electron.**

![Screenshot of Google Meet Desktop](https://static.arjun-g.com/google-meet/google-meet-screenshot.jpg)

## Features

- Presenter can draw/annotate on screen when sharing the screen

  ![Demo of annotation feature](https://static.arjun-g.com/google-meet/google-meet-annotation.gif)

- ~~Share audio while sharing application window (Windows Only)~~ (Temporarily disabled due to a audio loop issue)

<!---
Does not work

Global shortcuts to mute/unmute microphone and switch on/off camera

| Shortcut               | Use                           |
| ---------------------- | ----------------------------- |
| `Ctrl/⌘` + `Alt` + `A` | Mute/Unmute microphone        |
| `Ctrl/⌘` + `Alt` + `V` | Toggle camera on/off          |

-->

## Todo

- [ ] Ability to stop screenshare without opening the main window
- [ ] Ability to draw/annotate on presenter's screen for all participants
- [ ] Show floating video preview when minimized similar to zoom, slack
- [ ] Global shortcuts to mute/unmute microphone and switch on/off camera
- [ ] Customizable shortcuts
- [ ] Mute/umute all participants
- [ ] Add to windows startup
- [ ] Add ability to share audio while screensharing in mac
- [ ] Download chat history

## Installation

You can [download the latest release](https://github.com/oxmc/google-meet-desktop/releases) for your operating system or build it yourself (see below).

## Building

You'll need [Node.js](https://nodejs.org) installed on your computer in order to build this app.

### Linux:

```
git clone https://github.com/oxmc/google-meet-desktop
cd google-meet-desktop
npm install
```

#### Test app:

```
npm start
```

#### Build app:

```
npm run dist
```

### Mac:

```
git clone https://github.com/oxmc/google-meet-desktop
cd google-meet-desktop
npm install
```

#### Test app:

```
npm start
```

#### Build app:

```
npm run dist
```

### Windows:

```
git clone https://github.com/oxmc/google-meet-desktop
cd google-meet-desktop
npm install
```

#### Test app:

```
npm start
```

#### Build app:

```
npm run dist
```
