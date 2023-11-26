import { BROADCAST_RESOLUTION } from "../helper/ApiUrl";

export const layoutPositionBasic = [
    [{ index: 4 }],
    [{ index: 4 }],
    [
        { index: 2, height: 225, width: 400, x: 15, y: 127 },
        { index: 2, height: 225, width: 400, x: 435, y: 127 },
    ],
    [
        { index: 2, height: 225, width: 400, x: 15, y: 10 },
        { index: 2, height: 225, width: 400, x: 435, y: 10 },
        { index: 2, height: 225, width: 400, x: 225, y: 250 },
    ],
    [
        { index: 2, height: 225, width: 400, x: 15, y: 10 },
        { index: 2, height: 225, width: 400, x: 435, y: 10 },
        { index: 2, height: 225, width: 400, x: 15, y: 250 },
        { index: 2, height: 225, width: 400, x: 435, y: 250 },
    ],
];

export const layoutPositionImageBasic = [
    [],
    [],
    [
        { index: 3, height: 225, width: 400, x: 15, y: 127 },
        { index: 3, height: 225, width: 400, x: 435, y: 127 },
    ],
    [
        { index: 3, height: 225, width: 400, x: 15, y: 10 },
        { index: 3, height: 225, width: 400, x: 435, y: 10 },
        { index: 3, height: 225, width: 400, x: 225, y: 250 },
    ],
    [
        { index: 3, height: 225, width: 400, x: 15, y: 10 },
        { index: 3, height: 225, width: 400, x: 435, y: 10 },
        { index: 3, height: 225, width: 400, x: 15, y: 250 },
        { index: 3, height: 225, width: 400, x: 435, y: 250 },
    ],
];

export const layoutPositionAdvance = [
    [{ index: 4 }],
    [{ index: 4 }],
    [
        { index: 2, height: 450, width: 800, x: 106, y: 315 },
        { index: 2, height: 450, width: 800, x: 1012, y: 315 },
    ],
    [
        { index: 2, height: 450, width: 800, x: 106, y: 45 },
        { index: 2, height: 450, width: 800, x: 1012, y: 45 },
        { index: 2, height: 450, width: 800, x: 560, y: 585 },
    ],
    [
        { index: 2, height: 450, width: 800, x: 106, y: 45 },
        { index: 2, height: 450, width: 800, x: 1012, y: 45 },
        { index: 2, height: 450, width: 800, x: 106, y: 585 },
        { index: 2, height: 450, width: 800, x: 1012, y: 585 },
    ],
];

export const layoutPositionImageAdvance = [
    [],
    [],
    [
        { index: 3, height: 450, width: 800, x: 106, y: 315 },
        { index: 3, height: 450, width: 800, x: 1012, y: 315 },
    ],
    [
        { index: 3, height: 450, width: 800, x: 106, y: 45 },
        { index: 3, height: 450, width: 800, x: 1012, y: 45 },
        { index: 3, height: 450, width: 800, x: 560, y: 585 },
    ],
    [
        { index: 3, height: 450, width: 800, x: 106, y: 45 },
        { index: 3, height: 450, width: 800, x: 1012, y: 45 },
        { index: 3, height: 450, width: 800, x: 106, y: 585 },
        { index: 3, height: 450, width: 800, x: 1012, y: 585 },
    ],
];

const bannerConstrains = {
    index: 1,
    x: -40,
    y: 0,
    width: 920,
    height: 517.5,
};
const bannerConstrainsHD = {
    index: 1,
    x: 0,
    y: 0,
};
export const UpdateBgContrain = (BROADCAST_RESOLUTION === "BASIC_LANDSCAPE" ? bannerConstrains : bannerConstrainsHD);

export const test8Participants = [
    { index: 2, height: 144, width: 256, x: 20, y: 12 },
    { index: 2, height: 144, width: 256, x: 296, y: 12 },
    { index: 2, height: 144, width: 256, x: 572, y: 12 },

    { index: 2, height: 144, width: 256, x: 158, y: 168 },
    { index: 2, height: 144, width: 256, x: 434, y: 168 },

    { index: 2, height: 144, width: 256, x: 20, y: 323 },
    { index: 2, height: 144, width: 256, x: 296, y: 323 },
    { index: 2, height: 144, width: 256, x: 572, y: 323 },

]

export const test9Participants = [
    { index: 2, height: 144, width: 256, x: 20, y: 12 },
    { index: 2, height: 144, width: 256, x: 296, y: 12 },
    { index: 2, height: 144, width: 256, x: 572, y: 12 },

    { index: 2, height: 144, width: 256, x: 20, y: 168 },
    { index: 2, height: 144, width: 256, x: 296, y: 168 },
    { index: 2, height: 144, width: 256, x: 572, y: 168 },

    { index: 2, height: 144, width: 256, x: 20, y: 323 },
    { index: 2, height: 144, width: 256, x: 296, y: 323 },
    { index: 2, height: 144, width: 256, x: 572, y: 323 },

];
