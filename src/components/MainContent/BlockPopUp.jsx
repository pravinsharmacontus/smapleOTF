import React, { Fragment, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { IconBlock, IconGroup } from '../../assets/images';
import OutsideClickHandler from 'react-outside-click-handler';

const BlockPopUp = (props = {}) => {
    const {
        btn1 = "",
        btn2 = "",
        userName = "",
        pageHead = "",
        backDescription = "",
        frontDescription = "",
        onExited = () => { }, //function call
        handleAction = () => { }, //handle yes and cancel button
        fromPage = "",
    } = props;

    const [popup, setPopupAnimate] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setPopupAnimate(true);
        }, 100);
        return setPopupAnimate(false);
    }, []);

    return (
        <Fragment>
            <div
                className="PopupWrapper fixed xs"
            >
                <div
                    className="PopupInner ActionPopup"
                >
                    <OutsideClickHandler
                        onOutsideClick={() => { handleAction(false); }}
                    >
                        <CSSTransition
                            timeout={300}
                            unmountOnExit
                            in={popup}
                            classNames="alert"
                            onExited={() => onExited(false)}
                        >
                            <div className="ActionPopupInner">
                                <i className="delete">
                                    {
                                        fromPage === "group" ? <IconGroup /> : <IconBlock />
                                    }
                                    <strong>
                                        {pageHead}
                                    </strong>
                                </i>
                                <p className="desc">
                                    {`${frontDescription}`} <strong>{`${userName}`}</strong> {`${backDescription}`}
                                </p>

                                <div className="group-btn">
                                    <span data-auto="action_button"
                                        className="Btn outline delete"
                                        data-jest-id={"jestProceedBlock"}
                                        onClick={() => handleAction(true)}
                                    >
                                        {btn1}
                                    </span>
                                    <span
                                        className="Btn outline"
                                        data-jest-id={"jestCancelBlock"}
                                        onClick={() => handleAction(false)}
                                    >
                                        {btn2}
                                    </span>
                                </div>
                            </div>
                        </CSSTransition>
                    </OutsideClickHandler>
                </div>
            </div>
        </Fragment>
    );
};
export default React.memo(BlockPopUp);
