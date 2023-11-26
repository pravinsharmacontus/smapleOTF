import React, {useState} from 'react';
import "./PopupHeaderFooter.scss";

function PopupHeaderFooter(props = {}) {
    const [setConnectedStatus] = useState(false);
    const { handleClose = () => {
        setConnectedStatus(true);
     },   children = '' } = props;
    return (
        <div className="team_wraper">
            <div className="team_header">
                Facebook Permission
            </div>
            <form>
                {children}
                <div className="group-btn">
                    <button
                        type="button"
                        data-auto="action_button"
                        className="Btn connect_facebook_btn"
                        data-jest-id={"jestProceed"}
                        onClick={() => handleClose(false)}
                    >
                        Connect Facebook
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PopupHeaderFooter;
