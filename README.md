# Griphitor Desktop

<img src="https://cdn.discordapp.com/attachments/894176496372047872/908841107113267200/Untitled_59.png" width="128"/>


[![CodeQL](https://github.com/Griphcode/Griphitor-IDE/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Griphcode/Griphitor-IDE/actions/workflows/codeql-analysis.yml)  <!--[![Node.js CI](https://github.com/Griphcode/Griphitor-IDE/actions/workflows/node.js.yml/badge.svg)](https://github.com/Griphcode/Griphitor-IDE/actions/workflows/node.js.yml)-->

**The official desktop application for Griphitor built with electron.**

Preview of main window
![Screenshot-of-Griphitor](https://user-images.githubusercontent.com/67136658/141463679-b6586b80-788b-4c36-88bc-fed61ce1d184.png)


Preview of run code button
![Run-Code-View](https://user-images.githubusercontent.com/67136658/141463620-5a7672a6-2408-4c59-8d76-ba37fed49e7d.png)


## Features

Fast load times,

Export as .zip, or single file

Pre-included libraries: <a href="https://github.com/Griphcode/Griphitor-IDE/wiki/List-of-pre-included-libraries">List here</a>

Global shortcuts:

| Shortcut               | Use                           |
| ---------------------- | ----------------------------- |
| `Ctrl/⌘` + `Alt` + `A` | Show about menu               |
| `Ctrl/⌘` + `Alt` + `i` | Show devtools                 |
| `Ctrl/⌘` + `Alt` + `l` | Show included libraries                 |

## Todo

- [X] Add syntax highlight
- [X] Add ability to open files to edit
- [X] Add terminal
- [ ] Better UI
- [X] Cross-platform
- [X] include libaries out of the box
- [ ] Run code without errors

## Installation

You can [download the latest release](https://github.com/Griphcode/Griphitor-IDE/releases/tag/latest) for your operating system or build it yourself (see below).

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

Logo by [@Givinghawk](https://twitter.com/givinghawk) Follow on Twitter

ide - oxmc & Griphcode

app - oxmc

security.md - Advik-B
