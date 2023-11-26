export const Feature = {
    "EnableFixedHeader": true,
    "FixedSubHeader": true,
    "FixedHeaderInTables": false,
    "FixedTable": true,
    "EnableFixedTablesHeight": true,
    "CurrentTheme": {
        "Default": "Default"
    },
    "EnableSideMenu" : true
};

/**
 * @param  {boolean} value=false
 * This is for fixed header table and full table toggle functionality for all tables.
 */
export const FixedHeaderInTables = (value = false) => {
    return value ? "fixedScroll" : "fullScroll";
};

export const FixedTablesHeight = (value = false) => {
    return value ? "FixedTablesHeight" : "fullHeight";
};

export const noDataFoundClassName = (value = 0) => {
    if (!value) {
        return "no-data-found";
    } return "";
};

/**
 * @param  {boolean} value=false
 * This is for fixed header table and full table toggle functionality for all tables.
 */
export const FixedHeader = (value = true) => {
    return value ? "" : "defaltHeader";
};
