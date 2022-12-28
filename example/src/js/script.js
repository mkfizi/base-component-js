"use strict";

// Set footer date.
const script = () => {
    const footer = document.getElementById("footerCurrentYear");
    footer.innerHTML = new Date().getFullYear();
};

/**
 * Execute when document DOM is loaded to make sure all elements have been
 * completely rendered.
 */
document.addEventListener("DOMContentLoaded", () => {
    script();
});

export default script;