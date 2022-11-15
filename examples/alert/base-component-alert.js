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
 * Alert class
 */
class Alert extends Component {
    /**
     * Initialize alert component.
     * @param {element} element 
     */
    constructor(element) {
        super(element);
    }
    
    /**
     * Handle alert component click event.
     * @param {event} event 
     */
    handleEvent(event) {
        super.handleEvent(event);

        // If [data-toggle] attribute is not defined on element with [aria-controls] attribute.
        if (!event.target.hasAttribute("data-toggle")) this.hide();
    }

    /**
     * Hide alert component.
     */
    hide() {
        this.element.remove();

        // ------------------------- Put custom hide() codes below -------------------------
        let element = document.createElement("button");
        element.setAttribute("type", "button");
        element.innerHTML = "Reset";
        element.addEventListener("click", () => {
            location.reload();
        })
        document.body.appendChild(element);
    }
}



// ====================================================================================================
// Helper functions.
// ====================================================================================================

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