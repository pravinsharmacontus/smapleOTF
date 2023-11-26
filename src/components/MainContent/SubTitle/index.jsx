import React, { useEffect, useState } from 'react';
import './IconClass.scss';
import BinGoMessage from './BinGoMessage';
import { useSelector } from 'react-redux';
import CommonImageTag from '../../../common/CommonImageTag';

const SubTitle = (props = {}) => {

  const location = document.location && document.location.pathname;//get current location path
  const [buttonHS2, setButtonHS2] = useState(false);//HS Mean HIDE and SHOW
  const [buttonHS1, setButtonHS1] = useState(false);//HS Mean HIDE and SHOW

  const {
    Csrc = "",
    // icon = "",
    title = "",
    Cname = "",
    OrgName = "",
    children, //children to passing new buttons
    actionButton1,//click
    actionButton2,//click
    customClass = "",
    Cplaceholder = "",
    subtileView = true,
    CustomerLogo = false,
  } = props || {};
  const globalStore = useSelector((state) => state || {});//store

  const { CusPage: { customerDtls: { userRoleId = 0 } = {} } = {} } = globalStore;//store

  const visible = false;//bingo msg hide for user details not allocate

  useEffect(() => {
    if (actionButton2) {
      setButtonHS2(true);
    }
    if (actionButton1) {
      setButtonHS1(true);
    }
  }, []);

  return (
    <div className={`${customClass ? customClass : " "} SubTitleContainer`}>
      <div className="containerInn">

        {/*customerPage organisation Image will display */}
        <div className="SubTitleInner">
          <div className="SubTitlewrapper">
            <div>
              <h4 className="SubTitle">
                {title}<small></small>
              </h4>
            </div>
            {CustomerLogo &&
              <div className="customerTiltle hidden-567">
                <div className="divider">/</div>
                <CommonImageTag
                  src={Csrc}
                  name={Cname}
                  className="img"
                  placeholder={Cplaceholder}
                />
                <span class="ellipsis">
                  {OrgName}{/*customerPage organisation name */}
                </span>
              </div>}
          </div>

          {/* Bingo messge showing */}
          {(userRoleId === 4 && visible) &&
            <BinGoMessage
              location={location}
              globalStore={globalStore}
            />
          }

          <div className="group-btn">
            {children}
            {subtileView && buttonHS1 ?
              <button
                type='button'
                className="b-rounded bt-outline b-md bt-red cp-btn text-md"
                onClick={props._actionButton1}
              >
                <span>
                  {actionButton1}
                </span>
              </button>
              : null}

            {subtileView && buttonHS2 ?
              <button
                className="b-rounded b-md bt-red cp-btn text-md"
                onClick={props._actionButton2}
              >
                <span>
                  {actionButton2}
                </span>
              </button>
              : null}
          </div>
        </div>
      </div>
      <div id="SubtileTabsPortal" className=''></div>
    </div>
  );
};
export default React.memo(SubTitle);
