import store from "../store";
import _get from "lodash/get";
import History from "../common/History";
import { encodeGetParams } from "./Encypt";
import { Put } from "../common/httpRestServices";
import { convertToLowerCase } from "./Validation";
import { apiUrl, envPath, payMent } from "./ApiUrl";
import { dataFetch } from "../store/action/customeAction";
import { CardNumberElement } from "@stripe/react-stripe-js";
import { paymentInitCallService } from "../services/stripePaymentServices";
import { IconInfoSm, IconRupee, IconToolTipArrow } from "../assets/images";

export const defaultTrailPlan = {
    id: 0,
    isPayment: 0,
    planid: 1,
    planPriceId: "",
    isYearAmount: 950,
    isMonthAmount: 299,
    isINDYearAmount: 720954,
    isINDMonthAmount: 25000,
    packUserCount: 0,
    planName: "Trial",
    isPeriodType: "month",

    indLiveMonth: "price_1LScmDSEUeaLaGhhR1h6YAZa",//live
    usLiveMonth: "price_1LScmDSEUeaLaGhhiUKgfUau",//live
    indLiveYear: "",
    usLiveYear: "",

    testINRMonth: "price_1LSfhZSEUeaLaGhhNRUnoyir",
    testUSMonth: "price_1LSfhZSEUeaLaGhhUXZFVRKu",
    testINRYear: "",
    testUSYear: "",
};

export const trailCostDetails = [
    {
        id: 0,
        isPayment: 0,
        planid: 1,
        planPriceId: "",
        isYearAmount: 950,
        isMonthAmount: 299,
        isINDYearAmount: 720954,
        isINDMonthAmount: 25000,
        packUserCount: 0,
        planName: "Trial",
        isPeriodType: "month",

        indLiveMonth: "price_1LScmDSEUeaLaGhhR1h6YAZa",//live
        usLiveMonth: "price_1LScmDSEUeaLaGhhiUKgfUau",//live
        indLiveYear: "",
        usLiveYear: "",

        testINRMonth: "price_1LSfhZSEUeaLaGhhNRUnoyir",
        testUSMonth: "price_1LSfhZSEUeaLaGhhUXZFVRKu",
        testINRYear: "",
        testUSYear: "",
    },
];

export const essentialCostDetails = [
    {
        id: 14,
        planid: 4,
        isPayment: 0,
        packUserCount: 5,
        isYearAmount: 950,
        isMonthAmount: 299,
        isINDYearAmount: 720954,
        isINDMonthAmount: 25000,
        planName: "essentials",
        isPeriodType: "month",

        indLiveMonth: "price_1LScmDSEUeaLaGhhR1h6YAZa",//live
        usLiveMonth: "price_1LScmDSEUeaLaGhhiUKgfUau",//live
        indLiveYear: "",
        usLiveYear: "",

        testINRMonth: "price_1LSfhZSEUeaLaGhhNRUnoyir",
        testUSMonth: "price_1LSfhZSEUeaLaGhhUXZFVRKu",
        testINRYear: "",
        testUSYear: "",
    },
    {
        id: 0,
        planid: 4,
        isPayment: 0,
        packUserCount: 5,
        isYearAmount: 950,
        isMonthAmount: 299,
        isINDYearAmount: 720954,
        isINDMonthAmount: 25000,
        planName: "essentials",
        isPeriodType: "month",

        indLiveMonth: "price_1LScmDSEUeaLaGhhR1h6YAZa",//live
        usLiveMonth: "price_1LScmDSEUeaLaGhhiUKgfUau",//live
        indLiveYear: "",
        usLiveYear: "",

        testINRMonth: "price_1LSfhZSEUeaLaGhhNRUnoyir",
        testUSMonth: "price_1LSfhZSEUeaLaGhhUXZFVRKu",
        testINRYear: "",
        testUSYear: "",
    },
    {
        id: 28,
        planid: 4,
        isPayment: 0,
        packUserCount: 10,
        isMonthAmount: 699,
        isYearAmount: 1910,

        isINDYearAmount: 865295,
        isINDMonthAmount: 50000,
        isPeriodType: "month",
        planName: "essentials",

        indLiveMonth: "price_1LScnoSEUeaLaGhhw4ruXZ8b",//live
        usLiveMonth: "price_1LScnoSEUeaLaGhh7LvdqxDg",//live
        usLiveYear: "",
        indLiveYear: "",

        testINRMonth: "price_1LSfiASEUeaLaGhhAG3GbdGY",
        testUSMonth: "price_1LSfiASEUeaLaGhhpLFLaxEQ",
        testUSYear: "",
        testINRYear: "",
    },
    {
        id: 42,
        planid: 4,
        isPayment: 0,
        packUserCount: 20,

        isMonthAmount: 999,
        isYearAmount: 3830,
        isINDYearAmount: 1153977,
        isINDMonthAmount: 75000,

        isPeriodType: "month",
        planName: "essentials",

        indLiveYear: "",
        usLiveMonth: "price_1LSdUYSEUeaLaGhhCwvRKlSZ",
        indLiveMonth: "price_1LSdUYSEUeaLaGhhVz1IG0pG",//live
        usLiveYear: "",//live

        testINRMonth: "price_1LSfigSEUeaLaGhhvbpMJ4g6",
        testUSMonth: "price_1LSfigSEUeaLaGhhK47BFecz",
        testINRYear: "",
        testUSYear: "",
    },
    {
        id: 56,
        planid: 4,
        isPayment: 0,
        packUserCount: 30,

        isYearAmount: 5750,
        isMonthAmount: 1499,
        isINDYearAmount: 1442660,
        isINDMonthAmount: 99000,

        planName: "essentials",
        isPeriodType: "month",

        indLiveYear: "",
        usLiveMonth: "price_1LSdVqSEUeaLaGhhPxHuwuGM",
        indLiveMonth: "price_1LSdVpSEUeaLaGhh0kTa4dTt",//live
        usLiveYear: "",//live

        testINRMonth: "price_1LSfjTSEUeaLaGhhIlcLrLXY",
        testUSMonth: "price_1LSfjTSEUeaLaGhhTc6f1u3n",
        testINRYear: "",
        testUSYear: "",
    },
    {
        id: 70,
        planid: 4,
        isPayment: 0,
        packUserCount: 50,
        planName: "essentials",

        isPeriodType: "month",
        isMonthAmount: 999,
        isYearAmount: 9590,
        isINDYearAmount: 2020024,
        isINDMonthAmount: 74763,

        indLiveYear: "",
        usLiveYear: "",
        indLiveMonth: "price_1KO0pfSEUeaLaGhhLV2Tqjd1",//live//live//live//live//live
        usLiveMonth: "price_1KO0ppSEUeaLaGhhq6P9g40u",//live//live//live//live//live

        testINRMonth: "price_1KNuuPSEUeaLaGhhGiqKZzAW",
        testUSMonth: "price_1KNuufSEUeaLaGhh5Lq6NyG6",
        testINRYear: "",
        testUSYear: "",
    },
    {
        id: 84,
        planid: 4,
        isPayment: 0,
        packUserCount: 100,

        isYearAmount: 36470,
        isMonthAmount: 3799,
        isINDYearAmount: 2741730,
        isINDMonthAmount: 285600,
        planName: "essentials",
        isPeriodType: "month",

        indLiveYear: "",
        usLiveMonth: "",
        indLiveMonth: "price_1K3ezdSEUeaLaGhhxKAl4SIR",//live//live//live//live//live
        usLiveYear: "price_1K3b1fSEUeaLaGhhfZqDEe9X",//live//live//live//live//live

        testINRMonth: "price_1KBdpgSEUeaLaGhhSN54uFHh",
        testUSMonth: "price_1KBdqXSEUeaLaGhh6A7J6l0l",
        testINRYear: "",
        testUSYear: "",
    },
    {
        id: 98,
        planid: 4,
        isPayment: 0,
        packUserCount: 100,

        isPeriodType: "month",
        isMonthAmount: 4799,
        isYearAmount: 46070,
        isINDYearAmount: 3463436,
        isINDMonthAmount: 360777,
        planName: "essentials",

        indLiveYear: "price_1K4JdSSEUeaLaGhh8CC13Gug",
        indLiveMonth: "price_1K3f06SEUeaLaGhhem4JJb5h",
        usLiveMonth: "price_1K3axBSEUeaLaGhh2Zjkb7xq",
        usLiveYear: "price_1K3b2BSEUeaLaGhhiFvjGxe6",

        testINRMonth: "price_1KBdpgSEUeaLaGhhSN54uFHh",
        testUSMonth: "price_1KBdqXSEUeaLaGhh6A7J6l0l",
        testINRYear: "",
        testUSYear: "",
    },
];

export const growthCostDetails = [
    {
        id: 14,
        planid: 5,
        isPayment: 0,
        packUserCount: 5,
        isYearAmount: 1910,
        isMonthAmount: 699,
        isINDYearAmount: 1442660,
        isINDMonthAmount: 50000,

        planName: "growth",
        isPeriodType: "month",

        indLiveMonth: "price_1LSdWdSEUeaLaGhhIzEMGial",//live//live//live//live//live
        usLiveMonth: "price_1LSdWdSEUeaLaGhhQwEnBSWT",//live//live//live//live//live
        usLiveYear: "",
        indLiveYear: "",

        testINRMonth: "price_1LSfnASEUeaLaGhhE9ugf9P6",
        testUSMonth: "price_1LSfnASEUeaLaGhhgxufDQSH",
        testINRYear: "",
        testUSYear: "",
    },
    {
        id: 0,
        planid: 5,
        isPayment: 0,
        packUserCount: 5,
        isYearAmount: 1910,
        isMonthAmount: 699,
        isINDYearAmount: 1442660,
        isINDMonthAmount: 50000,

        planName: "growth",
        isPeriodType: "month",

        indLiveMonth: "price_1LSdWdSEUeaLaGhhIzEMGial",//live//live//live//live//live
        usLiveMonth: "price_1LSdWdSEUeaLaGhhQwEnBSWT",//live//live//live//live//live
        usLiveYear: "",
        indLiveYear: "",

        testINRMonth: "price_1LSfnASEUeaLaGhhE9ugf9P6",
        testUSMonth: "price_1LSfnASEUeaLaGhhgxufDQSH",
        testINRYear: "",
        testUSYear: "",
    },
    {
        id: 28,
        planid: 5,
        isPayment: 0,
        packUserCount: 10,

        isMonthAmount: 999,
        isYearAmount: 3830,
        isINDYearAmount: 1659171,
        isINDMonthAmount: 75000,
        isPeriodType: "month",
        planName: "growth",

        indLiveMonth: "price_1LSdXQSEUeaLaGhhQqGiZAmf",//live//live//live//live
        usLiveMonth: "price_1LSdXRSEUeaLaGhhpNTIbUqt",//live//live//live//live
        indLiveYear: "",
        usLiveYear: "",

        testINRMonth: "price_1LSfnsSEUeaLaGhhKAUVrku5",
        testUSMonth: "price_1LSfnsSEUeaLaGhhKLoKDeaa",
        testINRYear: "",
        testUSYear: "",
    },
    {
        id: 42,
        planid: 5,
        isPayment: 0,
        packUserCount: 20,

        isMonthAmount: 1499,
        isYearAmount: 7670,
        isINDYearAmount: 2092195,
        isINDMonthAmount: 99000,
        isPeriodType: "month",
        planName: "growth",

        indLiveMonth: "price_1LSdYPSEUeaLaGhh8DkeFZAU",//live//live//live//live
        usLiveMonth: "price_1LSdYQSEUeaLaGhhJBYMtTYM",//live//live//live//live
        indLiveYear: "",
        usLiveYear: "",

        testINRMonth: "price_1LSfogSEUeaLaGhhDvIjYxQ1",
        testUSMonth: "price_1LSfogSEUeaLaGhhwotEZDKY",
        testINRYear: "",
        testUSYear: "",
    },
    {
        id: 56,
        planid: 5,
        isPayment: 0,
        packUserCount: 30,

        isMonthAmount: 1999,
        isYearAmount: 11510,
        isINDYearAmount: 2525218,
        isINDMonthAmount: 150000,
        planName: "growth",
        isPeriodType: "month",

        indLiveMonth: "price_1LSdZNSEUeaLaGhhImR1PiDa",//live
        usLiveMonth: "price_1LSdZNSEUeaLaGhhgqPoPFn7",//live
        usLiveYear: "",
        indLiveYear: "",

        testINRMonth: "price_1LSfpmSEUeaLaGhhRPBrsCgu",
        testUSMonth: "price_1LSfpnSEUeaLaGhhb5KWmn1y",
        testINRYear: "",
        testUSYear: "",
    },
    {
        id: 70,
        planid: 5,
        isPayment: 0,
        packUserCount: 50,
        planName: "growth",

        isMonthAmount: 1999,
        isYearAmount: 19190,
        isINDYearAmount: 3391266,
        isINDMonthAmount: 149580,
        isPeriodType: "month",

        indLiveYear: "",
        usLiveYear: "",
        indLiveMonth: "price_1KO0oaSEUeaLaGhhGv2MR9rA",//live//live//live//live
        usLiveMonth: "price_1KO0oWSEUeaLaGhhN5HpPTvC",//live//live//live//live

        testINRMonth: "price_1KNv5SSEUeaLaGhht3HF6yvx",
        testUSMonth: "price_1KNv6LSEUeaLaGhhKglJxY89",
        testINRYear: "",
        testUSYear: "",
    },
    {
        id: 84,
        planid: 5,
        isPayment: 0,
        packUserCount: 100,
        planName: "growth",
        isMonthAmount: 6199,
        isYearAmount: 59510,
        isINDYearAmount: 4473824,
        isINDMonthAmount: 466026,
        isPeriodType: "month",

        indLiveYear: "",
        usLiveMonth: "",
        usLiveYear: "price_1K3cBySEUeaLaGhhwheRpCOr",//live//live//live//live
        indLiveMonth: "price_1K4mEJSEUeaLaGhhr3jSwQnh",//live//live//live//live

        testINRMonth: "price_1KBdpgSEUeaLaGhhSN54uFHh",
        testUSMonth: "price_1KBdqXSEUeaLaGhh6A7J6l0l",
        testINRYear: "",
        testUSYear: "",
    },
    {
        id: 98,
        planid: 5,
        isPayment: 0,
        packUserCount: 100,

        isMonthAmount: 7699,
        isYearAmount: 73910,
        isINDYearAmount: 5556383,
        isINDMonthAmount: 578793,
        isPeriodType: "month",
        planName: "growth",

        indLiveMonth: "price_1K4mErSEUeaLaGhhUMb2ryaQ",
        indLiveYear: "price_1K4JdSSEUeaLaGhh8CC13Gug",
        usLiveMonth: "price_1K3b8nSEUeaLaGhhN1TfixeB",
        usLiveYear: "price_1K3cCZSEUeaLaGhhnaNFSGHa",

        testINRMonth: "price_1KBdpgSEUeaLaGhhSN54uFHh",
        testUSMonth: "price_1KBdqXSEUeaLaGhh6A7J6l0l",
        testINRYear: "",
        testUSYear: "",
    },
];

export const premiumCostDetails = [
    {
        id: 14,
        planid: 6,
        isPayment: 0,
        packUserCount: 5,
        isMonthAmount: 999,
        isYearAmount: 9590,
        isINDYearAmount: 2164365,
        isINDMonthAmount: 75000,

        planName: "premium",
        isPeriodType: "month",

        indLiveYear: "",
        usLiveYear: "",
        indLiveMonth: "price_1LSda4SEUeaLaGhhwbwOkfrF",//live//live//live
        usLiveMonth: "price_1LSda3SEUeaLaGhhhRVPHcnh",//live//live//live

        testINRMonth: "price_1LSfqPSEUeaLaGhhgpA3EoVf",
        testUSMonth: "price_1LSfqPSEUeaLaGhh2OTWDlIs",
        testINRYear: "",
        testUSYear: "",
    },
    {
        id: 0,
        planid: 6,
        isPayment: 0,
        packUserCount: 5,
        isMonthAmount: 999,
        isYearAmount: 9590,
        isINDYearAmount: 2164365,
        isINDMonthAmount: 75000,

        planName: "premium",
        isPeriodType: "month",

        indLiveYear: "",
        usLiveYear: "",
        indLiveMonth: "price_1LSda4SEUeaLaGhhwbwOkfrF",//live
        usLiveMonth: "price_1LSda3SEUeaLaGhhhRVPHcnh",//live

        testINRMonth: "price_1LSfqPSEUeaLaGhhgpA3EoVf",
        testUSMonth: "price_1LSfqPSEUeaLaGhh2OTWDlIs",
        testINRYear: "",
        testUSYear: "",
    },
    {
        id: 28,
        planid: 6,
        isPayment: 0,
        packUserCount: 10,

        isMonthAmount: 1999,
        isYearAmount: 12470,
        isINDYearAmount: 2453048,
        isINDMonthAmount: 150000,
        isPeriodType: "month",
        planName: "premium",

        indLiveMonth: "price_1LSdanSEUeaLaGhhbjRGYjSB",//liev
        usLiveMonth: "price_1LSdanSEUeaLaGhhFwzDZWlA",//live
        usLiveYear: "",
        indLiveYear: "",

        testINRMonth: "price_1LSfr2SEUeaLaGhhBn54SMr7",
        testUSMonth: "price_1LSfr2SEUeaLaGhhZgIQD1OG",
        testINRYear: "",
        testUSYear: "",
    },
    {
        id: 42,
        planid: 6,
        isPayment: 0,
        packUserCount: 20,

        isMonthAmount: 2499,
        isYearAmount: 18230,
        isINDYearAmount: 3030413,
        isINDMonthAmount: 175000,
        isPeriodType: "month",
        planName: "premium",

        indLiveYear: "",
        usLiveYear: "",
        usLiveMonth: "price_1LSdbXSEUeaLaGhhAihbdT9U",//live//live
        indLiveMonth: "price_1LSdbXSEUeaLaGhhn4TaM8AD",//live//live

        testINRMonth: "price_1LSfrfSEUeaLaGhhttCBe6bv",
        testUSMonth: "price_1LSfrfSEUeaLaGhhpzJny75J",
        testINRYear: "",
        testUSYear: "",
    },
    {
        id: 56,
        planid: 6,
        isPayment: 0,
        packUserCount: 30,

        isMonthAmount: 2999,
        isYearAmount: 23990,
        isINDYearAmount: 3607777,
        isINDMonthAmount: 199999,
        planName: "premium",
        isPeriodType: "month",

        indLiveYear: "",
        usLiveYear: "",
        indLiveMonth: "price_1LSdcDSEUeaLaGhhoJSnPuLf",//live
        usLiveMonth: "price_1LSdcDSEUeaLaGhhGOy316Xf",//live

        testINRMonth: "price_1LSfsOSEUeaLaGhhPwX72ady",
        testUSMonth: "price_1LSfsOSEUeaLaGhhDm6ptuv7",
        testINRYear: "",
        testUSYear: "",
    },
    {
        id: 70,
        planid: 6,
        isPayment: 0,
        packUserCount: 50,

        isMonthAmount: 3699,
        isYearAmount: 35510,
        isINDYearAmount: 4762507,
        isINDMonthAmount: 276302,
        isPeriodType: "month",
        planName: "premium",

        indLiveYear: "",
        usLiveYear: "",
        usLiveMonth: "price_1KNxl4SEUeaLaGhhv90vOKMk",//live
        indLiveMonth: "price_1KO14OSEUeaLaGhhdylfEofv",//live

        testINRMonth: "price_1KNvJpSEUeaLaGhhjozn7qOO",
        testUSMonth: "price_1KNvK5SEUeaLaGhhnN8Mm2ab",
        testINRYear: "",
        testUSYear: "",
    },
    {
        id: 84,
        planid: 6,
        isPayment: 0,
        packUserCount: 100,
        isMonthAmount: 8599,
        isYearAmount: 82550,
        isINDYearAmount: 6205919,
        isINDMonthAmount: 646453,
        isPeriodType: "month",
        planName: "premium",

        indLiveMonth: "price_1K4mLbSEUeaLaGhhJ8DGpfYu",
        indLiveYear: "price_1K4JdSSEUeaLaGhh8CC13Gug",
        usLiveMonth: "price_1K3cIYSEUeaLaGhhBoYJqVeQ",
        usLiveYear: "price_1K3cMWSEUeaLaGhhigmVHsMP",

        testINRMonth: "price_1KBdpgSEUeaLaGhhSN54uFHh",
        testUSMonth: "price_1KBdqXSEUeaLaGhh6A7J6l0l",
        testINRYear: "",
        testUSYear: "",
    },
    {
        id: 98,
        planid: 6,
        isPayment: 0,
        packUserCount: 100,

        isMonthAmount: 10599,
        isYearAmount: 101750,
        isINDYearAmount: 7649330,
        isINDMonthAmount: 796808,
        isPeriodType: "month",
        planName: "premium",

        indLiveMonth: "price_1K4mM1SEUeaLaGhh5QkJnut7",
        indLiveYear: "price_1K4JdSSEUeaLaGhh8CC13Gug",
        usLiveMonth: "price_1K3cJ0SEUeaLaGhhNISzXGBz",
        usLiveYear: "price_1K3cMtSEUeaLaGhhKu7mBh5W",

        testINRMonth: "price_1KBdpgSEUeaLaGhhSN54uFHh",
        testUSMonth: "price_1KBdqXSEUeaLaGhh6A7J6l0l",
        testINRYear: "",
        testUSYear: "",
    },
];

/**
 * planTypeId Id based planName define
 * using bingo message component
 */
export const planDetailsPlanPrice = (data = 0) => {
    switch (data) {
        case 1:
            return {
                user: 999,
            };
        case 2:
            return {
                user: 1999,
            };
        case 3:
            return {
                user: 2999,
            };
        default:
            return {
            };
    }
};

/**
 * @param  {object} data={}
 * pass which plan has been choosed
 * this is non indain plan
 */
export const usplanNameFindUrl = (data = {}) => {
    const usplanName = [
        { amt: 999, value: "price_1JybkhSEUeaLaGhhJEUJeZI7" },
        { amt: 1999, value: "price_1JyblPSEUeaLaGhhu4mtCLFl" },
        { amt: 2999, value: "price_1JybmfSEUeaLaGhhUSjUwZPb" },
    ];
    const findRecord = usplanName.find((ele) => ele.amt === data.planAmount);
    return findRecord.value;
};

/**
 * @param  {object} data={}
 * pass which plan has been choosed
 * this is indain plan,user is indian collect charge for INR
 */
export const indiaPlanNameFindUrl = (data = {}) => {
    const indiaPlanName = [
        { amt: 999, value: "price_1JybkJSEUeaLaGhhkfuBeYIB" },
        { amt: 1999, value: "price_1JyblySEUeaLaGhhHnoAW3DB" },
        { amt: 2999, value: "price_1JybmOSEUeaLaGhhuFfv9LOe" },
    ];
    const findRecord = indiaPlanName.find((ele) => ele.amt === data.planAmount);
    return findRecord.value;
};

/**
 * @param  {object} data={}
 * pass which plan has been choosed
 * this is non indain plan
 */
export const usLiveplanNameFindUrl = (data = {}) => {
    const usLive = [
        { amt: 999, value: "price_1JybaZSEUeaLaGhh9duZJBCt" },
        { amt: 1999, value: "price_1Jybc3SEUeaLaGhhzpvM6Gq9" },
        { amt: 2999, value: "price_1Jybd8SEUeaLaGhhWc3lZV2l" },
    ];
    const findRecord = usLive.find((ele) => ele.amt === data.planAmount);
    return findRecord.value;
};

/**
 *  @param  {object} data={}
 * pass which plan has been choosed
 * this is indain plan,user is indian collect charge for INR
 */
export const indiaLivePlanNameFindUrl = (data = {}) => {
    const indiaLive = [
        { amt: 999, value: "price_1JybbJSEUeaLaGhhgbnjirzO" },
        { amt: 1999, value: "price_1JybcbSEUeaLaGhhLAw3EQQs" },
        { amt: 2999, value: "price_1JybdeSEUeaLaGhhrQW31x2q" },
    ];
    const findRecord = indiaLive.find((ele) => ele.amt === data.planAmount);
    return findRecord.value;
};

//for tax add purpose
export const getIndianLocationOrNotFind = (loginDetails = {}) => {
    const localLocation = sessionStorage.getItem("country_code");
    //find location
    let locationBase;
    if (localLocation !== "undefined" && localLocation !== null) {
        locationBase = localLocation;
    } else {
        locationBase = loginDetails.countryCodeShort;
    }
    if (locationBase !== "IN") {//non-india
        return "non-inr";
    } else {//india
        return "inr";
    }
};

/**
 * @param  {object} loginDetails={}//* login user Deatisl for find user is INDIA or NOT
 * @param  {object} state={}//* find user which product choosed
 * pass which plan has been choosed
 * this is indain plan,user is indian collect charge for INR
 */
export const planIDFind = (loginDetails = {}, planDetail = {}) => {
    const {
        currentTap = "", chossedObj: { testUSMonth = "", testUSYear = "",
            testINRYear = "", testINRMonth = "",
            usLiveMonth = "", usLiveYear = "", indLiveMonth = "", indLiveYear = ""
        } = {}
    } = planDetail;
    const localLocation = sessionStorage.getItem("country_code");
    //find location
    let locationBaseCondition;
    if (localLocation !== "undefined" && localLocation !== null) {
        locationBaseCondition = localLocation;
    } else {
        locationBaseCondition = loginDetails.countryCodeShort;
    }

    if (locationBaseCondition !== "IN") {//us id
        if (currentTap === "month") {
            return envPath === "prod" ? usLiveMonth : testUSMonth;
        } else {
            return envPath === "prod" ? usLiveYear : testUSYear;
        }
    } else {//india
        //currently india is not working
        if (currentTap === "month") {
            return envPath === "prod" ? indLiveMonth : testINRMonth;
        } else {
            return envPath === "prod" ? indLiveYear : testINRYear;
        }
    }
};

/**
 * planTypeId Id based price and user update
 * using priceRange Bar
 */
export const planTypeID = (data = 0) => {
    switch (data) {
        case 4:
            return 33;
        case 5:
            return 66;
        case 6:
            return 99;
        default:
            return 0;
    }
};

export const initialStartValue = () => {
    return 999;//or condition starting value
};

//userRoleId Billing History
export const PaymentStatusOption = [
    { id: 0, name: "status", value: "", planName: "All" },
    { id: 1, name: "status", value: "true", planName: "Success" },
    { id: 2, name: "status", value: "false", planName: "Failed" },
];

//userRoleId Billing History
export const DefaultersStatusOption = [
    { id: 0, name: "status", value: "", planName: "All" },
    { id: 1, name: "status", value: "true", planName: "Activate" },
    { id: 2, name: "status", value: "false", planName: "Deactivate" },
];

//payment and defaulter page palan name mock
export const paymentPageplanType = (key = 0, planArray = []) => {
    const planNameFind = planArray.find(ele => ele.id === key);
    return _get(planNameFind, "planName", "");
};

//payment and defaulter page palan name mock
export const paymentPageplanAmount = (key = 0, planArray = []) => {
    const planNameFind = planArray.find(ele => ele.id === key);
    return _get(planNameFind, "planAmount", "");
};

/**
 * @param  {object} data={}
 * price Based PlanId finded
 * Trail-->0
 * 1000-->1
 * 2000-->2
 * 3000-->3
 * 5000-->4
 */
export const pricePlanIdFind = (data = {}, Type = "Id") => {
    const storeData = store.getState();
    const { CusPage: { planType = [] } = {} } = storeData;
    const findPlanId = planType.find((ele) => convertToLowerCase(ele.planAmount) === convertToLowerCase(data.planAmount));
    if (Type === "Name") {
        return findPlanId.planName;
    }
    return Type === "Amount" ? findPlanId.planAmount : findPlanId.id;
};

export const paymentProcess = async (
    stripe = {}, elements = {}, conInfo = {}, globalStore = {}, planDetail = {}) => {

    const { currentTap = "",
        chossedObj: { packUserCount = "", planid = "", planName = "",
            isMonthAmount = "", isYearAmount = "" } = {} } = planDetail;
    const { CusPage = {}, stripePage = {} } = globalStore;//store
    const { stripeInPutForm = null } = stripePage;//store
    const { customerDtls = {} } = CusPage;//store
    store.dispatch({ type: "DO_LOADING_PAYMENT_INITIAL_LOADER", stripeLoad: true });//lodering on / off
    const localLocationFind = sessionStorage.getItem("country_code");
    let locationBaseCondition;

    if (localLocationFind && localLocationFind !== "undefined" && localLocationFind !== null) {
        locationBaseCondition = localLocationFind;
    } else {
        locationBaseCondition = _get(customerDtls, "countryCodeShort", "");
    }

    let name = "", phone = "", email = "", line1 = "";
    if (stripeInPutForm.fullName !== "") {
        name = stripeInPutForm.fullName;
        email = stripeInPutForm.emailId;
        phone = stripeInPutForm.phoneNumber;
        line1 = stripeInPutForm.businessAddress;
    } else {
        name = conInfo.fullName;
        phone = conInfo.phoneNumber;
        line1 = conInfo.businessAddress;
        email = conInfo.email ? conInfo.email : customerDtls.emailId;
    }

    const payload = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement),
        billing_details: {
            address: {
                line1: line1,
                country: locationBaseCondition,
            },
            name: name,
            email: email,
            phone: phone,
        }
    });
    const planData = {
        customerId: customerDtls.emailId,
        organisation: customerDtls.organisationId,
        paymentMethodId: payload?.paymentMethod?.id,
        planId: planIDFind(customerDtls, planDetail),
        planTypeId: planid,
        planTypeName: planName,
        planDuration: currentTap,
        totalUsers: packUserCount,
        planTypeAmount: currentTap === "month" ? isMonthAmount : isYearAmount,
    };
    if ("error" in payload) {
        return {};
    } else {
        return paymentInitCallService(planData);//payMent process
    }
};

export const payMentFailCall = () => {//if Payment is fail off loader off and Rediect to fail page
    History.push({ pathname: "/payment-fail", state: { data: {} } });
    store.dispatch({ type: "DO_LOADING_PAYMENT_INITIAL_LOADER", stripeLoad: false });//lodering on / off
};

export const callsupscriptionPageData = (userDeatils = {}) => {
    const { data: { userRoleId = 0 } = {} } = userDeatils;
    const getPlanType = store.getState();
    const { CusPage: { planType = [] } } = getPlanType || {};
    if ((userRoleId <= 4) && _get(planType, "length", 0) === 0) {
        store.dispatch(dataFetch());//call subscription data
        store.dispatch({ type: "CUS_PAGE_PLAN_TYPE_API_LOADER", planApiHitLoader: true });
    }
};

export const convertNumToCurrency = (value = "") => {
    const amt = "" + value;
    let lastThree = amt.substring(amt.length - 3);
    const otherNumbers = amt.substring(0, amt.length - 3);
    if (otherNumbers !== '')
        lastThree = ',' + lastThree;
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;//NOSONAR not used in secure contexts
};

export const userLocationFind = () => {
    const storeData = store.getState();
    const { CusPage: { customerDtls = {} } = {}, } = storeData || {};//store
    const getLocationFromSession = sessionStorage.getItem("country_code");//sesstion store
    let userLocation;

    if (getLocationFromSession && getLocationFromSession !== "undefined" && getLocationFromSession !== null) {
        userLocation = getLocationFromSession;
    } else {
        userLocation = _get(customerDtls, "countryCodeShort", "");
    }
    return userLocation;
};

export const findMonthOrYear = (activeTab = "") => {
    return activeTab === "month"
};

const handlePriceStrike = (price = "") => {
    return price;
};

export const priceAmtDisplay = (activeTab = "", obj = {}) => {
    const userLocation = userLocationFind();
    const locationBasedAmtDisplay = convertToLowerCase(userLocation) === convertToLowerCase("in") ? true : false;
    const findDuration = findMonthOrYear(activeTab);
    const { isMonthAmount = 0, packUserCount = 0, isINDMonthAmount } = obj;
    const amt = locationBasedAmtDisplay ? <>
        <div className="rupee"><IconRupee style={{ fill: "transparent" }} /></div>
        <div className="currency">
            <div className="relative">
                {convertNumToCurrency(isINDMonthAmount)}
                <div className="plan_old_price_container">
                    <div class="plan_old_price " style={{ marginRight: "12px" }}>
                        <IconRupee strokeWidth={2} style={{ fill: "transparent" }} />
                        {convertNumToCurrency(handlePriceStrike(isINDMonthAmount))}
                    </div>
                </div>
            </div>
            <div className="gst_tag relative"><span>{"+"} GST </span>
                <i className="relative"><IconInfoSm />
                    <div className="tool_tip">18% Applicable <IconToolTipArrow />
                    </div>
                </i>
            </div>
        </div>
    </> :

        <div className="currency">
            <div className="relative">
                {"$" + convertNumToCurrency(isMonthAmount)}
                <div className="plan_old_price_container">
                    <div class="plan_old_price p-0">
                        {"$" + convertNumToCurrency(handlePriceStrike(isMonthAmount))}
                    </div>
                </div>
            </div>
        </div>
        ;
    return (
        <>
            {(packUserCount === 100 || packUserCount === 50 || activeTab === "year") ?
                <>
                    <strong className="plan_price sm">
                        Custom Pricing
                    </strong>
                </> :
                <>
                    {findDuration &&
                        <>
                            <strong class="plan_price">{amt}</strong>
                            <span class="plan_duration">/Per month</span>
                        </>
                    }
                </>}

        </>
    );
};

export const getPaymentSessionId = async (passPaymentData = {}) => {
    const queryString = encodeGetParams(passPaymentData);
    store.dispatch({ type: "PAYMENT_PROCESS_LOADER", paymentProcessLoader: true });
    try {
        const response = await Put(`${apiUrl}${payMent.getsessionId}${queryString}`, {}, true);
        store.dispatch({ type: "PAYMENT_PROCESS_LOADER", paymentProcessLoader: false });
        const { data: { status = 0, data: { sessionID = "" } = {} } = {} } = response;
        if (status === 200) {
            return sessionID;
        }
        return "";
    } catch (error) {
        store.dispatch({ type: "PAYMENT_PROCESS_LOADER", paymentProcessLoader: false });
        return "";
    }
};

export const fixedPriceMaxValue = {
    INR : 10000000,
    USD : 10000000
};
