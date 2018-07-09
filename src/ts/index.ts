(function () {
    const changeBgColor = (eleName: string, color: string): void => {
        const pEle: HTMLElement = document.querySelector(eleName);
        pEle.style.background = color;
    }
})();