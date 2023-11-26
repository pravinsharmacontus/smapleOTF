import React from "react";
import _get from "lodash/get";

const Sort = (props = {}) => {

    const {
        sort = "",
        name = "",
        _onsort = () => { },//click
    } = props;

    const _handlSort = (event = {}, value = "") => {
        _onsort({
            target: {
                name: _get(event, "target.dataset.name", ""),
                value: value === 'desc' ? 'asc' : 'desc'
            }
        });
    };

    return (
        <React.Fragment>
            <i title={`${sort === "" ? "Sort" : ""} ${sort === "asc" ? "Sort" : ""}
            ${sort === "desc" ? "Sort" : ""} `}
                className={`custom-sort ${sort === "" ? "Defalut" : ""}`}>
                <svg data-name={name} onClick={(e) => _handlSort(e, sort)}
                    xmlns="http://www.w3.org/2000/svg" width="8" height="18" viewBox="0 0 8 18">
                    <g id="Group_33376" data-name="Group 33376" transform="translate(-1053.5 -204.5)">
                        <g opacity={sort === "desc" ? "0.5" : "1"} id="Group_32241" data-name="Group 32241" transform="translate(1260.5 1228.5) rotate(180)">
                            <rect id="Rectangle_17" data-name="Rectangle 17" width="8" height="8" transform="translate(199 1016)" fill="none"
                            />
                            <path id="Path_33" data-name={name} d="M1304.53,231.558l2.986,3,2.986-3" transform="translate(-1104.516 786.942)"
                                fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="1.2" />
                        </g>
                        <g opacity={sort !== "desc" ? "0.5" : "1"} id="Group_32242" data-name="Group 32242" transform="translate(854.5 -801.5)">
                            <rect id="Rectangle_17-2" data-name="Rectangle 17" width="8" height="8" transform="translate(199 1016)" fill="none"
                            />
                            <path id="Path_33-2" data-name={name} d="M1304.53,231.558l2.986,3,2.986-3" transform="translate(-1104.516 786.942)"
                                fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
                        </g>
                    </g>
                </svg>
            </i>
        </React.Fragment>
    );

};
export default React.memo(Sort);
