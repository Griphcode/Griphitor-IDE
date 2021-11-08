# Griphitor Desktop

**The official desktop application for Griphitor built with electron.**

Preview of main window
![Screenshot-of-Griphitor](https://user-images.githubusercontent.com/67136658/140071180-0562815b-b175-4da6-8d00-c26c727a81e8.png)

Preview of run code button
![Run-Code-View](https://user-images.githubusercontent.com/67136658/140071433-e03762c1-39af-4dcb-8e2c-85f02d7ac518.png)

## Features

Fast load times,

Export as .zip, or single file

Global shortcuts:

| Shortcut               | Use                           |
| ---------------------- | ----------------------------- |
| `Ctrl/⌘` + `Alt` + `A` | Show about menu               |
| `Ctrl/⌘` + `Alt` + `i` | Show devtools                 |

## Todo

- [X] Add code highlight.
- [ ] Add ability to open files to edit.
- [ ] Better UI.
- [X] Cross-platform
- [X] Run code without errors.

## Installation

You can [download the latest release](https://github.com/Griphcode/Griphitor-IDE/releases) for your operating system or build it yourself (see below).

## Building


You'll need [Node.js](https://nodejs.org) installed on your computer in order to build this app.

```
git clone https://github.com/Griphcode/Griphitor-IDE
cd Griphitor-IDE
npm install
```

#### Test app:

```
npm run start
```

#### Build app:

```
Run first:
npm run pack

Run the one for your OS:

Windows:
npm run dist-win

Mac:
npm run dist-mac

Linux:
npm run dist-linux
```

## Credits:


ide - oxmc & Griphcode

app - oxmc
