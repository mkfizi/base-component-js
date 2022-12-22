/**
 * --------------------------------------------------------------------------
 * Base Component JS (v0.2.0): dropdown.js
 * Licensed under MIT (https://github.com/mkfizi/base-component-js/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

"use strict";

import Component from "./component.js";

import tabs from "./util/tabs.js";

class Dropdown extends Component {
    /**
     * Dropdown constructor.
     * @param {element} element 
     */
    constructor(element) {
        super(element);

        // Element default state.
        this.isActive = false;

        // Triggers "this.hide()" by default.
        this.hide();

        // Handle click outside.
        window.addEventListener("click", this.toggleClickOutside(this));

        // Handle click outside for touch based screen.
        window.addEventListener("touchstart", this.toggleClickOutside(this));

        // -------------------------< Put additional codes here >-------------------------
    }

    /**
     * Dropdown event handler.
     * @param {object} event 
     */
    handleEvent(event) {
        super.handleEvent(event);
        
        // If [data-bc-toggle] attribute is not defined on element with [aria-controls] attribute.
        if (event.target.hasAttribute("data-bc-toggle") === false) {
            this.isActive
                ? this.hide()
                : this.show();
        }

        // -------------------------< Put additional codes here >-------------------------
    }
    
    /**
     * Dropdown show handler.
     */
    show() {
        super.show();

        this.isActive = true; 
        this.toggle();

        // -------------------------< Put additional codes here >-------------------------
        this.element.classList.add('active');
    }

    /**
     * Dropdown hide handler.
     */
    hide() {
        super.hide();

        this.isActive = false; 
        this.toggle();

        // -------------------------< Put additional codes here >-------------------------
        this.element.classList.remove('active');
    }

    /**
     * Dropdown toggle handler.
     */
    toggle() {
        super.toggle();

        // Toggle element [aria-hidden] value.
        this.element.setAttribute("aria-hidden", !this.isActive);    
        
        // Enable/Disable tabs on element based on active state.
        this.isActive
            ? tabs.enable(this)
            : tabs.disable(this);
        
        // -------------------------< Put additional codes here >-------------------------
    }

    /**
     * Dropdown toggle click outside handler.
     * @param {object} component 
     * @returns {event}
     */
    toggleClickOutside(component) {
        return event => {
            let targetComponent = event.target.closest(`[data-bc-id="${component.id}"]`);
            let targetAriaControls = event.target.closest(`[aria-controls="${component.id}"]`);

            if (targetComponent === null && targetAriaControls === null ) component.hide();

            // -------------------------< Put additional codes here >-------------------------
        }
    }
}

export default Dropdown;