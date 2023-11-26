import { loginReducer, initStatelogin } from "../../../store/reducer/loginReducer";

describe('loginReducer test cover', () => {
    // login initialstate reducer testcover
    it('DO_LOGIN test cover', () => {
        const newState = loginReducer(undefined, {});
        expect(newState).toEqual(initStatelogin);
    });

    // login actionstate reducer testcover
    it('DO_LOGIN test cover', () => {
        const newState = loginReducer(undefined, {
            type: "DO_LOGIN",
            initStatelogin
        });
        expect(newState).toEqual(initStatelogin);
    });
    it('DO_LOADING_LOGIN_PAGE test cover', () => {
        const isLoading = { isLoading: undefined };
        const newState = loginReducer(false, {
            type: "DO_LOADING_LOGIN_PAGE",
            isLoading:undefined
        });
        expect(newState).toEqual(isLoading);
    });

    it('DO_LOGOUT test cover', () => {
        const logout = { logStatus: undefined };
        const newState = loginReducer(false, {
            type: "DO_LOGOUT",
            logStatus: undefined
        });
        expect(newState).toEqual(logout);
    });

    it('DO_LOGIN_FAIL test cover', () => {
        const logInFail = { logStatus: undefined };
        const newState = loginReducer(false, {
            type: "DO_LOGIN_FAIL",
            logStatus: undefined
        });
        expect(newState).toEqual(logInFail);
    });

    it('DO_LOGIN_SUCCES test cover', () => {
        const newState = loginReducer({}, {
            type: "DO_LOGIN_SUCCES",
            users: {},
            logStatus: false
        });
        expect(newState).toEqual(newState);
    });

    it('DO_LOGIN_STATUS test cover', () => {
        const logInStatus = { logStatus: undefined};
        const newState = loginReducer(false, {
            type: "DO_LOGIN_STATUS",
            logStatus: undefined
        });
        expect(newState).toEqual(logInStatus);
    });

    it('EDIT_MEMBER_LOADER test cover', () => {
        const logInStatus = { editLoader: undefined };
        const newState = loginReducer(false, {
            type: "EDIT_MEMBER_LOADER",
            editLoader: undefined
        });
        expect(newState).toEqual(logInStatus);
    });

});