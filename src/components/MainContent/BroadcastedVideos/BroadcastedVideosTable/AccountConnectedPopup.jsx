import React from "react";
import AccountConnected from "./AccountConnected";
import Modal2 from "../../../../common/Modal/Modal2";
import ActionCommonPopup from "../../ActionCommonPopup";

function AccountConnectedPopup(_props = {}) {
    const { _handleClose = () => { } } = _props;
    return (
        < React.Fragment >
            <Modal2>
                <ActionCommonPopup
                    enableActionButton={false}
                    parentClass="md account_connected"
                    enableCancelButton={false}
                    minWidth={"300px"}
                    enableScreenHeight={true}
                    handleClose={_handleClose}
                >
                    <AccountConnected
                        _hideHeader={true}
                        _handleClose={_handleClose}
                    />
                </ActionCommonPopup>
            </Modal2>
        </React.Fragment >
    );
}
export default AccountConnectedPopup;
