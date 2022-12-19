/**
 * --------------------------------------------------------------------------
 * Base Component JS (v0.2.0): tabs.js
 * Licensed under MIT (https://github.com/mkfizi/base-component-js/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

"use strict";

const tabs = {
    // Tabbable selector.
    selector: `a, button, input, textarea, select, details, [tabindex], [contenteditable="true"]`,

    /**
     * Enable tab on target component.
     * @param {object} component 
     */
    enable: component => {
        component.element.removeAttribute("tabindex");

        // Remove [tabindex] attribute from tabbable child elements.
        let tabbableChildElements = component.element.querySelectorAll(tabs.selector);
        for (let tabbableChildElement of tabbableChildElements) {

            // Remove only on child element with parent attribute of [aria-hidden="true"].
            if (tabbableChildElement.closest(`[aria-hidden="true"]`) === null) tabbableChildElement.removeAttribute("tabindex");
        }
    },
    /**
     * Disable tab on target componet.
     * @param {object} component 
     */
    disable: component => {
        console.co
        component.element.setAttribute("tabindex", -1);

        let tabbableChildElements = component.element.querySelectorAll(tabs.selector);

        // Add [tabindex="-1"] on tabbable child elemenets.
        for (let tabbableChildElement of tabbableChildElements) {
            tabbableChildElement.setAttribute("tabindex", -1);
        }
    }
}

export default tabs;