# NGI Hello-React

This is a React.js starter project for the NGI in-vehicle platform. Please note that NGI does not currently support the latest version of React. Version 0.14.6 is included because it is the highest stable version shown to work reliably in the vehicle. The file `src/js/vendor/es5-shim.min.js` is included because it is required for ReactDOM to render properly in the NGI environment.

## Get Started

First install external dependencies

```
npm install
```

Then compile React components, including JSX, with the alias

```
npm run build
```

> Check `package.json` for more aliased commands.  

## App Structure

The default structure is meant to separate files that do/do not need rendering with a goal of keeping the webpack config file as simple as possible. This is what the structure looks like:

```
├── README.md
├── app
│   ├── app.js
│   └── index.js
├── gmapp.json
├── package.json
├── src
│   ├── Config.xml
│   ├── Icon.png
│   ├── css
│   │   ├── app.css
│   │   └── reset.css
│   ├── data
│   │   └── share
│   ├── images
│   │   └── close.png
│   ├── index.html
│   ├── js
│   │   ├── app.bundle.js
│   │   └── vendor
│   │       ├── es5-shim.min.js
│   │       ├── react-dom_0_14_6.min.js
│   │       └── react_0_14_6.min.js
│   ├── setup.html
│   └── splash.html
└── webpack.config.js
```

Webpack uses `app/index.js` as your app's entry point, and complies what it finds there into `src/js/app.bundle.js`. React is not complied into the bundled output, but is included in your `index.html` file from a pre-minified source file. It's recommended to use the `app` folder for all files that will be processed through webpack.

Of course webpack can be used to pre-process CSS and many other types of files, but doing so is beyond the scope of this brief document.  
