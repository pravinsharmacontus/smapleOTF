import React from "react";
import Loader from "../../common/Loader";

const LoginLoader = (props = {}) => {
    const {
        loadering = false,
    } = props || {};
    const loderClass = "fixed overlay";
    return (
        <React.Fragment>
            {loadering && <Loader type={loderClass} />}
        </React.Fragment>
    );
};
export default React.memo(LoginLoader);
