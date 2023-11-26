import React from "react";
import { Pagination } from "../../../../common";
import PagesInfo from "../../../../common/DataTable/pagination/PagesInfo";
import PageSize from "../../../../common/DataTable/pageSize";
import { useTranslation } from "react-i18next";

const BroadcastedVideosTableFooter = (props = {}) => {
    const { t } = useTranslation();
    const {
        initialPage = 1,
        totalRecords = 0,
        bottomDetails = {
            totalPages: 1,
            size: 10,
            totalRecords: 0
        },
        pageSizeChange = () => { },
        changePageactive = () => { },
        searchEnable,
        setSearchEnable = () => { }
    } = props || {};
    const viewFooter = bottomDetails.totalPages >= 2 ? true : false;

    return (
        < React.Fragment >
            <div className="TableOpertion">
                <React.Fragment>
                    <div className="TableOpertion">
                        <div className="pagesInfo">
                            {totalRecords ?
                                <PagesInfo
                                    bottomDetails={bottomDetails}
                                />
                                : null}

                            {bottomDetails.totalRecords > 10 &&
                                <div className="pageSize">
                                    <span>
                                        {t("COMMON.RESULTS_PER_PAGE")}
                                    </span>
                                    <PageSize
                                        onChange={pageSizeChange}
                                        pageSize={bottomDetails.size}
                                    />
                                </div>
                            }
                        </div>
                        {viewFooter ?
                            <Pagination
                                initialPage={initialPage}
                                onChangePage={changePageactive}
                                bottomDetails={bottomDetails}
                                searchEnable={searchEnable}
                                setSearchEnable={setSearchEnable}
                            />
                            : null}
                    </div>
                </React.Fragment >
            </div>
        </React.Fragment >
    );
};
export default React.memo(BroadcastedVideosTableFooter);
