import React from 'react';

const PasswordHindNamage = (props = {}) => {
    const { passwordPolicy } = props;
    const {
        lowerCase = false,
        upperCase = false,
        specialCase = false,
        numberCase = false,
        eightDigitCase = false,
    } = passwordPolicy;

    const char = "8 or more characters";
    const leastOneNum = "At Least 1 number";
    const leastUpperChar = "At Least 1 Uppercase letter";
    const leastLowerChar = "At Least 1 Lowercase letter";
    const leastSpecialChar = "At Least 1 special character";
    return (
        <React.Fragment>
            <div className='password-hint'>

                {/* eight char */}
                {eightDigitCase ?
                    <>
                        <span style={{ color: "green" }}>
                            $ {char}
                        </span>
                    </>
                    :
                    <>
                        <span>
                            * {char}
                        </span>
                    </>
                }

                {/* number least one */}
                {numberCase ?
                    <>
                        <span style={{ color: "green" }}>
                            $ {leastOneNum}
                        </span>
                    </>
                    :
                    <>
                        <span>
                            * {leastOneNum}
                        </span>
                    </>
                }

                {/* special char */}
                {specialCase ?
                    <>
                        <span style={{ color: "green" }}>
                            $ {leastSpecialChar}
                        </span>
                    </>
                    :
                    <>
                        <span>
                            * {leastSpecialChar}
                        </span>
                    </>
                }

                {/* upperCase char */}
                {upperCase ?
                    <>
                        <span style={{ color: "green" }}>
                            $ {leastUpperChar}
                        </span>
                    </>
                    :
                    <>
                        <span>
                            * {leastUpperChar}
                        </span>
                    </>
                }

                {/* lowerCase char */}
                {lowerCase ?
                    <>
                        <span style={{ color: "green" }}>
                            $ {leastLowerChar}
                        </span>
                    </>
                    :
                    <>
                        <span>
                            * {leastLowerChar}
                        </span>
                    </>
                }

            </div>
        </React.Fragment >
    );
};
export default React.memo(PasswordHindNamage);
