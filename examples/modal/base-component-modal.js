/**
 * --------------------------------------------------------------------------
 * Base Component JS (v0.1.1) by @mkfizi (https://mkfizi.github.io/)
 * Licensed under MIT (https://github.com/mkfizi/base-component-js/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

"use strict";

// ====================================================================================================
// Global variables.
// ====================================================================================================

let componentInstances = [];    // All instances of component.
let modalInstances = [];        // All instances of modal component.

let currentFocusTrapElement = null; // Current active element for focus trap

// Tabbable selectors.
let tabbable = `a, button, input, textarea, select, details, [tabindex], [contenteditable="true"]`;

// Focusable selectors.
let focusable = 'a:not([tabindex="-1"]), button:not([tabindex="-1"]), input:not([tabindex="-1"]), textarea:not([tabindex="-1"]), select:not([tabindex="-1"]), details:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]:not([tabindex="-1"])';



// ====================================================================================================
// Component classes.
// ====================================================================================================

/****************************************************************************************************
 * Base class.
 */ 
class Component {
    id = null;              // Component id.
    element = null;         // Component's main element.
    controls = null;        // Element with [aria-controls] value referencing to component's id.
    isFocustrap = false;    // Component focus trap mode.

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

        // ------------------------- Put custom constructor() codes below -------------------------


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

        // ------------------------- Put custom handleEvent() codes below -------------------------


    }
}  

/****************************************************************************************************
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

        // Set modal as focus trap element.
        this.isFocustrap = true;

        // If modal mode is scrollable.
        if (this.element.hasAttribute("data-scrollable")) this.scrollable = (this.element.dataset.scrollable === 'true');
        
        // Set default state.
        this.element.getAttribute("aria-hidden") === "false"
            ? this.show()
            : this.hide();
        
        // ------------------------- Put custom constructor() codes below -------------------------
        

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

        // ------------------------- Put custom handleEvent() codes below -------------------------


    }

    /**
     * Show modal component.
     */
    show() {
        this.isActive = true;

        this.toggle();

        // ------------------------- Put custom show() codes below -------------------------
        this.element.classList.add('active');

        // Display modal content and uses "timeout()" for smoother animations.
        let content = this.element.querySelector(".modal-content");
        if (content != null) setTimeout(() => content.classList.add('active'), 10);
    }

    /**
     * Hide modal component.
     */
    hide() {
        this.isActive = false;

        this.toggle();

        // ------------------------- Put custom hide() codes below -------------------------
        let content = this.element.querySelector(".modal-content");
        if (content != null) content.classList.remove('active');
        
        // Hide modal content and uses "timeout()" for smoother animations.
        setTimeout(() => this.element.classList.remove('active'), 25);
    }

    /**
     * Toggle properties according to "this.isActive" value.
     */
    toggle() {
        // Toggle attribute values.
        this.element.setAttribute("aria-hidden", !this.isActive);

        // Enable/Disable tabs and focus trap on element.
        if (this.isActive) {
            // Close other active focus trap elements.
            hideOtherActiveFocusTraps(this.id);

            currentFocusTrapElement = this.element;

            enableTab(this.element);
            enableFocusTrap();

            // If modal mode is non scrollable
            if (!this.scrollable) disableBodyScroll();
        } else {
            currentFocusTrapElement = null;

            disableTab(this.element);
            disableFocusTrap();
            enableBodyScroll();
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

    // Remove [tabindex] attribute from tabbable child elements.
    let tabbableChildElements = element.querySelectorAll(tabbable);
    for (let tabbableChildElement of tabbableChildElements) {

        // Remove only on child element with parent attribute of [aria-hidden="true"].
        if (tabbableChildElement.closest(`[aria-hidden="true"]`) == null) tabbableChildElement.removeAttribute("tabindex");
    }

    // ------------------------- Put custom enableTab() codes below -------------------------


}

/**
 * Disable tab on target element.
 * @param {HTMLDom} element 
 */
const disableTab = element => {
    element.setAttribute("tabindex", -1);

    // Add [tabindex="-1"] on tabbable child elemenets.
    let tabbableChildElements = element.querySelectorAll(tabbable);
    for (let tabbableChildElement of tabbableChildElements) {
        tabbableChildElement.setAttribute("tabindex", -1);
    }

    // ------------------------- Put custom disableTab() codes below -------------------------


}

/**
 * Enable body scroll.
 */
const enableBodyScroll = () => {
    document.body.style.overflow = 'auto';

    // ------------------------- Put custom enablebodyScroll() codes below -------------------------
    

}

/**
 * Disable body scroll.
 */
const disableBodyScroll = () => {
    document.body.style.overflow = 'hidden';
    
    // ------------------------- Put custom disableBodyScroll() codes below -------------------------


}


/**
 * Enable focus trap.
 */
const enableFocusTrap = () => {
    if (currentFocusTrapElement == null) return;

    window.addEventListener("keydown", handleFocusTrap);
    
    // Set focus "currentFocusTrapElement" to force focus.
    setTimeout(() => { 
        // Check "currentFocusTrapElement" to prevent unexpected behaviour.
        if (currentFocusTrapElement == null ) return;

        currentFocusTrapElement.setAttribute("tabindex", 0);
        currentFocusTrapElement.focus();
    }, 10);

    setTimeout(() => { 
        // Check "currentFocusTrapElement" to prevent unexpected behaviour.
        if (currentFocusTrapElement == null ) return;

        currentFocusTrapElement.removeAttribute("tabindex"); 
        currentFocusTrapElement.blur();
    }, 25);

    // ------------------------- Put custom enableFocusTrap() codes below -------------------------


}

/**
 * Disable focus trap.
 */
const disableFocusTrap = () => {
    window.removeEventListener("keydown", handleFocusTrap);
    
    // ------------------------- Put custom disableFocusTrap() codes below -------------------------


}

/**
 * Hide other focus trap components.
 * @param {string} id 
 */
const hideOtherActiveFocusTraps = id => {
    for (let componentInstance of componentInstances) {

        // Hide component if component is active.
        if (componentInstance.isActive && componentInstance.id != id) componentInstance.hide();
    }

    // ------------------------- Put custom hideOtherActiveFocusTraps() codes below -------------------------


}

/**
 * Handle focus trap.
 * @returns {function}
 */
const handleFocusTrap = event => {
    if (currentFocusTrapElement == null) return;

    let focusableElements = currentFocusTrapElement.querySelectorAll(focusable);
    
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

    // ------------------------- Put custom handleFocusTrap() codes below -------------------------


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
                    componentInstances.push(component);
                    break;

                // ------------------------- Put custom component codes below -------------------------


                default:
                    break;
            }
        }
    }
}

// Execute when document DOM is loaded to make sure site contents are rendered.
document.addEventListener("DOMContentLoaded", function() {
    initializeComponents();
});