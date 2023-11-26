import React from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import { IconDropdownDark } from '../../assets/images';
import OutsideClickHandler from 'react-outside-click-handler';

const userCountArray = [
    {
        id: 1,
        name: "0 - 999"
    },
    {
        id: 2,
        name: "1000+"
    },
    {
        id: 3,
        name: "10K+"
    },
    {
        id: 4,
        name: "50K+"
    },
    {
        id: 5,
        name: "100K+"
    },
    {
        id: 6,
        name: "1M+"
    },
    {
        id: 7,
        name: "10M+"
    },
    {
        id: 8,
        name: "1B+"
    },
    {
        id: 9,
        name: "10B+"
    },
    {
        id: 10,
        name: "Yet to Decide"
    },
];

const RegisterPageUserCount = (props = {}) => {

    const {
        inputHandle = {},
        userCountEmpty = false,
        userCountOpen = false,
        _handleUserCount = () => { },
        handleInputValueChange = () => { },
        _handleOnOutsideClick4 = () => { },
    } = props;

    const { t } = useTranslation();

    const onRoleSelect = (ele = {}) => {
        const { name = "" } = ele;
        handleInputValueChange({
            target: {
                name: "userCount",
                value: name,
            }
        });
        _handleOnOutsideClick4();
    };

    const handleKeyDown = (e) => {
        if (e.charCode === 13) {
            _handleUserCount(e);
        }
    };
    const handleKeyDownOption = (e, ele) => {
        if (e.charCode === 13) {
            onRoleSelect(ele);
        }
    };

    return (
        <React.Fragment>
            <div className={` ${userCountEmpty ? " error " : " "} common-input-wrapper custom_dropdown`}>
                <OutsideClickHandler onOutsideClick={() => { _handleOnOutsideClick4(); }}>
                    <label tabIndex={0} for="releaseType" className={`DropSelect outline ${userCountOpen ? "open" : ""}`}
                        onClick={(e) => _handleUserCount(e)}
                        onKeyPress={(e) => handleKeyDown(e)}
                    >
                        {inputHandle.userCount ?
                            <span className="inputTxt">
                                {inputHandle.userCount}
                            </span>
                            :
                            <span className="defaultOption">
                                Estimated Users
                            </span>
                        }
                        <i
                            className="dropIcon"
                        >
                            <IconDropdownDark />
                        </i>
                    </label>
                    {userCountOpen &&
                        <CSSTransition
                            in={userCountOpen}
                            timeout={500}
                            classNames="fadeInUp"
                            unmountOnExit
                        >
                            <div className='top'>
                                <ul className={userCountOpen ? "DropOpen" : ""}>
                                    {userCountArray.map((ele) => {
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
                    {userCountEmpty ? <span
                        className="errorMessage"
                    > {t("ERROR.USER_COUNT_EMPTY")}
                    </span> : null}
                </OutsideClickHandler>
            </div>
        </React.Fragment >
    );
};
export default React.memo(RegisterPageUserCount);
