import React from "react";
import { useTranslation } from "react-i18next";
import { PageSize } from "..";
import PagesInfo from "../DataTable/pagination/PagesInfo";

const TableFooterCommon = (props = {}) => {
    const {
        totalPages = 0,
        pageSize = 10,
        bottomDetails = {},
        pageSizeChange = () => { },//click
    } = props;
    const { t } = useTranslation();

    const viewFooter = totalPages >= 2 ? true : false;

    return (
        <React.Fragment>
            <div className="pagesInfo">
                {viewFooter &&
                    <PagesInfo
                        bottomDetails={bottomDetails}
                    />
                }

                <div className="pageSize">
                    <span>
                        {t("COMMON.RESULTS_PER_PAGE")}
                    </span>
                    <PageSize
                        pageSize={pageSize}
                        onChange={pageSizeChange}
                        OriginalData={() => { }}
                    />
                </div>
            </div>
        </React.Fragment>
    );
};
export default React.memo(TableFooterCommon);
