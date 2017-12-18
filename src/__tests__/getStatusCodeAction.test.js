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

    describe('mapParamsToProps', () => {
        test('assigns props from action factory', () => {
            const params = { httpResponse: { statusCode: 200 } };
            action = getStatusCodeAction();

            const props = action.mapParamsToProps(params);
            expect(props.httpResponse).toEqual({ statusCode: 200 });
        });
    });

    describe('staticMethod', () => {
        test('does not assign statusCode when not defined', () => {
            const params = { httpResponse: { statusCode: 200 } };
            action = getStatusCodeAction();

            action.staticMethod({}, params);
            expect(params.httpResponse).toEqual({ statusCode: 200 });
        });

        test('assigns status code value', () => {
            const params = { httpResponse: { statusCode: 200 } };
            action = getStatusCodeAction(201);

            action.staticMethod({}, params);
            expect(params.httpResponse).toEqual({ statusCode: 201 });
        });
    });

    describe('stopServerActions', () => {
        test('returns false when statusCode is OK', () => {
            const params = { httpResponse: { statusCode: 200 } };
            action = getStatusCodeAction();

            expect(action.stopServerActions({}, params)).toBe(false);
        });

        test('returns true when statusCode is not OK', () => {
            const params = { httpResponse: { statusCode: 404 } };
            action = getStatusCodeAction();

            expect(action.stopServerActions({}, params)).toBe(true);
        });
    });
});
