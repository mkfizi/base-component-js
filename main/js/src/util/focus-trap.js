/**
* --------------------------------------------------------------------------
* Base Component JS (v0.2.3): focus-trap.js
* Licensed under MIT (https://github.com/mkfizi/base-component-js/blob/main/LICENSE)
* --------------------------------------------------------------------------
*/

"use strict";

const focusTrap = {
    // Focus trap selector.
    selector: `a:not([tabindex="-1"]), button:not([tabindex="-1"]), input:not([tabindex="-1"]), textarea:not([tabindex="-1"]), select:not([tabindex="-1"]), details:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]:not([tabindex="-1"])`,

    // Current active focus trap.
    current: null,

    /**
     * Enable focus trap on target component.
     * @param {object} component 
     */
    enable: component => {
        if(focusTrap.current !== null) focusTrap.current.hide();
        focusTrap.current = component;

        window.addEventListener("keydown", focusTrap.handler);
    
        // Set focus on "focusTrap.current" to force focus.
        setTimeout(() => { 
            focusTrap.current.element.setAttribute("tabindex", 0);
            focusTrap.current.element.focus();
        }, 50);

        // Remove focus on "ocusTrap.current" for smooth focus trap.
        setTimeout(() => { 
            focusTrap.current.element.removeAttribute("tabindex"); 
            focusTrap.current.element.blur();
        }, 100);
    },

    /**
     * Disable focus trap.
     */
    disable: () => {
        focusTrap.current = null;
        window.removeEventListener("keydown", focusTrap.handler);
    },

    /**
     * Focus trap handler.
     * @param {event} event 
     * @returns 
     */
    handler: event => {
        if (focusTrap.current == null) return;

        let focusableElements = focusTrap.current.element.querySelectorAll(focusTrap.selector);
        
        let firstElement = focusableElements[0];
        let lastElement = focusableElements[focusableElements.length - 1];
    
        if (event.type === "keydown" && event.keyCode === 9) {
            if (event.shiftKey && (document.activeElement === firstElement || document.activeElement === document.body)) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    }
}

export default focusTrap;
