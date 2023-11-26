import React from 'react';
import { ticketRaise } from "../../helper/ApiUrl";
import { MailIcon, Arrowright } from "../../assets/images";
import Ripples from 'react-ripples';

const RegisterSucessPopup = (props = {}) => {
    const {
        state = {},
        moveToRegPage = () => { },
        successRegisterPopUp = false
    } = props;

    const { emailId: { emailId = "" } = {} } = state;
    return (
        <React.Fragment>
            <div
                className="right-side"
                id={`${successRegisterPopUp ? "customerRegisterTagManager" : ""}`}
            >
                <div className="reg-popup">
                    <div className="reg-popup-inner">
                        <MailIcon />
                        <h4>
                            Create password link sent to mail
                        </h4>
                        <p>
                            {`Link to create your account password have been sent to `}
                            <span className='light'>
                                {emailId}
                            </span>
                        </p>
                        <p>
                            Please click on the link to create password and complete your sign up. If you don't see it, you may need to check your spam folder
                        </p>

                        <Ripples
                            type={"button"}
                            className='button'
                            onClick={moveToRegPage}
                        >
                            Sign In
                            </Ripples>
                        <p>
                            Need help?
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href={ticketRaise}
                            >
                                MirrorFly Support
                                <Arrowright />
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default React.memo(RegisterSucessPopup);
