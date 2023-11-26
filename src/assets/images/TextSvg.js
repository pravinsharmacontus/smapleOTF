import React from 'react';

const TextSvg = (Props) => {
    return (<>
        <text dominant-baseline="central"  fill={Props.fill} viewBox="0 0 100 100"
            font-size="10pt" text-anchor="middle" x="50" y="50">{Props.text}</text>
    </>
    )
}

export default  TextSvg;
