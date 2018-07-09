export default (element, styleName, styleValue) => {
    document.querySelector(element).style[styleName] = styleValue;
};
