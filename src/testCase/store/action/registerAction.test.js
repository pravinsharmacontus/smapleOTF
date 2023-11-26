import { doRegister, doRegisterSuccess, doRegisterFail } from "../../../store/action/registerAction";

describe('registerAction page test cover', () => {
    it('doRegister test cover', () => {
        const expectedAction = {
            type: 'DO_REGISTER',
            data: {}
        };
        expect(doRegister()).toEqual(expectedAction);
    });
    it('doRegisterSuccess test cover', () => {
        const expectedAction = {
            type: 'DO_REGISTER_SUCCESS',
            data: {}
        };
        expect(doRegisterSuccess()).toEqual(expectedAction);
    });
    it('doRegisterFail test cover', () => {
        const expectedAction = {
            type: 'DO_REGISTER_FAIL',
            data: {}
        };
        expect(doRegisterFail()).toEqual(expectedAction);
    });
});
