export const createElem = (tag, attrs) => {
    const element = document.createElement(tag);
    Object.assign(element, attrs);
    return element;
};