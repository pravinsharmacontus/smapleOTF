import React from 'react';
import "./AddCohostPopup.scss";
import Modal1 from '../../../../common/Modal/Modal1';
import AnimatePopup from '../../../../common/AnimatePopup';
import PopupHeaderFooter from '../../PopupHeaderFooter';

function AddCohostPopup(_props = {}) {
    const { _handleOnOutsideClick = () => { } } = _props;

    return (
        <Modal1>
            <AnimatePopup
                parentClass={"connect_facebook"}
                setShow={true}
                _handleOnOutsideClick={_handleOnOutsideClick}
            >
                <div className="ActionPopupInner">
                    <PopupHeaderFooter handleClose={_handleOnOutsideClick} >
                            <p>
                                You need to grant a few permission to connect to Facebook page. You'll also need grant permission to your timeline.
                            </p>
                            <p>
                                Don't worry <i>we will never post to your timeline</i> unless you connect your profile separately.
                            </p>

                    </PopupHeaderFooter>
                </div>
            </AnimatePopup >
        </Modal1 >
    );
}

export default AddCohostPopup;
