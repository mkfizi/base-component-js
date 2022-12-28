# Base Component Js

This is the main scaffolder codes for [Base Component Js](https://mkfizi.github.io/base-component-js).

* [Download](#download)
* [Installation](#installation)
* [Component usage](#component-usage)
    * [Initialization](#initialization)
    * [Calling instances](#calling-instances)
    * [Component class](#component-class)
    * [Alert component](#alert-component)
    * [Collapse component](#collapse-component)
    * [Dropdown component](#dropdown-component)
    * [Modal component](#modal-component)
    * [Offcanvas component](#offcanvas-component)
    * [Create a new component](#create-a-new-component)
    * [Utility objects](#utility-objects)
* [Contributing](#contributing)
* [License](#license)

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

## Component Usage

All components are initialized in `base-component.js` located in `/js` subdirectory. These components are defined in `/js/src` subdirectory and uses utilities from `/js/src/util` subdirectory.

You may refer to `/example` subdirectory that's included in the scaffolder to get the idea on how to write custom component activities and their usage in a project.

> **Note:**
By default, Base Component Js uses ES6 module standards and therefore, Javascript code snippets demonstrate usage that complies with ES6 module standards. You may modify the scaffolder accordingly to suit your preferred standards.

### Initialization

Component elements consists of "content" and "trigger". These element can be defined as below:
```html
<!-- Content -->
<div id="componentId" data-bc="componentType">
    Content
</div>

<!-- Trigger -->
<button type="button" aria-controls="componentId">Trigger</button>
```

Component "content" attributes are as below:
 Attribute | Type | Values | Requisite | Detail |
|-----------|--------|------|---------------|-----------|
| `[id]` | `string` | Any string | Required | Component name |
| `[data-bc]` | `string` | `alert`, `collapse`, `dropdown`, `modal`, `offcanvas` | Required | Component type |
| `[data-bc-accordion]` | `string` | Any string | Optional | To trigger component with accordion |
| `[data-bc-scrollable]` | `boolean` | `true`, `false` | Optional | To set component to enable or disable document scroll |
| `[aria-hidden]` | `boolean` | `true`, `false` | Optional | Component state |

Component "trigger" attributes are as below:

| Attribute | Type | Values | Requisite | Detail |
|-----------|--------|------|---------------|-----------|
| `[aria-controls]` | `string` |  Same string as in component "content" `[id]` attribute value | Required | Component name referencing to `[id]` value in "content" |
| `[aria-expanded]` | `boolean` | `true`, `false` | Optional | Component state |
| `[data-bc-toggle]` | `string` | `show`, `hide` | Optional | Toggle type |

> **Note:**
A "trigger" can be defined multiple times while `[aria-controls]` attribute value referencing to the same "content" depending on the need of the component.

### Calling instances

Component instances can be called globally using `baseComponentJS.$("componentId")` to manually trigger activities as below:
```javascript
document.addEventListener("DOMContentLoaded", () => {
    baseComponentJS.$("componentId").show();
});
```

> **Note:**
Component instances are only initialized when "Document HTML" has been fully renderer and therefore, calling component instances must be written after such event occurs.

### Component class

Components classes are inherited from `Component` class. This class contains properties and methods that are used on all components.

`Component` class properties are as below:
| Property | Type | Value | Detail |
|----------|------|---------------|--------|
| `element` | element | Any string | Component "content" |
| `id` | string | Any string | Component "content" `[id]` attribute value |
| `controls` | array | Element with `[aria-controls]` attribute value referencing to component `id` | Component "trigger" elements |

`Component` class methods are as below:
| Method | Parameter | Detail |
|--------|-----------|--------|
| `constuctor()` | element (`element`) | Initialize component on target element "content" |
| `handleEvent()` | event (`event`) | Handler when component "trigger" is triggered  |
| `show()` | `null` | Execute activities to show component |
| `hide()` | `null` | Execute activities to hide component |
| `toggle()` | `null` | Execute activities after `show()` or `hide()` is executed |

Some components may contain custom properties and methods to execute activities that are unique to them. Properties and methods in this class can be modified in `js/src/component.js`.

### Alert component

Alert component can be initialized in HTML as below:
```html
<!-- Trigger -->
<button type="button" aria-controls="alertId" data-bc-toggle="hide">Hide Alert</button>

<!-- Content -->
<div id="alertId" data-bc="alert">
    Alert Content
</div>
```

Alert "content" attributes are as below:
| Attribute | Type | Value | Requisite | Detail |
|-----------|--------|------|---------------|-----------|
| `[id]` | `string` | Any string | Required | Alert name |
| `[data-bc]` | `string` | `alert` | Required | Component type |

Alert "trigger" attributes are as below:
| Attribute | Type | Value | Requisite | Detail |
|-----------|--------|------|---------------|-----------|
| `[aria-controls]` | `string` | Same string as in Alert "content" `[id]` attribute value | Required | Alert name referencing to `[id]` value in "content" |
| `[data-bc-toggle]` | `string` | `show`, `hide` | Optional | Toggle type |

Alert method activities can be modified in `/js/src/alert.js` as below:

```javascript
class Alert extends Component {
    ...
    hide() {
        ...
        // -------------------------< Put additional codes here >-------------------------
        this.element.classList.add("hide"); // Adds "hide" to alert "content" [class].
    }
}
```

`Alert` class properties and method are inherited from `Component` class while adding supplementary activities.

### Collapse component

Collapse component can be initialized in HTML as below:
```html
<!-- Trigger -->
<button type="button" aria-controls="collapseId" aria-expanded="false">Toggle Collapse</button>

<!-- Content -->
<div id="collapseId" data-bc="collapse" aria-hidden="true">
    Collapse Content
</div>
```

To make a collapse as accordion, simply add `[data-bc-accordiong]` attribute in "content" element where it's value is a unique name as below:
```html
<!-- Collapse 1 trigger -->
<button type="button" aria-controls="collapseId1" aria-expanded="false">Toggle Collapse 1</button>

<!-- Collapse 1 content -->
<div id="collapseId1" data-bc="collapse"  data-bc-accordion="accordionId" aria-hidden="true">
    Collapse 1 Content
</div>

<!-- Collapse 2 trigger -->
<button type="button" aria-controls="collapseId2" aria-expanded="false">Toggle Collapse 2</button>

<!-- Collapse 2 content -->
<div id="collapseId2" data-bc="collapse"  data-bc-accordion="accordionId" aria-hidden="true">
    Collapse 2 Content
</div>
```

Collapse "content" attributes are as below:

| Attribute | Type | Value | Requisite | Detail |
|-----------|--------|------|---------------|-----------|
| `[id]` | `string` | Any string | Required | Collapse name |
| `[data-bc]` | `string` | `collapse` | Required | Component type |
| `[data-bc-accordion]` | `string` | Any string | Optional | Accordion name |
| `[aria-hidden]` | `boolean` | `true`, `false` | Optional | Collapse state |

Collapse "trigger" attributes are as below:

| Attribute | Type | Value | Requisite | Detail |
|-----------|--------|------|---------------|-----------|
| `[aria-controls]` | `string` | Same string as in Collapse "content" `[id]` attribute value | Required | Collapse name referencing to `[id]` value in "content" |
| `[aria-expanded]` | `boolean` | `true`, `false` | Optional | Collapse state |
| `[data-bc-toggle]` | `string` | `show`, `hide` | Optional | Toggle type |

Collapse method activities can be modified in `/js/src/collapse.js` as below:

```javascript
class Collapse extends Component {
    ...
    show() {
        ...
        // -------------------------< Put additional codes here >-------------------------
        this.element.classList.add("show"); // Adds "show" to collapse "content" [class].
    }
}
```

`Collapse` class properties and methods are inherited from `Component` class and further extended with custom properties and method.

`Collapse` class custom properties are as below:

| Property | Type | Value | Detail |
|----------|------|---------------|--------|
| `isActive` | `boolean` | `true`,`false` | Collapse state |
| `accordionId` | `boolean` | Any string | Collapse "content" `[data-bc-accordion]` attribute value |

`Collapse` class custom method is as below:

| Method | Parameter | Detail |
|--------|-----------|--------|
| `toggleAccordion()` | `null` | Execute activities if Collapse is an accordion |

### Dropdown component

Dropdown component can be initialized in HTML as below:
```html
<!-- Trigger -->
<button type="button" aria-controls="dropdownId">Toggle Dropdown</button>

<!-- Content -->
<div id="dropdownId" data-bc="dropdown">
    Dropdown Content
</div>
```

Dropdown "content" attributes are as below:
| Attribute | Type | Value | Requisite | Detail |
|-----------|--------|------|---------------|-----------|
| `[id]` | `string` | Any string | Required | Dropdown name |
| `[data-bc]` | `string` | `dropdown` | Required | Component type |
| `[aria-hidden]` | `boolean` | `true`, `false` | Optional | Dropdown state |

Dropdown "trigger" attributes are as below:
| Attribute | Type | Value | Requisite | Detail |
|-----------|--------|------|---------------|-----------|
| `[aria-controls]` | `string` | Same string as in Dropdown "content" `[id]` attribute value  | Required | Dropdown name referencing to `[id]` value in "content" |
| `[data-bc-toggle]` | `string` | `show`, `hide` | Optional | Toggle type |

Dropdown method activities can be modified in `/js/src/dropdown.js` as below:

```javascript
class Dropdown extends Component {
    ...
    show() {
        ...
        // -------------------------< Put additional codes here >-------------------------
        this.element.classList.add("show"); // Adds "show" to dropdown "content" [class].
    }
}
```

`Dropdown` class properties and methods are inherited from `Component` class and further extended with custom property and method.

`Dropdown` class custom properties are as below:

| Property | Type | Value | Detail |
|----------|------|---------------|--------|
| `isActive` | `boolean` | `true`,`false` | Dropdown state |

`Dropdown` class custom method is as below:

| Method | Parameter | Detail |
|--------|-----------|--------|
| `toggleClickOutside()` | component (`object`) | Execute activities when click outside Dropdown "content" |

### Modal component

Modal component can be initialized in HTML as below:
```html
<!-- Trigger -->
<button type="button" aria-controls="modalId" data-bc-toggle="show">Show Modal</button>

<!-- Content -->
<div id="modalId" data-bc="modal">
    Modal Content
</div>
```

Modal "content" attributes are as below:
| Attribute | Type | Value | Requisite | Detail |
|-----------|--------|------|---------------|-----------|
| `[id]` | `string` | Any string | Required | Modal name |
| `[data-bc]` | `string` | `modal` | Required | Component type |
| `[data-bc-scrollable]` | `boolean` | `true`, `false` | Optional | To set Modal to enable or disable document scroll |
| `[aria-hidden]` | `boolean` | `true`, `false` | Optional | Modal state |

Modal "trigger" attributes are as below:
| Attribute | Type | Value | Requisite | Detail |
|-----------|--------|------|---------------|-----------|
| `[aria-controls]` | `string` | Same string as in Modal "content" `[id]` attribute value  | Required | Modal name referencing to `[id]` value in "content" |
| `[data-bc-toggle]` | `string` | `show`, `hide` | Optional | Toggle type |

Modal method activities can be modified in `/js/src/modal.js` as below:

```javascript
class Modal extends Component {
    ...
    show() {
        ...
        // -------------------------< Put additional codes here >-------------------------
        this.element.classList.add("show"); // Adds "show" to modal "content" [class].
    }
}
```

`Modal` class properties and methods are inherited from `Component` class and further extended with a custom property.

`Modal` class custom properties are as below:

| Property | Type | Value | Detail |
|----------|------|---------------|--------|
| `isScrollable` | `boolean` | `true`,`false` | Set if Modal enable or disable document scroll. |

### Offcanvas component

Offcanvas component can be initialized in HTML as below:
```html
<!-- Trigger -->
<button type="button" aria-controls="offcanvasId" data-bc-toggle="show">Show Offcanvas</button>

<!-- Content -->
<div id="offcanvasId" data-bc="offcanvas">
    Offcanvas Content
</div>
```

Offcanvas "content" attributes are as below:
| Attribute | Type | Value | Requisite | Detail |
|-----------|--------|------|---------------|-----------|
| `[id]` | `string` | Any string | Required | Offcanvas name |
| `[data-bc]` | `string` | `offcanvas` | Required | Component type |
| `[data-bc-scrollable]` | `boolean` | `true`, `false` | Optional | To set Offcanvas to enable or disable document scroll |
| `[aria-hidden]` | `boolean` | `true`, `false` | Optional | Dropdown state |

Offcanvas "trigger" attributes are as below:
| Attribute | Type | Value | Requisite | Detail |
|-----------|--------|------|---------------|-----------|
| `[aria-controls]` | `string` | Same string as in Offcanvas "content" `[id]` attribute value  | Required | Offcanvas name referencing to `[id]` value in "content" |
| `[data-bc-toggle]` | `string` | `show`, `hide` | Optional | Toggle type |

Offcanvas method activities can be modified in `/js/src/offcanvas.js` as below:

```javascript
class Offcanvas extends Component {
    ...
    show() {
        ...
        // -------------------------< Put additional codes here >-------------------------
        this.element.classList.add("show"); // Adds "show" to moffcanvasodal "content" [class].
    }
}
```

`Offcanvas` class properties and methods are inherited from `Component` class and further extended with a custom property.

`Offcanvas` class custom properties are as below:

| Property | Type | Value | Detail |
|----------|------|---------------|--------|
| `isScrollable` | `boolean` | `true`,`false` | Set if Offcanvas enable or disable document scroll. |

### Create a new component class

To create a new component class, you may simply do so by create a new component class in `/js/src` and inherit from `Component` class as below:
```javascript
class NewComponent extends Component {
    ...
}
```

To access properties and methods in `Component` class in your new component class, simply use `super()` in you methods as below:
```javascript
import Component from "./component.js";

class NewComponent extends Component {
    constructor(element) {
        super(element);
    }
    show() {
        super.show();
        ...
    }
}
```

After creating a new component class, create an instance for new component in `/js/src/util/instances.js` as below:
```javascript
const instances = {
    ...
    newComponent: [],
}
```

Finally, register new component in `init()` inside `/js/base-component.js` as below:
```javascript
import NewComponent from "./src/new-component.js";

const baseComponentJs = {
    ...
    switch(type) {
        ...
        case "newComponent":
            instances.all.push(new NewComponent(element));
            instances.newComponent.push(instances.all[instances.all.length - 1]);
            break;
        ...
    }
}
```

If you're using Webpack or any bundler tools, run below command in project root directory to compile the codes to distribution subdirectory.
```bash
npm run watch
```

To define newly created component in your HTML files, simply add `[data-bc]` attribute to component "content" element with it's value referencing to the name of your new component as below:
```html
<!-- Content -->
<div id="componentId" data-bc="newComponent">
    Content
</div>

<!-- Trigger -->
<button type="button" aria-controls="componentId">Trigger</button>
```

### Utility objects

Utility objects consists of method and activities that executes during component initialization and activities. Depending on component type and activities, some utilities are required to be imported in the component class. These utility objects can be located in `/js/src/util`.

Utility files functionality are as below:
* `instances.js` - To track component instances.
* `validate.js` - To validate component required attributes.
* `tabs.js` - To enable or disable tabs on component "content".
* `focus-trap.js` - To enable or disable focus trapping on component elements.
* `document-scroll.js` - To enable or disable scroll on document DOM.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://github.com/mkfizi/base-component-js/blob/main/LICENSE)