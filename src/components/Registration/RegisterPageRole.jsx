import React from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import { IconDropdownDark } from '../../assets/images';
import OutsideClickHandler from 'react-outside-click-handler';

const roleArray = [
    {
        id: 1,
        name: "App Developer"
    },
    {
        id: 2,
        name: "Technology Architect"
    },
    {
        id: 3,
        name: "Project Manager"
    },
    {
        id: 4,
        name: "Sales & Marketing"
    },
    {
        id: 5,
        name: "C-Level Executive"
    },
];

const RegisterPageRole = (props = {}) => {

    const {
        inputHandle = {},
        roleEmpty = false,
        roleDropDown = false,
        _handleRoleDropDown = () => { },
        handleInputValueChange = () => { },
        _handleOnOutsideClick2 = () => { },
    } = props;

    const { t } = useTranslation();

    const onRoleSelect = (ele = {}) => {
        const { name = "" } = ele;
        handleInputValueChange({
            target: {
                name: "role",
                value: name,
            }
        });
        _handleOnOutsideClick2();
    };

    const handleKeyDown = (e) => {
        if (e.charCode === 13) {
            _handleRoleDropDown(e);
        }
    };
    const handleKeyDownOption = (e, ele) => {
        if (e.charCode === 13) {
            onRoleSelect(ele);
        }
    };

    return (
        <React.Fragment>
            <div className={`${roleEmpty ? " error " : " "} common-input-wrapper custom_dropdown `}>
                <OutsideClickHandler
                    onOutsideClick={() => { _handleOnOutsideClick2(); }}
                >
                    <label tabIndex={0}
                        htmlFor="releaseType" className={`DropSelect outline ${roleDropDown ? "open" : ""}`}
                        onClick={(e) => _handleRoleDropDown(e)} onKeyPress={(e) => handleKeyDown(e)}
                    > {inputHandle.role ?
                        <span className="inputTxt">
                            {inputHandle.role}
                        </span>
                        :
                        <span className="defaultOption">
                            Role
                        </span>
                        }
                        <i className="dropIcon"><IconDropdownDark /></i>
                    </label>
                    {roleDropDown &&
                        <CSSTransition
                            unmountOnExit
                            in={roleDropDown}
                            timeout={500}
                            classNames="fadeInUp"
                        >
                            <div className=''>
                                <ul
                                    className={roleDropDown ? "DropOpen" : ""}
                                >
                                    {roleArray.map((ele) => {
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
                    {roleEmpty ? <span
                        className="errorMessage"
                    > {t("ERROR.ROLE_ERR_EMPTY")}
                    </span> : null}
                </OutsideClickHandler>
            </div>
        </React.Fragment >
    );
};
export default React.memo(RegisterPageRole);
