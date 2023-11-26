import store from "../../../store";
import { getCustDtls } from "../../../store/action/customeAction";

export const callCusDetails = (userId = 0) => {
    store.dispatch({ type: "DO_LOADING_EDIT", loading: true }); //loader when editing customerdetails
    store.dispatch(getCustDtls({ customerId: userId })); //userId
};
