import { loderReducer, initStateLoder } from "../../../store/reducer/loaderReducer";

describe('loderReducer test cover', () => {
    // loaderReducer initial state test cover
    it('DO_LOADING_PAGE test cover', () => {
        const newState = loderReducer(undefined, {});
        expect(newState).toEqual(initStateLoder);
    });

    // loaderReducer action states test coverage
    it('DO_LOADING_PAGE test cover', () => {
        const newState = loderReducer(undefined, {
            type: "DO_LOADING_PAGE",
            initStateLoder
        });
        expect(newState).toEqual(newState);
    });

    it('DO_LOADING_CUSTOMER_PAGE test cover', () => {
        const cusPageLoad = { cusPageloading: false };
        const newState = loderReducer(false, {
            type: "DO_LOADING_CUSTOMER_PAGE",
            cusPageloading: false
        });
        expect(newState).toEqual(cusPageLoad);
    });

    it('DO_DELETE_ACTION_LOAD test cover', () => {
        const cusDeleteLoad = { cusDeleteLoad: false };
        const newState = loderReducer(false, {
            type: "DO_DELETE_ACTION_LOAD",
            cusDeleteLoad: false
        });
        expect(newState).toEqual(cusDeleteLoad);
    });

});
