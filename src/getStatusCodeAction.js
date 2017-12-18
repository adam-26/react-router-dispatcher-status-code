// @flow
import invariant from 'invariant';

export const STATUS_CODE = 'status-code';

export default function statusCodeAction(statusCode?: number) {
    if (typeof statusCode !== 'undefined' && statusCode !== null) {
        invariant(typeof statusCode === 'number', 'statusCode expects a number.');
    }

    return {
        name: STATUS_CODE,

        staticMethod: (routeProps, { httpResponse }) => {
            httpResponse.statusCode = statusCode || httpResponse.statusCode;
        },

        initServerAction: (params) => {
            const httpResponse = params.httpResponse || {};
            return {
                httpResponse: {
                    statusCode: 200,
                    ...httpResponse,
                }
            };
        },

        mapParamsToProps: ({ httpResponse }) => ({ httpResponse }),

        // stop processing actions on the server if statusCode is not OK.
        stopServerActions: (routeProps, { httpResponse: { statusCode } }) => statusCode < 200 || statusCode >= 300
    };
}
