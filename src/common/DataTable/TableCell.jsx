import React from 'react';
import { Cell } from 'react-sticky-table';

function TableCell(props = {}) {
    const { width = "", className = "", children = "" } = props;
    return (
        <Cell style={{ width: width }} className={className}>{children}</Cell>
    );
}

export default TableCell;
