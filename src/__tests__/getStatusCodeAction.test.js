import getStatusCodeAction, { GET_STATUS_CODE } from "../getStatusCodeAction";

describe('getStatusCodeAction', () => {
    let action;

    beforeEach(() => {
        action = getStatusCodeAction();
    });

    test('name', () => {
        expect(action.name).toBe(GET_STATUS_CODE);
    });

    describe('initServerAction', () => {
        test('assigns a metadata instance', () => {
            const params = {};
            const props = action.initServerAction(params);

            expect(props.statusCode).toBeDefined();
        });

        test('retains existing instance', () => {
            const params = { statusCode: 400 };
            const props = action.initServerAction(params);

            expect(props.statusCode).toEqual(400);
        });
    });

    describe('mapParamsToProps', () => {
        test('assigns props from action factory', () => {
            const params = { statusCode: 200 };
            action = getStatusCodeAction();

            const props = action.mapParamsToProps(params);
            expect(props.statusCode).toEqual(200);
        });
    });

    describe('staticMethod', () => {
        test('does not assign statusCode when not defined', () => {
            const params = { statusCode: 200 };
            action = getStatusCodeAction();

            action.staticMethod({}, params);
            expect(params.statusCode).toEqual(200);
        });

        test('assigns status code value', () => {
            const params = { statusCode: 200 };
            action = getStatusCodeAction(201);

            action.staticMethod({}, params);
            expect(params.statusCode).toEqual(201);
        });
    });
});
