import React from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { IconClose, IconRightLineArrow } from '../../assets/images';
import { convertToLowerCase } from '../../helper/Validation';
import { serverConfigPageNavigateOnClick } from '../MainContent/Settings/ServerConfigPage/commonServerCongig';

const ActionAlert = (props = {}) => {
    const {
        name = "",
        btnText = "",
        fromPage = "",
        alertText = "",
        linkPath = "/",
        linkPathState = "",
        enableCloseAlert = false,
        alertColor = " alert-red ",
        handleCloseAlert = () => { },
    } = props;

    const [animatePopup, setAnimatePopup] = React.useState(false);

    const navigateToPage = () => {
        if (convertToLowerCase(fromPage) === convertToLowerCase("configPage")) {
            serverConfigPageNavigateOnClick(true);
        }
    };

    React.useEffect(() => {
        setTimeout(() => {
            setAnimatePopup(true);
        }, 800);
    }, []);

    return (
        <React.Fragment>
            <CSSTransition
                in={animatePopup}
                timeout={300}
                classNames="alert"
                unmountOnExit
            >
                <div className='alertWrapper'>
                    <div
                        className={`alert-sm ${alertColor ? alertColor : " "} ${enableCloseAlert ? "" : "removeCloseIcon"}`}
                    >

                        <p>
                            {alertText}
                        </p>

                        {btnText &&
                            <Link
                                onClick={() => (!linkPathState && fromPage) ? navigateToPage() : null}
                                to={{
                                    pathname: `${linkPath}`,
                                    state: { ...linkPathState && { pathTap: `${linkPathState}` } }
                                }}
                            >
                                <div className={"btn-details"}>
                                    <span>
                                        {btnText}
                                    </span>
                                    <i>
                                        <IconRightLineArrow />
                                    </i>
                                </div>
                            </Link>
                        }

                        {enableCloseAlert &&
                            <span
                                className="close">
                                <i
                                    data-jest-id={"jesthandleCloseAlert"}
                                    onClick={() => handleCloseAlert(name)}
                                >
                                    <IconClose />
                                </i>
                            </span>
                        }
                    </div>
                </div>
            </CSSTransition>
        </React.Fragment>
    );
};

export default React.memo(ActionAlert);
