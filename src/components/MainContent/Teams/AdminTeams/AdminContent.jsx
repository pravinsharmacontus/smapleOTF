import React, { useEffect, useState } from "react";
import _get from "lodash/get";
import TeamsHead from "./TeamsHead";
import TeamsBody from "./TeamsBody";
import TableFooter from "./TableFooter";
import TeamsSubHead from "./TeamsSubHead";
import { StickyTable } from "react-sticky-table";
import { Feature, FixedHeaderInTables } from "../../../../const/Feature";
import TeamsCreateEditForm from "../TeamsCreateEditForm";
import { IconAdduser } from "../../../../assets/img";
import LabelTooptip from "../../../../common/LabelTooptip";
import CommonFormInput from "../../../../common/CommonFormInput";
import CommonDropDown from "../../../Common/CommonDropDown";
import { IconEditType4 } from "../../../../assets/images";
import {
  OwnerValidation,
  submitTeams,
  teamsValidation,
  translate,
} from "./TeamsValidatios";
import { userDetailsLocal } from "../../../../helper/RoleConfig";
import store from "../../../../store";
import { emptyMembers, inviteMemberListAction, inviteMemberListWithoutSearchAction } from "../../../../store/action/inviteMemberAction";
import { getCustDtls } from "../../../../store/action/customeAction";
import { organisationMemberListAction } from "../../../../store/action/organisationAction";
import { useSelector } from "react-redux";
import Ripples from 'react-ripples';
import AddMember from "./AddMember";
import { CSSTransition } from "react-transition-group";
import { cusTableSelectedDeleteItemTeams } from "../../../../common/helper";
import DeletePopup from "../../DeletePopup";
import { deleteMember } from "../../../../store/action/teamsAction";
import Loader from "../../../../common/Loader";
import { InBroadcastScreenAction } from "../../../../store/action/tempAction";

const AdminContent = (props = {}) => {
  const { memberData = 0 } = props || {};
  const globalData = useSelector((state) => state) || {};
  const {
    inviteMemberListReducer: { totalPages = 0, totalRecords = 0, inviteMember = [] },
    CusPage: { customerDtls = {} } = {}, } = globalData;

  const currentOrgList = JSON.parse(window.localStorage.getItem("currntOrgid") || {});
  const [searchData, setSearchData] = useState({
    page: 1,
    searchTerm: '',
    size: 10,
  });

  const [popupAnimate, setpopupAnimate] = useState(false);
  const { page = 1 } = searchData;
  const Rolelist = [
    {
      id: 2,
      option: "Admin",
    },
    {
      id: 3,
      option: "Cohost",
    },
  ];
  const teamDeleteManage = {
    userID: {},
    bulkDelete: false,
  };
  const [getTeams, setTeams] = useState([]);
  const [animateShow, setAnimateShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [getEditValue, setEditValue] = useState({});
  const [getTeamsShow, setTeamsShow] = useState(false);
  const [getDeletePopup, setDeletePopup] = useState(false);
  const [searchEnable, setSearchEnable] = useState(false);
  const [getCreateEditMemberPopup, setCreateEditMemberPopup] = useState(false);
  const [getEditMember, setEditMember] = useState(false);
  const hostDetails = useSelector((state) => state?.CusPage?.customerDtls);
  const [deleteItem, setDeleteItem] = useState(2); //initial Total Record count
  const [allSelect, setAllSelect] = useState(false);
  const [singleDelete, setSingleDelte] = useState([]);
  const [getuserName, setuserName] = useState("");
  const [manageDelete, setManageDelete] = useState(teamDeleteManage); //Edit member,store userDetails
  const { bulkDelete = false } = manageDelete;
  const currentOrganisation = useSelector(
    (state) => state?.currentOrganisationReducer?.currentOrganisation
  );

  const formInitial = {
    email: {
      value: "",
      errorMsg: "",
    },
    role: {
      value: "",
      errorMsg: "",
    },
  };

  const [inputs, setInputs] = useState(formInitial);
  const handleMemberEdit = (ele = {}) => {
    setCreateEditMemberPopup(true);
    setEditMember(true);
    setEditValue(ele);
  };
  const handleMemberPopupOpen = () => {
    setCreateEditMemberPopup(true);
    store.dispatch(inviteMemberListWithoutSearchAction(currentOrgList));

  };

  const handleResetForm = () => {
    setInputs(formInitial);
    setCreateEditMemberPopup(false);
  };

  const handleClose = (action = false) => {
    setTimeout(() => {
      setCreateEditMemberPopup(action);
      handleResetForm();
    }, 300);
    setTimeout(() => {
      setEditMember(false);
      setEditValue({});
    }, 500);
  };

  const errorValidate = (event) => {
    const { name = "", value = "" } = event.target || {};
    setInputs((i) => ({
      ...i,
      [name]: {
        value: value,
        errorMsg: teamsValidation(event.target),
      },
    }));
  };
  const InputerrorValidation = () => {
    setInputs((i) => ({
      ...i,
      ["email"]: {
        value: inputs.email.value,
        errorMsg: teamsValidation({
          name: "email",
          value: inputs.email.value,
        }),
      },
      ["role"]: {
        value: inputs.role.value,
        errorMsg: teamsValidation({ name: "role", value: inputs.role.value }),
      },
    }));
  };
  const handleEnterPress = (event) => {
    if (event.code === "Enter") {
      InputerrorValidation();
    }
  };

  const handleInputChange = (event) => {
    const { name = "", value = "" } = event.target || {};
    setInputs((i) => ({
      ...i,
      [name]: {
        ...i[name],
        value,
        errorMsg: i[name].errorMsg ? teamsValidation(event.target) : null,
      },
    }));
  };

  const _onSubmit = () => {
    const inputsArray = Object.keys(inputs);
    const isError = inputsArray.some((i) => {
      return teamsValidation({ name: i, value: inputs[i].value });
    });
    if (!isError) {
      const roleDetail = Rolelist.find(
        (role) => role.option === inputs.role.value
      );
      const newobj = {
        inviteUserEmail: inputs.email.value,
        inviteUserRoleId: roleDetail.id,
      };
      if (OwnerValidation(newobj.inviteUserEmail)) {
        const invitedArray = [];
        invitedArray.push(newobj);
        submitTeams(invitedArray, hostDetails, currentOrgList, searchData);
        handleClose(true);
      } else {
        setInputs((i) => ({
          ...i,
          ["email"]: {
            value: inputs.email.value,
            errorMsg: translate("ERROR.Email ID already exists"),
          },
        }));
      }
    } else {
      InputerrorValidation();
    }
  };
  const currentOrgId = window.localStorage.getItem("currntOrgid")
    ? JSON.parse(window.localStorage.getItem("currntOrgid"))
    : {};
  useEffect(() => {
    const userDetails = userDetailsLocal() || {}; //logged userDetails
    if (
      (Object.keys(currentOrganisation).length !== 0 ||
        Object.keys(currentOrgId).length !== 0) &&
      currentOrgId.organisationId !== userDetails.data.organisationId
    ) {
      store.dispatch(inviteMemberListAction(currentOrgId));
      store.dispatch({ type: "DO_LOADING_PAGE", loading: true });
      store.dispatch(organisationMemberListAction());
    } else {
      store.dispatch(inviteMemberListAction(userDetails.data));
      store.dispatch({ type: "DO_LOADING_PAGE", loading: true });
      store.dispatch(getCustDtls({ customerId: userDetails.data.userId })); //userId
      store.dispatch(organisationMemberListAction());
    }
    setSearchData({
      page: 1,
      searchTerm: '',
      size: 10,
      ...currentOrgList
    });
  }, [currentOrganisation]);

  const onChangeAdmin = (event = {}) => {
    const { target: { name = "", value = "" } = {} } = event;
    setSearchData((d) => ({
      ...d,
      [name]: value,
      page: 1
    }));
    setAllSelect(false);
  };

  const pageSizeChange = (event = {}) => {
    const { name = "", value = 10 } = _get(event, "target", {});
    setAllSelect(false);
    setSearchData({ ...searchData, page: 1, [name]: value });
  };

  const changePageactive = (pageNum = 1) => {
    setAllSelect(false);
    setSearchData({ ...searchData, page: pageNum });
  };

  const _handleDeleteAction = (state = false) => {
    if (state) {
      store.dispatch(deleteMember({singleDelete, searchData}));
      setDeletePopup(false);
      setAllSelect(false); //delete confirm unCheck Bulk delete
    } else {
      setDeletePopup(state);
    }
  };

  const bulkDeleteMemberDatareturn = (array = []) => {
    const memberListDada = cusTableSelectedDeleteItemTeams(array);
    setDeleteItem(_get(memberListDada, "length", 0));
    //inCase all CheckBox unselect on by one ,still header All check enble this condition help to avoid issue
    setAllSelect((memberListDada.length > 0));
    return memberListDada;
  };
  const handleSingleCheckboxChangeTeams = (index) => {
    const newArray = [...getTeams];
    newArray[index] = {
      ...newArray[index],
      isCheck: !_get(newArray[index], "isCheck", false),
    };
    setTeams(newArray);
    bulkDeleteMemberDatareturn(newArray);
  };
  const commonFindTeams = (value = false) => {
    setAllSelect(value);
    const newArray = [...getTeams]; //monck new array with old data
    newArray.forEach((e) => {
      e.isCheck = value;
      return e;
    });
    setTeams(newArray); //append new array
    //inCase all CheckBox unselect on by one still header All check enble this condition help to avoid
    bulkDeleteMemberDatareturn(newArray);
  };
  const allCheckData = () => {
    if (allSelect) {
      //all uncheck
      commonFindTeams(false);
    } else {
      // all check
      commonFindTeams(true);
    }
  };

  const _handleTeamMemberDelete = (ele = {}, type = "") => {
    if (type === "singleDelete") {
      setSingleDelte([ele.userId]);
      setuserName(ele.fullName);
      setDeletePopup(true);
      setManageDelete({
        ...manageDelete,
        bulkDelete: false,
      });
    } else {
      setManageDelete({
        ...manageDelete,
        bulkDelete: true,
      });
      setSingleDelte(ele); //store in state beacuse delete popUp name details Showing
      setDeletePopup(true); //delete popUp visible
    }
  };
  /**
   * userId filtered and create call c
   * Bulk delete
   **/
  const bulkDeleteCusData = () => {
    const deleteData = bulkDeleteMemberDatareturn(getTeams);
    _handleTeamMemberDelete(deleteData, "bulk");
  };

  const handleDelPopupClose = (value = false) => {
    setDeletePopup(value);
  };

  const handlePopupCall = (value = false) => {
    setpopupAnimate(value);
  };

  useEffect(() => {
    store.dispatch({ type: "DO_LOADING_LOGIN_PAGE", loading: true });
    store.dispatch(inviteMemberListAction(currentOrgId, searchData));
    store.dispatch({ type: "DO_LOADING_PAGE", loading: true });
  }, [searchData]);

  useEffect(() => {
    return (() => {
      store.dispatch(emptyMembers());
    });
  }, []);

  useEffect(() => {
    setTeams(inviteMember);
    store.dispatch({ type: "DO_LOADING_LOGIN_PAGE", loading: false });
    setTimeout(() => {
      setTeamsShow(true);
    }, 100);
  }, [inviteMember, customerDtls, currentOrganisation, searchData]);

  useEffect(() => {
    setTimeout(() => {
      setAnimateShow(true);
      setLoading(false);
    }, 1000);
    setLoading(true);
    store.dispatch(InBroadcastScreenAction(false));
  }, []);

  const escFunction = (event) => {
    if (event.key === "Escape") {
       if(getCreateEditMemberPopup && currentOrgId.invitedUserRoleId === 4){
        handlePopupCall(false);
       }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return (() => {
      document.removeEventListener("keydown", escFunction, false);
    });
  });

  useEffect(() => {
    if (inviteMember.length === 0 && searchData.page > 1) {
      setSearchData((d) => ({...d, page: searchData.page - 1 || 1}));
    }
  }, [inviteMember]);

  return (
    <React.Fragment>
      {loading && <Loader type={"fixed overlay"} />}
      <div className={`ContentWrapper`}>
        <div className="TeamWrapper df-11a df-col">
          <TeamsSubHead
            searchTerm={searchData.searchTerm}
            _onChangeData={(e) => {
              onChangeAdmin(e);
              setSearchEnable(true);
            }
            }
            onCalendarHandle={true}
            handleMemberPopupOpen={handleMemberPopupOpen}
            userRoleId={
              currentOrgId.invitedUserRoleId || currentOrgId.userRoleId
            }
          />
          <div
            className={` ${FixedHeaderInTables(Feature.FixedHeaderInTables)}`}
          >
            <div
              className={`table-common stickyHeader
                         ${memberData.length <= 6 ? "minHeight" : ""}
                        `}
            >
              <div className="table-responsive memberTable adjustHeight">
                <StickyTable
                  leftStickyColumnCount={0}
                  borderColor={"#DEDEDE"}
                  borderWidth={"0.5px"}
                  stickyHeaderCount={1}
                >
                  <TeamsHead
                    checked={allSelect}
                    allCheckData={allCheckData}
                    bulkDeleteCusData={bulkDeleteCusData}
                    deleteItem={deleteItem} //delete item count for bulk delete option
                  />
                  <TeamsBody
                    getTeamsShow={getTeamsShow}
                    animateShow={animateShow}
                    getTeams={getTeams}
                    _handleMemberEdit={handleMemberEdit}
                    _handleMemberDelete={_handleTeamMemberDelete}
                    handleSingleCheckboxChangeTeams={handleSingleCheckboxChangeTeams}
                  />
                </StickyTable>
              </div>
              {inviteMember.length >= 1 && animateShow ? (
                <TableFooter
                  initialPage={page}
                  pageSizeChange={pageSizeChange}
                  changePageactive={changePageactive}
                  bottomDetails={{ size: searchData.size, totalPages: totalPages, totalRecords: totalRecords, page: page }}
                  searchEnable={searchEnable}
                  setSearchEnable={(e) => setSearchEnable(e)}
                />) : null
              }
            </div>
          </div>
        </div>
        {(getCreateEditMemberPopup && currentOrgId.invitedUserRoleId !== 4) ? (
          <TeamsCreateEditForm
            handleClose={handleClose}
            parentClassName="teams_create_edit_form"
          >
            <div className="team_wraper">
              <div className="team_header">
                <i className="icon">
                  {getEditMember ? (
                    <IconEditType4 color="#ff0935" />
                  ) : (
                    <IconAdduser color="#ff0935" />
                  )}
                </i>
                <strong>{getEditMember ? "Edit" : "Add"} Member</strong>
                <LabelTooptip
                  minHeight={"50px"}
                  iconType="question"
                  tooltipDesc={
                    "Inviting member so they can make changes to the live stream settings if needed."
                  }
                />
              </div>
              <div className="form_wraper">
                <fieldset>
                  <div
                    className={
                      inputs.email.errorMsg ? "input error" : " input "
                    }
                  >
                    <CommonFormInput
                      readOnly={getEditMember}
                      disabled={getEditMember}
                      label={false}
                      type="text"
                      caps={false}
                      autoFocus={true}
                      value={inputs.email.value.trim()}
                      name={"email"}
                      enableLable={false}
                      palceholder={"Email Address"}
                      _onBlur={(e) => errorValidate(e)}
                      _onchange={handleInputChange}
                      error={inputs.email.errorMsg}
                      className={inputs.email.errorMsg ? " error " : " "}
                      _onKeyDown={handleEnterPress}
                    />
                  </div>
                </fieldset>
                <fieldset>
                  <div className="common-input-wrapper li-p0 ">
                    <div className="lableInfo">
                      <span className="inputLabel ">Role</span>
                    </div>
                    <div
                      className={
                        inputs.role.errorMsg ? "input error" : " input "
                      }
                    >
                      <CommonDropDown
                        optionList={Rolelist}
                        mustFill={true}
                        value={inputs.role.value}
                        name={"role"}
                        listClassname={"p-0"}
                        placeholder={"Select Role"}
                        _onBlur={(e) => errorValidate(e)}
                        _onChange={handleInputChange}
                        className={` ${inputs.role.errorMsg ? " dropdown-error " : ""
                          }`}
                        error={
                          inputs.role.errorMsg ? "Please select a role" : ""
                        }
                      />
                    </div>
                  </div>
                </fieldset>
                <div className="group-btn">
                  <Ripples
                    onClick={() => {
                      _onSubmit();
                    }}
                    className="Btn outline delete">
                    <button
                      type="button"
                      data-auto="action_button"
                      className="bg-transparent c-inherit f-inherit p-0"
                      data-jest-id={"jestProceedDelete"}
                      onClick={(e) => {
                        e.target.blur();
                      }}
                    >
                      {translate("Send Invite")}
                    </button>
                  </Ripples>
                  <Ripples onClick={() => handleClose(false)} className="Btn outline fix_click relative">
                    <button
                      type="button"
                      className="bg-transparent c-inherit f-inherit p-0"
                      data-jest-id={"jestCancelDelete"}
                      onClick={(e) => {
                        e.target.blur();
                        handleClose(false);
                      }}
                    >
                      <span>{translate("COMMON.CANCEL")}</span>
                    </button>
                  </Ripples>
                </div>
              </div>
            </div>
          </TeamsCreateEditForm>
        ) : null}

        <React.Fragment>
          <CSSTransition
            in={(getCreateEditMemberPopup && currentOrgId.invitedUserRoleId === 4)}
            timeout={300}
            classNames="show"
            unmountOnExit
            onEnter={() => handlePopupCall(true)}
            onExited={() => handlePopupCall(false)}
          >
            <div className="PopupWrapper fixed add-member">
              <CSSTransition
                in={popupAnimate}
                timeout={300}
                classNames="sideMenu"
                unmountOnExit
                onExited={() => handlePopupCall(false)}
              >
                <div className="PopupInner custom">
                  <div className="PopupInnerLeft" onClick={handleClose}></div>
                  <div className="PopupForm sm">
                    <AddMember
                      _getEditMember={getEditMember}
                      _editInputValue={getEditValue}
                      searchData={searchData}
                      onMemberPageClose={handleClose}
                    />
                  </div>
                </div>
              </CSSTransition>
            </div>
          </CSSTransition>
        </React.Fragment>
      </div>

      {getDeletePopup && (
        <>
          <DeletePopup
            pageName={"from Team"}
            maxWidth="520px"
            minWidth="0"
            _bulkContent={<span> You're about to{bulkDelete ? <> <strong>bulk delete</strong> selected members </> :
              <> delete the member <strong>"{`${getuserName}`}"</strong> from Team.</>}
            </span>}
            heading="Delete?"
            description="Are you sure? You're about to delete the current broadcast"
            hightlightText={getuserName}
            handleDeleteClose={_handleDeleteAction}
            onExited={() => handleDelPopupClose(false)}
          />
        </>
      )}
    </React.Fragment>
  );
};

export default React.memo(AdminContent);
