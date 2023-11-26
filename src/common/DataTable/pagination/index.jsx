import React, { useEffect, useReducer, useState } from 'react';
import PaginationControl from "./PaginationControl";

const getPager = (totalItems, currentPage, pageSize) => {
    // default to first page
    currentPage = currentPage || 1;
    // default page size is 10
    pageSize = pageSize || 10;
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);
    let startPage, endPage;
    if (totalPages <= 2) {
        // less than 2 total pages so show all
        startPage = 1;
        endPage = totalPages;
    } else {
        // more than 2 total pages so calculate start and end pages
        if (currentPage <= 2) {
            startPage = 1;
            endPage = 3;
        } else if (currentPage + 1 >= totalPages) {
            startPage = totalPages - 2;
            endPage = totalPages;
        } else {
            startPage = currentPage - 1;
            endPage = currentPage + 1;
        }
    }
    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    // create an array of pages to ng-repeat in the pager control
    const pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
};

const Pagination = (props = {}) => {
    const {
        onChangePage,
        initialPage = 1,//Initial Page
        bottomDetails = {},
        searchEnable,
        setSearchEnable
    } = props || {};
    const { size: pageSize = 10, totalRecords = 0 } = bottomDetails;
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [pager, setpager] = useState({});
    /**
     *  @param  {number} {totalItems} - pass Total Number of Pagination
     *  @param  {number} {currentPage} - currentPage number
     *  @param  {number} {pageSize} - currentPage pageSize
     */

    /**
    * @param  {number} {val} - corrent page number
    */
    const setPage = (page) => {
        let pagers = pager;
        if (page < 1 || page > pagers.totalPages) {
            return;
        }
        //items is number of page
        //page is current page
        //pageSize is show page size
        pagers = getPager(totalRecords, page, pageSize);
        setpager(pagers);
    };

    /**
     * @param  {number} val;
     * user selected pagination value
     */
    const buttonPress = (val) => {
        onChangePage(val);
        setPage(val);
        return document?.querySelector(".sticky-table")?.scrollTo(0, 0);
    };

    useEffect(() => {
        setPage(initialPage);
        forceUpdate();
    }, [totalRecords, initialPage, pageSize]);// total item,page size,initial page any can change will call and reRender

    useEffect(() => {
        if (searchEnable && Object.keys(pager)?.length > 0) {
            console.log(searchEnable, "searchEnablesearchEnable")
            setpager({
                ...pager, currentPage: 1
           });
           setSearchEnable(false);
         }
    }, [searchEnable]);
    return (
        <React.Fragment>
            <PaginationControl
                pager={pager}
                buttonPress={buttonPress}
                bottomDetails={bottomDetails}
            />
        </React.Fragment>
    );
};
export default React.memo(Pagination);
