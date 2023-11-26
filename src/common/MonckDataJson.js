const superAdmin = "Super Admin";
const releaseManager = "Release Manager";
const superAdminDesc = "All access including billing.";
const developerDesc = "Can access only to the selected applications for development usage.";
const adminDesc = "Except billing, Can access to everything else for the selected applications.";

export const chatData = [
    // { date: "", date1: "", "Total_invoice": "", "collect_statement": "", "over_due_statement": "", status: "" },
    { date1: "Jan", "Total_invoice": "70%", "collect_statement": 10, "over_due_statement": 0, status: "P" },
    { date1: "Feb", "Total_invoice": "10%", "collect_statement": 15, "over_due_statement": 10, status: "L" },
    { date1: "Mar", "Total_invoice": "40%", "collect_statement": 60, "over_due_statement": 15, status: "P" },
    { date1: "Apr", "Total_invoice": "50%", "collect_statement": 78, "over_due_statement": 20, status: "P" },
    { date1: "May", "Total_invoice": "50%", "collect_statement": 50, "over_due_statement": 28, status: "P" },
    { date1: "Jun", "Total_invoice": "70%", "collect_statement": 65, "over_due_statement": 30, status: "L" },
    { date1: "Jul", "Total_invoice": "60%", "collect_statement": 60, "over_due_statement": 25, status: "P" },
    { date1: "Aug", "Total_invoice": "30%", "collect_statement": 80, "over_due_statement": 30, status: "P" },
    { date1: "Sep", "Total_invoice": "70%", "collect_statement": 58, "over_due_statement": 23, status: "L" },
    { date1: "Oct", "Total_invoice": "60%", "collect_statement": 65, "over_due_statement": 30, status: "L" },
    { date1: "Nov", "Total_invoice": "60%", "collect_statement": 75, "over_due_statement": 20, status: "P" },
    { date1: "Dec", "Total_invoice": "90%", "collect_statement": 85, "over_due_statement": 35, status: "P" },
];

export const chatDataHome = [
    { date: "JAN", usage: 65 },
    { date: "MAR", usage: 50 },
    { date: "MAY", usage: 68 },
    { date: "JUL", usage: 46 },
    { date: "SEP", usage: 90 },
    { date: "OCT", usage: 68 },
    { date: "DEC", usage: 68 },
];

export const planDetails = [
    { planName: "All" },
    { planName: "Custom plan" },
    { planName: "Pro plan" },
    { planName: "Trial" }
];

export const knowledgeBase = [
    { planName: "All" },
    { planName: "Messaging" },
    { planName: "Voice" },
    { planName: "Video" },
    { planName: "Data & Moderation" },
    { planName: "Security" },
    { planName: "Scalability" },
    { planName: "Integration" },
];

export const uType = [
    { id: 0, planName: "All" },
    { id: 1, planName: "Active" },
    { id: 2, planName: "Inactive" }
];

export const callusageCost = [
    { id: 0, planName: "USD ($)", value: "non-inr" },
    { id: 1, planName: "INR (₹)", value: "inr" },
];

export const callusageFillter = [
    { id: 0, planName: "All" },
    { id: 1, planName: "Exceed Minutes" },
    { id: 2, planName: "Alert" }
];

export const license = [
    { id: 1, planName: "All" },
    { id: 2, planName: "Active" },
    { id: 0, planName: "Expired" }
];
export const filterByData = [
    { planName: "Verified Customers", id: "verifiedCustomer" },
    { planName: "Paid Customers", id: "paidCustomer" }
];
export const filterByDate = [
    { planName: "Under Integration", id: "underIntegrated" },
    { planName: "User Integrated", id: "userIntegrated" },
];
export const pagesizeData = [
    { size: 10 },
    { size: 20 },
    { size: 30 },
    { size: 40 },
    { size: 50 },
    { size: 100 },
];

export const PaymentbyOption = [
    { planName: "All" },
    { planName: "Debit Card" },
    { planName: "Net Banking" },
    { planName: "BHIM UPI" }
];

//admin portal roles
export const Role = [
    { planName: "All" },
    { planName: superAdmin },
    { planName: "Admin" },
    { planName: releaseManager }
];

//admin portal roles
export const adminRole = [
    { planName: "All" },
    { planName: "Admin" },
    { planName: releaseManager }
];

//customer portal roles
export const customerTeams = [
    { "planName": "All" },
    { "planName": "Admin" },
    { "planName": "Moderator" },
    { "planName": "Developer" },
];

export const cusStatus = [
    { planName: "All" },
    { planName: "Block" },
    { planName: "Deactive" },
];
export const cusActiveInactive = [
    { id: "2", value: "false", name: "Inactive" },
    { id: "1", value: "true", name: "Active" }
];

export const usersExtendData = [
    { id: "0", value: "0", planName: "Select Options" },
    { id: "3", value: "5", planName: "5 Users" },
    { id: "2", value: "10", planName: "10 Users" },
    { id: "1", value: "20", planName: "20 Users" },
];

export const licenceExtendDo = [
    { id: "0", value: "0", planName: "Select Options" },
    { id: "3", value: "7", planName: "7 days" },
    { id: "2", value: "15", planName: "15 days" },
    { id: "1", value: "30", planName: "30 days" },
];

export const licenceExtendNull = [
    { id: "0", value: "0", planName: "Select Options" },
];
//superAdmin portal roles
export const superAdminRole = [
    { id: "1", value: "portalsuperadmin", planName: superAdmin, desc: superAdminDesc },
    { id: "2", value: "portaladmin", planName: "Admin", desc: adminDesc },
    { id: "3", value: "portaldeveloper", planName: releaseManager, desc: developerDesc },
];

//superAdmin portal roles
export const AdminRoleTeams = [
    { id: "2", value: "portaladmin", planName: "Admin", desc: adminDesc },
    { id: "3", value: "portaldeveloper", planName: releaseManager, desc: developerDesc },
];

//customer portal roles
export const superCustomerRole = [
    { id: "4", value: "portalsuperadmin", planName: "Super Admin", desc: "" },
    { id: "5", value: "portaladmin", planName: "Admin", desc: "" },
];

//ReleaseType in appversion page
export const releaseTypes = [
    { id: "0", value: "select", planName: "Select Release Type" },
    { id: "1", value: "major", planName: "Major" },
    { id: "2", value: "minor", planName: "Minor" },
    { id: "3", value: "patch", planName: "Patch" }
];

export const planValue = [
    {
        "id": 1,
        "planName": "All"
    },
    {
        "id": 2,
        "planName": "Trial"
    },
    {
        "id": 3,
        "planName": "Pro User"
    },
    {
        "id": 4,
        "planName": "Custom Plan"
    }
];

//AppversionPage add new version app
//this is not useing any where but this demeo
export const platformValue = [
    {
        "id": 1,
        "planName": "Android",
        "android": false,
        "isCheck": false,
        value: "android",
        nameSDK: "",
        nameDOC: "",
        urlSDK: "",
        urlDOC: "",
        "size": 0,
        "docSize": 0
    },
];

//userRoleId
export const userRoleIdDetails = [
    { id: 1, value: "portalsuperadmin", planName: superAdmin, desc: superAdminDesc },
    { id: 2, value: "portaladmin", planName: "Admin", desc: adminDesc },
    { id: 3, value: "portaldeveloper", planName: releaseManager, desc: developerDesc },
    { id: 4, value: "customeradmin", planName: "Admin", desc: superAdminDesc },
    { id: 5, value: "customeradmin", planName: "Admin", desc: superAdminDesc },
    { id: 6, value: "customermoderator", planName: "Moderator", desc: adminDesc },
    { id: 7, value: "customerdeveloper", planName: "Developer", desc: developerDesc },
];

export const ticketPriority = [
    {
        id: 1,
        planName: "High",
    },
    {
        id: 2,
        planName: "Medium",
    },
    {
        id: 3,
        planName: "Low",
    },
];

//call usage mock
export const barChartMonckData = [
    {
        id: 1,
        name: 'Voice call',
        extra: 20,
        callMin: 89,
        limit: "cross",
        label: 109,//cross mean is label
    },
    {
        id: 2,
        name: 'Video call',
        extra: 9,
        callMin: 91,
        limit: "nocross",
        label: 91,//nocross mean callMin is label
    },
];

export const subscriptionStatus = {
    NEW: "0",
    REQUEST_SENT: "1",
    COMPLETED: "2",
    UNSUBSCRIBED: "3"
};

export const mockCancelSubscription = [
    { id: "3", value: subscriptionStatus.UNSUBSCRIBED, planName: "Unsubscribed" },
    { id: "2", value: subscriptionStatus.COMPLETED, planName: "Completed" },
];

export const callUssageInfoMockData = [
    { id: 1, isSelect: false, optionData: "This Month", value: "currentmonth" },
    { id: 2, isSelect: false, optionData: "Last Month", value: "lastmonth" },
];
