import { doResetPassAction, doCreatePassword, doResetPassSuccess, doResetPassFail } from "../../../store/action/resetPassAction";

describe('resetPassAction test cover', () => {
    it('doResetPassAction test cover', () => {
        const expectedAction = {
            type: 'DO_RESETPASS_ACTION',
            data: {}
        };
        expect(doResetPassAction()).toEqual(expectedAction);
    });
    it('doCreatePassword test cover', () => {
        const expectedAction = {
            type: 'DO_CREATE_PASSWORD',
            data: {}
        };
        expect(doCreatePassword()).toEqual(expectedAction);
    });
    it('doResetPassSuccess test cover', () => {
        const expectedAction = {
            type: 'DO_RESETPASS_SUCCESS',
            data: {}
        };
        expect(doResetPassSuccess()).toEqual(expectedAction);
    });
    it('doResetPassFail test cover', () => {
        const expectedAction = {
            type: 'DO_RESETPASS_FAIL',
            data: {}
        };
        expect(doResetPassFail()).toEqual(expectedAction);
    });
});
