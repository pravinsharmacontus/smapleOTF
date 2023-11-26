import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { IconDropdownDark } from '../../assets/images';
import OutsideClickHandler from 'react-outside-click-handler';
import { useTranslation } from 'react-i18next';

const applicationTypeArray = [
    {
        id: 1,
        name: "Social/Dating"
    },
    {
        id: 2,
        name: "Telecom"
    },
    {
        id: 3,
        name: "Official"
    },
    {
        id: 4,
        name: "Educational"
    },
    {
        id: 5,
        name: "Entertainment"
    },
    {
        id: 6,
        name: "Gaming"
    },
    {
        id: 7,
        name: "eCommerce"
    },
    {
        id: 8,
        name: "Sports"
    },
    {
        id: 9,
        name: "Financial"
    },
    {
        id: 10,
        name: "Health Care"
    },
    {
        id: 11,
        name: "Transportation"
    },
    {
        id: 12,
        name: "Hotel"
    },
];

const RegisterPageApplicationType = (props = {}) => {

    const {
        inputHandle = {},
        appTypeEmpty = false,
        appTypeOpen = false,
        _handleAppType = () => { },
        handleInputValueChange = () => { },
        _handleOnOutsideClick3 = () => { },
    } = props;

    const { t } = useTranslation();

    const onRoleSelect = (ele = {}) => {
        const { name = "" } = ele;
        handleInputValueChange({
            target: {
                name: "appType",
                value: name,
            }
        });
        _handleOnOutsideClick3();
    };
    const handleKeyDown = (e) => {
        if (e.charCode === 13) {
            _handleAppType(e);
        }
    };
    const handleKeyDownOption = (e, ele) => {
        if (e.charCode === 13) {
            onRoleSelect(ele);
        }
    };

    return (
        <React.Fragment>
            <div className={`${appTypeEmpty ? " error " : " "} common-input-wrapper custom_dropdown`}>
                <OutsideClickHandler onOutsideClick={() => { _handleOnOutsideClick3(); }}>
                    <label tabIndex={0}
                        for="releaseType"
                        className={`DropSelect outline ${appTypeOpen ? "open" : ""}`}
                        onClick={(e) => _handleAppType(e)}
                        onKeyPress={(e) => handleKeyDown(e)}
                    >
                        {inputHandle.appType ?
                            <span className="inputTxt">
                                {inputHandle.appType}
                            </span>
                            :
                            <span className="defaultOption">
                                What Is Your App Category?
                            </span>
                        }
                        <i className="dropIcon"><IconDropdownDark /></i>
                    </label>
                    {appTypeOpen &&
                        <CSSTransition
                            in={appTypeOpen}
                            timeout={500}
                            classNames="fadeInUp"
                            unmountOnExit
                        >
                            <div className=''>
                                <ul className={appTypeOpen ? "DropOpen" : ""}>
                                    {applicationTypeArray.map((ele) => {
                                        return (
                                            <React.Fragment
                                                key={ele.id}
                                            >
                                                <li tabIndex={0}
                                                    onClick={() => onRoleSelect(ele)}
                                                    onKeyPress={(e) => handleKeyDownOption(e, ele)}
                                                >
                                                    {ele.name}
                                                </li>
                                            </React.Fragment>
                                        );
                                    })}
                                </ul>
                            </div>
                        </CSSTransition>
                    }
                    {appTypeEmpty ? <span
                        className="errorMessage"
                    > {t("ERROR.APPLICATION_EMPTY")}
                    </span> : null}
                </OutsideClickHandler>
            </div>
        </React.Fragment >
    );
};
export default React.memo(RegisterPageApplicationType);
