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
let alertInstances = [];        // All instances of alert component.
let collapseInstances = [];     // All instances of collapse component.
let dropdownInstances = [];     // All instances of dropdown component.
let modalInstances = [];        // All instances of modal component.
let offcanvasInstances = [];    // All instances of offcanvas component.

let currentFocusTrapElement = null; // Current active element for focus trap

// Tabbable selectors.
let tabbable = `a, button, input, textarea, select, details, [tabindex], [contenteditable="true"]`;

// Focusable selectors.
let focusable = 'a:not([tabindex="-1"]), button:not([tabindex="-1"]), input:not([tabindex="-1"]), textarea:not([tabindex="-1"]), select:not([tabindex="-1"]), details:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]:not([tabindex="-1"])';



// ====================================================================================================
// Component classes.
// ====================================================================================================

/**************************************************
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

/**************************************************
 * Alert class
 */
class Alert extends Component {
    /**
     * Initialize alert component.
     * @param {element} element 
     */
    constructor(element) {
        super(element);

        // ------------------------- Put custom constructor() codes below -------------------------


    }
    
    /**
     * Handle alert component click event.
     * @param {event} event 
     */
    handleEvent(event) {
        super.handleEvent(event);

        // If [data-toggle] attribute is not defined on element with [aria-controls] attribute.
        if (!event.target.hasAttribute("data-toggle")) this.hide();

        // ------------------------- Put custom handleEvent() codes below -------------------------


        
    }

    /**
     * Hide alert component.
     */
    hide() {
        this.element.remove();

        // ------------------------- Put custom hide() codes below -------------------------


    }
}

/**************************************************
 * Collapse class.
 */

class Collapse extends Component {
    isActive = false;   // State of collapse.
    accordion = null;   // Collapse accordion id.

    /**
     * Initialize collapse component.
     * @param {element} element 
     */
    constructor(element) {
        super(element);

        // If collapse mode is accordion.
        if (this.element.hasAttribute("data-accordion")) this.accordion = this.element.dataset.accordion; 

        // Set default state.
        this.element.getAttribute("aria-hidden") === "false"
            ? this.show()
            : this.hide();

        // ------------------------- Put custom constructor() codes below -------------------------
    
    
    }
    
    /**
     * Handle collapse component click event.
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

        // If collapse mode is accordion
        if (this.accordion != null && this.isActive) this.toggleAccordion();

        // ------------------------- Put custom handleEvent() codes below -------------------------


    }

    /**
     * Show collapse component.
     */
    show() {
        this.isActive = true;

        this.toggle();

        // ------------------------- Put custom show() codes below -------------------------
        

    }

    /**
     * Hide collapse component.
     */
    hide() {
        this.isActive = false;

        this.toggle()

        // ------------------------- Put custom hide() codes below -------------------------
        

    }
    
    /**
     * Toggle properties according to "this.isActive" value.
     */
    toggle() {
        // Toggle attribute values.
        this.element.setAttribute("aria-hidden", !this.isActive);
        for (let control of this.controls) control.setAttribute("aria-expanded", this.isActive);

        // Enable/Disable tabs on element.
        this.isActive
            ? enableTab(this.element)
            : disableTab(this.element);
        
        // ------------------------- Put custom toogle() codes below -------------------------
        

    }

    /**
     * Toggle accordion.
     */
    toggleAccordion() {
        // Close other collapses with same [data-accordion] value.
        for (let collapseInstance of collapseInstances) {
            if (collapseInstance.accordionId == this.accordionId && collapseInstance.id != this.id) collapseInstance.hide();
        }

        // ------------------------- Put custom toggleAccordion() codes below -------------------------


    }
}

/**************************************************
 * Dropdown class.
 */
class Dropdown extends Component {
    isActive = false;       // State of dropdown.
    position = "right";     // Position of dropdown.

    /**
     * Initialize dropdown component.
     * @param {element} element 
     */
    constructor(element) {
        super(element);

        // Set default component attributes.
        this.hide();
        
        // Handle click outside.
        window.addEventListener("click", this.toggleClickOutside(this));

        // Handle click outside for touch based screen.
        window.addEventListener("touchstart", this.toggleClickOutside(this));

        // ------------------------- Put custom constructor() codes below -------------------------
        

    }
    
    /**
     * Handle dropdown component click event.
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
     * Show dropdown component.
     */
    show() {
        this.isActive = true; 

        this.toggle();

        // ------------------------- Put custom show() codes below -------------------------
        

    }

    /**
     * Hide dropdown component.
     */
    hide() {
        this.isActive = false; 

        this.toggle();

        // ------------------------- Put custom hide() codes below -------------------------
        
        
    }
    
    /**
     * Toggle properties according to "this.isActive" value.
     */
    toggle() {
        // Toggle attribute values.
        this.element.setAttribute("aria-hidden", !this.isActive);
        
        // Enable/Disable tabs on element.
        this.isActive
            ? enableTab(this.element)
            : disableTab(this.element);
        
        // ------------------------- Put custom toogle() codes below -------------------------


    }

    /**
     * Toggle click outside.
     * @param {object} object 
     * @returns 
     */
    toggleClickOutside(object) {
        return event => {
            let targetComponent = event.target.closest(`#${object.id}`);
            let targetAriaControls = event.target.closest(`[aria-controls="${object.id}"]`);
    
            if (targetComponent == null && targetAriaControls == null ) object.hide();

            // ------------------------- Put custom toogleClickOutside() codes below -------------------------


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

        // Set modal as focus trap element.
        this.isFocustrap = true;

        // If modal mode is scrollable.
        if (this.element.hasAttribute("data-scrollable")) this.scrollable = this.element.dataset.scrollable;

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
        
        
    }

    /**
     * Hide modal component.
     */
    hide() {
        this.isActive = false;

        this.toggle();

        // ------------------------- Put custom hide() codes below -------------------------
        
        
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



/**************************************************
 * Offcanvas class.
 */
class Offcanvas extends Component {
    content = null;     // Offcanvas content.
    isActive = false;   // State of offcanvas.
    scrollable = true;  // Offcanvas scrollable mode.
    position = "left";  // Position of offcanvas

    /**
     * Initialize offcanvas component.
     * @param {element} element 
     */
    constructor(element) {
        super(element);

        // Set offcanvas as focus trap element.
        this.isFocustrap = true;

        // If offcanvas mode is scrollable.
        if (this.element.hasAttribute("data-scrollable")) this.scrollable = this.element.dataset.scrollable;

        // Set default component attributes.
        this.element.getAttribute("aria-hidden") === "false"
            ? this.show()
            : this.hide();

        // ------------------------- Put custom constructor() codes below -------------------------
        
        
    }

    /**
     * Handle offcanvas component click event.
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
     * Show offcanvas component.
     */
    show() {
        this.isActive = true;

        this.toggle();

        // Hide other offcanvases
        for (let offcanvasInstance of offcanvasInstances) {
            if (offcanvasInstance.isActive && offcanvasInstance.id != this.id) {
                offcanvasInstance.hide();
            }
        }

        // ------------------------- Put custom show() codes below -------------------------
        
        
    }

    /**
     * Hide offcanvas component.
     */
    hide() {
        this.isActive = false;

        this.toggle();

        // ------------------------- Put custom hide() codes below -------------------------
        
        
    }

    /**
     * Toggle properties according to "this.isActive" value.
     */
    toggle() {
        this.element.setAttribute("aria-hidden", !this.isActive);

        if (this.isActive) {
            // Close other active focus trap elements.
            hideOtherActiveFocusTraps(this.id);

            currentFocusTrapElement = this.element;

            enableTab(this.element);
            enableFocusTrap();

            // If offcanvas mode is non scrollable.
            if (!this.scrollable) disableBodyScroll();
        } else {
            currentFocusTrapElement = null;

            disableTab(this.element);
            disableFocusTrap();
            enableBodyScroll();
        }
        
        // ------------------------- Put custom toggle() codes below -------------------------


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
    window.addEventListener("keydown", handleFocusTrap);
    
    // Set focus "currentFocusTrapElement" to force focus.
    setTimeout(() => { 
        currentFocusTrapElement.setAttribute("tabindex", 0);
        currentFocusTrapElement.focus();
    }, 50);

    setTimeout(() => { 
        currentFocusTrapElement.removeAttribute("tabindex"); 
        currentFocusTrapElement.blur();
    }, 150);

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
                case "alert":
                    component = new Alert(components[i]);
                    alertInstances.push(component);
                    break;

                case "collapse":
                    component = new Collapse(components[i]);
                    collapseInstances.push(component);
                    break;

                case "dropdown":
                    component = new Dropdown(components[i]);
                    dropdownInstances.push(component);
                    break;

                case "modal":
                    component = new Modal(components[i]);
                    modalInstances.push(component);
                    break;

                case "offcanvas":
                    component = new Offcanvas(components[i]);
                    offcanvasInstances.push(component);
                    break;

                // ------------------------- Put custom component codes below -------------------------


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