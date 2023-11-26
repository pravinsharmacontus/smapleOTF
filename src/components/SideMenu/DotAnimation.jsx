import React, { Fragment } from 'react';

const DotAnimation = () => {
    return (
        <Fragment>
            <div className="DotAnimation">
                <div className="dotIntication greenBg whatsapp">
                    {[1, 2, 3].map((i) => {
                        return (
                            <span
                                key={i}
                                className="ripple greenBg"
                            ></span>
                        );
                    })}
                </div>
            </div>
        </Fragment>
    );
};

export default React.memo(DotAnimation);
