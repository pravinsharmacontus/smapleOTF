import _get from "lodash/get";

export function tableWidthController(parentClass = "") {
  setTimeout(() => {
    const parentID = document.getElementById(parentClass);
    if (window.matchMedia("(min-width: 1199.5px)").matches) {
      const tableElement = document.querySelector(".sticky-table-table");
      if (tableElement) {
        const parentTableWidth = tableElement.parentNode.offsetWidth;
        const differntValues = tableElement.scrollWidth - parentTableWidth;
        if (differntValues > 0) {
          let OrgFinalWidth, emailFinalWidth;
          const organisation = document.querySelector(".OrgName");
          const Email = document.querySelector(".Email");
          const orgWidth = _get(organisation, "offsetWidth", 200);
          const emailWidth = _get(Email, "offsetWidth", 200);
          OrgFinalWidth = orgWidth - 50;
          emailFinalWidth = emailWidth - 50;
          if (OrgFinalWidth < 200) {
            OrgFinalWidth = 200;
          }
          if (emailFinalWidth < 200) {
            emailFinalWidth = 200;
          }
          function writeStyle() {
            const style = document.createElement("style");
            style.setAttribute("id", parentClass);
            style.innerHTML = `
                  .table-common .${parentClass}  .OrgName {
                      max-width:calc(${OrgFinalWidth}px)!important;
                      width:calc(${OrgFinalWidth}px)!important;
                      min-width:100px!important;
                  }
                  .table-common .${parentClass} .Email {
                      max-width:calc(${emailFinalWidth}px)!important;
                      width:calc(${emailFinalWidth}px)!important;
                      min-width:100px!important;
                  }
                  `;
            document.head.appendChild(style);
          }
          if (parentID !== null) {
            parentID.remove();
            writeStyle();
          }
          else {
            writeStyle();
          }
        }
      }
    }
  }, 100);
}
