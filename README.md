<h1 align="center">mindows</h1>
<h3 align="center">A minimal Operating System created with React.</h3>

<img src="https://user-images.githubusercontent.com/20419286/126880139-efdaf35f-ee14-424e-a718-41c7015898af.png" width="100%" />

## About
This project provides a minimal Windows 10 experience in browser. It runs completely on client's side. The user is presented with screen to create a new user account on the first visit. User can create multiple accounts, and log into any one of them. Desktop, TaskBar and StartMenu are shown after logging in. Basic apps like Notepad (text editor) and File Explorer are pre-built into the app. Windows 10 design is tried to be replicated for both apps.

New documents and folders can be created in File Explorer. Explorer ribbon similar to that in Windows 10 is also provided for Copy/Cut/Paste/Select/Open operations. Furthermore, project is designed in a way to add new apps without affecting the project structure. It's as simple as writing a new app, add it into ```softwares``` folder and edit the ```config/apps.js``` file. Functions like reading/writing filesystem (yeppp, not the real OS filesystem but the browser storage), etc. are automatically passed down to the app.

Filesystem is built using [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) and [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) API of browsers. So, incase the app data is deleted, complete accounts' data are deleted... like after a new OS installation.

<b><i>It's not complete but it's honest work.</i></b>

## Features
- Windows 10 user interface
- Persistent Filesystem
- Multiple user accounts
- Multiple instances of apps
- Maximizable, minimizable, draggable and focusable apps instances
- Custom installable apps
- Different apps for different types of documents
- Separation of apps based on permissions

## Contribution
This is my first project of this level, so it might have bugs. New apps (what about a music player?) can be written and added to the project. For now apps including Calender, Calculator and Settings are not pre-installed into it.

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Follow the steps at [ReactJS](https://github.com/facebook/react) for more information about running this project locally.

## Credits
Wallpapers used in the project are taken from different websites.
- [Windows 10 Official Wallpaper](http://wallpaperswide.com/windows_10_hero_4k-wallpapers.html)
- [Wharariki Beach Cave, Archway Islands, South Island of New Zealand](https://windows10spotlight.com/images/9fa80fd805562a6bc817f01f48b8b93e)

The windows 10 loading icon has also been inserted from [codepen created by Fernando de Almeida Faria](https://codepen.io/feebaa/pen/PPrLQP).

## Used Libraries
- [ReactJS](https://reactjs.org/)
- [React Redux](https://react-redux.js.org/)
- [React Router](https://reactrouter.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Draggable](https://github.com/react-grid-layout/react-draggable)
- [Sass](https://sass-lang.com/)

## Demo Video
https://user-images.githubusercontent.com/20419286/130333497-d30219b2-feb7-44f2-af92-61731db6d98f.mp4

## Screenshots
**Boot Screen**

<img src="https://user-images.githubusercontent.com/20419286/129489730-620d36ae-ad41-4200-a68e-b951affdc137.png" width="100%" alt="Boot Screen" />
<br/>

**New User Account Screen**

<img src="https://user-images.githubusercontent.com/20419286/129488127-c63e22f3-e110-482f-95a1-5d8e7f420b16.png" width="100%" alt="New User Account" />
<br/>

**Switch User Screen**

<img src="https://user-images.githubusercontent.com/20419286/129488136-64f09700-ee4d-46e5-9d1d-f689f87ba114.png" width="100%" alt="Switch User" />
<br/>

**Desktop**

<img src="https://user-images.githubusercontent.com/20419286/129488144-cf9241b8-1134-424c-886c-bb360864914e.png" width="100%" alt="Desktop" />
<br/>

**Desktop with Start Menu**

<img src="https://user-images.githubusercontent.com/20419286/129488142-b2bef82e-6d1c-475b-a88d-806655db6b4c.png" width="100%" alt="Start Menu" />
<br/>

**File Explorer**

<img src="https://user-images.githubusercontent.com/20419286/129488132-dbc31adb-fbfe-46f2-8d9d-73b0e2cb7005.png" width="100%" alt="File Explorer" />
<br/>

**Notepad**

<img src="https://user-images.githubusercontent.com/20419286/129489731-0a185c23-62a1-46ff-84d0-3722fec27136.png" width="100%" alt="Notepad" />
<br/>

**Logout Screen**

<img src="https://user-images.githubusercontent.com/20419286/129489748-bd1355bc-8212-40ff-9afc-3f812a87ed62.png" width="100%" alt="Logging Out" />
<br/>
