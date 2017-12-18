# react-router-dispatcher-status-code

[![npm](https://img.shields.io/npm/v/react-router-dispatcher-status-code.svg)](https://www.npmjs.com/package/react-router-dispatcher-status-code)
[![npm](https://img.shields.io/npm/dm/react-router-dispatcher-status-code.svg)](https://www.npmjs.com/package/react-router-dispatcher-status-code)
[![CircleCI branch](https://img.shields.io/circleci/project/github/adam-26/react-router-dispatcher-status-code/master.svg)](https://circleci.com/gh/adam-26/react-router-dispatcher-status-code/tree/master)
[![Code Climate](https://img.shields.io/codeclimate/coverage/github/adam-26/react-router-dispatcher-status-code.svg)](https://codeclimate.com/github/adam-26/react-router-dispatcher-status-code)
[![Code Climate](https://img.shields.io/codeclimate/github/adam-26/react-router-dispatcher-status-code.svg)](https://codeclimate.com/github/adam-26/react-router-dispatcher-status-code)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

A [react-router-dispatcher](https://github.com/adam-26/react-router-dispatcher) **action** for defining react-router status codes that support server-side streaming.

Read the [react-router-dispatcher](https://github.com/adam-26/react-router-dispatcher) documentation if you haven't already done so.

### Install

##### NPM

```js
npm install --save react-router-dispatcher-status-code
```

##### Yarn

```js
yarn add react-router-dispatcher-status-code
```

### Usage

```js
import getStatusCodeAction, { withStatusCode, GET_STATUS_CODE } from 'react-router-dispatcher-status-code';

// GET_STATUS_CODE is the action name, used to configure react-router-dispatcher
```

### Example

##### Defining routes using `withStatusCode()`

```js
// routes.js
import { withStatusCode } from 'react-router-dispatcher-status-code';
import { Root } from './components';

const routes = [
  { component: Root,
    routes: [
      { path: '/',
        exact: true,
        component: Home
      },

      // Configure a 404 - not found route for rendering invalid routes
      { component: withStatusCode(404)(NoMatch) }
    ]
  }
]

export default routes;
```

##### Configuring the metadata action using [react-router-dispatcher](https://github.com/adam-26/react-router-dispatcher)

```js
import { createRouteDispatchers } from 'react-router-dispatcher';
import { GET_STATUS_CODE } from 'react-router-dispatcher-status-code';
import routes from './routes';

const {
    UniversalRouteDispatcher,
    ClientRouteDispatcher,
    dispatchClientActions,
    dispatchServerActions
} = createRouteDispatchers(routes, [[GET_STATUS_CODE]]);

// Server dispatch
dispatchServerActions(req.url, params).then(({ httpResponse: { statusCode } }) => {
  // Set the HTTP response code - this is expressjs syntax
  res.status(statusCode);

  if (statusCode >= 300 || statusCode < 400) {
    // redirect
  }

  if (statusCode >= 500) {
    // render an error page
  }

  // render the app
});
```

### API

`getStatusCodeAction(statusCode)`

#### Parameters

**statusCode**: `number`

  * The statusCode to assign to the response

`withStatusCode(statusCode)`

#### Parameters

**statusCode**: `number`

  * The statusCode to assign to the response


### Contribute
For questions or issues, please [open an issue](https://github.com/adam-26/react-router-dispatcher-status-code/issues), and you're welcome to submit a PR for bug fixes and feature requests.

Before submitting a PR, ensure you run `npm test` to verify that your coe adheres to the configured lint rules and passes all tests. Be sure to include unit tests for any code changes or additions.

### License
MIT