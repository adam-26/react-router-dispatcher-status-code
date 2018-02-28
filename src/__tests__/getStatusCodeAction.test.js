import getStatusCodeAction, { STATUS_CODE } from "../getStatusCodeAction";

describe('getStatusCodeAction', () => {
    let action;

    beforeEach(() => {
        action = getStatusCodeAction();
    });

    test('name', () => {
        expect(action.name).toBe(STATUS_CODE);
    });

    describe('initServerAction', () => {
        test('assigns a metadata instance', () => {
            const params = {};
            const props = action.initServerAction(params);

            expect(props.httpResponse).toBeDefined();
        });

        test('retains existing instance', () => {
            const params = { httpResponse: { statusCode: 400 } };
            const props = action.initServerAction(params);

            expect(props.httpResponse).toEqual({ statusCode: 400 });
        });
    });

    describe('filterParamsToProps', () => {
        test('assigns props from action factory', () => {
            const params = { httpResponse: { statusCode: 200 }, other: {} };
            action = getStatusCodeAction();

            const props = action.filterParamsToProps(params);
            expect(props.httpResponse).toEqual({ statusCode: 200 });
            expect(props.other).not.toBeDefined();
        });
    });

    describe('staticMethod', () => {
        test('does not assign statusCode when not defined', () => {
            const props = { httpResponse: { statusCode: 200 } };
            action = getStatusCodeAction();

            action.staticMethod(props);
            expect(props.httpResponse).toEqual({ statusCode: 200 });
        });

        test('assigns status code value', () => {
            const props = { httpResponse: { statusCode: 200 } };
            action = getStatusCodeAction(201);

            action.staticMethod(props);
            expect(props.httpResponse).toEqual({ statusCode: 201 });
        });
    });
});
