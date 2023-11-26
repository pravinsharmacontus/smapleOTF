import React from 'react';
import Ripples from 'react-ripples';
import Modal1 from '../../../../common/Modal/Modal1';
import AnimatePopup from '../../../../common/AnimatePopup';
import { IconCustomizeLogo } from '../../../../assets/img';

const TrailUserLogoUpdata = (props = {}) => {
  const {_handleOnOutsideClick = () => {}} = props;
  return (
    <Modal1>
      <AnimatePopup
        parentClass={"common_action_popup"}
        setShow={true}
        _handleOnOutsideClick={_handleOnOutsideClick}
      >
        <div>
          <div className="ActionPopupInner ">
            <div className="Action_popup_header">
              <IconCustomizeLogo/>
              <h4>Customize Your Logo</h4>
            </div>
            <p style={{ maxWidth: "392px" }}>
            If you prefer to remove this logo or replace it with your own branding, then talk to support team.
              <span className="heightlight_blue"> support@onthefly.stream</span>
            </p>
            <div className="group-btn">
              <Ripples className="li">
                <button
                  type="button"
                  className="btn-cancel sm red"
                  onClick={_handleOnOutsideClick}
                >
                  OK
                </button>
              </Ripples>
            </div>
          </div>
        </div>
      </AnimatePopup>
    </Modal1>
  );
};
export default TrailUserLogoUpdata;
