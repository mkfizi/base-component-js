/**
 * --------------------------------------------------------------------------
 * Base Component JS (v0.0.1) by @mkfizi (https://mkfizi.github.io/)
 * Licensed under MIT (https://github.com/mkfizi/base-component-js/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

"use strict";

// ====================================================================================================
// Global variables.
// ====================================================================================================

let componentInstances = [];    // All instances of component.
let modalInstances = [];        // All instances of modal component.

// Focusable tags for querySelector().
let focusable = `a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, [tabindex="0"], [contenteditable]`;



// ====================================================================================================
// Component classes.
// ====================================================================================================

/**************************************************
 * Base class.
 */ 
class Component {
    id = null;          // Component id.
    element = null;     // Component's main element.
    controls = null;    // Element with [aria-controls] value referencing to component's id.

    /**
     * Initialize component.
     * @param {element} element 
     */
    constructor(element) {
        this.element = element;
        this.id = this.element.getAttribute("id");

        // Add "click" event on component [aria-controls].
        this.controls = document.querySelectorAll(`[aria-controls="${this.id}"]`);
        for (let control of this.controls) control.addEventListener("click", this);
    }

    /**
     * Handle component click event.
     * @param {event} event 
     */
    handleEvent(event) {
        // If [data-toggle] exists, execute function according to it's value.
        if (event.target.hasAttribute("data-toggle")) {
            event.target.getAttribute("data-toggle") === "show"
                ? this.show()
                : this.hide();
        }
    }
}  

/**************************************************
 * Modal class.
 */
class Modal extends Component {
    isActive = false;   // State of modal.
    scrollable = true;  // Modal scrollable mode.

    /**
     * Initialize modal component.
     * @param {element} element 
     */
    constructor(element) {
        super(element);

        // If modal mode is non scrollable.
        if (this.element.dataset.scrollable === "false") this.scrollable = false;

        // Set default state.
        this.element.getAttribute("aria-hidden") === "false"
            ? this.show()
            : this.hide();
        
    }

    /**
     * Handle modal component click event.
     * @param {event} event 
     */
     handleEvent(event) {
        super.handleEvent(event);

        // If [data-toggle] attribute is not defined on element with [aria-controls] attribute.
        if (!event.target.hasAttribute("data-toggle")) {
            this.isActive
                ? this.hide()
                : this.show();
        }
    }

    /**
     * Show modal component.
     */
    show() {
        this.isActive = true;

        this.toggle();

        // Hide other modals.
        for (let modalInstance of modalInstances) {
            if (modalInstance.isActive && modalInstance.id != this.id) {
                modalInstance.hide();
            }
        }

        // ------------------------- Put custom show() codes below -------------------------
        this.element.classList.add('active');
    }

    /**
     * Hide modal component.
     */
    hide() {
        this.isActive = false;

        this.toggle();

        // ------------------------- Put custom hide() codes below -------------------------
        this.element.classList.remove('active');
    }

    /**
     * Toggle properties according to "this.isActive" value.
     */
    toggle() {
        // Toggle attribute values.
        this.element.setAttribute("aria-hidden", !this.isActive);

        // Enable/Disable tabs and focus trap on element.
        if (this.isActive) {
            enableTab(this.element);
            enableFocusTrap(this.element);

            // If modal mode is non scrollable
            if (!this.scrollable) disableBodyScroll();
        } else {
            disableTab(this.element);
            disableFocusTrap(this.element);

            // If modal mode is non scrollable
            if (!this.scrollable) enableBodyScroll();
        }
        
        // ------------------------- Put custom toogle() codes below -------------------------


    }
}



// ====================================================================================================
// Helper functions.
// ====================================================================================================

/**
 * Enable tab on target element.
 * @param {HTMLDom} element 
 */
const enableTab = element => {
    element.removeAttribute("tabindex");

    let focusableChildElements = element.querySelectorAll(focusable);
    for (let focusableChildElement of focusableChildElements) {
        focusableChildElement.removeAttribute("tabindex");
    }
}

/**
 * Disable tab on target element.
 * @param {HTMLDom} element 
 */
const disableTab = element => {
    element.setAttribute("tabindex", -1);

    let focusableChildElements = element.querySelectorAll(focusable);
    for (let focusableChildElement of focusableChildElements) {
        focusableChildElement.setAttribute("tabindex", -1);
    }
}

/**
 * Enable body scroll.
 */
const enableBodyScroll = () => {
    document.body.style.overflow = 'auto';
}

/**
 * Disable body scroll.
 */
const disableBodyScroll = () => {
    document.body.style.overflow = 'hidden';
}


/**
 * Enable focus trap.
 * @param {object} element 
 */
const enableFocusTrap = element => {
    window.addEventListener("keydown", handleFocusTrap(element));
}

/**
 * Disable focus trap.
 * @param {object} element 
 */
const disableFocusTrap = element => {
    window.removeEventListener("keydown", handleFocusTrap(element));
}

/**
 * Handle focus trap.
 * @param {object} element 
 * @returns {function}
 */
const handleFocusTrap = (element) => {
    return event => {
        let focusableElements = element.querySelectorAll(focusable); 
    
        let firstElement = focusableElements[0];
        let lastElement = focusableElements[focusableElements.length - 1];

        if (event.type === "keydown" && event.keyCode === 9) {
            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    }
}

/**
 * Validate components.
 * @param {string} id 
 * @param {string} type 
 * @returns {boolean} isValid
 */ 
 const validateComponents = (id, type) => {
    let isValid = true;

    // "id" and "type" validation.
    if (id === null || id === "" || type === "") {
        if (id === null)    console.error(`Component "${type}" does not have [id] attribute.`);
        if (id === "")      console.error(`Component "${type}" element attribute [id] has null value.`);
        if (type === "")    console.error("Component [data-component] has null value.");
        isValid = false;
    }

    // Duplicate check
    componentInstances.forEach(componentInstance => {
        if (id == componentInstance.id) {
            console.error(`Component [id="${id}"] has already been defined.`);
            isValid = false;
        }
    })

    return isValid;
}

/**
 * Initialize components.
 */
const initializeComponents = () => {
    let components = document.querySelectorAll("[data-component]");

    for (let i = 0; i < components.length; i++) {
        let id = components[i].getAttribute("id");
        let type = components[i].dataset.component;

        let isValid = validateComponents(id, type);

        if (isValid) {
            let component = null;

            // Define type of components here.
            switch (type) {
                case "modal":
                    component = new Modal(components[i]);
                    modalInstances.push(component);
                    break;
                default:
                    break;
            }

            componentInstances.push(component);
        }
    }
}

// Execute when document DOM is loaded to make sure site contents are rendered.
document.addEventListener("DOMContentLoaded", function() {
    initializeComponents();
});