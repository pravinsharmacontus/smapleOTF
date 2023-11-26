import { doForgetAction, doForgetSuccess, doForgetFail } from "../../../store/action/forgetPassAction";

describe('forgotPassAction test cover', () => {
    it('doForgetAction test cover', () => {
        const expectedAction = {
            type: 'DO_FORGET_ACTION',
            data: {}
        };
        expect(doForgetAction()).toEqual(expectedAction);
    });
    it('doForgetSucess test cover', () => {
        const expectedAction = {
            type: 'DO_FORGET_SUCCESS',
            data: {}
        };
        expect(doForgetSuccess()).toEqual(expectedAction);
    });
    it('doForgetFail test cover', () => {
        const expectedAction = {
            type: 'DO_FORGET_FAIL',
            data: {}
        };
        expect(doForgetFail()).toEqual(expectedAction);
    });
});
