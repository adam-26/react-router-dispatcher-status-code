// @flow
import invariant from 'invariant';

export const GET_STATUS_CODE = 'GET_STATUS_CODE_ACTION';

export default function getStatusCodeAction(statusCode?: number) {
    if (typeof statusCode !== 'undefined' && statusCode !== null) {
        invariant(typeof statusCode === 'number', 'statusCode expects a number.');
    }

    return {
        name: GET_STATUS_CODE,

        staticMethod: (routeProps, { httpResponse }) => {
            httpResponse.statusCode = statusCode || httpResponse.statusCode;
        },

        initServerAction: ({ httpResponse }) => {
            return {
                httpResponse: httpResponse || { statusCode: 200 }
            };
        },

        mapParamsToProps: ({ httpResponse }) => ({ httpResponse }),

        // stop processing actions on the server if statusCode is not OK.
        endServerActions: ({ statusCode }) => statusCode < 200 || statusCode >= 300
    };
}
