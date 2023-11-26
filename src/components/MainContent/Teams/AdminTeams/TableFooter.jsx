import React from "react";
import { PageSize, Pagination } from "../../../../common";
import PagesInfo from "../../../../common/DataTable/pagination/PagesInfo";
import { pagesizeData } from "../../../../common/MonckDataJson";

const TableFooter = (props = {}) => {
    const {
        initialPage = 1,
        bottomDetails = {},
        pageSizeChange = () => { },//click
        changePageactive = () => { },//click
        searchEnable,
        setSearchEnable = () => { }
    } = props || {};
    const viewFooter = bottomDetails.totalPages >= 2 ? true : false;
    return (
        < React.Fragment >
            <div className="TableOpertion">
                <div className="pagesInfo">

                    <PagesInfo
                        bottomDetails={bottomDetails}
                    />
                    {bottomDetails.totalRecords > 10 &&
                        < React.Fragment >
                            <div className="pageSize">
                                <React.Fragment>
                                    <span>Results per page</span>
                                    <PageSize
                                        OriginalData={pagesizeData}
                                        onChange={pageSizeChange}
                                        pageSize={bottomDetails.size}
                                    />
                                </React.Fragment>
                            </div>

                        </React.Fragment>
                    }
                </div>

                {viewFooter &&
                    <Pagination
                        initialPage={initialPage}
                        onChangePage={changePageactive}
                        bottomDetails={bottomDetails}
                        searchEnable={searchEnable}
                        setSearchEnable={setSearchEnable}
                    />}
            </div>
        </React.Fragment >
    );
};
export default React.memo(TableFooter);
