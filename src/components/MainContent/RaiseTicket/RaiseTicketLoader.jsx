import React from 'react';
import Loader from "../../../common/Loader";

const RaiseTicketLoader = (props = {}) => {
    const {
        globalStore = {},
    } = props;
    const { loader: { isLoadingEdit = false } = {}, ticketSubmitLoader = false } = globalStore;

    return (
        <React.Fragment>
            {(isLoadingEdit || ticketSubmitLoader) && <Loader type={"fixed overlay"} />}
        </React.Fragment>
    );
};
export default React.memo(RaiseTicketLoader);
