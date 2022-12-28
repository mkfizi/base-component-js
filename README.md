# Base Component Js

This is a customizable component boilerplates made in vanilla Javascript.

[Download](https://github.com/mkfizi/base-component-js/blob/main/downloads/base-component-js.zip?raw=true)

## Installation

Insert below script inside `<head>` tag with `src` attribute's value referencing to the location of the Base Component Js script.

```html
<script src="./dist/base-component.js"></script>
```

## Usage

Base Component Js serves as a starting point for creating custom interactive components. It does not come with a set of complete pre-built components and therefore you will need to write own custom activity implementations instead.

Simply put, this library is a scaffolder and only provides the groundwork on initializing and handling components activities. You will need to write your own codes for component's activities when the control event is triggered.

You may [read usage documentation](https://github.com/mkfizi/tailstart/blob/main/main/README.md#Usage) for more informations.

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