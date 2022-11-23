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
let collapseInstances = [];     // All instances of collapse component.

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
        this.element.classList.add('active');
    }

    /**
     * Hide collapse component.
     */
    hide() {
        this.isActive = false;

        this.toggle()

        // ------------------------- Put custom hide() codes below -------------------------
        this.element.classList.remove('active');
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
const initializeComponent = () => {
    let components = document.querySelectorAll("[data-component]");

    for (let i = 0; i < components.length; i++) {
        let id = components[i].getAttribute("id");
        let type = components[i].dataset.component;

        let isValid = validateComponents(id, type);

        if (isValid) {
            let component = null;

            // Define type of components here.
            switch (type) {
                case "collapse":
                    component = new Collapse(components[i]);
                    collapseInstances.push(component);
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
    initializeComponent();
});