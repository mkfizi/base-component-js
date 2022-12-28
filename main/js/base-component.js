/**
 * --------------------------------------------------------------------------
 * Base Component JS (v0.2.3) base-component.js
 * Licensed under MIT (https://github.com/mkfizi/base-component-js/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

"use strict";

import Alert from "./src/alert.js";
import Collapse from "./src/collapse.js";
import Dropdown from "./src/dropdown.js";
import Modal from "./src/modal.js";
import Offcanvas from "./src/offcanvas";

import instances from "./src/util/instances.js";
import validate from "./src/util/validate.js";

const baseComponentJs = {
    /**
     * Initilize.
     */
    init: () => {
        let components = document.querySelectorAll("[data-bc]");
        for (let element of components) {
            if (validate.component(element) === false) continue;

            let type = element.dataset.bc;

            switch (type) {
                case "alert":
                    instances.all.push(new Alert(element));
                    instances.alert.push(instances.all[instances.all.length - 1]);
                    break;

                case "collapse":
                    instances.all.push(new Collapse(element));
                    instances.collapse.push(instances.all[instances.all.length - 1]);
                    break;

                case "dropdown":
                    instances.all.push(new Dropdown(element));
                    instances.dropdown.push(instances.all[instances.all.length - 1]);
                    break;

                case "modal":
                    instances.all.push(new Modal(element));
                    instances.modal.push(instances.all[instances.all.length - 1]);
                    break;

                case "offcanvas":
                    instances.all.push(new Offcanvas(element));
                    instances.modal.push(instances.all[instances.all.length - 1]);
                    break;

                default:
                    break;
            }
        }
    },

    /**
     * Get component object.
     * @param {string} id 
     * @returns {instance}
     */
    bc: id => {
        for (let instance of instances.all) {
            if (instance.id === id) return instance;
        }
    }
}

/**
 * Execute when document DOM is loaded to make sure all elements have been
 * completely rendered.
 */
document.addEventListener("DOMContentLoaded", () => {
    baseComponentJs.init();
        
    // Handle scenario when element is created after "DomContentLoaded" event
    // to register new component.
    document.body.addEventListener('DOMNodeInserted', () => {
        baseComponentJs.init();
    });
});


export default baseComponentJs;