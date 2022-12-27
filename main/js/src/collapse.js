/**
 * --------------------------------------------------------------------------
 * Base Component JS (v0.2.3): collapse.js
 * Licensed under MIT (https://github.com/mkfizi/base-component-js/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

 "use strict";

import Component from "./component.js";

import instances from "./util/instances.js";
import tabs from "./util/tabs.js";

class Collapse extends Component {
    /**
     * Collapse constructor.
     * @param {element} element 
     */
    constructor(element) {
        super(element);

        // Element default collapse status.
        this.isActive = false

        // Element default collapse accordion id.
        this.accordionId = null;

        if (this.element.hasAttribute("data-bc-accordion")) {
            this.accordionId = this.element.dataset.bcAccordion;
        }

        // Set default state.
        if (this.element.getAttribute("aria-hidden") === "false") {
            this.show();
        } else if (this.element.getAttribute("aria-hidden") === "true"){
            this.hide();
        }

        // -------------------------< Put additional codes here >-------------------------
    }
    
    /**
     * Collapse event handler.
     * @param {event} event 
     */
    handleEvent(event) {
        super.handleEvent(event);

        // If [data-bc-toggle] attribute is not defined on element with [aria-controls] attribute.
        if (!event.target.hasAttribute("data-bc-toggle")) {
            this.isActive
                ? this.hide()
                : this.show();
        }

        // If element have defined [data-bc-accordion] value and is active
        if (this.accordionId !== null && this.isActive) {
            this.toggleAccordion();
        }

        // -------------------------< Put additional codes here >-------------------------
    }

    /**
     * Collapse show handler.
     */
    show() {
        super.show();

        this.isActive = true;
        this.toggle();

        // -------------------------< Put additional codes here >-------------------------
    }

    /**
     * Collapse hide handler.
     */
    hide() {
        super.hide();

        this.isActive = false;
        this.toggle()

        // -------------------------< Put additional codes here >-------------------------
    }
    
    /**
     * Collapse toggle handler.
     * 
     * Note: 
     * Value between component element [aria-hidden] and component controls
     * [aria-expanded] must be reversed from each other. This means when
     * [aria-hidden] is "true", [aria-expanded] must be "false".
     */
    toggle() {
        super.toggle();

        // Toggle element [aria-hidden] values.
        this.element.setAttribute("aria-hidden", !this.isActive);
        
        // Toggle contols [aria-expanded] values.
        for (let control of this.controls) {
            control.setAttribute("aria-expanded", this.isActive);
        }

        // Enable/Disable tabs on element based on active state.
        this.isActive
            ? tabs.enable(this)
            : tabs.disable(this);
        
        // -------------------------< Put additional codes here >-------------------------
    }

    /**
     * Toggle accordion.
     */
    toggleAccordion() {
        // Close other collapses with same [data-accordion] value.
        for (let instance of instances.collapse) {
            if (instance.accordionId === this.accordionId && instance.id != this.id) instance.hide();
        }

        // -------------------------< Put additional codes here >-------------------------
    }
}

export default Collapse;