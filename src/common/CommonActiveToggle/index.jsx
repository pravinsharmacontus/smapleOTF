import React, { useEffect } from 'react';

const CommonActiveToggle = (props = {}) => {
    const {
        id = "",
        name = "",
        jestId = "",
        status = false,
        onChange = () => { },
        parentId = "statusChange",
        toggleType = "style1",
    } = props;
    const [getCheck, setCheck] = React.useState(false);

    const onChangeCheck = () => {
        setCheck(!getCheck);
        const ele = {
            target: {
                name: name,
                value: !getCheck
            }
        };
        onChange(ele);
    };
    useEffect(() => {
        setCheck(status);
    }, [status]);

    return (
        <div
            id={parentId}
            data-jest-id={jestId}
            className="grp-input mb-0"
        >
            <label
                className={`${toggleType} " switch noTranision`}
                htmlFor={id}
            >
                <input
                    id={id}
                    name={name}
                    type="checkbox"
                    onChange={() => onChangeCheck()}
                    data-jest-id={"jestIdonChange"}
                    checked={getCheck}
                />
                <span className="slider round noTranision"></span>
            </label>
        </div>
    );
};

export default React.memo(CommonActiveToggle);
