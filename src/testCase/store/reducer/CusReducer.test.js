import { CusReducer, initState } from "../../../store/reducer/CusReducer";

describe('CusReducer test cover', () => {
    it('INITIAL_STAGE initial state test cover', () => {
        const newState = CusReducer(undefined, {});
        expect(newState).toEqual(initState);
    });
    it('INITIAL_STAGE test cover ', () => {
        const newState = CusReducer(undefined, {
            type: 'INITIAL_STAGE',
            initState
        });
        expect(newState).toEqual(initState);
    });

    it('DO_LOADING test cover ', () => {
        const doLoad = { isLoading: undefined};
        const newState = CusReducer(false, {
            type: 'DO_LOADING',
            isLoading:undefined
        });
        expect(newState).toEqual(doLoad);
    });

    it('CUS_PAGE_API_LOAD test cover ', () => {
        const doLoad = { apiLoad: undefined };
        const newState = CusReducer(false, {
            type: 'CUS_PAGE_API_LOAD',
            apiLoad: undefined
        });
        expect(newState).toEqual(doLoad);
    });
    it('CUS_PAGE_SEARCH test cover ', () => {
        const apiSearchHit = {};
        const newState = CusReducer(true, {
            type: 'CUS_PAGE_SEARCH',
            searchHit:true
        });
        expect(newState).toEqual(apiSearchHit);
    });

    it('CUS_PAGE_SEARCH_LOAD test cover ', () => {
        const apiSearchLoad = { searchLoader: true };
        const newState = CusReducer(true, {
            type: 'CUS_PAGE_SEARCH_LOAD',
            searchLoader:true
        });
        expect(newState).toEqual(apiSearchLoad);
    });

    it('CUS_PAGE_PLAN_TYPE_API test cover ', () => {
        const planTypeApi = { PlanTypeApiHit: true };
        const newState = CusReducer(true, {
            type: 'CUS_PAGE_PLAN_TYPE_API',
            PlanTypeApiHit:true
        });
        expect(newState).toEqual(planTypeApi);
    });

    it('SEARCH_DATA test cover ', () => {
        const planTypeApi = { searchData: null };
        const newState = CusReducer(null, {
            type: 'SEARCH_DATA',
            searchData:null
        });
        expect(newState).toEqual(planTypeApi);
    });
    it(' ADD_CUS_LOADER test cover ', () => {
        const addCusLoad = { addcusLoader: true };
        const newState = CusReducer(true, {
            type: 'ADD_CUS_LOADER',
            addcusLoader: true
        });
        expect(newState).toEqual(addCusLoad);
    });
    it(' PLAN_TYPES test cover ', () => {
        const planType = { planType: [] };
        const newState = CusReducer([],{
            type: 'PLAN_TYPES',
            planType: []
        });
        expect(newState).toEqual(planType);
    });
    it(' CUSTOMER_LIST test cover ', () => {
        const custList = {};
        const newState = CusReducer({}, {
            type: 'CUSTOMER_LIST',
            customerList: {}
        });
        expect(newState).toEqual(custList);
    });
    it(' CUSTOMER_DETAILS test cover ', () => {
        const custDtls = { customerDtls: {}};
        const newState = CusReducer({}, {
            type: 'CUSTOMER_DETAILS',
            customerDtls: {}
        });
        expect(newState).toEqual(custDtls);
    });
    it(' ADD_CUSTOMER_DATA test cover ', () => {
        const custData = { addCustomerData: undefined };
        const newState = CusReducer(null, {
            type: 'ADD_CUSTOMER_DATA',
            addCustomerData: undefined
        });
        expect(newState).toEqual(custData);
    });
});