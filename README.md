## Solar Sky | Solor Selling Company | E-Commerce Website

Technology Used:- HTML, CSS, Javascript, JQuery, AJAX, Nodejs, SQLite3

Firstly Download, Install & Setup Nodejs Package from [Nodejs.com](https://nodejs.org) 

Open Command Prompt / Powershell, Enter

```
node -v
# or 
npm -v
```

To check Nodejs is successfully installed and running.
NPM is Nodejs Package Manager, we are used checking the versions.


then start the server using Nodejs,

```
npm install 
node app.js
```

This starts the main Web Application.

Now Open Any Browser(Chrome, Mozilla Firefox, Internet Explorer, Brave, etc), 
Type below URL 
```
localhost:3000
```

Page will Load 

**The Website is only Configured for Accepting Order and Storing in Databases.**


Issue: Cross-Platform Compatibility

```
npm uninstall sqlite3

npm cache clean --force

npm install sqlite3 --build-from-source=false
```


optional
```
rmdir /s /q node_modules
del package-lock.json
```
