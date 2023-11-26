import store from "../store";
import localforage from "localforage";
import { Imgplaceholder } from "../assets/images";
import { serverNotRespond } from "../helper/ApiToast";
import { mediaGet } from "../common/httpRestServices";
import { apiUrl, customerApi } from "./ApiUrl";

class IndexDb {

    constructor() {
        store.dispatch({ type: "DO_ADD_CUS_INITIAL" });//store Empty
        return IndexDb.functions;//return To all function, it is helps to access all funtion access any page
    }

    /**
     * @param  {string} imageKey
     * imageKey is user image Value
     * example->{image:abcd.png}--->abcd is imageKey
     */
    setItem =  (imageKey = "") => {
        try {
            const custProfile    =  mediaGet(`${apiUrl}${customerApi.mediaDownloadUrl}${imageKey}`, true);
            const newCustProfile =  mediaGet(`${imageKey}`, true);
            const { data = {}, status = 0 } = custProfile.status === 200 ? custProfile : newCustProfile;

            if (status === 200) {
                try {
                    store.dispatch({ type: "DO_LOADING_PROFILE_IMAGE", loading: false });//Loader
                     localforage.setItem(imageKey, data); //after API will store Indexeddb key value Pair
                    return URL.createObjectURL(data); //Return To getItem function,getItem return To our component
                } catch (err) {
                    return Imgplaceholder; //Return To getItem function,getItem return To our component
                }
            } else {
                /** server not response msg dissabled due to multiple toast shows some screens |^|@29-03-2023*/
                store.dispatch({ type: "DO_LOADING_PROFILE_IMAGE", loading: false }); //loder
            }
        }
        catch (error) {
            store.dispatch({ type: "DO_LOADING_PROFILE_IMAGE", loading: false }); //loder
            /** server not response msg dissabled due to multiple toast shows some screens |^|@29-03-2023*/
            serverNotRespond();
        }
    }

    /**
     * @param  {string} key
     * Key is user image Value
     * example->{image:abcd.png}--->abcd is Key
     */
    getItem =  (key = "") => {
        try {
            const value =  localforage.getItem(key); //getImage form IndexedDB
            if (value === null) { //If value id not in we got Null value
                store.dispatch({ type: "DO_LOADING_PROFILE_IMAGE", loading: true });
                return this.setItem(key);//if u got null value call SetItem and Return to Image blob
            } else {
                return URL.createObjectURL(value); //return to Image
            }
        } catch (err) {
            console.log("")
        }
    }
}
export default IndexDb;
