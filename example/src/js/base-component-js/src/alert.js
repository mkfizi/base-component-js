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
       // Element's parent element.
       this.parentElement = this.element.parentElement;
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
        
        // create notification text.
        let notificationText = document.createElement("p");
        notificationText.innerHTML = "Alert container has been removed.";

        // Create reset button.
        let resetButton = document.createElement("button");
        resetButton.setAttribute("type", "button");
        resetButton.innerHTML = "Reset";

        // Add "click" event on reset button which will reset view.
        resetButton.addEventListener("click", () => {
            notificationText.remove();
            resetButton.remove();
            this.parentElement.appendChild(this.element)
        })

        // Append notification and reload page button in document body.
        this.parentElement.appendChild(notificationText);
        this.parentElement.appendChild(resetButton);
    }
}

export default Alert;