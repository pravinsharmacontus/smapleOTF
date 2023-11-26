import React from "react";
import './EnableYoutube.scss';
import ActivateYoutube from "./ActivateYoutube";
import ActionCommonPopup from "../../ActionCommonPopup";
import Modal2 from "../../../../common/Modal/Modal2";

function ActivateYoutubePopup(props = {}) {
    const { _handleClose = () => { } } = props;
    return (
        < React.Fragment >
            <Modal2>
                <ActionCommonPopup
                    enableActionButton={false}
                    parentClass="md"
                    enableCancelButton={false}
                    minWidth={"693px"}
                    enableScreenHeight={true}
                    handleClose={_handleClose}
                >
                    <ActivateYoutube hideHeader={true} _handleClose={_handleClose} />
                </ActionCommonPopup>
            </Modal2>
        </React.Fragment >
    );
}
export default ActivateYoutubePopup;
