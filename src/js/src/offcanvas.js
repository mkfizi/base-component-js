/**
 * --------------------------------------------------------------------------
 * Base Component JS (v0.2.0): offcanvas.js
 * Licensed under MIT (https://github.com/mkfizi/base-component-js/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

"use strict";

import Component from "./component.js";

import instances from "./util/instances.js";
import documentScroll from "./util/document-scroll";
import focusTrap from "./util/focus-trap.js";
import tabs from "./util/tabs.js";

class Offcanvas extends Component {
    /**
     * Offcanvas constructor.
     * @param {element} element 
     */
    constructor(element) {
        super(element);

        // Element default focus trap mode.
        this.isFocustrap = true;

        // Element default scrollable state.
        this.isScrollable = true;

        // If offcanvas mode is scrollable.
        if (this.element.hasAttribute("data-bc-scrollable")) this.isScrollable = (this.element.dataset.scrollable === 'true');


        // Set default state.
        this.element.getAttribute("aria-hidden") === "false"
            ? this.show()
            : this.hide();

        // -------------------------< Put additional codes here >-------------------------
    }

    /**
     * Offcanvas event handler.
     * @param {object} event 
     */
    handleEvent(event) {
        super.handleEvent(event);
        
        // If [data-bc-toggle] attribute is not defined on element with [aria-controls] attribute.
        if (!event.target.hasAttribute("data-bc-toggle")) {
            this.isActive
                ? this.hide()
                : this.show();
        }

        // -------------------------< Put additional codes here >-------------------------
    }

    /**
     * Offcanvas show handler.
     */
    show() {
        super.show();

        this.isActive = true;
        this.toggle();

        // -------------------------< Put additional codes here >-------------------------
    }

    /**
     * Offcanvas hide handler.
     */
    hide() {
        super.hide();

        this.isActive = false;
        this.toggle();

        // -------------------------< Put additional codes here >-------------------------
    }

    /**
     * Offcanvas toggle handler.
     */
     toggle() {
        // Toggle attribute values.
        this.element.setAttribute("aria-hidden", !this.isActive);

        // Enable/Disable tabs and focus trap on element.
        if (this.isActive) {
            tabs.enable(this)
            focusTrap.enable(this);

            // If modal mode is non scrollable
            if (!this.isScrollable) documentScroll.disable();
        } else {
            tabs.disable(this);
            focusTrap.disable();
            documentScroll.enable();
        }
        // -------------------------< Put additional codes here >-------------------------
    }
}

export default Offcanvas;