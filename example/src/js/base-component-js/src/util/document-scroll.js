/**
* --------------------------------------------------------------------------
* Base Component JS (v0.2.3): document-scroll.js
* Licensed under MIT (https://github.com/mkfizi/base-component-js/blob/main/LICENSE)
* --------------------------------------------------------------------------
*/

"use strict";

const documentScroll = {
    enable: () => {
        document.documentElement.style.overflow = 'auto';
    },
    disable: () => {
        document.documentElement.style.overflow = 'hidden';
    }
}

export default documentScroll;