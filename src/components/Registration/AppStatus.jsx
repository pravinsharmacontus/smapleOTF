import React from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import { IconDropdownDark } from '../../assets/images';
import OutsideClickHandler from 'react-outside-click-handler';

const dataArray = [
    {
        id: 1,
        name: "App Under Development"
    },
    {
        id: 2,
        name: "App Launched & Live"
    }
];

const AppStatus = (props = {}) => {
    const {
        inputHandle = {},
        roleEmpty = false,
        openDropDown = false,
        _handleDropDown = () => { },
        handleInputValueChange = () => { },
        _handleOnOutsideClick2 = () => { },
    } = props;

    const { t } = useTranslation();

    const onSelect = (ele = {}) => {
        const { name = "" } = ele;
        handleInputValueChange({
            target: {
                name: "appStatus",
                value: name,
            }
        });
        _handleOnOutsideClick2();
    };

    const handleKeyDown = (e) => {
        if (e.charCode === 13) {
            _handleDropDown(e);
        }
    };
    const handleKeyDownOption = (e, ele) => {
        if (e.charCode === 13) {
            onSelect(ele);
        }
    };

    return (
        <React.Fragment>
            <div className={`${roleEmpty ? " error " : " "} common-input-wrapper custom_dropdown `}>
                <OutsideClickHandler
                    onOutsideClick={() => { _handleOnOutsideClick2(); }}
                >
                    <label tabIndex={0}
                        for="AppStatus" className={`DropSelect outline ${openDropDown ? "open" : ""}`}
                        onClick={(e) => _handleDropDown(e)} onKeyPress={(e) => handleKeyDown(e)}
                    > {inputHandle.appStatus ?
                        <span className="inputTxt">
                            {inputHandle.appStatus}
                        </span>
                        :
                        <span className="defaultOption">
                            App Status
                        </span>
                        }
                        <i className="dropIcon"><IconDropdownDark /></i>
                    </label>
                    {openDropDown &&
                        <CSSTransition
                            unmountOnExit
                            in={openDropDown}
                            timeout={500}
                            classNames="fadeInUp"
                        >
                            <div className=''>
                                <ul
                                    className={openDropDown ? "DropOpen" : ""}
                                >
                                    {dataArray.map((ele) => {
                                        return (
                                            <React.Fragment
                                                key={ele.id}
                                            >
                                                <li tabIndex={0}
                                                    onClick={() => onSelect(ele)}
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
export default React.memo(AppStatus);
