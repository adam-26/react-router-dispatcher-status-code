// @flow
import { withActions } from 'react-router-dispatcher';
import getStatusCodeAction from './getStatusCodeAction';

export default function withStatusCode(statusCode) {
    return withActions(getStatusCodeAction(statusCode));
}
