import React, { useState } from 'react';
import _get from "lodash/get";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconAlertClose, IconAlertWarning } from '../../../assets/images';
import { planDetailsPlanPrice } from '../../../helper/PaymentMonckData';

const BinGoMessage = (props = {}) => {
    const {
        location = "",
        globalStore = {},
    } = props;

    const { t } = useTranslation();
    const [alert, setAlert] = useState(true);
    const { dasBordQuickView: { quickViewData: { customerTotalUserCount = 0 } = {} } = {} } = globalStore;//store
    const { CusPage: { customerDtls: { userRoleId = 0, planTypeId = 0 } = {} } = {} } = globalStore;//store
    const countAddition = customerTotalUserCount * 100;//rech 90% user count find
    const userDetails = planDetailsPlanPrice(planTypeId);//planDetailsPlanPrice price details
    const userCount = _get(userDetails, "user", "");//
    const enableBingo = (countAddition / userCount) >= 90 || false;//find it userCount reach above 90%
    const _handleAlert = () => {
        setAlert(false);
    };//close the alert-crossicon click
    const bingoContent = (totalUser, totalPlanUser) => totalUser >= 1.0 * totalPlanUser ? totalPlanUser.toFixed(0) : totalPlanUser * 0.9;
    const defaultPathName = userRoleId >= 4 ? "/broadcasts" : "/analytics";
    return (
        <React.Fragment>
            {location === defaultPathName &&
                enableBingo &&
                planTypeId !== 0 &&//planTypeId is true it mean user not a trail user
                userRoleId === 4 &&//super admin and Admin user
                < span
                    className="Btn Activate"
                >
                    <Link to={{
                        pathname: '/payment-subscription',
                        state: { pathTap: "planDetails" }
                    }}
                    >
                        {
                            customerTotalUserCount >= userCount ? <>
                                <span>
                                    Bingo!! {userCount}+ Users
                            </span></>
                                : <> <span>
                                    Bingo!! {bingoContent(customerTotalUserCount, userCount)}+ Users
                            </span></>
                        }
                    </Link>
                    {/* total user reach purches user count limit it enable with 90% users count in content*/}
                    {customerTotalUserCount >= userCount &&
                        <>
                            {alert ?
                                <div className="activateAlert">
                                    <span className="arrow"></span>
                                    <span className="icon-alert">
                                        <IconAlertWarning />
                                    </span>
                                    <p>
                                        {t("SUBTITLE.BINGO_RED_ALERT")}
                                    </p>
                                    <i onClick={_handleAlert} className="icon-alert-close">
                                        <IconAlertClose />
                                    </i>
                                </div>
                                :
                                null
                            }
                        </>
                    }
                </span>
            }
        </React.Fragment >
    );
};
export default React.memo(BinGoMessage);
