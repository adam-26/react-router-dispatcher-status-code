// @flow
import { withActions } from 'react-router-dispatcher';
import statusCodeAction from './getStatusCodeAction';

export default function withStatusCode(statusCode) {
    return withActions(statusCodeAction(statusCode));
}
