function addLoadEvent(func) {
    const oldOnload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = () => {
            oldOnload();
            func();
        }
    }
}

function addClass(element, value) {
    if (!element.clasName) {
        element.className = value;
    } else {
        element.className = `${element.className} ${value}`;
    }
}