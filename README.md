# Base Component Js

This is a customizable component boilerplates made in vanilla Javascript.

[Download](https://github.com/mkfizi/base-component-js/blob/main/downloads/base-component-js.zip?raw=true)

## Download

Click [here](https://github.com/mkfizi/base-component-js/blob/main/downloads/base-component-js.zip?raw=true) to download the scaffolder and unzip it's content to your project path to start building your own components using Base Component Js.

## Installation

Run below command to install dependencies.
```bash
npm install
```

Run below command to build Base Component JS codes.
```bash
npm run build
```

Alternatively, you may run below commands:
* `npm run build:dev` ─ Build for development.
* `npm run build:prod` ─ Build and minify for production.
* `npm run watch` ─ Build and watch for changes in real time.
* `npm run watch:dev` ─ Build for development and watch for changes in real time.
* `npm run watch:prod` ─ Build and minify for production and watch for changes in real time.

Insert below script inside `<head>` tag with `src` attribute value referencing
to the location of the Base Component Js script.

```html
<script src="./dist/base-component.js"></script>
```

That's it. You may begin to use Base Component Js in your project. 

If you never heard of NPM before, this is the best time to start using it since modern web development work best with NPM. Refer [NPM](https://www.npmjs.com/) for more informations.

> **Note:**
By default, Base Component Js uses [Webpack v5](https://webpack.js.org/) bundler to build component and utility codes. You may use whatever bundlers according to your preference or project requirements.

## Usage

Base Component Js serves as a starting point for creating custom interactive components. It does not come with a set of complete pre-built components and therefore you will need to write own custom activity implementations instead.

Simply put, this library is a scaffolder and only provides the groundwork on initializing and handling components activities. You will need to write your own codes for component's activities when the control event is triggered.

You may [read usage documentation](https://github.com/mkfizi/base-component-js/blob/main/main/README.md) for more informations.

## Features

This library comes with scaffolder for below components:
* Alert
* Collapse
* Dropdown
* Modal
* Offcanvas

### Accessibility

This library relies heavily on `aria-*` attributes for the component to work as intended. Therefore, it already covers web accessibility practices on affected component elements.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://github.com/mkfizi/base-component-js/blob/main/LICENSE)