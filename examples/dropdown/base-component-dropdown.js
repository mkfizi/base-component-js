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
let dropdownInstances = [];     // All instances of dropdown component.

// Tabbable selectors.
let tabbable = `a, button, input, textarea, select, details, [tabindex], [contenteditable="true"]`;



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
        this.element.classList.add('active');
    }

    /**
     * Hide dropdown component.
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
                case "dropdown":
                    component = new Dropdown(components[i]);
                    dropdownInstances.push(component);
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