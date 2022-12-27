/**
 * --------------------------------------------------------------------------
 * Base Component JS (v0.2.0): alert.js
 * Licensed under MIT (https://github.com/mkfizi/base-component-js/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

"use strict";

import Component from "./component.js";

class Alert extends Component {
    /**
     * Alert constructor.
     * @param {element} element 
     */
    constructor(element) {
        super(element);

       // -------------------------< Put additional codes here >-------------------------
    }

    /**
     * Alert event handler.
     * @param {object} event 
     */
    handleEvent(event) {
        super.handleEvent(event);
        
        // If [data-bc-toggle] attribute is not defined on element with [aria-controls] attribute.
        if (!event.target.hasAttribute("data-bc-toggle")) this.hide();

        // -------------------------< Put additional codes here >-------------------------
    }

    /**
     * Alert hide handler.
     */
    hide() {
        super.hide();

        this.element.remove();

        // -------------------------< Put additional codes here >-------------------------
    }
}

export default Alert;