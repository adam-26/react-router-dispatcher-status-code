// @flow
import { withActions } from 'react-router-dispatcher';
import setStatusCodeAction from './getStatusCodeAction';

export default function withStatusCode(statusCode) {
    return withActions(setStatusCodeAction(statusCode));
}
