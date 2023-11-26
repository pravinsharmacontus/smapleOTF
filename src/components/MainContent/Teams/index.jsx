import React, { useEffect } from "react";
import AdminTeams from "../Teams/AdminTeams";
import { roleIdPass, userDetailsLocal } from "../../../helper/RoleConfig";
import store from "../../../store";
import { inviteMemberListAction } from "../../../store/action/inviteMemberAction";
import { callCusDetails } from "../Setting/settingPageCommon";
import { diableDevices } from "../../../helper/AwsDeviceAccess";

const Teams = () => {
  const userRoleId = roleIdPass() || 0; //login user Role based view

  useEffect(() => {
    diableDevices();
    if (userRoleId === 4) {
      const userDetails = userDetailsLocal() || {}; //logged userDetails
      const { data: { userId = 0 } = {} } = userDetails; //logged userDetails
      callCusDetails(userId); //get userDetails
      store.dispatch(inviteMemberListAction(userDetails.data));
      store.dispatch({ type: "DO_LOADING_PAGE", loading: true });
    }
  }, []);
  return (
    <React.Fragment>
      {
        <AdminTeams />
        // <NotFound />
      }
    </React.Fragment>
  );
};
export default React.memo(Teams);
