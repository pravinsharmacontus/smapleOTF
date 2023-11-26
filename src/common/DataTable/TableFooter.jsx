import React from "react";
import { useTranslation } from "react-i18next";
import PagesInfo from './pagination/PagesInfo';
import PageSize from "./pageSize";
import Pagination from "./pagination";

const TableFooter = (props = {}) => {
    const {
        totalRecords = 0,
        bottomDetails = {
            page: 1,
            size: 10,
            totalRecords: 0
        },
        pageSizeChange = () => { },
        changePageactive = () => { },
    } = props;
    const { t } = useTranslation();

    return (
        <React.Fragment>
            <div className="TableOpertion">
                <div className="pagesInfo">
                    {totalRecords ?
                        <PagesInfo
                            bottomDetails={bottomDetails}
                        />
                        : null}

                    {totalRecords > 10 &&
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

                {(totalRecords > 10) ?
                    <Pagination
                        items={totalRecords}
                        bottomDetails={bottomDetails}
                        pageSize={bottomDetails.size}
                        onChangePage={changePageactive}
                        initialPage={bottomDetails.page}
                    />
                    : null}
            </div>
        </React.Fragment >
    );
};
export default React.memo(TableFooter);
