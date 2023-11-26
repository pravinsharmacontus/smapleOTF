export const envPath = process.env.REACT_APP_ENV; //env
export const apiUrl = process.env.REACT_APP_API_URL; // base path url
export const trailUserStatus = process.env.REACT_APP_SUBCRIPTION_PLAN;
export const siteUrl = process.env.REACT_APP_SITE_URL; //site urll
export const gudshoTutorials = "https://www.gudsho.com/app/mirrorfly"; //docs page
export const docsPage = "https://www.mirrorfly.com/docs/"; //docs page
export const secretKEY = process.env.REACT_APP_SECRET_KEY; //encrpt and decrypt key
export const recaptchaKey = process.env.REACT_APP_RECAPTCHA; //recaptch key
export const recaptchaServerKey = process.env.REACT_APP_SERVER_RECAPTCHA; //recaptch Secret key
export const enableReCaptchaValidation = process.env.REACT_APP_ENABLE_CAPCHA;
export const enableServerReCaptchaValidation = process.env.REACT_APP_ENABLE_CAPCHA_SERVER_VALIDATION;
export const stripePkId = process.env.REACT_APP_STRIPE_PK_ID; //frondEnd id
export const uiKitBasePath = process.env.REACT_APP_UI_KIT_URL; //uikit basePath
export const googleTagManagerKey = process.env.REACT_APP_GTM_KEY;
export const socketHost = process.env.REACT_APP_XMPP_SOCKET_HOST; //env
export const loacteFineUrl = "https://ipapi.co/json/"; //alter location find url
export const locationFindUrl = "https://geolocation-db.com/json/"; //find loging user location
export const ssoGmailClientId = process.env.REACT_APP_SSO_GMAIL_CLIENT_ID; //sso gmail client id
export const ssoYTGmailClientId = process.env.REACT_APP_YT_GMAIL_CLIENT_ID; //youtube sso gmail client id
export const ssoYTGmailClientSecret =
  process.env.REACT_APP_YT_GMAIL_CLIENT_SECRET; //youtube sso gmail client secret
export const youtubeApiUrl = process.env.REACT_APP_YOUTUBE_API; //youtube api url
export const refreshTokenApiUrl = process.env.REACT_APP_REFRESH_TOKEN_URL; //Refresh token after access token expires
export const ytUserInfoUrl = process.env.REACT_APP_SSO_USERINFO; //Getting SSO User info
export const linkedInClientId = process.env.REACT_APP_SSO_LINKEDIN_CLIENT_ID; //sso gmail client id
export const mfLicenseKey = process.env.REACT_APP_MF_LICENSEKEY; //Getting SSO User info
export const mfBaseUrl = process.env.REACT_APP_MF_BASEURL; //Getting SSO User info
export const mfDomain = process.env.REACT_APP_MF_DOMAIN; //Getting SSO User info
export const warningTime = process.env.REACT_APP_WARNING_TIME; //call warning time
export const endTime = process.env.REACT_APP_END_TIME; //call End Time
export const userLoaction = Intl.DateTimeFormat().resolvedOptions().timeZone; //user location
export const contactForSalse = "https://www.mirrorfly.com/contact-sales.php"; //contact support team
export const ticketRaise = "https://support.mirrorfly.com/portal/en/newticket"; //raise ticket url
export const contactForSalseParams =
  "https://www.mirrorfly.com/cloud-contact-sales.php?"; //contact support team
export const UIKitUrl =
  "https://s3.ap-south-1.amazonaws.com/app.mirrorfly.com/UIkit.zip"; //uikit download
export const docusPageMove =
  "https://www.mirrorfly.com/docs/#option-1-just-build-a-sample-app";
export const SDKUrl =
  "https://s3.ap-south-1.amazonaws.com/app.mirrorfly.com/SDK_FILES.zip"; //sdkUrl
export const uiKitWeb =
  "https://s3.ap-south-1.amazonaws.com/app.mirrorfly.com/webSample-app.zip";
export const uiKitIos =
  "https://s3.ap-south-1.amazonaws.com/app.mirrorfly.com/iosSample-app.zip";
export const SampleAppUrl =
  "https://s3.ap-south-1.amazonaws.com/app.mirrorfly.com/Sample-app.zip"; //sample app downloadUrl-samp
export const fireBaseKeyGenerate =
  "https://firebase.google.com/docs/cloud-messaging/android/client";
export const uiKitAndroid =
  "https://s3.ap-south-1.amazonaws.com/app.mirrorfly.com/androidSample-app.zip";
export const iosCertificateMake =
  "https://medium.com/mobile-devops-ci-cd-ct/steps-to-create-ios-developer-and-distribution-certificates-with-and-without-a-mac-8449b973ef9d";
export const broadcastURL = process.env.REACT_APP_BROADCAST_URL;
export const broadcastEmbededURL = process.env.REACT_APP_BROADCASTE_EMBEDED_URL;
export const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
export const YOUTUBE_API_KEY = process.env.REACT_APP_YT_API_KEY;
export const AUTH_DOMAIN = "onthefly-5231f.firebaseapp.com";
export const PROJECT_ID = "onthefly-5231f";
export const STORAGE_BUCKET = "onthefly-5231f.appspot.com";
export const MESSAGING_SENDER_ID = "513042259040";
export const APP_ID = "1:513042259040:web:3ac71a427cbe3557977705";
export const MEASUREMENT_ID = "G-M7RG6T1EE2b";
export const ENABLE_HD =  (process.env.REACT_APP_ENV !== "dev" || process.env.REACT_APP_ENV !== "qa")
export const BROADCAST_RESOLUTION = process.env.REACT_APP_SD_HD
export const loginApi = {
  logIn: "api/login", //Login
  resetPass: "api/password/resetPassword", //resetPassword and create password
  forgetPass: "api/password/resetPassword", //forget assword email trigger
  logout: "api/logout",
};
export const LOGO_SIZE = process.env.REACT_APP_LOGO_SIZE;
export const REACT_APP_ALLOWANCE_MINUTES =
  process.env.REACT_APP_ALLOWANCE_MINUTES;
export const awsStageAPI = {
  createStage: "api/customer/createStage",
  createSession: "api/customer/createSession",
  getSession: "api/customer/getSession",
  createChannel: "api/customer/createChannel",
  updateSession: "api/customer/updateSession",
  updateParticipantToken: "api/customer/createParticipantToken",
};
export const accessKeyId = process.env.REACT_APP_ACCESS_KEY_ID;
export const secretAccessKey = process.env.REACT_APP_SECRETE_ACCESS_KEY;

/**customer and Teams page user list */
export const customerApi = {
  PalnUrl: "api/customer/plans", //planDetails
  getCusList: "api/customer/list?", //getUser Details
  deleteCus: "api/customer/deletemember?", //delete user
  updateCus: "api/customer/updatemember?", //userupdate
  createCus: "api/customer/create?", //new userCreate
  customerPlanChange: "api/customer/change/plan", //plan move to freemium
  getCustomerDetailUrl: "api/customer/details?", //getuser single details
  mediaDownloadUrl: "api/version/media/download/", //media download
  updateCusDomainHook: "api/customer/license/update", //update cus domain and hooks
  deleteRequestCount: "api/customer/Account/requestCount", //Delete request count
  cancelSubscriptionRequestCount: "api/customer/Subscription/requestCount", //Cancel Subscription request count
  deleteReqestList: "api/customer/Account/requestList?", //Delete request list
  deleteFromRequest: "api/customer/Account/delete?", //Delete action in delete request
  deletedList: "api/customer/Account/list?", //Deleted list
  cancelSubscriptionRequestList: "api/customer/Subscription/requestList?", //Cancel Subscription request List
  cancelledSubscriptiontList: "api/customer/Subscription/list?", //Cancel Subscription request List
  approveCanceleSubscriptionRequest: "api/customer/Subscription/cancel?", //Cancel Subscription request List
  stopStream: "api/customer/stopStream", // stop broadcast Stream
  postEncryptUrl: "api/customer/getUrlToken?", // post encrypt url
};

export const appVersion = {
  addNewVersion: "api/version/release/new", //add new app
  getAppVerionList: "api/version/release/list?", //get app version list
  getAppVerionInfo: "api/version/release/list/", //get App version Information
  getLatestVersion: "api/version/release/latest", //get latest vertion release
  mediaDownloadUrl: "api/version/media/download/", //SDK and DOC Media download url
  addNewAppVersionMedia: "api/version/media/upload", //upload sdk and doc
  getAppversionReleseHistory: "api/version/release/history?", //get app version list
};

/**sso login details */
export const ssoLoginDetails = {
  ssoLoginCheck: "api/trialUser/signup/sso",
  ssoDetaisGetGoogle: "getGoogleUserCredentials",
  ssoDetaislinkedin: "getLinkedinUserCredentials",
};

/**App release */
export const appRelease = {
  appInternalRelease: "api/version/release/create?", //App Release manage URL
  getOrgDetails: "api/customer/organisations?", //get org details
  getPlatformsList: "api/customer/sdk/list?", //get platform details
};

/** dashBoard */
export const dashBoard = {
  quickView: "api/metric/quickOverView?", //Quick view
  analyticView: "api/metric/analyticsOverView?", //analytic view
  getCallDuration: "api/metric/getCallsDuration", //get call duration passed org id
  getCallUsageDetailsUrl: "api/metric/getTotalCallUsage", //get call useage details
};

/** payMent */
export const payMent = {
  invoiceView: "api/payment/payment/viewdetails", //view invoice details
  paymentStatus: "api/payment/strip/payment/process?", //after payment done pass status
  getsessionId: "api/payment/strip/payment/getSession?", //pass meta data details and get session id
  paymentInitCall: "api/payment/payment/paymentprocess?", //payMent
  billingHistory: "api/payment/payment/billinghistory?", //billingHistory
  paymentIntentAuth: "api/payment/payment/paymentauthentication?", //payMent 3d auth done call
  paymentInvoiceOverview: "api/payment/payment/invoiceoverview?", //payment invoice overiew
  updateUserPlanTrialToEasy: "api/customer/update/easy", //Update user plan trial to easy
};

/** setting page SDK Action */
export const SDK = {
  deleteSDK: "api/version/platform/delete", //deleteSDK
  getSDKlist: "api/version/platform/list?", // get platforms list API
  createSDK: "api/version/platform/create?", //POST create NEW Platform
  editSDKlist: "api/version/platform/update?", // PUT update platform,
};

export const passwordApi = {
  //change password apis
  changePwd: "api/customer/changePassword?", //change password
};

export const UpdateProfile = {
  //change password apis
  profileUpdate: "api/customer/updateProfile?", //change password
  deleteCertificate: "api/customer/Configuration/delete?", //delete ios certificate
  getServerConfigPath: "api/customer/Configuration/details?", //get server configuration details
  updateCustomerServerConfigPath: "api/customer/Configuration/create?", //update server config
  updateSuperAdminServerConfigPath: "api/customer/Configuration/update?", //update server config
  saveOrEditServerConfigPath: "api/customer/Configuration/saveoredit?", //save or edit server config
  revokeApiCredential: "api/customer/Configuration/updateApiPassword?",
  cancelSubscriptionRequest: "api/customer/Subscription/request?",
  createAccountDeleteRequest: "api/customer/Account/request?",
  deleteRequestStatus: "api/customer/Account/requestStatus?",
  cancelSubscriptionRequestStatus: "api/customer/Subscription/requestStatus?",
  subscriptionCancellation: "api/customer/Subscription/update?",
  sendEmailToDevopsTeam: "api/customer/sendEmailToDevopsTeam",
};

export const registerApiUrl = {
  //register api call
  trialUser: "api/signup",
  userValidate: "api/password/validateEmail", //trail user validate
  signupStepOne: "api/trialUser/signup/stepone",
};

export const createTicket = {
  //raise ticket
  createTicket: "api/customer/submitTicket?",
};

export const moderationApi = {
  //moderation
  user: "api/moderation/moderation/userList", //user list
  group: "api/moderation/moderation/groupList", //group list
  report: "api/moderation/moderation/reportList", //report list
  blockUserGroup: "api/moderation/moderation/block", //block user or group
};

export const taxApiHandle = {
  //tax id handle
  getTaxId: "api/customer/taxId/listTaxId", //get
  updateTax: "api/customer/taxId/updateTaxId", //update
};
export const inviteMember = {
  // teams invite member
  inviteMemberApi: "api/customer/invitemember",
  inviteMemberListApi: "api/customer/getmembers?",
};
export const organisationList = {
  getOrganisationList: "api/customer/organisations",
};
export const videoTableList = {
  getVideoTableList: "api/customer/recordedChannels?",
  getVideoRecordList: "api/customer/recordedChannelVideos?",
};
export const participantList = {
  getParticipantList: "api/customer/getParticipantsList?",
};
export const customerList = {
  // getCustomerList: "api/customer/getcustomerlist?"
  getCustomerList: "api/customer/customerAnalytics?",
};
export const broadCastcountList = {
  getbroadCastcountList: "api/customer/broadcastAnalytics?",
};
export const deleteStage = {
  doDeleteStageList: "api/customer/deleteStage?",
  dogetDeleteStage: "api/customer/getStageDetails?",
  doRemoveParticipantList: "api/customer/removeParticipants?"
};
