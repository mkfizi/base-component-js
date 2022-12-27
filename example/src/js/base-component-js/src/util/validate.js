/**
 * --------------------------------------------------------------------------
 * Base Component JS (v0.2.3): validate.js
 * Licensed under MIT (https://github.com/mkfizi/base-component-js/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

"use strict";

import instances from "./instances.js";

const validate = {
    /**
     * Validate element as a valid component.
     * @param {element} element 
     * @returns {boolean}
     */
    component : element => {
        let isIdValid = validate.id(element);
        let isTypeValid = validate.type(element);
        let isUnique = validate.instances(element);

        if (isIdValid && isTypeValid && isUnique) return true;
        
        return false;
    },

    /**
     * Validate element [id] attributes exists and not null.
     * @param {element} element 
     * @returns {boolean}
     */
    id: element => {
        let id = element.getAttribute("id");

        if (document.querySelectorAll(`[data-bc-id=${id}]`).length > 1) return false;

        if (id === null || id === "") return false;

        return true;
    },
    
    /**
     * Validate element [data-bc] attributes not null.
     * @param {element} element 
     * @returns {boolean}
     */
    type: element => {
        let type = element.dataset.bc;

        if (type === "") return false;

        return true;
    },

    instances: element => {
        for (let instance of instances.all) {
            if (element === instance.element) return false;
        }

        return true;
    }
}

export default validate;