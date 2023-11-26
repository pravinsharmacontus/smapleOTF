let maxWidth = 0;
let scrolWidth = 0;
export const isOverFlowActiveFinder = (
  id = "tableSortWraper2",
  enabled = true
) => {
  let returnVal = "";
  const element = document && document.querySelector(`#${id}`);
  if (enabled && element) {
    if (maxWidth === 0) {
      if (element.offsetWidth < element.scrollWidth) {
        setTimeout(() => {
          element.classList.add("filterStyle2");
          element.classList.remove("filterStyle3");
        }, 100);
        maxWidth = element.offsetWidth + 1;
        scrolWidth = element.scrollWidth;
      } else {
        element.classList.remove("filterStyle2");
      }
      returnVal = element.offsetWidth <= element.scrollWidth;
    } else if (scrolWidth < element.offsetWidth) {
      maxWidth = 0;
      element.classList.remove("filterStyle2");
      returnVal = false;
    } else {
      element.classList.add("filterStyle2");
      element.classList.remove("filterStyle3");
      returnVal = true;
    }
    return returnVal;
  } else {
    maxWidth = 0;
    setTimeout(() => {
      element && element.classList.remove("filterStyle2");
      element && element.classList.add("filterStyle3");
    }, 100);
  }
};
