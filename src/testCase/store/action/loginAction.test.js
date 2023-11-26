import { doLogin, doLoginSuccess, doLoginFail } from "../../../store/action/loginAction";

describe('LoginAction test cover', () => {
    it('doLogin Test cover', () => {
        const expectedAction = {
            type: 'DO_LOGIN',
            data: {}
        };
        expect(doLogin()).toEqual(expectedAction);
    });
    it('doLoginSucess test cover', () => {
        const expectedAction = {
            type: 'DO_LOGIN_SUCCESS',
            data: {}
        };
        expect(doLoginSuccess()).toEqual(expectedAction);
    });
    it('doLoginFail test cover', () => {
        const expectedAction = {
            type: 'DO_LOGIN_FAIL',
            data: {}
        };
        expect(doLoginFail()).toEqual(expectedAction);
    });
});
