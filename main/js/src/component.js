/**
 * --------------------------------------------------------------------------
 * Base Component JS (v0.2.0): component.js
 * Licensed under MIT (https://github.com/mkfizi/base-component-js/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

"use strict";

class Component {
    /**
     * Component constructor
     * @param {element} element 
     */
    constructor(element) {
        // Component [id] value.
        this.element = element; 

        // Component element element.
        this.id = this.element.getAttribute("id");

        // Element with [aria-controls] to trigger component event.  
        this.controls = document.querySelectorAll(`[aria-controls="${this.id}"]`);
        
        for (let control of this.controls) {
            control.addEventListener("click", this);
        }

        // -------------------------< Put additional codes here >-------------------------
    }

    /**
     * Component event handler.
     * @param {object} event 
     */
    handleEvent(event) {
        if (event.target.hasAttribute("data-bc-toggle")) {
            if (event.target.getAttribute("data-bc-toggle") === "show") {
                this.show();
            } else if (event.target.getAttribute("data-bc-toggle") === "hide") {
                this.hide();
            }
        }
    
        // -------------------------< Put additional codes here >-------------------------
    }

    /**
     * Component show handler.
     */
    show() {
        // -------------------------< Put additional codes here >-------------------------
    }

    /**
     * Component hide handler.
     */
    hide() {
        // -------------------------< Put additional codes here >-------------------------
    }

    /**
     * Component toggle handler.
     */
    toggle() {
        // -------------------------< Put additional codes here >-------------------------
    }
}

export default Component;