import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Ripples from 'react-ripples';
import { Link, useLocation, useHistory } from 'react-router-dom';
import AddCohostPopup from '../MainContent/Broadcast/AddCohostPopup';

function MenuListComponent(_props = {}) {
    const { _location = "", _handlePaneltoggle = () => { }, _pathName = '/', _MenuName = '', _icon = '' } = _props;
    const history = useHistory();
    const [getPopupState, setPopupState] = useState(false);
    const awsStageReducer = useSelector((state) => state?.awsStageReducer); //store
    const { sessionName = "" } = awsStageReducer;
    const appStatus = useSelector((state) => state?.appStatus); //store
    const location = useLocation() || {}; //get user path
    const { pathname = "" } = location;

    const hideSwitch = () => {
        if (appStatus !== "") {
            return true;
        }
    };

    const handlePopup = (state = false) => {
        setPopupState(state);
    };

    const handleLeavePage = () => {
        setPopupState(false);
        setTimeout(() => {
            history.push(_pathName);
        }, 2000);
    };

    return (
        <>
            <li tabIndex={1} className={_location === _pathName ? "active" : ""}>
                <Ripples color={'#ffffff20'} className="li">
                    {hideSwitch() && sessionName && pathname === "/broadcast" ? <button onClick={() => handlePopup(true)} className='a' type='button'>
                        <i className="icon">
                            {_icon}
                        </i>
                        <span className="nav-text">{_MenuName}</span>
                    </button>
                        :
                        <Link onClick={_handlePaneltoggle} to={_pathName}>
                            <i className="icon">
                                {_icon}
                            </i>
                            <span className="nav-text">{_MenuName}</span>
                        </Link>
                    }
                </Ripples>
            </li>
            {getPopupState ? (
                <AddCohostPopup
                    _handleOnOutsideClick={() => handlePopup(false)}
                    type="callExit"
                    handleExit={handleLeavePage}
                />
            ) : null}
        </>
    );
}

export default React.memo(MenuListComponent);
