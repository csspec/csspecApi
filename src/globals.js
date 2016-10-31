(function () {

    // Establish the root object, `window` in the browser, or `global` on the server.
    var root = this; 

    var isNode = false;

    if (typeof module !== 'undefined' && module.exports) {
            module.exports = _;
            isNode = true;
    }
})();
