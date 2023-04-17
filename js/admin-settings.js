/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/assert/build/assert.js":
/*!*********************************************!*\
  !*** ./node_modules/assert/build/assert.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
// Currently in sync with Node.js lib/assert.js
// https://github.com/nodejs/node/commit/2a51ae424a513ec9a6aa3466baa0cc1d55dd4f3b
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(/*! ./internal/errors */ "./node_modules/assert/build/internal/errors.js"),
    _require$codes = _require.codes,
    ERR_AMBIGUOUS_ARGUMENT = _require$codes.ERR_AMBIGUOUS_ARGUMENT,
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_INVALID_ARG_VALUE = _require$codes.ERR_INVALID_ARG_VALUE,
    ERR_INVALID_RETURN_VALUE = _require$codes.ERR_INVALID_RETURN_VALUE,
    ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;

var AssertionError = __webpack_require__(/*! ./internal/assert/assertion_error */ "./node_modules/assert/build/internal/assert/assertion_error.js");

var _require2 = __webpack_require__(/*! util/ */ "./node_modules/util/util.js"),
    inspect = _require2.inspect;

var _require$types = (__webpack_require__(/*! util/ */ "./node_modules/util/util.js").types),
    isPromise = _require$types.isPromise,
    isRegExp = _require$types.isRegExp;

var objectAssign = Object.assign ? Object.assign : (__webpack_require__(/*! es6-object-assign */ "./node_modules/es6-object-assign/index.js").assign);
var objectIs = Object.is ? Object.is : __webpack_require__(/*! object-is */ "./node_modules/object-is/index.js");
var errorCache = new Map();
var isDeepEqual;
var isDeepStrictEqual;
var parseExpressionAt;
var findNodeAround;
var decoder;

function lazyLoadComparison() {
  var comparison = __webpack_require__(/*! ./internal/util/comparisons */ "./node_modules/assert/build/internal/util/comparisons.js");

  isDeepEqual = comparison.isDeepEqual;
  isDeepStrictEqual = comparison.isDeepStrictEqual;
} // Escape control characters but not \n and \t to keep the line breaks and
// indentation intact.
// eslint-disable-next-line no-control-regex


var escapeSequencesRegExp = /[\x00-\x08\x0b\x0c\x0e-\x1f]/g;
var meta = ["\\u0000", "\\u0001", "\\u0002", "\\u0003", "\\u0004", "\\u0005", "\\u0006", "\\u0007", '\\b', '', '', "\\u000b", '\\f', '', "\\u000e", "\\u000f", "\\u0010", "\\u0011", "\\u0012", "\\u0013", "\\u0014", "\\u0015", "\\u0016", "\\u0017", "\\u0018", "\\u0019", "\\u001a", "\\u001b", "\\u001c", "\\u001d", "\\u001e", "\\u001f"];

var escapeFn = function escapeFn(str) {
  return meta[str.charCodeAt(0)];
};

var warned = false; // The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;
var NO_EXCEPTION_SENTINEL = {}; // All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided. All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function innerFail(obj) {
  if (obj.message instanceof Error) throw obj.message;
  throw new AssertionError(obj);
}

function fail(actual, expected, message, operator, stackStartFn) {
  var argsLen = arguments.length;
  var internalMessage;

  if (argsLen === 0) {
    internalMessage = 'Failed';
  } else if (argsLen === 1) {
    message = actual;
    actual = undefined;
  } else {
    if (warned === false) {
      warned = true;
      var warn = process.emitWarning ? process.emitWarning : console.warn.bind(console);
      warn('assert.fail() with more than one argument is deprecated. ' + 'Please use assert.strictEqual() instead or only pass a message.', 'DeprecationWarning', 'DEP0094');
    }

    if (argsLen === 2) operator = '!=';
  }

  if (message instanceof Error) throw message;
  var errArgs = {
    actual: actual,
    expected: expected,
    operator: operator === undefined ? 'fail' : operator,
    stackStartFn: stackStartFn || fail
  };

  if (message !== undefined) {
    errArgs.message = message;
  }

  var err = new AssertionError(errArgs);

  if (internalMessage) {
    err.message = internalMessage;
    err.generatedMessage = true;
  }

  throw err;
}

assert.fail = fail; // The AssertionError is defined in internal/error.

assert.AssertionError = AssertionError;

function innerOk(fn, argLen, value, message) {
  if (!value) {
    var generatedMessage = false;

    if (argLen === 0) {
      generatedMessage = true;
      message = 'No value argument passed to `assert.ok()`';
    } else if (message instanceof Error) {
      throw message;
    }

    var err = new AssertionError({
      actual: value,
      expected: true,
      message: message,
      operator: '==',
      stackStartFn: fn
    });
    err.generatedMessage = generatedMessage;
    throw err;
  }
} // Pure assertion tests whether a value is truthy, as determined
// by !!value.


function ok() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  innerOk.apply(void 0, [ok, args.length].concat(args));
}

assert.ok = ok; // The equality assertion tests shallow, coercive equality with ==.

/* eslint-disable no-restricted-properties */

assert.equal = function equal(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  } // eslint-disable-next-line eqeqeq


  if (actual != expected) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: '==',
      stackStartFn: equal
    });
  }
}; // The non-equality assertion tests for whether two objects are not
// equal with !=.


assert.notEqual = function notEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  } // eslint-disable-next-line eqeqeq


  if (actual == expected) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: '!=',
      stackStartFn: notEqual
    });
  }
}; // The equivalence assertion tests a deep equality relation.


assert.deepEqual = function deepEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (!isDeepEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'deepEqual',
      stackStartFn: deepEqual
    });
  }
}; // The non-equivalence assertion tests for any deep inequality.


assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (isDeepEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notDeepEqual',
      stackStartFn: notDeepEqual
    });
  }
};
/* eslint-enable */


assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (!isDeepStrictEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'deepStrictEqual',
      stackStartFn: deepStrictEqual
    });
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;

function notDeepStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (isDeepStrictEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notDeepStrictEqual',
      stackStartFn: notDeepStrictEqual
    });
  }
}

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (!objectIs(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'strictEqual',
      stackStartFn: strictEqual
    });
  }
};

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (objectIs(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notStrictEqual',
      stackStartFn: notStrictEqual
    });
  }
};

var Comparison = function Comparison(obj, keys, actual) {
  var _this = this;

  _classCallCheck(this, Comparison);

  keys.forEach(function (key) {
    if (key in obj) {
      if (actual !== undefined && typeof actual[key] === 'string' && isRegExp(obj[key]) && obj[key].test(actual[key])) {
        _this[key] = actual[key];
      } else {
        _this[key] = obj[key];
      }
    }
  });
};

function compareExceptionKey(actual, expected, key, message, keys, fn) {
  if (!(key in actual) || !isDeepStrictEqual(actual[key], expected[key])) {
    if (!message) {
      // Create placeholder objects to create a nice output.
      var a = new Comparison(actual, keys);
      var b = new Comparison(expected, keys, actual);
      var err = new AssertionError({
        actual: a,
        expected: b,
        operator: 'deepStrictEqual',
        stackStartFn: fn
      });
      err.actual = actual;
      err.expected = expected;
      err.operator = fn.name;
      throw err;
    }

    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: fn.name,
      stackStartFn: fn
    });
  }
}

function expectedException(actual, expected, msg, fn) {
  if (typeof expected !== 'function') {
    if (isRegExp(expected)) return expected.test(actual); // assert.doesNotThrow does not accept objects.

    if (arguments.length === 2) {
      throw new ERR_INVALID_ARG_TYPE('expected', ['Function', 'RegExp'], expected);
    } // Handle primitives properly.


    if (_typeof(actual) !== 'object' || actual === null) {
      var err = new AssertionError({
        actual: actual,
        expected: expected,
        message: msg,
        operator: 'deepStrictEqual',
        stackStartFn: fn
      });
      err.operator = fn.name;
      throw err;
    }

    var keys = Object.keys(expected); // Special handle errors to make sure the name and the message are compared
    // as well.

    if (expected instanceof Error) {
      keys.push('name', 'message');
    } else if (keys.length === 0) {
      throw new ERR_INVALID_ARG_VALUE('error', expected, 'may not be an empty object');
    }

    if (isDeepEqual === undefined) lazyLoadComparison();
    keys.forEach(function (key) {
      if (typeof actual[key] === 'string' && isRegExp(expected[key]) && expected[key].test(actual[key])) {
        return;
      }

      compareExceptionKey(actual, expected, key, msg, keys, fn);
    });
    return true;
  } // Guard instanceof against arrow functions as they don't have a prototype.


  if (expected.prototype !== undefined && actual instanceof expected) {
    return true;
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function getActual(fn) {
  if (typeof fn !== 'function') {
    throw new ERR_INVALID_ARG_TYPE('fn', 'Function', fn);
  }

  try {
    fn();
  } catch (e) {
    return e;
  }

  return NO_EXCEPTION_SENTINEL;
}

function checkIsPromise(obj) {
  // Accept native ES6 promises and promises that are implemented in a similar
  // way. Do not accept thenables that use a function as `obj` and that have no
  // `catch` handler.
  // TODO: thenables are checked up until they have the correct methods,
  // but according to documentation, the `then` method should receive
  // the `fulfill` and `reject` arguments as well or it may be never resolved.
  return isPromise(obj) || obj !== null && _typeof(obj) === 'object' && typeof obj.then === 'function' && typeof obj.catch === 'function';
}

function waitForActual(promiseFn) {
  return Promise.resolve().then(function () {
    var resultPromise;

    if (typeof promiseFn === 'function') {
      // Return a rejected promise if `promiseFn` throws synchronously.
      resultPromise = promiseFn(); // Fail in case no promise is returned.

      if (!checkIsPromise(resultPromise)) {
        throw new ERR_INVALID_RETURN_VALUE('instance of Promise', 'promiseFn', resultPromise);
      }
    } else if (checkIsPromise(promiseFn)) {
      resultPromise = promiseFn;
    } else {
      throw new ERR_INVALID_ARG_TYPE('promiseFn', ['Function', 'Promise'], promiseFn);
    }

    return Promise.resolve().then(function () {
      return resultPromise;
    }).then(function () {
      return NO_EXCEPTION_SENTINEL;
    }).catch(function (e) {
      return e;
    });
  });
}

function expectsError(stackStartFn, actual, error, message) {
  if (typeof error === 'string') {
    if (arguments.length === 4) {
      throw new ERR_INVALID_ARG_TYPE('error', ['Object', 'Error', 'Function', 'RegExp'], error);
    }

    if (_typeof(actual) === 'object' && actual !== null) {
      if (actual.message === error) {
        throw new ERR_AMBIGUOUS_ARGUMENT('error/message', "The error message \"".concat(actual.message, "\" is identical to the message."));
      }
    } else if (actual === error) {
      throw new ERR_AMBIGUOUS_ARGUMENT('error/message', "The error \"".concat(actual, "\" is identical to the message."));
    }

    message = error;
    error = undefined;
  } else if (error != null && _typeof(error) !== 'object' && typeof error !== 'function') {
    throw new ERR_INVALID_ARG_TYPE('error', ['Object', 'Error', 'Function', 'RegExp'], error);
  }

  if (actual === NO_EXCEPTION_SENTINEL) {
    var details = '';

    if (error && error.name) {
      details += " (".concat(error.name, ")");
    }

    details += message ? ": ".concat(message) : '.';
    var fnType = stackStartFn.name === 'rejects' ? 'rejection' : 'exception';
    innerFail({
      actual: undefined,
      expected: error,
      operator: stackStartFn.name,
      message: "Missing expected ".concat(fnType).concat(details),
      stackStartFn: stackStartFn
    });
  }

  if (error && !expectedException(actual, error, message, stackStartFn)) {
    throw actual;
  }
}

function expectsNoError(stackStartFn, actual, error, message) {
  if (actual === NO_EXCEPTION_SENTINEL) return;

  if (typeof error === 'string') {
    message = error;
    error = undefined;
  }

  if (!error || expectedException(actual, error)) {
    var details = message ? ": ".concat(message) : '.';
    var fnType = stackStartFn.name === 'doesNotReject' ? 'rejection' : 'exception';
    innerFail({
      actual: actual,
      expected: error,
      operator: stackStartFn.name,
      message: "Got unwanted ".concat(fnType).concat(details, "\n") + "Actual message: \"".concat(actual && actual.message, "\""),
      stackStartFn: stackStartFn
    });
  }

  throw actual;
}

assert.throws = function throws(promiseFn) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  expectsError.apply(void 0, [throws, getActual(promiseFn)].concat(args));
};

assert.rejects = function rejects(promiseFn) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return waitForActual(promiseFn).then(function (result) {
    return expectsError.apply(void 0, [rejects, result].concat(args));
  });
};

assert.doesNotThrow = function doesNotThrow(fn) {
  for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  expectsNoError.apply(void 0, [doesNotThrow, getActual(fn)].concat(args));
};

assert.doesNotReject = function doesNotReject(fn) {
  for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }

  return waitForActual(fn).then(function (result) {
    return expectsNoError.apply(void 0, [doesNotReject, result].concat(args));
  });
};

assert.ifError = function ifError(err) {
  if (err !== null && err !== undefined) {
    var message = 'ifError got unwanted exception: ';

    if (_typeof(err) === 'object' && typeof err.message === 'string') {
      if (err.message.length === 0 && err.constructor) {
        message += err.constructor.name;
      } else {
        message += err.message;
      }
    } else {
      message += inspect(err);
    }

    var newErr = new AssertionError({
      actual: err,
      expected: null,
      operator: 'ifError',
      message: message,
      stackStartFn: ifError
    }); // Make sure we actually have a stack trace!

    var origStack = err.stack;

    if (typeof origStack === 'string') {
      // This will remove any duplicated frames from the error frames taken
      // from within `ifError` and add the original error frames to the newly
      // created ones.
      var tmp2 = origStack.split('\n');
      tmp2.shift(); // Filter all frames existing in err.stack.

      var tmp1 = newErr.stack.split('\n');

      for (var i = 0; i < tmp2.length; i++) {
        // Find the first occurrence of the frame.
        var pos = tmp1.indexOf(tmp2[i]);

        if (pos !== -1) {
          // Only keep new frames.
          tmp1 = tmp1.slice(0, pos);
          break;
        }
      }

      newErr.stack = "".concat(tmp1.join('\n'), "\n").concat(tmp2.join('\n'));
    }

    throw newErr;
  }
}; // Expose a strict only variant of assert


function strict() {
  for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    args[_key6] = arguments[_key6];
  }

  innerOk.apply(void 0, [strict, args.length].concat(args));
}

assert.strict = objectAssign(strict, assert, {
  equal: assert.strictEqual,
  deepEqual: assert.deepStrictEqual,
  notEqual: assert.notStrictEqual,
  notDeepEqual: assert.notDeepStrictEqual
});
assert.strict.strict = assert.strict;

/***/ }),

/***/ "./node_modules/assert/build/internal/assert/assertion_error.js":
/*!**********************************************************************!*\
  !*** ./node_modules/assert/build/internal/assert/assertion_error.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");
// Currently in sync with Node.js lib/internal/assert/assertion_error.js
// https://github.com/nodejs/node/commit/0817840f775032169ddd70c85ac059f18ffcc81c


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _require = __webpack_require__(/*! util/ */ "./node_modules/util/util.js"),
    inspect = _require.inspect;

var _require2 = __webpack_require__(/*! ../errors */ "./node_modules/assert/build/internal/errors.js"),
    ERR_INVALID_ARG_TYPE = _require2.codes.ERR_INVALID_ARG_TYPE; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat


function repeat(str, count) {
  count = Math.floor(count);
  if (str.length == 0 || count == 0) return '';
  var maxCount = str.length * count;
  count = Math.floor(Math.log(count) / Math.log(2));

  while (count) {
    str += str;
    count--;
  }

  str += str.substring(0, maxCount - str.length);
  return str;
}

var blue = '';
var green = '';
var red = '';
var white = '';
var kReadableOperator = {
  deepStrictEqual: 'Expected values to be strictly deep-equal:',
  strictEqual: 'Expected values to be strictly equal:',
  strictEqualObject: 'Expected "actual" to be reference-equal to "expected":',
  deepEqual: 'Expected values to be loosely deep-equal:',
  equal: 'Expected values to be loosely equal:',
  notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:',
  notStrictEqual: 'Expected "actual" to be strictly unequal to:',
  notStrictEqualObject: 'Expected "actual" not to be reference-equal to "expected":',
  notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:',
  notEqual: 'Expected "actual" to be loosely unequal to:',
  notIdentical: 'Values identical but not reference-equal:'
}; // Comparing short primitives should just show === / !== instead of using the
// diff.

var kMaxShortLength = 10;

function copyError(source) {
  var keys = Object.keys(source);
  var target = Object.create(Object.getPrototypeOf(source));
  keys.forEach(function (key) {
    target[key] = source[key];
  });
  Object.defineProperty(target, 'message', {
    value: source.message
  });
  return target;
}

function inspectValue(val) {
  // The util.inspect default values could be changed. This makes sure the
  // error messages contain the necessary information nevertheless.
  return inspect(val, {
    compact: false,
    customInspect: false,
    depth: 1000,
    maxArrayLength: Infinity,
    // Assert compares only enumerable properties (with a few exceptions).
    showHidden: false,
    // Having a long line as error is better than wrapping the line for
    // comparison for now.
    // TODO(BridgeAR): `breakLength` should be limited as soon as soon as we
    // have meta information about the inspected properties (i.e., know where
    // in what line the property starts and ends).
    breakLength: Infinity,
    // Assert does not detect proxies currently.
    showProxy: false,
    sorted: true,
    // Inspect getters as we also check them when comparing entries.
    getters: true
  });
}

function createErrDiff(actual, expected, operator) {
  var other = '';
  var res = '';
  var lastPos = 0;
  var end = '';
  var skipped = false;
  var actualInspected = inspectValue(actual);
  var actualLines = actualInspected.split('\n');
  var expectedLines = inspectValue(expected).split('\n');
  var i = 0;
  var indicator = ''; // In case both values are objects explicitly mark them as not reference equal
  // for the `strictEqual` operator.

  if (operator === 'strictEqual' && _typeof(actual) === 'object' && _typeof(expected) === 'object' && actual !== null && expected !== null) {
    operator = 'strictEqualObject';
  } // If "actual" and "expected" fit on a single line and they are not strictly
  // equal, check further special handling.


  if (actualLines.length === 1 && expectedLines.length === 1 && actualLines[0] !== expectedLines[0]) {
    var inputLength = actualLines[0].length + expectedLines[0].length; // If the character length of "actual" and "expected" together is less than
    // kMaxShortLength and if neither is an object and at least one of them is
    // not `zero`, use the strict equal comparison to visualize the output.

    if (inputLength <= kMaxShortLength) {
      if ((_typeof(actual) !== 'object' || actual === null) && (_typeof(expected) !== 'object' || expected === null) && (actual !== 0 || expected !== 0)) {
        // -0 === +0
        return "".concat(kReadableOperator[operator], "\n\n") + "".concat(actualLines[0], " !== ").concat(expectedLines[0], "\n");
      }
    } else if (operator !== 'strictEqualObject') {
      // If the stderr is a tty and the input length is lower than the current
      // columns per line, add a mismatch indicator below the output. If it is
      // not a tty, use a default value of 80 characters.
      var maxLength = process.stderr && process.stderr.isTTY ? process.stderr.columns : 80;

      if (inputLength < maxLength) {
        while (actualLines[0][i] === expectedLines[0][i]) {
          i++;
        } // Ignore the first characters.


        if (i > 2) {
          // Add position indicator for the first mismatch in case it is a
          // single line and the input length is less than the column length.
          indicator = "\n  ".concat(repeat(' ', i), "^");
          i = 0;
        }
      }
    }
  } // Remove all ending lines that match (this optimizes the output for
  // readability by reducing the number of total changed lines).


  var a = actualLines[actualLines.length - 1];
  var b = expectedLines[expectedLines.length - 1];

  while (a === b) {
    if (i++ < 2) {
      end = "\n  ".concat(a).concat(end);
    } else {
      other = a;
    }

    actualLines.pop();
    expectedLines.pop();
    if (actualLines.length === 0 || expectedLines.length === 0) break;
    a = actualLines[actualLines.length - 1];
    b = expectedLines[expectedLines.length - 1];
  }

  var maxLines = Math.max(actualLines.length, expectedLines.length); // Strict equal with identical objects that are not identical by reference.
  // E.g., assert.deepStrictEqual({ a: Symbol() }, { a: Symbol() })

  if (maxLines === 0) {
    // We have to get the result again. The lines were all removed before.
    var _actualLines = actualInspected.split('\n'); // Only remove lines in case it makes sense to collapse those.
    // TODO: Accept env to always show the full error.


    if (_actualLines.length > 30) {
      _actualLines[26] = "".concat(blue, "...").concat(white);

      while (_actualLines.length > 27) {
        _actualLines.pop();
      }
    }

    return "".concat(kReadableOperator.notIdentical, "\n\n").concat(_actualLines.join('\n'), "\n");
  }

  if (i > 3) {
    end = "\n".concat(blue, "...").concat(white).concat(end);
    skipped = true;
  }

  if (other !== '') {
    end = "\n  ".concat(other).concat(end);
    other = '';
  }

  var printedLines = 0;
  var msg = kReadableOperator[operator] + "\n".concat(green, "+ actual").concat(white, " ").concat(red, "- expected").concat(white);
  var skippedMsg = " ".concat(blue, "...").concat(white, " Lines skipped");

  for (i = 0; i < maxLines; i++) {
    // Only extra expected lines exist
    var cur = i - lastPos;

    if (actualLines.length < i + 1) {
      // If the last diverging line is more than one line above and the
      // current line is at least line three, add some of the former lines and
      // also add dots to indicate skipped entries.
      if (cur > 1 && i > 2) {
        if (cur > 4) {
          res += "\n".concat(blue, "...").concat(white);
          skipped = true;
        } else if (cur > 3) {
          res += "\n  ".concat(expectedLines[i - 2]);
          printedLines++;
        }

        res += "\n  ".concat(expectedLines[i - 1]);
        printedLines++;
      } // Mark the current line as the last diverging one.


      lastPos = i; // Add the expected line to the cache.

      other += "\n".concat(red, "-").concat(white, " ").concat(expectedLines[i]);
      printedLines++; // Only extra actual lines exist
    } else if (expectedLines.length < i + 1) {
      // If the last diverging line is more than one line above and the
      // current line is at least line three, add some of the former lines and
      // also add dots to indicate skipped entries.
      if (cur > 1 && i > 2) {
        if (cur > 4) {
          res += "\n".concat(blue, "...").concat(white);
          skipped = true;
        } else if (cur > 3) {
          res += "\n  ".concat(actualLines[i - 2]);
          printedLines++;
        }

        res += "\n  ".concat(actualLines[i - 1]);
        printedLines++;
      } // Mark the current line as the last diverging one.


      lastPos = i; // Add the actual line to the result.

      res += "\n".concat(green, "+").concat(white, " ").concat(actualLines[i]);
      printedLines++; // Lines diverge
    } else {
      var expectedLine = expectedLines[i];
      var actualLine = actualLines[i]; // If the lines diverge, specifically check for lines that only diverge by
      // a trailing comma. In that case it is actually identical and we should
      // mark it as such.

      var divergingLines = actualLine !== expectedLine && (!endsWith(actualLine, ',') || actualLine.slice(0, -1) !== expectedLine); // If the expected line has a trailing comma but is otherwise identical,
      // add a comma at the end of the actual line. Otherwise the output could
      // look weird as in:
      //
      //   [
      //     1         // No comma at the end!
      // +   2
      //   ]
      //

      if (divergingLines && endsWith(expectedLine, ',') && expectedLine.slice(0, -1) === actualLine) {
        divergingLines = false;
        actualLine += ',';
      }

      if (divergingLines) {
        // If the last diverging line is more than one line above and the
        // current line is at least line three, add some of the former lines and
        // also add dots to indicate skipped entries.
        if (cur > 1 && i > 2) {
          if (cur > 4) {
            res += "\n".concat(blue, "...").concat(white);
            skipped = true;
          } else if (cur > 3) {
            res += "\n  ".concat(actualLines[i - 2]);
            printedLines++;
          }

          res += "\n  ".concat(actualLines[i - 1]);
          printedLines++;
        } // Mark the current line as the last diverging one.


        lastPos = i; // Add the actual line to the result and cache the expected diverging
        // line so consecutive diverging lines show up as +++--- and not +-+-+-.

        res += "\n".concat(green, "+").concat(white, " ").concat(actualLine);
        other += "\n".concat(red, "-").concat(white, " ").concat(expectedLine);
        printedLines += 2; // Lines are identical
      } else {
        // Add all cached information to the result before adding other things
        // and reset the cache.
        res += other;
        other = ''; // If the last diverging line is exactly one line above or if it is the
        // very first line, add the line to the result.

        if (cur === 1 || i === 0) {
          res += "\n  ".concat(actualLine);
          printedLines++;
        }
      }
    } // Inspected object to big (Show ~20 rows max)


    if (printedLines > 20 && i < maxLines - 2) {
      return "".concat(msg).concat(skippedMsg, "\n").concat(res, "\n").concat(blue, "...").concat(white).concat(other, "\n") + "".concat(blue, "...").concat(white);
    }
  }

  return "".concat(msg).concat(skipped ? skippedMsg : '', "\n").concat(res).concat(other).concat(end).concat(indicator);
}

var AssertionError =
/*#__PURE__*/
function (_Error) {
  _inherits(AssertionError, _Error);

  function AssertionError(options) {
    var _this;

    _classCallCheck(this, AssertionError);

    if (_typeof(options) !== 'object' || options === null) {
      throw new ERR_INVALID_ARG_TYPE('options', 'Object', options);
    }

    var message = options.message,
        operator = options.operator,
        stackStartFn = options.stackStartFn;
    var actual = options.actual,
        expected = options.expected;
    var limit = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;

    if (message != null) {
      _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, String(message)));
    } else {
      if (process.stderr && process.stderr.isTTY) {
        // Reset on each call to make sure we handle dynamically set environment
        // variables correct.
        if (process.stderr && process.stderr.getColorDepth && process.stderr.getColorDepth() !== 1) {
          blue = "\x1B[34m";
          green = "\x1B[32m";
          white = "\x1B[39m";
          red = "\x1B[31m";
        } else {
          blue = '';
          green = '';
          white = '';
          red = '';
        }
      } // Prevent the error stack from being visible by duplicating the error
      // in a very close way to the original in case both sides are actually
      // instances of Error.


      if (_typeof(actual) === 'object' && actual !== null && _typeof(expected) === 'object' && expected !== null && 'stack' in actual && actual instanceof Error && 'stack' in expected && expected instanceof Error) {
        actual = copyError(actual);
        expected = copyError(expected);
      }

      if (operator === 'deepStrictEqual' || operator === 'strictEqual') {
        _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, createErrDiff(actual, expected, operator)));
      } else if (operator === 'notDeepStrictEqual' || operator === 'notStrictEqual') {
        // In case the objects are equal but the operator requires unequal, show
        // the first object and say A equals B
        var base = kReadableOperator[operator];
        var res = inspectValue(actual).split('\n'); // In case "actual" is an object, it should not be reference equal.

        if (operator === 'notStrictEqual' && _typeof(actual) === 'object' && actual !== null) {
          base = kReadableOperator.notStrictEqualObject;
        } // Only remove lines in case it makes sense to collapse those.
        // TODO: Accept env to always show the full error.


        if (res.length > 30) {
          res[26] = "".concat(blue, "...").concat(white);

          while (res.length > 27) {
            res.pop();
          }
        } // Only print a single input.


        if (res.length === 1) {
          _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, "".concat(base, " ").concat(res[0])));
        } else {
          _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, "".concat(base, "\n\n").concat(res.join('\n'), "\n")));
        }
      } else {
        var _res = inspectValue(actual);

        var other = '';
        var knownOperators = kReadableOperator[operator];

        if (operator === 'notDeepEqual' || operator === 'notEqual') {
          _res = "".concat(kReadableOperator[operator], "\n\n").concat(_res);

          if (_res.length > 1024) {
            _res = "".concat(_res.slice(0, 1021), "...");
          }
        } else {
          other = "".concat(inspectValue(expected));

          if (_res.length > 512) {
            _res = "".concat(_res.slice(0, 509), "...");
          }

          if (other.length > 512) {
            other = "".concat(other.slice(0, 509), "...");
          }

          if (operator === 'deepEqual' || operator === 'equal') {
            _res = "".concat(knownOperators, "\n\n").concat(_res, "\n\nshould equal\n\n");
          } else {
            other = " ".concat(operator, " ").concat(other);
          }
        }

        _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, "".concat(_res).concat(other)));
      }
    }

    Error.stackTraceLimit = limit;
    _this.generatedMessage = !message;
    Object.defineProperty(_assertThisInitialized(_this), 'name', {
      value: 'AssertionError [ERR_ASSERTION]',
      enumerable: false,
      writable: true,
      configurable: true
    });
    _this.code = 'ERR_ASSERTION';
    _this.actual = actual;
    _this.expected = expected;
    _this.operator = operator;

    if (Error.captureStackTrace) {
      // eslint-disable-next-line no-restricted-syntax
      Error.captureStackTrace(_assertThisInitialized(_this), stackStartFn);
    } // Create error message including the error code in the name.


    _this.stack; // Reset the name.

    _this.name = 'AssertionError';
    return _possibleConstructorReturn(_this);
  }

  _createClass(AssertionError, [{
    key: "toString",
    value: function toString() {
      return "".concat(this.name, " [").concat(this.code, "]: ").concat(this.message);
    }
  }, {
    key: inspect.custom,
    value: function value(recurseTimes, ctx) {
      // This limits the `actual` and `expected` property default inspection to
      // the minimum depth. Otherwise those values would be too verbose compared
      // to the actual error message which contains a combined view of these two
      // input values.
      return inspect(this, _objectSpread({}, ctx, {
        customInspect: false,
        depth: 0
      }));
    }
  }]);

  return AssertionError;
}(_wrapNativeSuper(Error));

module.exports = AssertionError;

/***/ }),

/***/ "./node_modules/assert/build/internal/errors.js":
/*!******************************************************!*\
  !*** ./node_modules/assert/build/internal/errors.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/errors.js
// https://github.com/nodejs/node/commit/3b044962c48fe313905877a96b5d0894a5404f6f

/* eslint node-core/documented-errors: "error" */

/* eslint node-core/alphabetize-errors: "error" */

/* eslint node-core/prefer-util-format-errors: "error" */
 // The whole point behind this internal module is to allow Node.js to no
// longer be forced to treat every error message change as a semver-major
// change. The NodeError classes here all expose a `code` property whose
// value statically and permanently identifies the error. While the error
// message may change, the code should not.

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var codes = {}; // Lazy loaded

var assert;
var util;

function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }

  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }

  var NodeError =
  /*#__PURE__*/
  function (_Base) {
    _inherits(NodeError, _Base);

    function NodeError(arg1, arg2, arg3) {
      var _this;

      _classCallCheck(this, NodeError);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(NodeError).call(this, getMessage(arg1, arg2, arg3)));
      _this.code = code;
      return _this;
    }

    return NodeError;
  }(Base);

  codes[code] = NodeError;
} // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js


function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });

    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith


function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes


function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}

createErrorType('ERR_AMBIGUOUS_ARGUMENT', 'The "%s" argument is ambiguous. %s', TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  if (assert === undefined) assert = __webpack_require__(/*! ../assert */ "./node_modules/assert/build/assert.js");
  assert(typeof name === 'string', "'name' must be a string"); // determiner: 'must be' or 'must not be'

  var determiner;

  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }

  var msg;

  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } // TODO(BridgeAR): Improve the output by showing `null` and similar.


  msg += ". Received type ".concat(_typeof(actual));
  return msg;
}, TypeError);
createErrorType('ERR_INVALID_ARG_VALUE', function (name, value) {
  var reason = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'is invalid';
  if (util === undefined) util = __webpack_require__(/*! util/ */ "./node_modules/util/util.js");
  var inspected = util.inspect(value);

  if (inspected.length > 128) {
    inspected = "".concat(inspected.slice(0, 128), "...");
  }

  return "The argument '".concat(name, "' ").concat(reason, ". Received ").concat(inspected);
}, TypeError, RangeError);
createErrorType('ERR_INVALID_RETURN_VALUE', function (input, name, value) {
  var type;

  if (value && value.constructor && value.constructor.name) {
    type = "instance of ".concat(value.constructor.name);
  } else {
    type = "type ".concat(_typeof(value));
  }

  return "Expected ".concat(input, " to be returned from the \"").concat(name, "\"") + " function but got ".concat(type, ".");
}, TypeError);
createErrorType('ERR_MISSING_ARGS', function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (assert === undefined) assert = __webpack_require__(/*! ../assert */ "./node_modules/assert/build/assert.js");
  assert(args.length > 0, 'At least one arg needs to be specified');
  var msg = 'The ';
  var len = args.length;
  args = args.map(function (a) {
    return "\"".concat(a, "\"");
  });

  switch (len) {
    case 1:
      msg += "".concat(args[0], " argument");
      break;

    case 2:
      msg += "".concat(args[0], " and ").concat(args[1], " arguments");
      break;

    default:
      msg += args.slice(0, len - 1).join(', ');
      msg += ", and ".concat(args[len - 1], " arguments");
      break;
  }

  return "".concat(msg, " must be specified");
}, TypeError);
module.exports.codes = codes;

/***/ }),

/***/ "./node_modules/assert/build/internal/util/comparisons.js":
/*!****************************************************************!*\
  !*** ./node_modules/assert/build/internal/util/comparisons.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/util/comparisons.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var regexFlagsSupported = /a/g.flags !== undefined;

var arrayFromSet = function arrayFromSet(set) {
  var array = [];
  set.forEach(function (value) {
    return array.push(value);
  });
  return array;
};

var arrayFromMap = function arrayFromMap(map) {
  var array = [];
  map.forEach(function (value, key) {
    return array.push([key, value]);
  });
  return array;
};

var objectIs = Object.is ? Object.is : __webpack_require__(/*! object-is */ "./node_modules/object-is/index.js");
var objectGetOwnPropertySymbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols : function () {
  return [];
};
var numberIsNaN = Number.isNaN ? Number.isNaN : __webpack_require__(/*! is-nan */ "./node_modules/is-nan/index.js");

function uncurryThis(f) {
  return f.call.bind(f);
}

var hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);
var propertyIsEnumerable = uncurryThis(Object.prototype.propertyIsEnumerable);
var objectToString = uncurryThis(Object.prototype.toString);

var _require$types = (__webpack_require__(/*! util/ */ "./node_modules/util/util.js").types),
    isAnyArrayBuffer = _require$types.isAnyArrayBuffer,
    isArrayBufferView = _require$types.isArrayBufferView,
    isDate = _require$types.isDate,
    isMap = _require$types.isMap,
    isRegExp = _require$types.isRegExp,
    isSet = _require$types.isSet,
    isNativeError = _require$types.isNativeError,
    isBoxedPrimitive = _require$types.isBoxedPrimitive,
    isNumberObject = _require$types.isNumberObject,
    isStringObject = _require$types.isStringObject,
    isBooleanObject = _require$types.isBooleanObject,
    isBigIntObject = _require$types.isBigIntObject,
    isSymbolObject = _require$types.isSymbolObject,
    isFloat32Array = _require$types.isFloat32Array,
    isFloat64Array = _require$types.isFloat64Array;

function isNonIndex(key) {
  if (key.length === 0 || key.length > 10) return true;

  for (var i = 0; i < key.length; i++) {
    var code = key.charCodeAt(i);
    if (code < 48 || code > 57) return true;
  } // The maximum size for an array is 2 ** 32 -1.


  return key.length === 10 && key >= Math.pow(2, 32);
}

function getOwnNonIndexProperties(value) {
  return Object.keys(value).filter(isNonIndex).concat(objectGetOwnPropertySymbols(value).filter(Object.prototype.propertyIsEnumerable.bind(value)));
} // Taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */


function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }

  if (y < x) {
    return 1;
  }

  return 0;
}

var ONLY_ENUMERABLE = undefined;
var kStrict = true;
var kLoose = false;
var kNoIterator = 0;
var kIsArray = 1;
var kIsSet = 2;
var kIsMap = 3; // Check if they have the same source and flags

function areSimilarRegExps(a, b) {
  return regexFlagsSupported ? a.source === b.source && a.flags === b.flags : RegExp.prototype.toString.call(a) === RegExp.prototype.toString.call(b);
}

function areSimilarFloatArrays(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }

  for (var offset = 0; offset < a.byteLength; offset++) {
    if (a[offset] !== b[offset]) {
      return false;
    }
  }

  return true;
}

function areSimilarTypedArrays(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }

  return compare(new Uint8Array(a.buffer, a.byteOffset, a.byteLength), new Uint8Array(b.buffer, b.byteOffset, b.byteLength)) === 0;
}

function areEqualArrayBuffers(buf1, buf2) {
  return buf1.byteLength === buf2.byteLength && compare(new Uint8Array(buf1), new Uint8Array(buf2)) === 0;
}

function isEqualBoxedPrimitive(val1, val2) {
  if (isNumberObject(val1)) {
    return isNumberObject(val2) && objectIs(Number.prototype.valueOf.call(val1), Number.prototype.valueOf.call(val2));
  }

  if (isStringObject(val1)) {
    return isStringObject(val2) && String.prototype.valueOf.call(val1) === String.prototype.valueOf.call(val2);
  }

  if (isBooleanObject(val1)) {
    return isBooleanObject(val2) && Boolean.prototype.valueOf.call(val1) === Boolean.prototype.valueOf.call(val2);
  }

  if (isBigIntObject(val1)) {
    return isBigIntObject(val2) && BigInt.prototype.valueOf.call(val1) === BigInt.prototype.valueOf.call(val2);
  }

  return isSymbolObject(val2) && Symbol.prototype.valueOf.call(val1) === Symbol.prototype.valueOf.call(val2);
} // Notes: Type tags are historical [[Class]] properties that can be set by
// FunctionTemplate::SetClassName() in C++ or Symbol.toStringTag in JS
// and retrieved using Object.prototype.toString.call(obj) in JS
// See https://tc39.github.io/ecma262/#sec-object.prototype.tostring
// for a list of tags pre-defined in the spec.
// There are some unspecified tags in the wild too (e.g. typed array tags).
// Since tags can be altered, they only serve fast failures
//
// Typed arrays and buffers are checked by comparing the content in their
// underlying ArrayBuffer. This optimization requires that it's
// reasonable to interpret their underlying memory in the same way,
// which is checked by comparing their type tags.
// (e.g. a Uint8Array and a Uint16Array with the same memory content
// could still be different because they will be interpreted differently).
//
// For strict comparison, objects should have
// a) The same built-in type tags
// b) The same prototypes.


function innerDeepEqual(val1, val2, strict, memos) {
  // All identical values are equivalent, as determined by ===.
  if (val1 === val2) {
    if (val1 !== 0) return true;
    return strict ? objectIs(val1, val2) : true;
  } // Check more closely if val1 and val2 are equal.


  if (strict) {
    if (_typeof(val1) !== 'object') {
      return typeof val1 === 'number' && numberIsNaN(val1) && numberIsNaN(val2);
    }

    if (_typeof(val2) !== 'object' || val1 === null || val2 === null) {
      return false;
    }

    if (Object.getPrototypeOf(val1) !== Object.getPrototypeOf(val2)) {
      return false;
    }
  } else {
    if (val1 === null || _typeof(val1) !== 'object') {
      if (val2 === null || _typeof(val2) !== 'object') {
        // eslint-disable-next-line eqeqeq
        return val1 == val2;
      }

      return false;
    }

    if (val2 === null || _typeof(val2) !== 'object') {
      return false;
    }
  }

  var val1Tag = objectToString(val1);
  var val2Tag = objectToString(val2);

  if (val1Tag !== val2Tag) {
    return false;
  }

  if (Array.isArray(val1)) {
    // Check for sparse arrays and general fast path
    if (val1.length !== val2.length) {
      return false;
    }

    var keys1 = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
    var keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);

    if (keys1.length !== keys2.length) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kIsArray, keys1);
  } // [browserify] This triggers on certain types in IE (Map/Set) so we don't
  // wan't to early return out of the rest of the checks. However we can check
  // if the second value is one of these values and the first isn't.


  if (val1Tag === '[object Object]') {
    // return keyCheck(val1, val2, strict, memos, kNoIterator);
    if (!isMap(val1) && isMap(val2) || !isSet(val1) && isSet(val2)) {
      return false;
    }
  }

  if (isDate(val1)) {
    if (!isDate(val2) || Date.prototype.getTime.call(val1) !== Date.prototype.getTime.call(val2)) {
      return false;
    }
  } else if (isRegExp(val1)) {
    if (!isRegExp(val2) || !areSimilarRegExps(val1, val2)) {
      return false;
    }
  } else if (isNativeError(val1) || val1 instanceof Error) {
    // Do not compare the stack as it might differ even though the error itself
    // is otherwise identical.
    if (val1.message !== val2.message || val1.name !== val2.name) {
      return false;
    }
  } else if (isArrayBufferView(val1)) {
    if (!strict && (isFloat32Array(val1) || isFloat64Array(val1))) {
      if (!areSimilarFloatArrays(val1, val2)) {
        return false;
      }
    } else if (!areSimilarTypedArrays(val1, val2)) {
      return false;
    } // Buffer.compare returns true, so val1.length === val2.length. If they both
    // only contain numeric keys, we don't need to exam further than checking
    // the symbols.


    var _keys = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);

    var _keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);

    if (_keys.length !== _keys2.length) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kNoIterator, _keys);
  } else if (isSet(val1)) {
    if (!isSet(val2) || val1.size !== val2.size) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kIsSet);
  } else if (isMap(val1)) {
    if (!isMap(val2) || val1.size !== val2.size) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kIsMap);
  } else if (isAnyArrayBuffer(val1)) {
    if (!areEqualArrayBuffers(val1, val2)) {
      return false;
    }
  } else if (isBoxedPrimitive(val1) && !isEqualBoxedPrimitive(val1, val2)) {
    return false;
  }

  return keyCheck(val1, val2, strict, memos, kNoIterator);
}

function getEnumerables(val, keys) {
  return keys.filter(function (k) {
    return propertyIsEnumerable(val, k);
  });
}

function keyCheck(val1, val2, strict, memos, iterationType, aKeys) {
  // For all remaining Object pairs, including Array, objects and Maps,
  // equivalence is determined by having:
  // a) The same number of owned enumerable properties
  // b) The same set of keys/indexes (although not necessarily the same order)
  // c) Equivalent values for every corresponding key/index
  // d) For Sets and Maps, equal contents
  // Note: this accounts for both named and indexed properties on Arrays.
  if (arguments.length === 5) {
    aKeys = Object.keys(val1);
    var bKeys = Object.keys(val2); // The pair must have the same number of owned properties.

    if (aKeys.length !== bKeys.length) {
      return false;
    }
  } // Cheap key test


  var i = 0;

  for (; i < aKeys.length; i++) {
    if (!hasOwnProperty(val2, aKeys[i])) {
      return false;
    }
  }

  if (strict && arguments.length === 5) {
    var symbolKeysA = objectGetOwnPropertySymbols(val1);

    if (symbolKeysA.length !== 0) {
      var count = 0;

      for (i = 0; i < symbolKeysA.length; i++) {
        var key = symbolKeysA[i];

        if (propertyIsEnumerable(val1, key)) {
          if (!propertyIsEnumerable(val2, key)) {
            return false;
          }

          aKeys.push(key);
          count++;
        } else if (propertyIsEnumerable(val2, key)) {
          return false;
        }
      }

      var symbolKeysB = objectGetOwnPropertySymbols(val2);

      if (symbolKeysA.length !== symbolKeysB.length && getEnumerables(val2, symbolKeysB).length !== count) {
        return false;
      }
    } else {
      var _symbolKeysB = objectGetOwnPropertySymbols(val2);

      if (_symbolKeysB.length !== 0 && getEnumerables(val2, _symbolKeysB).length !== 0) {
        return false;
      }
    }
  }

  if (aKeys.length === 0 && (iterationType === kNoIterator || iterationType === kIsArray && val1.length === 0 || val1.size === 0)) {
    return true;
  } // Use memos to handle cycles.


  if (memos === undefined) {
    memos = {
      val1: new Map(),
      val2: new Map(),
      position: 0
    };
  } else {
    // We prevent up to two map.has(x) calls by directly retrieving the value
    // and checking for undefined. The map can only contain numbers, so it is
    // safe to check for undefined only.
    var val2MemoA = memos.val1.get(val1);

    if (val2MemoA !== undefined) {
      var val2MemoB = memos.val2.get(val2);

      if (val2MemoB !== undefined) {
        return val2MemoA === val2MemoB;
      }
    }

    memos.position++;
  }

  memos.val1.set(val1, memos.position);
  memos.val2.set(val2, memos.position);
  var areEq = objEquiv(val1, val2, strict, aKeys, memos, iterationType);
  memos.val1.delete(val1);
  memos.val2.delete(val2);
  return areEq;
}

function setHasEqualElement(set, val1, strict, memo) {
  // Go looking.
  var setValues = arrayFromSet(set);

  for (var i = 0; i < setValues.length; i++) {
    var val2 = setValues[i];

    if (innerDeepEqual(val1, val2, strict, memo)) {
      // Remove the matching element to make sure we do not check that again.
      set.delete(val2);
      return true;
    }
  }

  return false;
} // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Loose_equality_using
// Sadly it is not possible to detect corresponding values properly in case the
// type is a string, number, bigint or boolean. The reason is that those values
// can match lots of different string values (e.g., 1n == '+00001').


function findLooseMatchingPrimitives(prim) {
  switch (_typeof(prim)) {
    case 'undefined':
      return null;

    case 'object':
      // Only pass in null as object!
      return undefined;

    case 'symbol':
      return false;

    case 'string':
      prim = +prim;
    // Loose equal entries exist only if the string is possible to convert to
    // a regular number and not NaN.
    // Fall through

    case 'number':
      if (numberIsNaN(prim)) {
        return false;
      }

  }

  return true;
}

function setMightHaveLoosePrim(a, b, prim) {
  var altValue = findLooseMatchingPrimitives(prim);
  if (altValue != null) return altValue;
  return b.has(altValue) && !a.has(altValue);
}

function mapMightHaveLoosePrim(a, b, prim, item, memo) {
  var altValue = findLooseMatchingPrimitives(prim);

  if (altValue != null) {
    return altValue;
  }

  var curB = b.get(altValue);

  if (curB === undefined && !b.has(altValue) || !innerDeepEqual(item, curB, false, memo)) {
    return false;
  }

  return !a.has(altValue) && innerDeepEqual(item, curB, false, memo);
}

function setEquiv(a, b, strict, memo) {
  // This is a lazily initiated Set of entries which have to be compared
  // pairwise.
  var set = null;
  var aValues = arrayFromSet(a);

  for (var i = 0; i < aValues.length; i++) {
    var val = aValues[i]; // Note: Checking for the objects first improves the performance for object
    // heavy sets but it is a minor slow down for primitives. As they are fast
    // to check this improves the worst case scenario instead.

    if (_typeof(val) === 'object' && val !== null) {
      if (set === null) {
        set = new Set();
      } // If the specified value doesn't exist in the second set its an not null
      // object (or non strict only: a not matching primitive) we'll need to go
      // hunting for something thats deep-(strict-)equal to it. To make this
      // O(n log n) complexity we have to copy these values in a new set first.


      set.add(val);
    } else if (!b.has(val)) {
      if (strict) return false; // Fast path to detect missing string, symbol, undefined and null values.

      if (!setMightHaveLoosePrim(a, b, val)) {
        return false;
      }

      if (set === null) {
        set = new Set();
      }

      set.add(val);
    }
  }

  if (set !== null) {
    var bValues = arrayFromSet(b);

    for (var _i = 0; _i < bValues.length; _i++) {
      var _val = bValues[_i]; // We have to check if a primitive value is already
      // matching and only if it's not, go hunting for it.

      if (_typeof(_val) === 'object' && _val !== null) {
        if (!setHasEqualElement(set, _val, strict, memo)) return false;
      } else if (!strict && !a.has(_val) && !setHasEqualElement(set, _val, strict, memo)) {
        return false;
      }
    }

    return set.size === 0;
  }

  return true;
}

function mapHasEqualEntry(set, map, key1, item1, strict, memo) {
  // To be able to handle cases like:
  //   Map([[{}, 'a'], [{}, 'b']]) vs Map([[{}, 'b'], [{}, 'a']])
  // ... we need to consider *all* matching keys, not just the first we find.
  var setValues = arrayFromSet(set);

  for (var i = 0; i < setValues.length; i++) {
    var key2 = setValues[i];

    if (innerDeepEqual(key1, key2, strict, memo) && innerDeepEqual(item1, map.get(key2), strict, memo)) {
      set.delete(key2);
      return true;
    }
  }

  return false;
}

function mapEquiv(a, b, strict, memo) {
  var set = null;
  var aEntries = arrayFromMap(a);

  for (var i = 0; i < aEntries.length; i++) {
    var _aEntries$i = _slicedToArray(aEntries[i], 2),
        key = _aEntries$i[0],
        item1 = _aEntries$i[1];

    if (_typeof(key) === 'object' && key !== null) {
      if (set === null) {
        set = new Set();
      }

      set.add(key);
    } else {
      // By directly retrieving the value we prevent another b.has(key) check in
      // almost all possible cases.
      var item2 = b.get(key);

      if (item2 === undefined && !b.has(key) || !innerDeepEqual(item1, item2, strict, memo)) {
        if (strict) return false; // Fast path to detect missing string, symbol, undefined and null
        // keys.

        if (!mapMightHaveLoosePrim(a, b, key, item1, memo)) return false;

        if (set === null) {
          set = new Set();
        }

        set.add(key);
      }
    }
  }

  if (set !== null) {
    var bEntries = arrayFromMap(b);

    for (var _i2 = 0; _i2 < bEntries.length; _i2++) {
      var _bEntries$_i = _slicedToArray(bEntries[_i2], 2),
          key = _bEntries$_i[0],
          item = _bEntries$_i[1];

      if (_typeof(key) === 'object' && key !== null) {
        if (!mapHasEqualEntry(set, a, key, item, strict, memo)) return false;
      } else if (!strict && (!a.has(key) || !innerDeepEqual(a.get(key), item, false, memo)) && !mapHasEqualEntry(set, a, key, item, false, memo)) {
        return false;
      }
    }

    return set.size === 0;
  }

  return true;
}

function objEquiv(a, b, strict, keys, memos, iterationType) {
  // Sets and maps don't have their entries accessible via normal object
  // properties.
  var i = 0;

  if (iterationType === kIsSet) {
    if (!setEquiv(a, b, strict, memos)) {
      return false;
    }
  } else if (iterationType === kIsMap) {
    if (!mapEquiv(a, b, strict, memos)) {
      return false;
    }
  } else if (iterationType === kIsArray) {
    for (; i < a.length; i++) {
      if (hasOwnProperty(a, i)) {
        if (!hasOwnProperty(b, i) || !innerDeepEqual(a[i], b[i], strict, memos)) {
          return false;
        }
      } else if (hasOwnProperty(b, i)) {
        return false;
      } else {
        // Array is sparse.
        var keysA = Object.keys(a);

        for (; i < keysA.length; i++) {
          var key = keysA[i];

          if (!hasOwnProperty(b, key) || !innerDeepEqual(a[key], b[key], strict, memos)) {
            return false;
          }
        }

        if (keysA.length !== Object.keys(b).length) {
          return false;
        }

        return true;
      }
    }
  } // The pair must have equivalent values for every corresponding key.
  // Possibly expensive deep test:


  for (i = 0; i < keys.length; i++) {
    var _key = keys[i];

    if (!innerDeepEqual(a[_key], b[_key], strict, memos)) {
      return false;
    }
  }

  return true;
}

function isDeepEqual(val1, val2) {
  return innerDeepEqual(val1, val2, kLoose);
}

function isDeepStrictEqual(val1, val2) {
  return innerDeepEqual(val1, val2, kStrict);
}

module.exports = {
  isDeepEqual: isDeepEqual,
  isDeepStrictEqual: isDeepStrictEqual
};

/***/ }),

/***/ "./node_modules/call-bind/callBound.js":
/*!*********************************************!*\
  !*** ./node_modules/call-bind/callBound.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var callBind = __webpack_require__(/*! ./ */ "./node_modules/call-bind/index.js");

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};


/***/ }),

/***/ "./node_modules/call-bind/index.js":
/*!*****************************************!*\
  !*** ./node_modules/call-bind/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	var func = $reflectApply(bind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc = $gOPD(func, 'length');
		if (desc.configurable) {
			// original length, plus the receiver, minus any additional arguments (after the receiver)
			$defineProperty(
				func,
				'length',
				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
			);
		}
	}
	return func;
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}


/***/ }),

/***/ "./node_modules/console-browserify/index.js":
/*!**************************************************!*\
  !*** ./node_modules/console-browserify/index.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*global window, global*/
var util = __webpack_require__(/*! util */ "./node_modules/util/util.js")
var assert = __webpack_require__(/*! assert */ "./node_modules/assert/build/assert.js")
function now() { return new Date().getTime() }

var slice = Array.prototype.slice
var console
var times = {}

if (typeof __webpack_require__.g !== "undefined" && __webpack_require__.g.console) {
    console = __webpack_require__.g.console
} else if (typeof window !== "undefined" && window.console) {
    console = window.console
} else {
    console = {}
}

var functions = [
    [log, "log"],
    [info, "info"],
    [warn, "warn"],
    [error, "error"],
    [time, "time"],
    [timeEnd, "timeEnd"],
    [trace, "trace"],
    [dir, "dir"],
    [consoleAssert, "assert"]
]

for (var i = 0; i < functions.length; i++) {
    var tuple = functions[i]
    var f = tuple[0]
    var name = tuple[1]

    if (!console[name]) {
        console[name] = f
    }
}

module.exports = console

function log() {}

function info() {
    console.log.apply(console, arguments)
}

function warn() {
    console.log.apply(console, arguments)
}

function error() {
    console.warn.apply(console, arguments)
}

function time(label) {
    times[label] = now()
}

function timeEnd(label) {
    var time = times[label]
    if (!time) {
        throw new Error("No such label: " + label)
    }

    delete times[label]
    var duration = now() - time
    console.log(label + ": " + duration + "ms")
}

function trace() {
    var err = new Error()
    err.name = "Trace"
    err.message = util.format.apply(null, arguments)
    console.error(err.stack)
}

function dir(object) {
    console.log(util.inspect(object) + "\n")
}

function consoleAssert(expression) {
    if (!expression) {
        var arr = slice.call(arguments, 1)
        assert.ok(false, util.format.apply(null, arr))
    }
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@nextcloud/dialogs/dist/index.css":
/*!**********************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@nextcloud/dialogs/dist/index.css ***!
  \**********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTYiIHdpZHRoPSIxNiI+CiAgPHBhdGggZD0iTTE0IDEyLjNMMTIuMyAxNCA4IDkuNyAzLjcgMTQgMiAxMi4zIDYuMyA4IDIgMy43IDMuNyAyIDggNi4zIDEyLjMgMiAxNCAzLjcgOS43IDh6Ii8+Cjwvc3ZnPgo= */ "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTYiIHdpZHRoPSIxNiI+CiAgPHBhdGggZD0iTTE0IDEyLjNMMTIuMyAxNCA4IDkuNyAzLjcgMTQgMiAxMi4zIDYuMyA4IDIgMy43IDMuNyAyIDggNi4zIDEyLjMgMiAxNCAzLjcgOS43IDh6Ii8+Cjwvc3ZnPgo="), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTYiIHdpZHRoPSIxNiI+CiAgPHBhdGggZD0iTTE0IDEyLjNMMTIuMyAxNCA4IDkuNyAzLjcgMTQgMiAxMi4zIDYuMyA4IDIgMy43IDMuNyAyIDggNi4zIDEyLjMgMiAxNCAzLjcgOS43IDh6IiBzdHlsZT0iZmlsbC1vcGFjaXR5OjE7ZmlsbDojZmZmZmZmIi8+Cjwvc3ZnPgo= */ "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTYiIHdpZHRoPSIxNiI+CiAgPHBhdGggZD0iTTE0IDEyLjNMMTIuMyAxNCA4IDkuNyAzLjcgMTQgMiAxMi4zIDYuMyA4IDIgMy43IDMuNyAyIDggNi4zIDEyLjMgMiAxNCAzLjcgOS43IDh6IiBzdHlsZT0iZmlsbC1vcGFjaXR5OjE7ZmlsbDojZmZmZmZmIi8+Cjwvc3ZnPgo="), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n/**\n * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>\n *\n * @author Julius Härtl <jus@bitgrid.net>\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n */\n.toastify.dialogs {\n  min-width: 200px;\n  background: none;\n  background-color: var(--color-main-background);\n  color: var(--color-main-text);\n  box-shadow: 0 0 6px 0 var(--color-box-shadow);\n  padding: 0 12px;\n  margin-top: 45px;\n  position: fixed;\n  z-index: 10100;\n  border-radius: var(--border-radius);\n  display: flex;\n  align-items: center;\n}\n.toastify.dialogs .toast-undo-container {\n  display: flex;\n  align-items: center;\n}\n.toastify.dialogs .toast-undo-button,\n.toastify.dialogs .toast-close {\n  position: static;\n  overflow: hidden;\n  box-sizing: border-box;\n  min-width: 44px;\n  height: 100%;\n  padding: 12px;\n  white-space: nowrap;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-color: transparent;\n  min-height: 0;\n}\n.toastify.dialogs .toast-undo-button.toast-close,\n.toastify.dialogs .toast-close.toast-close {\n  text-indent: 0;\n  opacity: 0.4;\n  border: none;\n  min-height: 44px;\n  margin-left: 10px;\n  font-size: 0;\n  /* dark theme overrides for Nextcloud 25 and later */\n}\n.toastify.dialogs .toast-undo-button.toast-close::before,\n.toastify.dialogs .toast-close.toast-close::before {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  content: \" \";\n  filter: var(--background-invert-if-dark);\n  display: inline-block;\n  width: 16px;\n  height: 16px;\n}\n.toastify.dialogs .toast-undo-button.toast-undo-button,\n.toastify.dialogs .toast-close.toast-undo-button {\n  margin: 3px;\n  height: calc(100% - 2 * 3px);\n  margin-left: 12px;\n}\n.toastify.dialogs .toast-undo-button:hover, .toastify.dialogs .toast-undo-button:focus, .toastify.dialogs .toast-undo-button:active,\n.toastify.dialogs .toast-close:hover,\n.toastify.dialogs .toast-close:focus,\n.toastify.dialogs .toast-close:active {\n  cursor: pointer;\n  opacity: 1;\n}\n.toastify.dialogs.toastify-top {\n  right: 10px;\n}\n.toastify.dialogs.toast-with-click {\n  cursor: pointer;\n}\n.toastify.dialogs.toast-error {\n  border-left: 3px solid var(--color-error);\n}\n.toastify.dialogs.toast-info {\n  border-left: 3px solid var(--color-primary);\n}\n.toastify.dialogs.toast-warning {\n  border-left: 3px solid var(--color-warning);\n}\n.toastify.dialogs.toast-success {\n  border-left: 3px solid var(--color-success);\n}\n.toastify.dialogs.toast-undo {\n  border-left: 3px solid var(--color-success);\n}\n\n/* dark theme overrides for Nextcloud 24 and earlier */\n.theme--dark .toastify.dialogs .toast-close {\n  /* close icon style */\n}\n.theme--dark .toastify.dialogs .toast-close.toast-close::before {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ "./node_modules/define-properties/index.js":
/*!*************************************************!*\
  !*** ./node_modules/define-properties/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keys = __webpack_require__(/*! object-keys */ "./node_modules/object-keys/index.js");
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var hasPropertyDescriptors = __webpack_require__(/*! has-property-descriptors */ "./node_modules/has-property-descriptors/index.js")();

var supportsDescriptors = origDefineProperty && hasPropertyDescriptors;

var defineProperty = function (object, name, value, predicate) {
	if (name in object) {
		if (predicate === true) {
			if (object[name] === value) {
				return;
			}
		} else if (!isFunction(predicate) || !predicate()) {
			return;
		}
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value; // eslint-disable-line no-param-reassign
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;


/***/ }),

/***/ "./node_modules/es6-object-assign/index.js":
/*!*************************************************!*\
  !*** ./node_modules/es6-object-assign/index.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
/**
 * Code refactored from Mozilla Developer Network:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */



function assign(target, firstSource) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert first argument to object');
  }

  var to = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i];
    if (nextSource === undefined || nextSource === null) {
      continue;
    }

    var keysArray = Object.keys(Object(nextSource));
    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey = keysArray[nextIndex];
      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
      if (desc !== undefined && desc.enumerable) {
        to[nextKey] = nextSource[nextKey];
      }
    }
  }
  return to;
}

function polyfill() {
  if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: assign
    });
  }
}

module.exports = {
  assign: assign,
  polyfill: polyfill
};


/***/ }),

/***/ "./node_modules/for-each/index.js":
/*!****************************************!*\
  !*** ./node_modules/for-each/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isCallable = __webpack_require__(/*! is-callable */ "./node_modules/is-callable/index.js");

var toStr = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

var forEachArray = function forEachArray(array, iterator, receiver) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
                iterator(array[i], i, array);
            } else {
                iterator.call(receiver, array[i], i, array);
            }
        }
    }
};

var forEachString = function forEachString(string, iterator, receiver) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        if (receiver == null) {
            iterator(string.charAt(i), i, string);
        } else {
            iterator.call(receiver, string.charAt(i), i, string);
        }
    }
};

var forEachObject = function forEachObject(object, iterator, receiver) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
                iterator(object[k], k, object);
            } else {
                iterator.call(receiver, object[k], k, object);
            }
        }
    }
};

var forEach = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }

    var receiver;
    if (arguments.length >= 3) {
        receiver = thisArg;
    }

    if (toStr.call(list) === '[object Array]') {
        forEachArray(list, iterator, receiver);
    } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver);
    } else {
        forEachObject(list, iterator, receiver);
    }
};

module.exports = forEach;


/***/ }),

/***/ "./node_modules/function-bind/implementation.js":
/*!******************************************************!*\
  !*** ./node_modules/function-bind/implementation.js ***!
  \******************************************************/
/***/ ((module) => {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),

/***/ "./node_modules/function-bind/index.js":
/*!*********************************************!*\
  !*** ./node_modules/function-bind/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/function-bind/implementation.js");

module.exports = Function.prototype.bind || implementation;


/***/ }),

/***/ "./node_modules/get-intrinsic/index.js":
/*!*********************************************!*\
  !*** ./node_modules/get-intrinsic/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var undefined;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = __webpack_require__(/*! has-symbols */ "./node_modules/has-symbols/index.js")();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined : BigInt64Array,
	'%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined : BigUint64Array,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

try {
	null.error; // eslint-disable-line no-unused-expressions
} catch (e) {
	// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
	var errorProto = getProto(getProto(e));
	INTRINSICS['%Error.prototype%'] = errorProto;
}

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var hasOwn = __webpack_require__(/*! has */ "./node_modules/has/src/index.js");
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);
var $exec = bind.call(Function.call, RegExp.prototype.exec);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	if ($exec(/^%?[^%]*%?$/, name) === null) {
		throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
	}
	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};


/***/ }),

/***/ "./node_modules/gopd/index.js":
/*!************************************!*\
  !*** ./node_modules/gopd/index.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);

if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;


/***/ }),

/***/ "./node_modules/has-property-descriptors/index.js":
/*!********************************************************!*\
  !*** ./node_modules/has-property-descriptors/index.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);

var hasPropertyDescriptors = function hasPropertyDescriptors() {
	if ($defineProperty) {
		try {
			$defineProperty({}, 'a', { value: 1 });
			return true;
		} catch (e) {
			// IE 8 has a broken defineProperty
			return false;
		}
	}
	return false;
};

hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
	// node v0.6 has a bug where array lengths can be Set but not Defined
	if (!hasPropertyDescriptors()) {
		return null;
	}
	try {
		return $defineProperty([], 'length', { value: 1 }).length !== 1;
	} catch (e) {
		// In Firefox 4-22, defining length on an array throws an exception.
		return true;
	}
};

module.exports = hasPropertyDescriptors;


/***/ }),

/***/ "./node_modules/has-symbols/index.js":
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = __webpack_require__(/*! ./shams */ "./node_modules/has-symbols/shams.js");

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};


/***/ }),

/***/ "./node_modules/has-symbols/shams.js":
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/shams.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),

/***/ "./node_modules/has-tostringtag/shams.js":
/*!***********************************************!*\
  !*** ./node_modules/has-tostringtag/shams.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasSymbols = __webpack_require__(/*! has-symbols/shams */ "./node_modules/has-symbols/shams.js");

module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};


/***/ }),

/***/ "./node_modules/has/src/index.js":
/*!***************************************!*\
  !*** ./node_modules/has/src/index.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);


/***/ }),

/***/ "./node_modules/inherits/inherits_browser.js":
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ "./node_modules/is-arguments/index.js":
/*!********************************************!*\
  !*** ./node_modules/is-arguments/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");

var $toString = callBound('Object.prototype.toString');

var isStandardArguments = function isArguments(value) {
	if (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {
		return false;
	}
	return $toString(value) === '[object Arguments]';
};

var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null &&
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		value.length >= 0 &&
		$toString(value) !== '[object Array]' &&
		$toString(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;


/***/ }),

/***/ "./node_modules/is-callable/index.js":
/*!*******************************************!*\
  !*** ./node_modules/is-callable/index.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
	try {
		badArrayLike = Object.defineProperty({}, 'length', {
			get: function () {
				throw isCallableMarker;
			}
		});
		isCallableMarker = {};
		// eslint-disable-next-line no-throw-literal
		reflectApply(function () { throw 42; }, null, badArrayLike);
	} catch (_) {
		if (_ !== isCallableMarker) {
			reflectApply = null;
		}
	}
} else {
	reflectApply = null;
}

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var objectClass = '[object Object]';
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var ddaClass = '[object HTMLAllCollection]'; // IE 11
var ddaClass2 = '[object HTML document.all class]';
var ddaClass3 = '[object HTMLCollection]'; // IE 9-10
var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`

var isIE68 = !(0 in [,]); // eslint-disable-line no-sparse-arrays, comma-spacing

var isDDA = function isDocumentDotAll() { return false; };
if (typeof document === 'object') {
	// Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
	var all = document.all;
	if (toStr.call(all) === toStr.call(document.all)) {
		isDDA = function isDocumentDotAll(value) {
			/* globals document: false */
			// in IE 6-8, typeof document.all is "object" and it's truthy
			if ((isIE68 || !value) && (typeof value === 'undefined' || typeof value === 'object')) {
				try {
					var str = toStr.call(value);
					return (
						str === ddaClass
						|| str === ddaClass2
						|| str === ddaClass3 // opera 12.16
						|| str === objectClass // IE 6-8
					) && value('') == null; // eslint-disable-line eqeqeq
				} catch (e) { /**/ }
			}
			return false;
		};
	}
}

module.exports = reflectApply
	? function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value) && tryFunctionObject(value);
	}
	: function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		if (strClass !== fnClass && strClass !== genClass && !(/^\[object HTML/).test(strClass)) { return false; }
		return tryFunctionObject(value);
	};


/***/ }),

/***/ "./node_modules/is-generator-function/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/is-generator-function/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var toStr = Object.prototype.toString;
var fnToStr = Function.prototype.toString;
var isFnRegex = /^\s*(?:function)?\*/;
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();
var getProto = Object.getPrototypeOf;
var getGeneratorFunc = function () { // eslint-disable-line consistent-return
	if (!hasToStringTag) {
		return false;
	}
	try {
		return Function('return function*() {}')();
	} catch (e) {
	}
};
var GeneratorFunction;

module.exports = function isGeneratorFunction(fn) {
	if (typeof fn !== 'function') {
		return false;
	}
	if (isFnRegex.test(fnToStr.call(fn))) {
		return true;
	}
	if (!hasToStringTag) {
		var str = toStr.call(fn);
		return str === '[object GeneratorFunction]';
	}
	if (!getProto) {
		return false;
	}
	if (typeof GeneratorFunction === 'undefined') {
		var generatorFunc = getGeneratorFunc();
		GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
	}
	return getProto(fn) === GeneratorFunction;
};


/***/ }),

/***/ "./node_modules/is-nan/implementation.js":
/*!***********************************************!*\
  !*** ./node_modules/is-nan/implementation.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";


/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

module.exports = function isNaN(value) {
	return value !== value;
};


/***/ }),

/***/ "./node_modules/is-nan/index.js":
/*!**************************************!*\
  !*** ./node_modules/is-nan/index.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callBind = __webpack_require__(/*! call-bind */ "./node_modules/call-bind/index.js");
var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");

var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/is-nan/implementation.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/is-nan/polyfill.js");
var shim = __webpack_require__(/*! ./shim */ "./node_modules/is-nan/shim.js");

var polyfill = callBind(getPolyfill(), Number);

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),

/***/ "./node_modules/is-nan/polyfill.js":
/*!*****************************************!*\
  !*** ./node_modules/is-nan/polyfill.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/is-nan/implementation.js");

module.exports = function getPolyfill() {
	if (Number.isNaN && Number.isNaN(NaN) && !Number.isNaN('a')) {
		return Number.isNaN;
	}
	return implementation;
};


/***/ }),

/***/ "./node_modules/is-nan/shim.js":
/*!*************************************!*\
  !*** ./node_modules/is-nan/shim.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/is-nan/polyfill.js");

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

module.exports = function shimNumberIsNaN() {
	var polyfill = getPolyfill();
	define(Number, { isNaN: polyfill }, {
		isNaN: function testIsNaN() {
			return Number.isNaN !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ "./node_modules/is-typed-array/index.js":
/*!**********************************************!*\
  !*** ./node_modules/is-typed-array/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var forEach = __webpack_require__(/*! for-each */ "./node_modules/for-each/index.js");
var availableTypedArrays = __webpack_require__(/*! available-typed-arrays */ "./node_modules/available-typed-arrays/index.js");
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();
var gOPD = __webpack_require__(/*! gopd */ "./node_modules/gopd/index.js");

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;
var typedArrays = availableTypedArrays();

var $indexOf = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {
	for (var i = 0; i < array.length; i += 1) {
		if (array[i] === value) {
			return i;
		}
	}
	return -1;
};
var $slice = callBound('String.prototype.slice');
var toStrTags = {};
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		var arr = new g[typedArray]();
		if (Symbol.toStringTag in arr) {
			var proto = getPrototypeOf(arr);
			var descriptor = gOPD(proto, Symbol.toStringTag);
			if (!descriptor) {
				var superProto = getPrototypeOf(proto);
				descriptor = gOPD(superProto, Symbol.toStringTag);
			}
			toStrTags[typedArray] = descriptor.get;
		}
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var anyTrue = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!anyTrue) {
			try {
				anyTrue = getter.call(value) === typedArray;
			} catch (e) { /**/ }
		}
	});
	return anyTrue;
};

module.exports = function isTypedArray(value) {
	if (!value || typeof value !== 'object') { return false; }
	if (!hasToStringTag || !(Symbol.toStringTag in value)) {
		var tag = $slice($toString(value), 8, -1);
		return $indexOf(typedArrays, tag) > -1;
	}
	if (!gOPD) { return false; }
	return tryTypedArrays(value);
};


/***/ }),

/***/ "./node_modules/object-is/implementation.js":
/*!**************************************************!*\
  !*** ./node_modules/object-is/implementation.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


var numberIsNaN = function (value) {
	return value !== value;
};

module.exports = function is(a, b) {
	if (a === 0 && b === 0) {
		return 1 / a === 1 / b;
	}
	if (a === b) {
		return true;
	}
	if (numberIsNaN(a) && numberIsNaN(b)) {
		return true;
	}
	return false;
};



/***/ }),

/***/ "./node_modules/object-is/index.js":
/*!*****************************************!*\
  !*** ./node_modules/object-is/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");
var callBind = __webpack_require__(/*! call-bind */ "./node_modules/call-bind/index.js");

var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/object-is/implementation.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/object-is/polyfill.js");
var shim = __webpack_require__(/*! ./shim */ "./node_modules/object-is/shim.js");

var polyfill = callBind(getPolyfill(), Object);

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),

/***/ "./node_modules/object-is/polyfill.js":
/*!********************************************!*\
  !*** ./node_modules/object-is/polyfill.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/object-is/implementation.js");

module.exports = function getPolyfill() {
	return typeof Object.is === 'function' ? Object.is : implementation;
};


/***/ }),

/***/ "./node_modules/object-is/shim.js":
/*!****************************************!*\
  !*** ./node_modules/object-is/shim.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/object-is/polyfill.js");
var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");

module.exports = function shimObjectIs() {
	var polyfill = getPolyfill();
	define(Object, { is: polyfill }, {
		is: function testObjectIs() {
			return Object.is !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ "./node_modules/object-keys/implementation.js":
/*!****************************************************!*\
  !*** ./node_modules/object-keys/implementation.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js"); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;


/***/ }),

/***/ "./node_modules/object-keys/index.js":
/*!*******************************************!*\
  !*** ./node_modules/object-keys/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var slice = Array.prototype.slice;
var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js");

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__(/*! ./implementation */ "./node_modules/object-keys/implementation.js");

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),

/***/ "./node_modules/object-keys/isArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/object-keys/isArguments.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/@nextcloud/dialogs/dist/index.css":
/*!********************************************************!*\
  !*** ./node_modules/@nextcloud/dialogs/dist/index.css ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@nextcloud/dialogs/dist/index.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./node_modules/toastify-js/src/toastify.js":
/*!**************************************************!*\
  !*** ./node_modules/toastify-js/src/toastify.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
/*!
 * Toastify js 1.12.0
 * https://github.com/apvarun/toastify-js
 * @license MIT licensed
 *
 * Copyright (C) 2018 Varun A P
 */
(function(root, factory) {
  if ( true && module.exports) {
    module.exports = factory();
  } else {
    root.Toastify = factory();
  }
})(this, function(global) {
  // Object initialization
  var Toastify = function(options) {
      // Returning a new init object
      return new Toastify.lib.init(options);
    },
    // Library version
    version = "1.12.0";

  // Set the default global options
  Toastify.defaults = {
    oldestFirst: true,
    text: "Toastify is awesome!",
    node: undefined,
    duration: 3000,
    selector: undefined,
    callback: function () {
    },
    destination: undefined,
    newWindow: false,
    close: false,
    gravity: "toastify-top",
    positionLeft: false,
    position: '',
    backgroundColor: '',
    avatar: "",
    className: "",
    stopOnFocus: true,
    onClick: function () {
    },
    offset: {x: 0, y: 0},
    escapeMarkup: true,
    ariaLive: 'polite',
    style: {background: ''}
  };

  // Defining the prototype of the object
  Toastify.lib = Toastify.prototype = {
    toastify: version,

    constructor: Toastify,

    // Initializing the object with required parameters
    init: function(options) {
      // Verifying and validating the input object
      if (!options) {
        options = {};
      }

      // Creating the options object
      this.options = {};

      this.toastElement = null;

      // Validating the options
      this.options.text = options.text || Toastify.defaults.text; // Display message
      this.options.node = options.node || Toastify.defaults.node;  // Display content as node
      this.options.duration = options.duration === 0 ? 0 : options.duration || Toastify.defaults.duration; // Display duration
      this.options.selector = options.selector || Toastify.defaults.selector; // Parent selector
      this.options.callback = options.callback || Toastify.defaults.callback; // Callback after display
      this.options.destination = options.destination || Toastify.defaults.destination; // On-click destination
      this.options.newWindow = options.newWindow || Toastify.defaults.newWindow; // Open destination in new window
      this.options.close = options.close || Toastify.defaults.close; // Show toast close icon
      this.options.gravity = options.gravity === "bottom" ? "toastify-bottom" : Toastify.defaults.gravity; // toast position - top or bottom
      this.options.positionLeft = options.positionLeft || Toastify.defaults.positionLeft; // toast position - left or right
      this.options.position = options.position || Toastify.defaults.position; // toast position - left or right
      this.options.backgroundColor = options.backgroundColor || Toastify.defaults.backgroundColor; // toast background color
      this.options.avatar = options.avatar || Toastify.defaults.avatar; // img element src - url or a path
      this.options.className = options.className || Toastify.defaults.className; // additional class names for the toast
      this.options.stopOnFocus = options.stopOnFocus === undefined ? Toastify.defaults.stopOnFocus : options.stopOnFocus; // stop timeout on focus
      this.options.onClick = options.onClick || Toastify.defaults.onClick; // Callback after click
      this.options.offset = options.offset || Toastify.defaults.offset; // toast offset
      this.options.escapeMarkup = options.escapeMarkup !== undefined ? options.escapeMarkup : Toastify.defaults.escapeMarkup;
      this.options.ariaLive = options.ariaLive || Toastify.defaults.ariaLive;
      this.options.style = options.style || Toastify.defaults.style;
      if(options.backgroundColor) {
        this.options.style.background = options.backgroundColor;
      }

      // Returning the current object for chaining functions
      return this;
    },

    // Building the DOM element
    buildToast: function() {
      // Validating if the options are defined
      if (!this.options) {
        throw "Toastify is not initialized";
      }

      // Creating the DOM object
      var divElement = document.createElement("div");
      divElement.className = "toastify on " + this.options.className;

      // Positioning toast to left or right or center
      if (!!this.options.position) {
        divElement.className += " toastify-" + this.options.position;
      } else {
        // To be depreciated in further versions
        if (this.options.positionLeft === true) {
          divElement.className += " toastify-left";
          console.warn('Property `positionLeft` will be depreciated in further versions. Please use `position` instead.')
        } else {
          // Default position
          divElement.className += " toastify-right";
        }
      }

      // Assigning gravity of element
      divElement.className += " " + this.options.gravity;

      if (this.options.backgroundColor) {
        // This is being deprecated in favor of using the style HTML DOM property
        console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.');
      }

      // Loop through our style object and apply styles to divElement
      for (var property in this.options.style) {
        divElement.style[property] = this.options.style[property];
      }

      // Announce the toast to screen readers
      if (this.options.ariaLive) {
        divElement.setAttribute('aria-live', this.options.ariaLive)
      }

      // Adding the toast message/node
      if (this.options.node && this.options.node.nodeType === Node.ELEMENT_NODE) {
        // If we have a valid node, we insert it
        divElement.appendChild(this.options.node)
      } else {
        if (this.options.escapeMarkup) {
          divElement.innerText = this.options.text;
        } else {
          divElement.innerHTML = this.options.text;
        }

        if (this.options.avatar !== "") {
          var avatarElement = document.createElement("img");
          avatarElement.src = this.options.avatar;

          avatarElement.className = "toastify-avatar";

          if (this.options.position == "left" || this.options.positionLeft === true) {
            // Adding close icon on the left of content
            divElement.appendChild(avatarElement);
          } else {
            // Adding close icon on the right of content
            divElement.insertAdjacentElement("afterbegin", avatarElement);
          }
        }
      }

      // Adding a close icon to the toast
      if (this.options.close === true) {
        // Create a span for close element
        var closeElement = document.createElement("button");
        closeElement.type = "button";
        closeElement.setAttribute("aria-label", "Close");
        closeElement.className = "toast-close";
        closeElement.innerHTML = "&#10006;";

        // Triggering the removal of toast from DOM on close click
        closeElement.addEventListener(
          "click",
          function(event) {
            event.stopPropagation();
            this.removeElement(this.toastElement);
            window.clearTimeout(this.toastElement.timeOutValue);
          }.bind(this)
        );

        //Calculating screen width
        var width = window.innerWidth > 0 ? window.innerWidth : screen.width;

        // Adding the close icon to the toast element
        // Display on the right if screen width is less than or equal to 360px
        if ((this.options.position == "left" || this.options.positionLeft === true) && width > 360) {
          // Adding close icon on the left of content
          divElement.insertAdjacentElement("afterbegin", closeElement);
        } else {
          // Adding close icon on the right of content
          divElement.appendChild(closeElement);
        }
      }

      // Clear timeout while toast is focused
      if (this.options.stopOnFocus && this.options.duration > 0) {
        var self = this;
        // stop countdown
        divElement.addEventListener(
          "mouseover",
          function(event) {
            window.clearTimeout(divElement.timeOutValue);
          }
        )
        // add back the timeout
        divElement.addEventListener(
          "mouseleave",
          function() {
            divElement.timeOutValue = window.setTimeout(
              function() {
                // Remove the toast from DOM
                self.removeElement(divElement);
              },
              self.options.duration
            )
          }
        )
      }

      // Adding an on-click destination path
      if (typeof this.options.destination !== "undefined") {
        divElement.addEventListener(
          "click",
          function(event) {
            event.stopPropagation();
            if (this.options.newWindow === true) {
              window.open(this.options.destination, "_blank");
            } else {
              window.location = this.options.destination;
            }
          }.bind(this)
        );
      }

      if (typeof this.options.onClick === "function" && typeof this.options.destination === "undefined") {
        divElement.addEventListener(
          "click",
          function(event) {
            event.stopPropagation();
            this.options.onClick();
          }.bind(this)
        );
      }

      // Adding offset
      if(typeof this.options.offset === "object") {

        var x = getAxisOffsetAValue("x", this.options);
        var y = getAxisOffsetAValue("y", this.options);

        var xOffset = this.options.position == "left" ? x : "-" + x;
        var yOffset = this.options.gravity == "toastify-top" ? y : "-" + y;

        divElement.style.transform = "translate(" + xOffset + "," + yOffset + ")";

      }

      // Returning the generated element
      return divElement;
    },

    // Displaying the toast
    showToast: function() {
      // Creating the DOM object for the toast
      this.toastElement = this.buildToast();

      // Getting the root element to with the toast needs to be added
      var rootElement;
      if (typeof this.options.selector === "string") {
        rootElement = document.getElementById(this.options.selector);
      } else if (this.options.selector instanceof HTMLElement || (typeof ShadowRoot !== 'undefined' && this.options.selector instanceof ShadowRoot)) {
        rootElement = this.options.selector;
      } else {
        rootElement = document.body;
      }

      // Validating if root element is present in DOM
      if (!rootElement) {
        throw "Root element is not defined";
      }

      // Adding the DOM element
      var elementToInsert = Toastify.defaults.oldestFirst ? rootElement.firstChild : rootElement.lastChild;
      rootElement.insertBefore(this.toastElement, elementToInsert);

      // Repositioning the toasts in case multiple toasts are present
      Toastify.reposition();

      if (this.options.duration > 0) {
        this.toastElement.timeOutValue = window.setTimeout(
          function() {
            // Remove the toast from DOM
            this.removeElement(this.toastElement);
          }.bind(this),
          this.options.duration
        ); // Binding `this` for function invocation
      }

      // Supporting function chaining
      return this;
    },

    hideToast: function() {
      if (this.toastElement.timeOutValue) {
        clearTimeout(this.toastElement.timeOutValue);
      }
      this.removeElement(this.toastElement);
    },

    // Removing the element from the DOM
    removeElement: function(toastElement) {
      // Hiding the element
      // toastElement.classList.remove("on");
      toastElement.className = toastElement.className.replace(" on", "");

      // Removing the element from DOM after transition end
      window.setTimeout(
        function() {
          // remove options node if any
          if (this.options.node && this.options.node.parentNode) {
            this.options.node.parentNode.removeChild(this.options.node);
          }

          // Remove the element from the DOM, only when the parent node was not removed before.
          if (toastElement.parentNode) {
            toastElement.parentNode.removeChild(toastElement);
          }

          // Calling the callback function
          this.options.callback.call(toastElement);

          // Repositioning the toasts again
          Toastify.reposition();
        }.bind(this),
        400
      ); // Binding `this` for function invocation
    },
  };

  // Positioning the toasts on the DOM
  Toastify.reposition = function() {

    // Top margins with gravity
    var topLeftOffsetSize = {
      top: 15,
      bottom: 15,
    };
    var topRightOffsetSize = {
      top: 15,
      bottom: 15,
    };
    var offsetSize = {
      top: 15,
      bottom: 15,
    };

    // Get all toast messages on the DOM
    var allToasts = document.getElementsByClassName("toastify");

    var classUsed;

    // Modifying the position of each toast element
    for (var i = 0; i < allToasts.length; i++) {
      // Getting the applied gravity
      if (containsClass(allToasts[i], "toastify-top") === true) {
        classUsed = "toastify-top";
      } else {
        classUsed = "toastify-bottom";
      }

      var height = allToasts[i].offsetHeight;
      classUsed = classUsed.substr(9, classUsed.length-1)
      // Spacing between toasts
      var offset = 15;

      var width = window.innerWidth > 0 ? window.innerWidth : screen.width;

      // Show toast in center if screen with less than or equal to 360px
      if (width <= 360) {
        // Setting the position
        allToasts[i].style[classUsed] = offsetSize[classUsed] + "px";

        offsetSize[classUsed] += height + offset;
      } else {
        if (containsClass(allToasts[i], "toastify-left") === true) {
          // Setting the position
          allToasts[i].style[classUsed] = topLeftOffsetSize[classUsed] + "px";

          topLeftOffsetSize[classUsed] += height + offset;
        } else {
          // Setting the position
          allToasts[i].style[classUsed] = topRightOffsetSize[classUsed] + "px";

          topRightOffsetSize[classUsed] += height + offset;
        }
      }
    }

    // Supporting function chaining
    return this;
  };

  // Helper function to get offset.
  function getAxisOffsetAValue(axis, options) {

    if(options.offset[axis]) {
      if(isNaN(options.offset[axis])) {
        return options.offset[axis];
      }
      else {
        return options.offset[axis] + 'px';
      }
    }

    return '0px';

  }

  function containsClass(elem, yourClass) {
    if (!elem || typeof yourClass !== "string") {
      return false;
    } else if (
      elem.className &&
      elem.className
        .trim()
        .split(/\s+/gi)
        .indexOf(yourClass) > -1
    ) {
      return true;
    } else {
      return false;
    }
  }

  // Setting up the prototype for the init object
  Toastify.lib.init.prototype = Toastify.lib;

  // Returning the Toastify function to be assigned to the window object/module
  return Toastify;
});


/***/ }),

/***/ "./node_modules/util/support/isBufferBrowser.js":
/*!******************************************************!*\
  !*** ./node_modules/util/support/isBufferBrowser.js ***!
  \******************************************************/
/***/ ((module) => {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ "./node_modules/util/support/types.js":
/*!********************************************!*\
  !*** ./node_modules/util/support/types.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/util/types.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9



var isArgumentsObject = __webpack_require__(/*! is-arguments */ "./node_modules/is-arguments/index.js");
var isGeneratorFunction = __webpack_require__(/*! is-generator-function */ "./node_modules/is-generator-function/index.js");
var whichTypedArray = __webpack_require__(/*! which-typed-array */ "./node_modules/which-typed-array/index.js");
var isTypedArray = __webpack_require__(/*! is-typed-array */ "./node_modules/is-typed-array/index.js");

function uncurryThis(f) {
  return f.call.bind(f);
}

var BigIntSupported = typeof BigInt !== 'undefined';
var SymbolSupported = typeof Symbol !== 'undefined';

var ObjectToString = uncurryThis(Object.prototype.toString);

var numberValue = uncurryThis(Number.prototype.valueOf);
var stringValue = uncurryThis(String.prototype.valueOf);
var booleanValue = uncurryThis(Boolean.prototype.valueOf);

if (BigIntSupported) {
  var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
}

if (SymbolSupported) {
  var symbolValue = uncurryThis(Symbol.prototype.valueOf);
}

function checkBoxedPrimitive(value, prototypeValueOf) {
  if (typeof value !== 'object') {
    return false;
  }
  try {
    prototypeValueOf(value);
    return true;
  } catch(e) {
    return false;
  }
}

exports.isArgumentsObject = isArgumentsObject;
exports.isGeneratorFunction = isGeneratorFunction;
exports.isTypedArray = isTypedArray;

// Taken from here and modified for better browser support
// https://github.com/sindresorhus/p-is-promise/blob/cda35a513bda03f977ad5cde3a079d237e82d7ef/index.js
function isPromise(input) {
	return (
		(
			typeof Promise !== 'undefined' &&
			input instanceof Promise
		) ||
		(
			input !== null &&
			typeof input === 'object' &&
			typeof input.then === 'function' &&
			typeof input.catch === 'function'
		)
	);
}
exports.isPromise = isPromise;

function isArrayBufferView(value) {
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    return ArrayBuffer.isView(value);
  }

  return (
    isTypedArray(value) ||
    isDataView(value)
  );
}
exports.isArrayBufferView = isArrayBufferView;


function isUint8Array(value) {
  return whichTypedArray(value) === 'Uint8Array';
}
exports.isUint8Array = isUint8Array;

function isUint8ClampedArray(value) {
  return whichTypedArray(value) === 'Uint8ClampedArray';
}
exports.isUint8ClampedArray = isUint8ClampedArray;

function isUint16Array(value) {
  return whichTypedArray(value) === 'Uint16Array';
}
exports.isUint16Array = isUint16Array;

function isUint32Array(value) {
  return whichTypedArray(value) === 'Uint32Array';
}
exports.isUint32Array = isUint32Array;

function isInt8Array(value) {
  return whichTypedArray(value) === 'Int8Array';
}
exports.isInt8Array = isInt8Array;

function isInt16Array(value) {
  return whichTypedArray(value) === 'Int16Array';
}
exports.isInt16Array = isInt16Array;

function isInt32Array(value) {
  return whichTypedArray(value) === 'Int32Array';
}
exports.isInt32Array = isInt32Array;

function isFloat32Array(value) {
  return whichTypedArray(value) === 'Float32Array';
}
exports.isFloat32Array = isFloat32Array;

function isFloat64Array(value) {
  return whichTypedArray(value) === 'Float64Array';
}
exports.isFloat64Array = isFloat64Array;

function isBigInt64Array(value) {
  return whichTypedArray(value) === 'BigInt64Array';
}
exports.isBigInt64Array = isBigInt64Array;

function isBigUint64Array(value) {
  return whichTypedArray(value) === 'BigUint64Array';
}
exports.isBigUint64Array = isBigUint64Array;

function isMapToString(value) {
  return ObjectToString(value) === '[object Map]';
}
isMapToString.working = (
  typeof Map !== 'undefined' &&
  isMapToString(new Map())
);

function isMap(value) {
  if (typeof Map === 'undefined') {
    return false;
  }

  return isMapToString.working
    ? isMapToString(value)
    : value instanceof Map;
}
exports.isMap = isMap;

function isSetToString(value) {
  return ObjectToString(value) === '[object Set]';
}
isSetToString.working = (
  typeof Set !== 'undefined' &&
  isSetToString(new Set())
);
function isSet(value) {
  if (typeof Set === 'undefined') {
    return false;
  }

  return isSetToString.working
    ? isSetToString(value)
    : value instanceof Set;
}
exports.isSet = isSet;

function isWeakMapToString(value) {
  return ObjectToString(value) === '[object WeakMap]';
}
isWeakMapToString.working = (
  typeof WeakMap !== 'undefined' &&
  isWeakMapToString(new WeakMap())
);
function isWeakMap(value) {
  if (typeof WeakMap === 'undefined') {
    return false;
  }

  return isWeakMapToString.working
    ? isWeakMapToString(value)
    : value instanceof WeakMap;
}
exports.isWeakMap = isWeakMap;

function isWeakSetToString(value) {
  return ObjectToString(value) === '[object WeakSet]';
}
isWeakSetToString.working = (
  typeof WeakSet !== 'undefined' &&
  isWeakSetToString(new WeakSet())
);
function isWeakSet(value) {
  return isWeakSetToString(value);
}
exports.isWeakSet = isWeakSet;

function isArrayBufferToString(value) {
  return ObjectToString(value) === '[object ArrayBuffer]';
}
isArrayBufferToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  isArrayBufferToString(new ArrayBuffer())
);
function isArrayBuffer(value) {
  if (typeof ArrayBuffer === 'undefined') {
    return false;
  }

  return isArrayBufferToString.working
    ? isArrayBufferToString(value)
    : value instanceof ArrayBuffer;
}
exports.isArrayBuffer = isArrayBuffer;

function isDataViewToString(value) {
  return ObjectToString(value) === '[object DataView]';
}
isDataViewToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  typeof DataView !== 'undefined' &&
  isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1))
);
function isDataView(value) {
  if (typeof DataView === 'undefined') {
    return false;
  }

  return isDataViewToString.working
    ? isDataViewToString(value)
    : value instanceof DataView;
}
exports.isDataView = isDataView;

// Store a copy of SharedArrayBuffer in case it's deleted elsewhere
var SharedArrayBufferCopy = typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : undefined;
function isSharedArrayBufferToString(value) {
  return ObjectToString(value) === '[object SharedArrayBuffer]';
}
function isSharedArrayBuffer(value) {
  if (typeof SharedArrayBufferCopy === 'undefined') {
    return false;
  }

  if (typeof isSharedArrayBufferToString.working === 'undefined') {
    isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
  }

  return isSharedArrayBufferToString.working
    ? isSharedArrayBufferToString(value)
    : value instanceof SharedArrayBufferCopy;
}
exports.isSharedArrayBuffer = isSharedArrayBuffer;

function isAsyncFunction(value) {
  return ObjectToString(value) === '[object AsyncFunction]';
}
exports.isAsyncFunction = isAsyncFunction;

function isMapIterator(value) {
  return ObjectToString(value) === '[object Map Iterator]';
}
exports.isMapIterator = isMapIterator;

function isSetIterator(value) {
  return ObjectToString(value) === '[object Set Iterator]';
}
exports.isSetIterator = isSetIterator;

function isGeneratorObject(value) {
  return ObjectToString(value) === '[object Generator]';
}
exports.isGeneratorObject = isGeneratorObject;

function isWebAssemblyCompiledModule(value) {
  return ObjectToString(value) === '[object WebAssembly.Module]';
}
exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;

function isNumberObject(value) {
  return checkBoxedPrimitive(value, numberValue);
}
exports.isNumberObject = isNumberObject;

function isStringObject(value) {
  return checkBoxedPrimitive(value, stringValue);
}
exports.isStringObject = isStringObject;

function isBooleanObject(value) {
  return checkBoxedPrimitive(value, booleanValue);
}
exports.isBooleanObject = isBooleanObject;

function isBigIntObject(value) {
  return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
}
exports.isBigIntObject = isBigIntObject;

function isSymbolObject(value) {
  return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
}
exports.isSymbolObject = isSymbolObject;

function isBoxedPrimitive(value) {
  return (
    isNumberObject(value) ||
    isStringObject(value) ||
    isBooleanObject(value) ||
    isBigIntObject(value) ||
    isSymbolObject(value)
  );
}
exports.isBoxedPrimitive = isBoxedPrimitive;

function isAnyArrayBuffer(value) {
  return typeof Uint8Array !== 'undefined' && (
    isArrayBuffer(value) ||
    isSharedArrayBuffer(value)
  );
}
exports.isAnyArrayBuffer = isAnyArrayBuffer;

['isProxy', 'isExternal', 'isModuleNamespaceObject'].forEach(function(method) {
  Object.defineProperty(exports, method, {
    enumerable: false,
    value: function() {
      throw new Error(method + ' is not supported in userland');
    }
  });
});


/***/ }),

/***/ "./node_modules/util/util.js":
/*!***********************************!*\
  !*** ./node_modules/util/util.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnvRegex = /^$/;

if (process.env.NODE_DEBUG) {
  var debugEnv = process.env.NODE_DEBUG;
  debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
    .replace(/\*/g, '.*')
    .replace(/,/g, '$|^')
    .toUpperCase();
  debugEnvRegex = new RegExp('^' + debugEnv + '$', 'i');
}
exports.debuglog = function(set) {
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (debugEnvRegex.test(set)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').slice(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.slice(1, -1);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
exports.types = __webpack_require__(/*! ./support/types */ "./node_modules/util/support/types.js");

function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
exports.types.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;
exports.types.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;
exports.types.isNativeError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ "./node_modules/util/support/isBufferBrowser.js");

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb.bind(null, null, ret)) },
            function(rej) { process.nextTick(callbackifyOnRejected.bind(null, rej, cb)) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;


/***/ }),

/***/ "./node_modules/which-typed-array/index.js":
/*!*************************************************!*\
  !*** ./node_modules/which-typed-array/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var forEach = __webpack_require__(/*! for-each */ "./node_modules/for-each/index.js");
var availableTypedArrays = __webpack_require__(/*! available-typed-arrays */ "./node_modules/available-typed-arrays/index.js");
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");
var gOPD = __webpack_require__(/*! gopd */ "./node_modules/gopd/index.js");

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;
var typedArrays = availableTypedArrays();

var $slice = callBound('String.prototype.slice');
var toStrTags = {};
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		if (typeof g[typedArray] === 'function') {
			var arr = new g[typedArray]();
			if (Symbol.toStringTag in arr) {
				var proto = getPrototypeOf(arr);
				var descriptor = gOPD(proto, Symbol.toStringTag);
				if (!descriptor) {
					var superProto = getPrototypeOf(proto);
					descriptor = gOPD(superProto, Symbol.toStringTag);
				}
				toStrTags[typedArray] = descriptor.get;
			}
		}
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var foundName = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!foundName) {
			try {
				var name = getter.call(value);
				if (name === typedArray) {
					foundName = name;
				}
			} catch (e) {}
		}
	});
	return foundName;
};

var isTypedArray = __webpack_require__(/*! is-typed-array */ "./node_modules/is-typed-array/index.js");

module.exports = function whichTypedArray(value) {
	if (!isTypedArray(value)) { return false; }
	if (!hasToStringTag || !(Symbol.toStringTag in value)) { return $slice($toString(value), 8, -1); }
	return tryTypedArrays(value);
};


/***/ }),

/***/ "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTYiIHdpZHRoPSIxNiI+CiAgPHBhdGggZD0iTTE0IDEyLjNMMTIuMyAxNCA4IDkuNyAzLjcgMTQgMiAxMi4zIDYuMyA4IDIgMy43IDMuNyAyIDggNi4zIDEyLjMgMiAxNCAzLjcgOS43IDh6Ii8+Cjwvc3ZnPgo=":
/*!******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTYiIHdpZHRoPSIxNiI+CiAgPHBhdGggZD0iTTE0IDEyLjNMMTIuMyAxNCA4IDkuNyAzLjcgMTQgMiAxMi4zIDYuMyA4IDIgMy43IDMuNyAyIDggNi4zIDEyLjMgMiAxNCAzLjcgOS43IDh6Ii8+Cjwvc3ZnPgo= ***!
  \******************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTYiIHdpZHRoPSIxNiI+CiAgPHBhdGggZD0iTTE0IDEyLjNMMTIuMyAxNCA4IDkuNyAzLjcgMTQgMiAxMi4zIDYuMyA4IDIgMy43IDMuNyAyIDggNi4zIDEyLjMgMiAxNCAzLjcgOS43IDh6Ii8+Cjwvc3ZnPgo=";

/***/ }),

/***/ "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTYiIHdpZHRoPSIxNiI+CiAgPHBhdGggZD0iTTE0IDEyLjNMMTIuMyAxNCA4IDkuNyAzLjcgMTQgMiAxMi4zIDYuMyA4IDIgMy43IDMuNyAyIDggNi4zIDEyLjMgMiAxNCAzLjcgOS43IDh6IiBzdHlsZT0iZmlsbC1vcGFjaXR5OjE7ZmlsbDojZmZmZmZmIi8+Cjwvc3ZnPgo=":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTYiIHdpZHRoPSIxNiI+CiAgPHBhdGggZD0iTTE0IDEyLjNMMTIuMyAxNCA4IDkuNyAzLjcgMTQgMiAxMi4zIDYuMyA4IDIgMy43IDMuNyAyIDggNi4zIDEyLjMgMiAxNCAzLjcgOS43IDh6IiBzdHlsZT0iZmlsbC1vcGFjaXR5OjE7ZmlsbDojZmZmZmZmIi8+Cjwvc3ZnPgo= ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTYiIHdpZHRoPSIxNiI+CiAgPHBhdGggZD0iTTE0IDEyLjNMMTIuMyAxNCA4IDkuNyAzLjcgMTQgMiAxMi4zIDYuMyA4IDIgMy43IDMuNyAyIDggNi4zIDEyLjMgMiAxNCAzLjcgOS43IDh6IiBzdHlsZT0iZmlsbC1vcGFjaXR5OjE7ZmlsbDojZmZmZmZmIi8+Cjwvc3ZnPgo=";

/***/ }),

/***/ "./node_modules/available-typed-arrays/index.js":
/*!******************************************************!*\
  !*** ./node_modules/available-typed-arrays/index.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var possibleNames = [
	'BigInt64Array',
	'BigUint64Array',
	'Float32Array',
	'Float64Array',
	'Int16Array',
	'Int32Array',
	'Int8Array',
	'Uint16Array',
	'Uint32Array',
	'Uint8Array',
	'Uint8ClampedArray'
];

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;

module.exports = function availableTypedArrays() {
	var out = [];
	for (var i = 0; i < possibleNames.length; i++) {
		if (typeof g[possibleNames[i]] === 'function') {
			out[out.length] = possibleNames[i];
		}
	}
	return out;
};


/***/ }),

/***/ "./node_modules/@nextcloud/dialogs/dist/index.mjs":
/*!********************************************************!*\
  !*** ./node_modules/@nextcloud/dialogs/dist/index.mjs ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FilePicker": () => (/* binding */ FilePicker),
/* harmony export */   "FilePickerBuilder": () => (/* binding */ FilePickerBuilder),
/* harmony export */   "FilePickerType": () => (/* binding */ FilePickerType),
/* harmony export */   "TOAST_ARIA_LIVE_ASSERTIVE": () => (/* binding */ TOAST_ARIA_LIVE_ASSERTIVE),
/* harmony export */   "TOAST_ARIA_LIVE_OFF": () => (/* binding */ TOAST_ARIA_LIVE_OFF),
/* harmony export */   "TOAST_ARIA_LIVE_POLITE": () => (/* binding */ TOAST_ARIA_LIVE_POLITE),
/* harmony export */   "TOAST_DEFAULT_TIMEOUT": () => (/* binding */ TOAST_DEFAULT_TIMEOUT),
/* harmony export */   "TOAST_PERMANENT_TIMEOUT": () => (/* binding */ TOAST_PERMANENT_TIMEOUT),
/* harmony export */   "TOAST_UNDO_TIMEOUT": () => (/* binding */ TOAST_UNDO_TIMEOUT),
/* harmony export */   "getFilePickerBuilder": () => (/* binding */ getFilePickerBuilder),
/* harmony export */   "showError": () => (/* binding */ showError),
/* harmony export */   "showInfo": () => (/* binding */ showInfo),
/* harmony export */   "showMessage": () => (/* binding */ showMessage),
/* harmony export */   "showSuccess": () => (/* binding */ showSuccess),
/* harmony export */   "showUndo": () => (/* binding */ showUndo),
/* harmony export */   "showWarning": () => (/* binding */ showWarning)
/* harmony export */ });
/* harmony import */ var toastify_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! toastify-js */ "./node_modules/toastify-js/src/toastify.js");
/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");


function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$1(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$i =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

var objectGetOwnPropertyDescriptor = {};

var fails$i = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$h = fails$i;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$h(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var fails$g = fails$i;

var functionBindNative = !fails$g(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

var NATIVE_BIND$3 = functionBindNative;

var call$h = Function.prototype.call;

var functionCall = NATIVE_BIND$3 ? call$h.bind(call$h) : function () {
  return call$h.apply(call$h, arguments);
};

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$2(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

var createPropertyDescriptor$2 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var NATIVE_BIND$2 = functionBindNative;

var FunctionPrototype$2 = Function.prototype;
var call$g = FunctionPrototype$2.call;
var uncurryThisWithBind = NATIVE_BIND$2 && FunctionPrototype$2.bind.bind(call$g, call$g);

var functionUncurryThis = NATIVE_BIND$2 ? uncurryThisWithBind : function (fn) {
  return function () {
    return call$g.apply(fn, arguments);
  };
};

var uncurryThis$k = functionUncurryThis;

var toString$7 = uncurryThis$k({}.toString);
var stringSlice$5 = uncurryThis$k(''.slice);

var classofRaw$2 = function (it) {
  return stringSlice$5(toString$7(it), 8, -1);
};

var uncurryThis$j = functionUncurryThis;
var fails$f = fails$i;
var classof$8 = classofRaw$2;

var $Object$3 = Object;
var split = uncurryThis$j(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails$f(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object$3('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$8(it) == 'String' ? split(it, '') : $Object$3(it);
} : $Object$3;

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
var isNullOrUndefined$5 = function (it) {
  return it === null || it === undefined;
};

var isNullOrUndefined$4 = isNullOrUndefined$5;

var $TypeError$d = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$4 = function (it) {
  if (isNullOrUndefined$4(it)) throw $TypeError$d("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings
var IndexedObject$2 = indexedObject;
var requireObjectCoercible$3 = requireObjectCoercible$4;

var toIndexedObject$4 = function (it) {
  return IndexedObject$2(requireObjectCoercible$3(it));
};

var documentAll$2 = typeof document == 'object' && document.all;

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
var IS_HTMLDDA = typeof documentAll$2 == 'undefined' && documentAll$2 !== undefined;

var documentAll_1 = {
  all: documentAll$2,
  IS_HTMLDDA: IS_HTMLDDA
};

var $documentAll$1 = documentAll_1;

var documentAll$1 = $documentAll$1.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
var isCallable$j = $documentAll$1.IS_HTMLDDA ? function (argument) {
  return typeof argument == 'function' || argument === documentAll$1;
} : function (argument) {
  return typeof argument == 'function';
};

var isCallable$i = isCallable$j;
var $documentAll = documentAll_1;

var documentAll = $documentAll.all;

var isObject$9 = $documentAll.IS_HTMLDDA ? function (it) {
  return typeof it == 'object' ? it !== null : isCallable$i(it) || it === documentAll;
} : function (it) {
  return typeof it == 'object' ? it !== null : isCallable$i(it);
};

var global$h = global$i;
var isCallable$h = isCallable$j;

var aFunction = function (argument) {
  return isCallable$h(argument) ? argument : undefined;
};

var getBuiltIn$7 = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global$h[namespace]) : global$h[namespace] && global$h[namespace][method];
};

var uncurryThis$i = functionUncurryThis;

var objectIsPrototypeOf = uncurryThis$i({}.isPrototypeOf);

var engineUserAgent = typeof navigator != 'undefined' && String(navigator.userAgent) || '';

var global$g = global$i;
var userAgent$3 = engineUserAgent;

var process$4 = global$g.process;
var Deno$1 = global$g.Deno;
var versions = process$4 && process$4.versions || Deno$1 && Deno$1.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent$3) {
  match = userAgent$3.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent$3.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

var engineV8Version = version;

/* eslint-disable es/no-symbol -- required for testing */

var V8_VERSION$2 = engineV8Version;
var fails$e = fails$i;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$e(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41;
});

/* eslint-disable es/no-symbol -- required for testing */

var NATIVE_SYMBOL$1 = symbolConstructorDetection;

var useSymbolAsUid = NATIVE_SYMBOL$1
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

var getBuiltIn$6 = getBuiltIn$7;
var isCallable$g = isCallable$j;
var isPrototypeOf$3 = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var $Object$2 = Object;

var isSymbol$3 = USE_SYMBOL_AS_UID$1 ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn$6('Symbol');
  return isCallable$g($Symbol) && isPrototypeOf$3($Symbol.prototype, $Object$2(it));
};

var $String$4 = String;

var tryToString$4 = function (argument) {
  try {
    return $String$4(argument);
  } catch (error) {
    return 'Object';
  }
};

var isCallable$f = isCallable$j;
var tryToString$3 = tryToString$4;

var $TypeError$c = TypeError;

// `Assert: IsCallable(argument) is true`
var aCallable$7 = function (argument) {
  if (isCallable$f(argument)) return argument;
  throw $TypeError$c(tryToString$3(argument) + ' is not a function');
};

var aCallable$6 = aCallable$7;
var isNullOrUndefined$3 = isNullOrUndefined$5;

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
var getMethod$4 = function (V, P) {
  var func = V[P];
  return isNullOrUndefined$3(func) ? undefined : aCallable$6(func);
};

var call$f = functionCall;
var isCallable$e = isCallable$j;
var isObject$8 = isObject$9;

var $TypeError$b = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable$e(fn = input.toString) && !isObject$8(val = call$f(fn, input))) return val;
  if (isCallable$e(fn = input.valueOf) && !isObject$8(val = call$f(fn, input))) return val;
  if (pref !== 'string' && isCallable$e(fn = input.toString) && !isObject$8(val = call$f(fn, input))) return val;
  throw $TypeError$b("Can't convert object to primitive value");
};

var sharedExports = {};
var shared$4 = {
  get exports(){ return sharedExports; },
  set exports(v){ sharedExports = v; },
};

var global$f = global$i;

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty$4 = Object.defineProperty;

var defineGlobalProperty$3 = function (key, value) {
  try {
    defineProperty$4(global$f, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global$f[key] = value;
  } return value;
};

var global$e = global$i;
var defineGlobalProperty$2 = defineGlobalProperty$3;

var SHARED = '__core-js_shared__';
var store$3 = global$e[SHARED] || defineGlobalProperty$2(SHARED, {});

var sharedStore = store$3;

var store$2 = sharedStore;

(shared$4.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.27.2',
  mode: 'global',
  copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.27.2/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

var requireObjectCoercible$2 = requireObjectCoercible$4;

var $Object$1 = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$4 = function (argument) {
  return $Object$1(requireObjectCoercible$2(argument));
};

var uncurryThis$h = functionUncurryThis;
var toObject$3 = toObject$4;

var hasOwnProperty$1 = uncurryThis$h({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty$1(toObject$3(it), key);
};

var uncurryThis$g = functionUncurryThis;

var id = 0;
var postfix = Math.random();
var toString$6 = uncurryThis$g(1.0.toString);

var uid$2 = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$6(++id + postfix, 36);
};

var global$d = global$i;
var shared$3 = sharedExports;
var hasOwn$9 = hasOwnProperty_1;
var uid$1 = uid$2;
var NATIVE_SYMBOL = symbolConstructorDetection;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var Symbol$2 = global$d.Symbol;
var WellKnownSymbolsStore = shared$3('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$2['for'] || Symbol$2 : Symbol$2 && Symbol$2.withoutSetter || uid$1;

var wellKnownSymbol$e = function (name) {
  if (!hasOwn$9(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn$9(Symbol$2, name)
      ? Symbol$2[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};

var call$e = functionCall;
var isObject$7 = isObject$9;
var isSymbol$2 = isSymbol$3;
var getMethod$3 = getMethod$4;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$d = wellKnownSymbol$e;

var $TypeError$a = TypeError;
var TO_PRIMITIVE = wellKnownSymbol$d('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
var toPrimitive$1 = function (input, pref) {
  if (!isObject$7(input) || isSymbol$2(input)) return input;
  var exoticToPrim = getMethod$3(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call$e(exoticToPrim, input, pref);
    if (!isObject$7(result) || isSymbol$2(result)) return result;
    throw $TypeError$a("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

var toPrimitive = toPrimitive$1;
var isSymbol$1 = isSymbol$3;

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
var toPropertyKey$2 = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol$1(key) ? key : key + '';
};

var global$c = global$i;
var isObject$6 = isObject$9;

var document$3 = global$c.document;
// typeof document.createElement is 'object' in old IE
var EXISTS$1 = isObject$6(document$3) && isObject$6(document$3.createElement);

var documentCreateElement$1 = function (it) {
  return EXISTS$1 ? document$3.createElement(it) : {};
};

var DESCRIPTORS$a = descriptors;
var fails$d = fails$i;
var createElement$1 = documentCreateElement$1;

// Thanks to IE8 for its funny defineProperty
var ie8DomDefine = !DESCRIPTORS$a && !fails$d(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement$1('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var DESCRIPTORS$9 = descriptors;
var call$d = functionCall;
var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
var createPropertyDescriptor$1 = createPropertyDescriptor$2;
var toIndexedObject$3 = toIndexedObject$4;
var toPropertyKey$1 = toPropertyKey$2;
var hasOwn$8 = hasOwnProperty_1;
var IE8_DOM_DEFINE$1 = ie8DomDefine;

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$9 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$3(O);
  P = toPropertyKey$1(P);
  if (IE8_DOM_DEFINE$1) try {
    return $getOwnPropertyDescriptor$1(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn$8(O, P)) return createPropertyDescriptor$1(!call$d(propertyIsEnumerableModule$1.f, O, P), O[P]);
};

var objectDefineProperty = {};

var DESCRIPTORS$8 = descriptors;
var fails$c = fails$i;

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
var v8PrototypeDefineBug = DESCRIPTORS$8 && fails$c(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});

var isObject$5 = isObject$9;

var $String$3 = String;
var $TypeError$9 = TypeError;

// `Assert: Type(argument) is Object`
var anObject$e = function (argument) {
  if (isObject$5(argument)) return argument;
  throw $TypeError$9($String$3(argument) + ' is not an object');
};

var DESCRIPTORS$7 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
var anObject$d = anObject$e;
var toPropertyKey = toPropertyKey$2;

var $TypeError$8 = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE$1 = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$7 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
  anObject$d(O);
  P = toPropertyKey(P);
  anObject$d(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject$d(O);
  P = toPropertyKey(P);
  anObject$d(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError$8('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var DESCRIPTORS$6 = descriptors;
var definePropertyModule$4 = objectDefineProperty;
var createPropertyDescriptor = createPropertyDescriptor$2;

var createNonEnumerableProperty$3 = DESCRIPTORS$6 ? function (object, key, value) {
  return definePropertyModule$4.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var makeBuiltInExports = {};
var makeBuiltIn$2 = {
  get exports(){ return makeBuiltInExports; },
  set exports(v){ makeBuiltInExports = v; },
};

var DESCRIPTORS$5 = descriptors;
var hasOwn$7 = hasOwnProperty_1;

var FunctionPrototype$1 = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS$5 && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn$7(FunctionPrototype$1, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS$5 || (DESCRIPTORS$5 && getDescriptor(FunctionPrototype$1, 'name').configurable));

var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

var uncurryThis$f = functionUncurryThis;
var isCallable$d = isCallable$j;
var store$1 = sharedStore;

var functionToString = uncurryThis$f(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable$d(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString(it);
  };
}

var inspectSource$3 = store$1.inspectSource;

var global$b = global$i;
var isCallable$c = isCallable$j;

var WeakMap$1 = global$b.WeakMap;

var weakMapBasicDetection = isCallable$c(WeakMap$1) && /native code/.test(String(WeakMap$1));

var shared$2 = sharedExports;
var uid = uid$2;

var keys = shared$2('keys');

var sharedKey$2 = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys$4 = {};

var NATIVE_WEAK_MAP = weakMapBasicDetection;
var global$a = global$i;
var isObject$4 = isObject$9;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$3;
var hasOwn$6 = hasOwnProperty_1;
var shared$1 = sharedStore;
var sharedKey$1 = sharedKey$2;
var hiddenKeys$3 = hiddenKeys$4;

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError$2 = global$a.TypeError;
var WeakMap = global$a.WeakMap;
var set$1, get$2, has;

var enforce = function (it) {
  return has(it) ? get$2(it) : set$1(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject$4(it) || (state = get$2(it)).type !== TYPE) {
      throw TypeError$2('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared$1.state) {
  var store = shared$1.state || (shared$1.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set$1 = function (it, metadata) {
    if (store.has(it)) throw TypeError$2(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get$2 = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey$1('state');
  hiddenKeys$3[STATE] = true;
  set$1 = function (it, metadata) {
    if (hasOwn$6(it, STATE)) throw TypeError$2(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$2(it, STATE, metadata);
    return metadata;
  };
  get$2 = function (it) {
    return hasOwn$6(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn$6(it, STATE);
  };
}

var internalState = {
  set: set$1,
  get: get$2,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

var uncurryThis$e = functionUncurryThis;
var fails$b = fails$i;
var isCallable$b = isCallable$j;
var hasOwn$5 = hasOwnProperty_1;
var DESCRIPTORS$4 = descriptors;
var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
var inspectSource$2 = inspectSource$3;
var InternalStateModule$1 = internalState;

var enforceInternalState = InternalStateModule$1.enforce;
var getInternalState$1 = InternalStateModule$1.get;
var $String$2 = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty$3 = Object.defineProperty;
var stringSlice$4 = uncurryThis$e(''.slice);
var replace$2 = uncurryThis$e(''.replace);
var join = uncurryThis$e([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS$4 && !fails$b(function () {
  return defineProperty$3(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn$1 = makeBuiltIn$2.exports = function (value, name, options) {
  if (stringSlice$4($String$2(name), 0, 7) === 'Symbol(') {
    name = '[' + replace$2($String$2(name), /^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn$5(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS$4) defineProperty$3(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn$5(options, 'arity') && value.length !== options.arity) {
    defineProperty$3(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn$5(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS$4) defineProperty$3(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn$5(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn$1(function toString() {
  return isCallable$b(this) && getInternalState$1(this).source || inspectSource$2(this);
}, 'toString');

var isCallable$a = isCallable$j;
var definePropertyModule$3 = objectDefineProperty;
var makeBuiltIn = makeBuiltInExports;
var defineGlobalProperty$1 = defineGlobalProperty$3;

var defineBuiltIn$6 = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable$a(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty$1(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule$3.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};

var objectGetOwnPropertyNames = {};

var ceil = Math.ceil;
var floor$1 = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
var mathTrunc = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor$1 : ceil)(n);
};

var trunc = mathTrunc;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
var toIntegerOrInfinity$4 = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};

var toIntegerOrInfinity$3 = toIntegerOrInfinity$4;

var max$1 = Math.max;
var min$2 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex$1 = function (index, length) {
  var integer = toIntegerOrInfinity$3(index);
  return integer < 0 ? max$1(integer + length, 0) : min$2(integer, length);
};

var toIntegerOrInfinity$2 = toIntegerOrInfinity$4;

var min$1 = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength$2 = function (argument) {
  return argument > 0 ? min$1(toIntegerOrInfinity$2(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toLength$1 = toLength$2;

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
var lengthOfArrayLike$3 = function (obj) {
  return toLength$1(obj.length);
};

var toIndexedObject$2 = toIndexedObject$4;
var toAbsoluteIndex = toAbsoluteIndex$1;
var lengthOfArrayLike$2 = lengthOfArrayLike$3;

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod$2 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$2($this);
    var length = lengthOfArrayLike$2(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod$2(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$2(false)
};

var uncurryThis$d = functionUncurryThis;
var hasOwn$4 = hasOwnProperty_1;
var toIndexedObject$1 = toIndexedObject$4;
var indexOf$1 = arrayIncludes.indexOf;
var hiddenKeys$2 = hiddenKeys$4;

var push$2 = uncurryThis$d([].push);

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$1(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn$4(hiddenKeys$2, key) && hasOwn$4(O, key) && push$2(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn$4(O, key = names[i++])) {
    ~indexOf$1(result, key) || push$2(result, key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys$3 = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var internalObjectKeys$1 = objectKeysInternal;
var enumBugKeys$2 = enumBugKeys$3;

var hiddenKeys$1 = enumBugKeys$2.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys$1(O, hiddenKeys$1);
};

var objectGetOwnPropertySymbols = {};

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var getBuiltIn$5 = getBuiltIn$7;
var uncurryThis$c = functionUncurryThis;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
var anObject$c = anObject$e;

var concat$2 = uncurryThis$c([].concat);

// all object keys, includes non-enumerable and symbols
var ownKeys$1 = getBuiltIn$5('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject$c(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
  return getOwnPropertySymbols ? concat$2(keys, getOwnPropertySymbols(it)) : keys;
};

var hasOwn$3 = hasOwnProperty_1;
var ownKeys = ownKeys$1;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule$2 = objectDefineProperty;

var copyConstructorProperties$1 = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule$2.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn$3(target, key) && !(exceptions && hasOwn$3(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

var fails$a = fails$i;
var isCallable$9 = isCallable$j;

var replacement = /#|\.prototype\./;

var isForced$2 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable$9(detection) ? fails$a(detection)
    : !!detection;
};

var normalize = isForced$2.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$2.data = {};
var NATIVE = isForced$2.NATIVE = 'N';
var POLYFILL = isForced$2.POLYFILL = 'P';

var isForced_1 = isForced$2;

var global$9 = global$i;
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$3;
var defineBuiltIn$5 = defineBuiltIn$6;
var defineGlobalProperty = defineGlobalProperty$3;
var copyConstructorProperties = copyConstructorProperties$1;
var isForced$1 = isForced_1;

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global$9;
  } else if (STATIC) {
    target = global$9[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global$9[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor$1(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced$1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty$1(sourceProperty, 'sham', true);
    }
    defineBuiltIn$5(target, key, sourceProperty, options);
  }
};

var classofRaw$1 = classofRaw$2;
var uncurryThis$b = functionUncurryThis;

var functionUncurryThisClause = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw$1(fn) === 'Function') return uncurryThis$b(fn);
};

var uncurryThis$a = functionUncurryThisClause;
var aCallable$5 = aCallable$7;
var NATIVE_BIND$1 = functionBindNative;

var bind$5 = uncurryThis$a(uncurryThis$a.bind);

// optional / simple context binding
var functionBindContext = function (fn, that) {
  aCallable$5(fn);
  return that === undefined ? fn : NATIVE_BIND$1 ? bind$5(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var classof$7 = classofRaw$2;

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
var isArray$2 = Array.isArray || function isArray(argument) {
  return classof$7(argument) == 'Array';
};

var wellKnownSymbol$c = wellKnownSymbol$e;

var TO_STRING_TAG$2 = wellKnownSymbol$c('toStringTag');
var test = {};

test[TO_STRING_TAG$2] = 'z';

var toStringTagSupport = String(test) === '[object z]';

var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
var isCallable$8 = isCallable$j;
var classofRaw = classofRaw$2;
var wellKnownSymbol$b = wellKnownSymbol$e;

var TO_STRING_TAG$1 = wellKnownSymbol$b('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof$6 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG$1)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable$8(O.callee) ? 'Arguments' : result;
};

var uncurryThis$9 = functionUncurryThis;
var fails$9 = fails$i;
var isCallable$7 = isCallable$j;
var classof$5 = classof$6;
var getBuiltIn$4 = getBuiltIn$7;
var inspectSource$1 = inspectSource$3;

var noop = function () { /* empty */ };
var empty = [];
var construct = getBuiltIn$4('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec$1 = uncurryThis$9(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable$7(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable$7(argument)) return false;
  switch (classof$5(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec$1(constructorRegExp, inspectSource$1(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
var isConstructor$2 = !construct || fails$9(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;

var isArray$1 = isArray$2;
var isConstructor$1 = isConstructor$2;
var isObject$3 = isObject$9;
var wellKnownSymbol$a = wellKnownSymbol$e;

var SPECIES$5 = wellKnownSymbol$a('species');
var $Array = Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesConstructor$1 = function (originalArray) {
  var C;
  if (isArray$1(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor$1(C) && (C === $Array || isArray$1(C.prototype))) C = undefined;
    else if (isObject$3(C)) {
      C = C[SPECIES$5];
      if (C === null) C = undefined;
    }
  } return C === undefined ? $Array : C;
};

var arraySpeciesConstructor = arraySpeciesConstructor$1;

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate$1 = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};

var bind$4 = functionBindContext;
var uncurryThis$8 = functionUncurryThis;
var IndexedObject$1 = indexedObject;
var toObject$2 = toObject$4;
var lengthOfArrayLike$1 = lengthOfArrayLike$3;
var arraySpeciesCreate = arraySpeciesCreate$1;

var push$1 = uncurryThis$8([].push);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod$1 = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject$2($this);
    var self = IndexedObject$1(O);
    var boundFunction = bind$4(callbackfn, that);
    var length = lengthOfArrayLike$1(self);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push$1(target, value);      // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push$1(target, value);      // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$1(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod$1(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod$1(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod$1(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod$1(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod$1(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$1(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod$1(7)
};

var fails$8 = fails$i;
var wellKnownSymbol$9 = wellKnownSymbol$e;
var V8_VERSION$1 = engineV8Version;

var SPECIES$4 = wellKnownSymbol$9('species');

var arrayMethodHasSpeciesSupport$2 = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION$1 >= 51 || !fails$8(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES$4] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var $$a = _export;
var $filter = arrayIteration.filter;
var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$2;

var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$$a({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
var classof$4 = classof$6;

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
var objectToString$1 = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
  return '[object ' + classof$4(this) + ']';
};

var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var defineBuiltIn$4 = defineBuiltIn$6;
var toString$5 = objectToString$1;

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  defineBuiltIn$4(Object.prototype, 'toString', toString$5, { unsafe: true });
}

var classof$3 = classofRaw$2;

var engineIsNode = typeof process != 'undefined' && classof$3(process) == 'process';

var isCallable$6 = isCallable$j;

var $String$1 = String;
var $TypeError$7 = TypeError;

var aPossiblePrototype$1 = function (argument) {
  if (typeof argument == 'object' || isCallable$6(argument)) return argument;
  throw $TypeError$7("Can't set " + $String$1(argument) + ' as a prototype');
};

/* eslint-disable no-proto -- safe */

var uncurryThis$7 = functionUncurryThis;
var anObject$b = anObject$e;
var aPossiblePrototype = aPossiblePrototype$1;

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = uncurryThis$7(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject$b(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var defineProperty$2 = objectDefineProperty.f;
var hasOwn$2 = hasOwnProperty_1;
var wellKnownSymbol$8 = wellKnownSymbol$e;

var TO_STRING_TAG = wellKnownSymbol$8('toStringTag');

var setToStringTag$1 = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwn$2(target, TO_STRING_TAG)) {
    defineProperty$2(target, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};

var getBuiltIn$3 = getBuiltIn$7;
var definePropertyModule$1 = objectDefineProperty;
var wellKnownSymbol$7 = wellKnownSymbol$e;
var DESCRIPTORS$3 = descriptors;

var SPECIES$3 = wellKnownSymbol$7('species');

var setSpecies$1 = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn$3(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule$1.f;

  if (DESCRIPTORS$3 && Constructor && !Constructor[SPECIES$3]) {
    defineProperty(Constructor, SPECIES$3, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

var isPrototypeOf$2 = objectIsPrototypeOf;

var $TypeError$6 = TypeError;

var anInstance$1 = function (it, Prototype) {
  if (isPrototypeOf$2(Prototype, it)) return it;
  throw $TypeError$6('Incorrect invocation');
};

var isConstructor = isConstructor$2;
var tryToString$2 = tryToString$4;

var $TypeError$5 = TypeError;

// `Assert: IsConstructor(argument) is true`
var aConstructor$1 = function (argument) {
  if (isConstructor(argument)) return argument;
  throw $TypeError$5(tryToString$2(argument) + ' is not a constructor');
};

var anObject$a = anObject$e;
var aConstructor = aConstructor$1;
var isNullOrUndefined$2 = isNullOrUndefined$5;
var wellKnownSymbol$6 = wellKnownSymbol$e;

var SPECIES$2 = wellKnownSymbol$6('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
var speciesConstructor$1 = function (O, defaultConstructor) {
  var C = anObject$a(O).constructor;
  var S;
  return C === undefined || isNullOrUndefined$2(S = anObject$a(C)[SPECIES$2]) ? defaultConstructor : aConstructor(S);
};

var NATIVE_BIND = functionBindNative;

var FunctionPrototype = Function.prototype;
var apply$2 = FunctionPrototype.apply;
var call$c = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call$c.bind(apply$2) : function () {
  return call$c.apply(apply$2, arguments);
});

var getBuiltIn$2 = getBuiltIn$7;

var html$2 = getBuiltIn$2('document', 'documentElement');

var uncurryThis$6 = functionUncurryThis;

var arraySlice$1 = uncurryThis$6([].slice);

var $TypeError$4 = TypeError;

var validateArgumentsLength$1 = function (passed, required) {
  if (passed < required) throw $TypeError$4('Not enough arguments');
  return passed;
};

var userAgent$2 = engineUserAgent;

var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$2);

var global$8 = global$i;
var apply$1 = functionApply;
var bind$3 = functionBindContext;
var isCallable$5 = isCallable$j;
var hasOwn$1 = hasOwnProperty_1;
var fails$7 = fails$i;
var html$1 = html$2;
var arraySlice = arraySlice$1;
var createElement = documentCreateElement$1;
var validateArgumentsLength = validateArgumentsLength$1;
var IS_IOS$1 = engineIsIos;
var IS_NODE$3 = engineIsNode;

var set = global$8.setImmediate;
var clear = global$8.clearImmediate;
var process$3 = global$8.process;
var Dispatch = global$8.Dispatch;
var Function$1 = global$8.Function;
var MessageChannel = global$8.MessageChannel;
var String$1 = global$8.String;
var counter = 0;
var queue$2 = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var $location, defer, channel, port;

fails$7(function () {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  $location = global$8.location;
});

var run = function (id) {
  if (hasOwn$1(queue$2, id)) {
    var fn = queue$2[id];
    delete queue$2[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var eventListener = function (event) {
  run(event.data);
};

var globalPostMessageDefer = function (id) {
  // old engines have not location.origin
  global$8.postMessage(String$1(id), $location.protocol + '//' + $location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(handler) {
    validateArgumentsLength(arguments.length, 1);
    var fn = isCallable$5(handler) ? handler : Function$1(handler);
    var args = arraySlice(arguments, 1);
    queue$2[++counter] = function () {
      apply$1(fn, undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue$2[id];
  };
  // Node.js 0.8-
  if (IS_NODE$3) {
    defer = function (id) {
      process$3.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS$1) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = eventListener;
    defer = bind$3(port.postMessage, port);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global$8.addEventListener &&
    isCallable$5(global$8.postMessage) &&
    !global$8.importScripts &&
    $location && $location.protocol !== 'file:' &&
    !fails$7(globalPostMessageDefer)
  ) {
    defer = globalPostMessageDefer;
    global$8.addEventListener('message', eventListener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html$1.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html$1.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

var task$1 = {
  set: set,
  clear: clear
};

var Queue$2 = function () {
  this.head = null;
  this.tail = null;
};

Queue$2.prototype = {
  add: function (item) {
    var entry = { item: item, next: null };
    var tail = this.tail;
    if (tail) tail.next = entry;
    else this.head = entry;
    this.tail = entry;
  },
  get: function () {
    var entry = this.head;
    if (entry) {
      var next = this.head = entry.next;
      if (next === null) this.tail = null;
      return entry.item;
    }
  }
};

var queue$1 = Queue$2;

var userAgent$1 = engineUserAgent;

var engineIsIosPebble = /ipad|iphone|ipod/i.test(userAgent$1) && typeof Pebble != 'undefined';

var userAgent = engineUserAgent;

var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent);

var global$7 = global$i;
var bind$2 = functionBindContext;
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var macrotask = task$1.set;
var Queue$1 = queue$1;
var IS_IOS = engineIsIos;
var IS_IOS_PEBBLE = engineIsIosPebble;
var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
var IS_NODE$2 = engineIsNode;

var MutationObserver = global$7.MutationObserver || global$7.WebKitMutationObserver;
var document$2 = global$7.document;
var process$2 = global$7.process;
var Promise$1 = global$7.Promise;
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global$7, 'queueMicrotask');
var microtask$1 = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
var notify$1, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!microtask$1) {
  var queue = new Queue$1();

  var flush = function () {
    var parent, fn;
    if (IS_NODE$2 && (parent = process$2.domain)) parent.exit();
    while (fn = queue.get()) try {
      fn();
    } catch (error) {
      if (queue.head) notify$1();
      throw error;
    }
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!IS_IOS && !IS_NODE$2 && !IS_WEBOS_WEBKIT && MutationObserver && document$2) {
    toggle = true;
    node = document$2.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify$1 = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (!IS_IOS_PEBBLE && Promise$1 && Promise$1.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise$1.resolve(undefined);
    // workaround of WebKit ~ iOS Safari 10.1 bug
    promise.constructor = Promise$1;
    then = bind$2(promise.then, promise);
    notify$1 = function () {
      then(flush);
    };
  // Node.js without promises
  } else if (IS_NODE$2) {
    notify$1 = function () {
      process$2.nextTick(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessage
  // - onreadystatechange
  // - setTimeout
  } else {
    // `webpack` dev server bug on IE global methods - use bind(fn, global)
    macrotask = bind$2(macrotask, global$7);
    notify$1 = function () {
      macrotask(flush);
    };
  }

  microtask$1 = function (fn) {
    if (!queue.head) notify$1();
    queue.add(fn);
  };
}

var microtask_1 = microtask$1;

var hostReportErrors$1 = function (a, b) {
  try {
    // eslint-disable-next-line no-console -- safe
    arguments.length == 1 ? console.error(a) : console.error(a, b);
  } catch (error) { /* empty */ }
};

var perform$3 = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};

var global$6 = global$i;

var promiseNativeConstructor = global$6.Promise;

/* global Deno -- Deno case */

var engineIsDeno = typeof Deno == 'object' && Deno && typeof Deno.version == 'object';

var IS_DENO$1 = engineIsDeno;
var IS_NODE$1 = engineIsNode;

var engineIsBrowser = !IS_DENO$1 && !IS_NODE$1
  && typeof window == 'object'
  && typeof document == 'object';

var global$5 = global$i;
var NativePromiseConstructor$3 = promiseNativeConstructor;
var isCallable$4 = isCallable$j;
var isForced = isForced_1;
var inspectSource = inspectSource$3;
var wellKnownSymbol$5 = wellKnownSymbol$e;
var IS_BROWSER = engineIsBrowser;
var IS_DENO = engineIsDeno;
var V8_VERSION = engineV8Version;

NativePromiseConstructor$3 && NativePromiseConstructor$3.prototype;
var SPECIES$1 = wellKnownSymbol$5('species');
var SUBCLASSING = false;
var NATIVE_PROMISE_REJECTION_EVENT$1 = isCallable$4(global$5.PromiseRejectionEvent);

var FORCED_PROMISE_CONSTRUCTOR$5 = isForced('Promise', function () {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor$3);
  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor$3);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (!V8_VERSION || V8_VERSION < 51 || !/native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) {
    // Detect correctness of subclassing with @@species support
    var promise = new NativePromiseConstructor$3(function (resolve) { resolve(1); });
    var FakePromise = function (exec) {
      exec(function () { /* empty */ }, function () { /* empty */ });
    };
    var constructor = promise.constructor = {};
    constructor[SPECIES$1] = FakePromise;
    SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
    if (!SUBCLASSING) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  } return !GLOBAL_CORE_JS_PROMISE && (IS_BROWSER || IS_DENO) && !NATIVE_PROMISE_REJECTION_EVENT$1;
});

var promiseConstructorDetection = {
  CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR$5,
  REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT$1,
  SUBCLASSING: SUBCLASSING
};

var newPromiseCapability$2 = {};

var aCallable$4 = aCallable$7;

var $TypeError$3 = TypeError;

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw $TypeError$3('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aCallable$4(resolve);
  this.reject = aCallable$4(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
newPromiseCapability$2.f = function (C) {
  return new PromiseCapability(C);
};

var $$9 = _export;
var IS_NODE = engineIsNode;
var global$4 = global$i;
var call$b = functionCall;
var defineBuiltIn$3 = defineBuiltIn$6;
var setPrototypeOf = objectSetPrototypeOf;
var setToStringTag = setToStringTag$1;
var setSpecies = setSpecies$1;
var aCallable$3 = aCallable$7;
var isCallable$3 = isCallable$j;
var isObject$2 = isObject$9;
var anInstance = anInstance$1;
var speciesConstructor = speciesConstructor$1;
var task = task$1.set;
var microtask = microtask_1;
var hostReportErrors = hostReportErrors$1;
var perform$2 = perform$3;
var Queue = queue$1;
var InternalStateModule = internalState;
var NativePromiseConstructor$2 = promiseNativeConstructor;
var PromiseConstructorDetection = promiseConstructorDetection;
var newPromiseCapabilityModule$3 = newPromiseCapability$2;

var PROMISE = 'Promise';
var FORCED_PROMISE_CONSTRUCTOR$4 = PromiseConstructorDetection.CONSTRUCTOR;
var NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT;
var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var setInternalState = InternalStateModule.set;
var NativePromisePrototype$1 = NativePromiseConstructor$2 && NativePromiseConstructor$2.prototype;
var PromiseConstructor = NativePromiseConstructor$2;
var PromisePrototype = NativePromisePrototype$1;
var TypeError$1 = global$4.TypeError;
var document$1 = global$4.document;
var process$1 = global$4.process;
var newPromiseCapability$1 = newPromiseCapabilityModule$3.f;
var newGenericPromiseCapability = newPromiseCapability$1;

var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$4.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;

var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

// helpers
var isThenable = function (it) {
  var then;
  return isObject$2(it) && isCallable$3(then = it.then) ? then : false;
};

var callReaction = function (reaction, state) {
  var value = state.value;
  var ok = state.state == FULFILLED;
  var handler = ok ? reaction.ok : reaction.fail;
  var resolve = reaction.resolve;
  var reject = reaction.reject;
  var domain = reaction.domain;
  var result, then, exited;
  try {
    if (handler) {
      if (!ok) {
        if (state.rejection === UNHANDLED) onHandleUnhandled(state);
        state.rejection = HANDLED;
      }
      if (handler === true) result = value;
      else {
        if (domain) domain.enter();
        result = handler(value); // can throw
        if (domain) {
          domain.exit();
          exited = true;
        }
      }
      if (result === reaction.promise) {
        reject(TypeError$1('Promise-chain cycle'));
      } else if (then = isThenable(result)) {
        call$b(then, result, resolve, reject);
      } else resolve(result);
    } else reject(value);
  } catch (error) {
    if (domain && !exited) domain.exit();
    reject(error);
  }
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  microtask(function () {
    var reactions = state.reactions;
    var reaction;
    while (reaction = reactions.get()) {
      callReaction(reaction, state);
    }
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document$1.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global$4.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = global$4['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  call$b(task, global$4, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform$2(function () {
        if (IS_NODE) {
          process$1.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  call$b(task, global$4, function () {
    var promise = state.facade;
    if (IS_NODE) {
      process$1.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind$1 = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw TypeError$1("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          call$b(then, value,
            bind$1(internalResolve, wrapper, state),
            bind$1(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED_PROMISE_CONSTRUCTOR$4) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromisePrototype);
    aCallable$3(executor);
    call$b(Internal, this);
    var state = getInternalPromiseState(this);
    try {
      executor(bind$1(internalResolve, state), bind$1(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };

  PromisePrototype = PromiseConstructor.prototype;

  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: new Queue(),
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };

  // `Promise.prototype.then` method
  // https://tc39.es/ecma262/#sec-promise.prototype.then
  Internal.prototype = defineBuiltIn$3(PromisePrototype, 'then', function then(onFulfilled, onRejected) {
    var state = getInternalPromiseState(this);
    var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
    state.parent = true;
    reaction.ok = isCallable$3(onFulfilled) ? onFulfilled : true;
    reaction.fail = isCallable$3(onRejected) && onRejected;
    reaction.domain = IS_NODE ? process$1.domain : undefined;
    if (state.state == PENDING) state.reactions.add(reaction);
    else microtask(function () {
      callReaction(reaction, state);
    });
    return reaction.promise;
  });

  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalPromiseState(promise);
    this.promise = promise;
    this.resolve = bind$1(internalResolve, state);
    this.reject = bind$1(internalReject, state);
  };

  newPromiseCapabilityModule$3.f = newPromiseCapability$1 = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (isCallable$3(NativePromiseConstructor$2) && NativePromisePrototype$1 !== Object.prototype) {
    nativeThen = NativePromisePrototype$1.then;

    if (!NATIVE_PROMISE_SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      defineBuiltIn$3(NativePromisePrototype$1, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          call$b(nativeThen, that, resolve, reject);
        }).then(onFulfilled, onRejected);
      // https://github.com/zloirock/core-js/issues/640
      }, { unsafe: true });
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype$1.constructor;
    } catch (error) { /* empty */ }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype$1, PromisePrototype);
    }
  }
}

$$9({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR$4 }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false);
setSpecies(PROMISE);

var iterators = {};

var wellKnownSymbol$4 = wellKnownSymbol$e;
var Iterators$1 = iterators;

var ITERATOR$2 = wellKnownSymbol$4('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod$1 = function (it) {
  return it !== undefined && (Iterators$1.Array === it || ArrayPrototype[ITERATOR$2] === it);
};

var classof$2 = classof$6;
var getMethod$2 = getMethod$4;
var isNullOrUndefined$1 = isNullOrUndefined$5;
var Iterators = iterators;
var wellKnownSymbol$3 = wellKnownSymbol$e;

var ITERATOR$1 = wellKnownSymbol$3('iterator');

var getIteratorMethod$2 = function (it) {
  if (!isNullOrUndefined$1(it)) return getMethod$2(it, ITERATOR$1)
    || getMethod$2(it, '@@iterator')
    || Iterators[classof$2(it)];
};

var call$a = functionCall;
var aCallable$2 = aCallable$7;
var anObject$9 = anObject$e;
var tryToString$1 = tryToString$4;
var getIteratorMethod$1 = getIteratorMethod$2;

var $TypeError$2 = TypeError;

var getIterator$1 = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$1(argument) : usingIterator;
  if (aCallable$2(iteratorMethod)) return anObject$9(call$a(iteratorMethod, argument));
  throw $TypeError$2(tryToString$1(argument) + ' is not iterable');
};

var call$9 = functionCall;
var anObject$8 = anObject$e;
var getMethod$1 = getMethod$4;

var iteratorClose$1 = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject$8(iterator);
  try {
    innerResult = getMethod$1(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call$9(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject$8(innerResult);
  return value;
};

var bind = functionBindContext;
var call$8 = functionCall;
var anObject$7 = anObject$e;
var tryToString = tryToString$4;
var isArrayIteratorMethod = isArrayIteratorMethod$1;
var lengthOfArrayLike = lengthOfArrayLike$3;
var isPrototypeOf$1 = objectIsPrototypeOf;
var getIterator = getIterator$1;
var getIteratorMethod = getIteratorMethod$2;
var iteratorClose = iteratorClose$1;

var $TypeError$1 = TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

var iterate$2 = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_RECORD = !!(options && options.IS_RECORD);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject$7(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_RECORD) {
    iterator = iterable.iterator;
  } else if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw $TypeError$1(tryToString(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf$1(ResultPrototype, result)) return result;
      } return new Result(false);
    }
    iterator = getIterator(iterable, iterFn);
  }

  next = IS_RECORD ? iterable.next : iterator.next;
  while (!(step = call$8(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
    if (typeof result == 'object' && result && isPrototypeOf$1(ResultPrototype, result)) return result;
  } return new Result(false);
};

var wellKnownSymbol$2 = wellKnownSymbol$e;

var ITERATOR = wellKnownSymbol$2('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

var checkCorrectnessOfIteration$1 = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

var NativePromiseConstructor$1 = promiseNativeConstructor;
var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;
var FORCED_PROMISE_CONSTRUCTOR$3 = promiseConstructorDetection.CONSTRUCTOR;

var promiseStaticsIncorrectIteration = FORCED_PROMISE_CONSTRUCTOR$3 || !checkCorrectnessOfIteration(function (iterable) {
  NativePromiseConstructor$1.all(iterable).then(undefined, function () { /* empty */ });
});

var $$8 = _export;
var call$7 = functionCall;
var aCallable$1 = aCallable$7;
var newPromiseCapabilityModule$2 = newPromiseCapability$2;
var perform$1 = perform$3;
var iterate$1 = iterate$2;
var PROMISE_STATICS_INCORRECT_ITERATION$1 = promiseStaticsIncorrectIteration;

// `Promise.all` method
// https://tc39.es/ecma262/#sec-promise.all
$$8({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION$1 }, {
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule$2.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform$1(function () {
      var $promiseResolve = aCallable$1(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate$1(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        remaining++;
        call$7($promiseResolve, C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

var $$7 = _export;
var FORCED_PROMISE_CONSTRUCTOR$2 = promiseConstructorDetection.CONSTRUCTOR;
var NativePromiseConstructor = promiseNativeConstructor;
var getBuiltIn$1 = getBuiltIn$7;
var isCallable$2 = isCallable$j;
var defineBuiltIn$2 = defineBuiltIn$6;

var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;

// `Promise.prototype.catch` method
// https://tc39.es/ecma262/#sec-promise.prototype.catch
$$7({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR$2, real: true }, {
  'catch': function (onRejected) {
    return this.then(undefined, onRejected);
  }
});

// makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
if (isCallable$2(NativePromiseConstructor)) {
  var method = getBuiltIn$1('Promise').prototype['catch'];
  if (NativePromisePrototype['catch'] !== method) {
    defineBuiltIn$2(NativePromisePrototype, 'catch', method, { unsafe: true });
  }
}

var $$6 = _export;
var call$6 = functionCall;
var aCallable = aCallable$7;
var newPromiseCapabilityModule$1 = newPromiseCapability$2;
var perform = perform$3;
var iterate = iterate$2;
var PROMISE_STATICS_INCORRECT_ITERATION = promiseStaticsIncorrectIteration;

// `Promise.race` method
// https://tc39.es/ecma262/#sec-promise.race
$$6({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule$1.f(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable(C.resolve);
      iterate(iterable, function (promise) {
        call$6($promiseResolve, C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

var $$5 = _export;
var call$5 = functionCall;
var newPromiseCapabilityModule = newPromiseCapability$2;
var FORCED_PROMISE_CONSTRUCTOR$1 = promiseConstructorDetection.CONSTRUCTOR;

// `Promise.reject` method
// https://tc39.es/ecma262/#sec-promise.reject
$$5({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR$1 }, {
  reject: function reject(r) {
    var capability = newPromiseCapabilityModule.f(this);
    call$5(capability.reject, undefined, r);
    return capability.promise;
  }
});

var anObject$6 = anObject$e;
var isObject$1 = isObject$9;
var newPromiseCapability = newPromiseCapability$2;

var promiseResolve$1 = function (C, x) {
  anObject$6(C);
  if (isObject$1(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var $$4 = _export;
var getBuiltIn = getBuiltIn$7;
var FORCED_PROMISE_CONSTRUCTOR = promiseConstructorDetection.CONSTRUCTOR;
var promiseResolve = promiseResolve$1;

getBuiltIn('Promise');

// `Promise.resolve` method
// https://tc39.es/ecma262/#sec-promise.resolve
$$4({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
  resolve: function resolve(x) {
    return promiseResolve(this, x);
  }
});

/// <reference types="@nextcloud/typings" />
var FilePickerType;
(function (FilePickerType) {
  FilePickerType[FilePickerType["Choose"] = 1] = "Choose";
  FilePickerType[FilePickerType["Move"] = 2] = "Move";
  FilePickerType[FilePickerType["Copy"] = 3] = "Copy";
  FilePickerType[FilePickerType["CopyMove"] = 4] = "CopyMove";
})(FilePickerType || (FilePickerType = {}));
var FilePicker = /*#__PURE__*/function () {
  function FilePicker(title, multiSelect, mimeTypeFilter, modal, type, directoriesAllowed, path, filter) {
    _classCallCheck$1(this, FilePicker);
    this.title = title;
    this.multiSelect = multiSelect;
    this.mimeTypeFiler = mimeTypeFilter;
    this.modal = modal;
    this.type = type;
    this.directoriesAllowed = directoriesAllowed;
    this.path = path;
    this.filter = filter;
  }
  _createClass$1(FilePicker, [{
    key: "pick",
    value: function pick() {
      var _this = this;
      return new Promise(function (res, rej) {
        OC.dialogs.filepicker(_this.title, res, _this.multiSelect, _this.mimeTypeFiler, _this.modal, _this.type, _this.path, {
          allowDirectoryChooser: _this.directoriesAllowed,
          filter: _this.filter
        });
      });
    }
  }]);
  return FilePicker;
}();
var FilePickerBuilder = /*#__PURE__*/function () {
  function FilePickerBuilder(title) {
    _classCallCheck$1(this, FilePickerBuilder);
    this.multiSelect = false;
    this.mimeTypeFiler = [];
    this.modal = true;
    this.type = FilePickerType.Choose;
    this.directoriesAllowed = false;
    this.title = title;
  }
  _createClass$1(FilePickerBuilder, [{
    key: "setMultiSelect",
    value: function setMultiSelect(ms) {
      this.multiSelect = ms;
      return this;
    }
  }, {
    key: "addMimeTypeFilter",
    value: function addMimeTypeFilter(filter) {
      this.mimeTypeFiler.push(filter);
      return this;
    }
  }, {
    key: "setMimeTypeFilter",
    value: function setMimeTypeFilter(filter) {
      this.mimeTypeFiler = filter;
      return this;
    }
  }, {
    key: "setModal",
    value: function setModal(modal) {
      this.modal = modal;
      return this;
    }
  }, {
    key: "setType",
    value: function setType(type) {
      this.type = type;
      return this;
    }
  }, {
    key: "allowDirectories",
    value: function allowDirectories() {
      var allow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.directoriesAllowed = allow;
      return this;
    }
  }, {
    key: "startAt",
    value: function startAt(path) {
      this.path = path;
      return this;
    }
  }, {
    key: "setFilter",
    value: function setFilter(filter) {
      this.filter = filter;
      return this;
    }
  }, {
    key: "build",
    value: function build() {
      return new FilePicker(this.title, this.multiSelect, this.mimeTypeFiler, this.modal, this.type, this.directoriesAllowed, this.path, this.filter);
    }
  }]);
  return FilePickerBuilder;
}();
function getFilePickerBuilder(title) {
  return new FilePickerBuilder(title);
}

var internalObjectKeys = objectKeysInternal;
var enumBugKeys$1 = enumBugKeys$3;

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
var objectKeys$2 = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys$1);
};

var DESCRIPTORS$2 = descriptors;
var uncurryThis$5 = functionUncurryThis;
var call$4 = functionCall;
var fails$6 = fails$i;
var objectKeys$1 = objectKeys$2;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var toObject$1 = toObject$4;
var IndexedObject = indexedObject;

// eslint-disable-next-line es/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es/no-object-defineproperty -- required for testing
var defineProperty$1 = Object.defineProperty;
var concat$1 = uncurryThis$5([].concat);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
var objectAssign = !$assign || fails$6(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS$2 && $assign({ b: 1 }, $assign(defineProperty$1({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty$1(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line es/no-symbol -- safe
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return $assign({}, A)[symbol] != 7 || objectKeys$1($assign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject$1(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? concat$1(objectKeys$1(S), getOwnPropertySymbols(S)) : objectKeys$1(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS$2 || call$4(propertyIsEnumerable, S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

var $$3 = _export;
var assign = objectAssign;

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es/no-object-assign -- required for testing
$$3({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== assign }, {
  assign: assign
});

var classof$1 = classof$6;

var $String = String;

var toString$4 = function (argument) {
  if (classof$1(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};

var anObject$5 = anObject$e;

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags$1 = function () {
  var that = anObject$5(this);
  var result = '';
  if (that.hasIndices) result += 'd';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.unicodeSets) result += 'v';
  if (that.sticky) result += 'y';
  return result;
};

var call$3 = functionCall;
var hasOwn = hasOwnProperty_1;
var isPrototypeOf = objectIsPrototypeOf;
var regExpFlags = regexpFlags$1;

var RegExpPrototype$2 = RegExp.prototype;

var regexpGetFlags = function (R) {
  var flags = R.flags;
  return flags === undefined && !('flags' in RegExpPrototype$2) && !hasOwn(R, 'flags') && isPrototypeOf(RegExpPrototype$2, R)
    ? call$3(regExpFlags, R) : flags;
};

var PROPER_FUNCTION_NAME = functionName.PROPER;
var defineBuiltIn$1 = defineBuiltIn$6;
var anObject$4 = anObject$e;
var $toString = toString$4;
var fails$5 = fails$i;
var getRegExpFlags = regexpGetFlags;

var TO_STRING = 'toString';
var RegExpPrototype$1 = RegExp.prototype;
var nativeToString = RegExpPrototype$1[TO_STRING];

var NOT_GENERIC = fails$5(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = PROPER_FUNCTION_NAME && nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  defineBuiltIn$1(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject$4(this);
    var pattern = $toString(R.source);
    var flags = $toString(getRegExpFlags(R));
    return '/' + pattern + '/' + flags;
  }, { unsafe: true });
}

var $$2 = _export;
var $map = arrayIteration.map;
var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$2;

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');

// `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species
$$2({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var gettext$1 = {};

var fails$4 = fails$i;
var global$3 = global$i;

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp$2 = global$3.RegExp;

var UNSUPPORTED_Y$1 = fails$4(function () {
  var re = $RegExp$2('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

// UC Browser bug
// https://github.com/zloirock/core-js/issues/1008
var MISSED_STICKY = UNSUPPORTED_Y$1 || fails$4(function () {
  return !$RegExp$2('a', 'y').sticky;
});

var BROKEN_CARET = UNSUPPORTED_Y$1 || fails$4(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp$2('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

var regexpStickyHelpers = {
  BROKEN_CARET: BROKEN_CARET,
  MISSED_STICKY: MISSED_STICKY,
  UNSUPPORTED_Y: UNSUPPORTED_Y$1
};

var objectDefineProperties = {};

var DESCRIPTORS$1 = descriptors;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var definePropertyModule = objectDefineProperty;
var anObject$3 = anObject$e;
var toIndexedObject = toIndexedObject$4;
var objectKeys = objectKeys$2;

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
objectDefineProperties.f = DESCRIPTORS$1 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$3(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};

/* global ActiveXObject -- old IE, WSH */

var anObject$2 = anObject$e;
var definePropertiesModule = objectDefineProperties;
var enumBugKeys = enumBugKeys$3;
var hiddenKeys = hiddenKeys$4;
var html = html$2;
var documentCreateElement = documentCreateElement$1;
var sharedKey = sharedKey$2;

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es/no-object-create -- safe
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject$2(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};

var fails$3 = fails$i;
var global$2 = global$i;

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp$1 = global$2.RegExp;

var regexpUnsupportedDotAll = fails$3(function () {
  var re = $RegExp$1('.', 's');
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});

var fails$2 = fails$i;
var global$1 = global$i;

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global$1.RegExp;

var regexpUnsupportedNcg = fails$2(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call$2 = functionCall;
var uncurryThis$4 = functionUncurryThis;
var toString$3 = toString$4;
var regexpFlags = regexpFlags$1;
var stickyHelpers = regexpStickyHelpers;
var shared = sharedExports;
var create = objectCreate;
var getInternalState = internalState.get;
var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG = regexpUnsupportedNcg;

var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt$3 = uncurryThis$4(''.charAt);
var indexOf = uncurryThis$4(''.indexOf);
var replace$1 = uncurryThis$4(''.replace);
var stringSlice$3 = uncurryThis$4(''.slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call$2(nativeExec, re1, 'a');
  call$2(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState(re);
    var str = toString$3(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call$2(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = call$2(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace$1(flags, 'y', '');
      if (indexOf(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice$3(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$3(str, re.lastIndex - 1) !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = call$2(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice$3(match.input, charsAdded);
        match[0] = stringSlice$3(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
      call$2(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

var regexpExec$2 = patchedExec;

var $$1 = _export;
var exec = regexpExec$2;

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$$1({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});

// TODO: Remove from `core-js@4` since it's moved to entry points

var uncurryThis$3 = functionUncurryThisClause;
var defineBuiltIn = defineBuiltIn$6;
var regexpExec$1 = regexpExec$2;
var fails$1 = fails$i;
var wellKnownSymbol$1 = wellKnownSymbol$e;
var createNonEnumerableProperty = createNonEnumerableProperty$3;

var SPECIES = wellKnownSymbol$1('species');
var RegExpPrototype = RegExp.prototype;

var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol$1(KEY);

  var DELEGATES_TO_SYMBOL = !fails$1(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$1(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var uncurriedNativeRegExpMethod = uncurryThis$3(/./[SYMBOL]);
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var uncurriedNativeMethod = uncurryThis$3(nativeMethod);
      var $exec = regexp.exec;
      if ($exec === regexpExec$1 || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
        }
        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
      }
      return { done: false };
    });

    defineBuiltIn(String.prototype, KEY, methods[0]);
    defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
};

var uncurryThis$2 = functionUncurryThis;
var toIntegerOrInfinity$1 = toIntegerOrInfinity$4;
var toString$2 = toString$4;
var requireObjectCoercible$1 = requireObjectCoercible$4;

var charAt$2 = uncurryThis$2(''.charAt);
var charCodeAt = uncurryThis$2(''.charCodeAt);
var stringSlice$2 = uncurryThis$2(''.slice);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString$2(requireObjectCoercible$1($this));
    var position = toIntegerOrInfinity$1(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt$2(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice$2(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};

var charAt$1 = stringMultibyte.charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
var advanceStringIndex$1 = function (S, index, unicode) {
  return index + (unicode ? charAt$1(S, index).length : 1);
};

var uncurryThis$1 = functionUncurryThis;
var toObject = toObject$4;

var floor = Math.floor;
var charAt = uncurryThis$1(''.charAt);
var replace = uncurryThis$1(''.replace);
var stringSlice$1 = uncurryThis$1(''.slice);
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace(replacement, symbols, function (match, ch) {
    var capture;
    switch (charAt(ch, 0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return stringSlice$1(str, 0, position);
      case "'": return stringSlice$1(str, tailPos);
      case '<':
        capture = namedCaptures[stringSlice$1(ch, 1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};

var call$1 = functionCall;
var anObject$1 = anObject$e;
var isCallable$1 = isCallable$j;
var classof = classofRaw$2;
var regexpExec = regexpExec$2;

var $TypeError = TypeError;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
var regexpExecAbstract = function (R, S) {
  var exec = R.exec;
  if (isCallable$1(exec)) {
    var result = call$1(exec, R, S);
    if (result !== null) anObject$1(result);
    return result;
  }
  if (classof(R) === 'RegExp') return call$1(regexpExec, R, S);
  throw $TypeError('RegExp#exec called on incompatible receiver');
};

var apply = functionApply;
var call = functionCall;
var uncurryThis = functionUncurryThis;
var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
var fails = fails$i;
var anObject = anObject$e;
var isCallable = isCallable$j;
var isNullOrUndefined = isNullOrUndefined$5;
var toIntegerOrInfinity = toIntegerOrInfinity$4;
var toLength = toLength$2;
var toString$1 = toString$4;
var requireObjectCoercible = requireObjectCoercible$4;
var advanceStringIndex = advanceStringIndex$1;
var getMethod = getMethod$4;
var getSubstitution = getSubstitution$1;
var regExpExec = regexpExecAbstract;
var wellKnownSymbol = wellKnownSymbol$e;

var REPLACE = wellKnownSymbol('replace');
var max = Math.max;
var min = Math.min;
var concat = uncurryThis([].concat);
var push = uncurryThis([].push);
var stringIndexOf = uncurryThis(''.indexOf);
var stringSlice = uncurryThis(''.slice);

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
  return ''.replace(re, '$<a>') !== '7';
});

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = isNullOrUndefined(searchValue) ? undefined : getMethod(searchValue, REPLACE);
      return replacer
        ? call(replacer, searchValue, O, replaceValue)
        : call(nativeReplace, toString$1(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      var rx = anObject(this);
      var S = toString$1(string);

      if (
        typeof replaceValue == 'string' &&
        stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
        stringIndexOf(replaceValue, '$<') === -1
      ) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done) return res.value;
      }

      var functionalReplace = isCallable(replaceValue);
      if (!functionalReplace) replaceValue = toString$1(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        push(results, result);
        if (!global) break;

        var matchStr = toString$1(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = toString$1(result[0]);
        var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = concat([matched], captures, position, S);
          if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
          var replacement = toString$1(apply(replaceValue, undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + stringSlice(S, nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

var $ = _export;
var DESCRIPTORS = descriptors;
var defineProperty = objectDefineProperty.f;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
// eslint-disable-next-line es/no-object-defineproperty -- safe
$({ target: 'Object', stat: true, forced: Object.defineProperty !== defineProperty, sham: !DESCRIPTORS }, {
  defineProperty: defineProperty
});

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol$1 = root.Symbol,
    splice = arrayProto.splice;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map'),
    nativeCreate = getNative(Object, 'create');

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function(string) {
  string = toString(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get$1(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

var lodash_get = get$1;

var plurals$1 = {
    ach: {
        name: 'Acholi',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    af: {
        name: 'Afrikaans',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    ak: {
        name: 'Akan',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    am: {
        name: 'Amharic',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    an: {
        name: 'Aragonese',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    ar: {
        name: 'Arabic',
        examples: [{
            plural: 0,
            sample: 0
        }, {
            plural: 1,
            sample: 1
        }, {
            plural: 2,
            sample: 2
        }, {
            plural: 3,
            sample: 3
        }, {
            plural: 4,
            sample: 11
        }, {
            plural: 5,
            sample: 100
        }],
        nplurals: 6,
        pluralsText: 'nplurals = 6; plural = (n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5)',
        pluralsFunc: function(n) {
            return (n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5);
        }
    },
    arn: {
        name: 'Mapudungun',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    ast: {
        name: 'Asturian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    ay: {
        name: 'Aymará',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    az: {
        name: 'Azerbaijani',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    be: {
        name: 'Belarusian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 5
        }],
        nplurals: 3,
        pluralsText: 'nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)',
        pluralsFunc: function(n) {
            return (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
        }
    },
    bg: {
        name: 'Bulgarian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    bn: {
        name: 'Bengali',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    bo: {
        name: 'Tibetan',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    br: {
        name: 'Breton',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    brx: {
        name: 'Bodo',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    bs: {
        name: 'Bosnian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 5
        }],
        nplurals: 3,
        pluralsText: 'nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)',
        pluralsFunc: function(n) {
            return (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
        }
    },
    ca: {
        name: 'Catalan',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    cgg: {
        name: 'Chiga',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    cs: {
        name: 'Czech',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 5
        }],
        nplurals: 3,
        pluralsText: 'nplurals = 3; plural = (n === 1 ? 0 : (n >= 2 && n <= 4) ? 1 : 2)',
        pluralsFunc: function(n) {
            return (n === 1 ? 0 : (n >= 2 && n <= 4) ? 1 : 2);
        }
    },
    csb: {
        name: 'Kashubian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 5
        }],
        nplurals: 3,
        pluralsText: 'nplurals = 3; plural = (n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)',
        pluralsFunc: function(n) {
            return (n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
        }
    },
    cy: {
        name: 'Welsh',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 3
        }, {
            plural: 3,
            sample: 8
        }],
        nplurals: 4,
        pluralsText: 'nplurals = 4; plural = (n === 1 ? 0 : n === 2 ? 1 : (n !== 8 && n !== 11) ? 2 : 3)',
        pluralsFunc: function(n) {
            return (n === 1 ? 0 : n === 2 ? 1 : (n !== 8 && n !== 11) ? 2 : 3);
        }
    },
    da: {
        name: 'Danish',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    de: {
        name: 'German',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    doi: {
        name: 'Dogri',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    dz: {
        name: 'Dzongkha',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    el: {
        name: 'Greek',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    en: {
        name: 'English',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    eo: {
        name: 'Esperanto',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    es: {
        name: 'Spanish',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    et: {
        name: 'Estonian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    eu: {
        name: 'Basque',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    fa: {
        name: 'Persian',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    ff: {
        name: 'Fulah',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    fi: {
        name: 'Finnish',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    fil: {
        name: 'Filipino',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    fo: {
        name: 'Faroese',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    fr: {
        name: 'French',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    fur: {
        name: 'Friulian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    fy: {
        name: 'Frisian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    ga: {
        name: 'Irish',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 3
        }, {
            plural: 3,
            sample: 7
        }, {
            plural: 4,
            sample: 11
        }],
        nplurals: 5,
        pluralsText: 'nplurals = 5; plural = (n === 1 ? 0 : n === 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4)',
        pluralsFunc: function(n) {
            return (n === 1 ? 0 : n === 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4);
        }
    },
    gd: {
        name: 'Scottish Gaelic',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 3
        }, {
            plural: 3,
            sample: 20
        }],
        nplurals: 4,
        pluralsText: 'nplurals = 4; plural = ((n === 1 || n === 11) ? 0 : (n === 2 || n === 12) ? 1 : (n > 2 && n < 20) ? 2 : 3)',
        pluralsFunc: function(n) {
            return ((n === 1 || n === 11) ? 0 : (n === 2 || n === 12) ? 1 : (n > 2 && n < 20) ? 2 : 3);
        }
    },
    gl: {
        name: 'Galician',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    gu: {
        name: 'Gujarati',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    gun: {
        name: 'Gun',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    ha: {
        name: 'Hausa',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    he: {
        name: 'Hebrew',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    hi: {
        name: 'Hindi',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    hne: {
        name: 'Chhattisgarhi',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    hr: {
        name: 'Croatian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 5
        }],
        nplurals: 3,
        pluralsText: 'nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)',
        pluralsFunc: function(n) {
            return (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
        }
    },
    hu: {
        name: 'Hungarian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    hy: {
        name: 'Armenian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    id: {
        name: 'Indonesian',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    is: {
        name: 'Icelandic',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n % 10 !== 1 || n % 100 === 11)',
        pluralsFunc: function(n) {
            return (n % 10 !== 1 || n % 100 === 11);
        }
    },
    it: {
        name: 'Italian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    ja: {
        name: 'Japanese',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    jbo: {
        name: 'Lojban',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    jv: {
        name: 'Javanese',
        examples: [{
            plural: 0,
            sample: 0
        }, {
            plural: 1,
            sample: 1
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 0)',
        pluralsFunc: function(n) {
            return (n !== 0);
        }
    },
    ka: {
        name: 'Georgian',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    kk: {
        name: 'Kazakh',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    km: {
        name: 'Khmer',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    kn: {
        name: 'Kannada',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    ko: {
        name: 'Korean',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    ku: {
        name: 'Kurdish',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    kw: {
        name: 'Cornish',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 3
        }, {
            plural: 3,
            sample: 4
        }],
        nplurals: 4,
        pluralsText: 'nplurals = 4; plural = (n === 1 ? 0 : n === 2 ? 1 : n === 3 ? 2 : 3)',
        pluralsFunc: function(n) {
            return (n === 1 ? 0 : n === 2 ? 1 : n === 3 ? 2 : 3);
        }
    },
    ky: {
        name: 'Kyrgyz',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    lb: {
        name: 'Letzeburgesch',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    ln: {
        name: 'Lingala',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    lo: {
        name: 'Lao',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    lt: {
        name: 'Lithuanian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 10
        }],
        nplurals: 3,
        pluralsText: 'nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)',
        pluralsFunc: function(n) {
            return (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
        }
    },
    lv: {
        name: 'Latvian',
        examples: [{
            plural: 2,
            sample: 0
        }, {
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 3,
        pluralsText: 'nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n !== 0 ? 1 : 2)',
        pluralsFunc: function(n) {
            return (n % 10 === 1 && n % 100 !== 11 ? 0 : n !== 0 ? 1 : 2);
        }
    },
    mai: {
        name: 'Maithili',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    mfe: {
        name: 'Mauritian Creole',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    mg: {
        name: 'Malagasy',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    mi: {
        name: 'Maori',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    mk: {
        name: 'Macedonian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n === 1 || n % 10 === 1 ? 0 : 1)',
        pluralsFunc: function(n) {
            return (n === 1 || n % 10 === 1 ? 0 : 1);
        }
    },
    ml: {
        name: 'Malayalam',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    mn: {
        name: 'Mongolian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    mni: {
        name: 'Manipuri',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    mnk: {
        name: 'Mandinka',
        examples: [{
            plural: 0,
            sample: 0
        }, {
            plural: 1,
            sample: 1
        }, {
            plural: 2,
            sample: 2
        }],
        nplurals: 3,
        pluralsText: 'nplurals = 3; plural = (n === 0 ? 0 : n === 1 ? 1 : 2)',
        pluralsFunc: function(n) {
            return (n === 0 ? 0 : n === 1 ? 1 : 2);
        }
    },
    mr: {
        name: 'Marathi',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    ms: {
        name: 'Malay',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    mt: {
        name: 'Maltese',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 11
        }, {
            plural: 3,
            sample: 20
        }],
        nplurals: 4,
        pluralsText: 'nplurals = 4; plural = (n === 1 ? 0 : n === 0 || ( n % 100 > 1 && n % 100 < 11) ? 1 : (n % 100 > 10 && n % 100 < 20 ) ? 2 : 3)',
        pluralsFunc: function(n) {
            return (n === 1 ? 0 : n === 0 || (n % 100 > 1 && n % 100 < 11) ? 1 : (n % 100 > 10 && n % 100 < 20) ? 2 : 3);
        }
    },
    my: {
        name: 'Burmese',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    nah: {
        name: 'Nahuatl',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    nap: {
        name: 'Neapolitan',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    nb: {
        name: 'Norwegian Bokmal',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    ne: {
        name: 'Nepali',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    nl: {
        name: 'Dutch',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    nn: {
        name: 'Norwegian Nynorsk',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    no: {
        name: 'Norwegian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    nso: {
        name: 'Northern Sotho',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    oc: {
        name: 'Occitan',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    or: {
        name: 'Oriya',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    pa: {
        name: 'Punjabi',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    pap: {
        name: 'Papiamento',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    pl: {
        name: 'Polish',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 5
        }],
        nplurals: 3,
        pluralsText: 'nplurals = 3; plural = (n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)',
        pluralsFunc: function(n) {
            return (n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
        }
    },
    pms: {
        name: 'Piemontese',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    ps: {
        name: 'Pashto',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    pt: {
        name: 'Portuguese',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    rm: {
        name: 'Romansh',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    ro: {
        name: 'Romanian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 20
        }],
        nplurals: 3,
        pluralsText: 'nplurals = 3; plural = (n === 1 ? 0 : (n === 0 || (n % 100 > 0 && n % 100 < 20)) ? 1 : 2)',
        pluralsFunc: function(n) {
            return (n === 1 ? 0 : (n === 0 || (n % 100 > 0 && n % 100 < 20)) ? 1 : 2);
        }
    },
    ru: {
        name: 'Russian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 5
        }],
        nplurals: 3,
        pluralsText: 'nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)',
        pluralsFunc: function(n) {
            return (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
        }
    },
    rw: {
        name: 'Kinyarwanda',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    sah: {
        name: 'Yakut',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    sat: {
        name: 'Santali',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    sco: {
        name: 'Scots',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    sd: {
        name: 'Sindhi',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    se: {
        name: 'Northern Sami',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    si: {
        name: 'Sinhala',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    sk: {
        name: 'Slovak',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 5
        }],
        nplurals: 3,
        pluralsText: 'nplurals = 3; plural = (n === 1 ? 0 : (n >= 2 && n <= 4) ? 1 : 2)',
        pluralsFunc: function(n) {
            return (n === 1 ? 0 : (n >= 2 && n <= 4) ? 1 : 2);
        }
    },
    sl: {
        name: 'Slovenian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 3
        }, {
            plural: 3,
            sample: 5
        }],
        nplurals: 4,
        pluralsText: 'nplurals = 4; plural = (n % 100 === 1 ? 0 : n % 100 === 2 ? 1 : n % 100 === 3 || n % 100 === 4 ? 2 : 3)',
        pluralsFunc: function(n) {
            return (n % 100 === 1 ? 0 : n % 100 === 2 ? 1 : n % 100 === 3 || n % 100 === 4 ? 2 : 3);
        }
    },
    so: {
        name: 'Somali',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    son: {
        name: 'Songhay',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    sq: {
        name: 'Albanian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    sr: {
        name: 'Serbian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 5
        }],
        nplurals: 3,
        pluralsText: 'nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)',
        pluralsFunc: function(n) {
            return (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
        }
    },
    su: {
        name: 'Sundanese',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    sv: {
        name: 'Swedish',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    sw: {
        name: 'Swahili',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    ta: {
        name: 'Tamil',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    te: {
        name: 'Telugu',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    tg: {
        name: 'Tajik',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    th: {
        name: 'Thai',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    ti: {
        name: 'Tigrinya',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    tk: {
        name: 'Turkmen',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    tr: {
        name: 'Turkish',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    tt: {
        name: 'Tatar',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    ug: {
        name: 'Uyghur',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    uk: {
        name: 'Ukrainian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 5
        }],
        nplurals: 3,
        pluralsText: 'nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)',
        pluralsFunc: function(n) {
            return (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
        }
    },
    ur: {
        name: 'Urdu',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    uz: {
        name: 'Uzbek',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    vi: {
        name: 'Vietnamese',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    wa: {
        name: 'Walloon',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    wo: {
        name: 'Wolof',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    yo: {
        name: 'Yoruba',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    zh: {
        name: 'Chinese',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    }
};

var get = lodash_get;
var plurals = plurals$1;

var gettext = Gettext;

/**
 * Creates and returns a new Gettext instance.
 *
 * @constructor
 * @param  {Object}  [options]             A set of options
 * @param  {String}  options.sourceLocale  The locale that the source code and its
 *                                         texts are written in. Translations for
 *                                         this locale is not necessary.
 * @param  {Boolean} options.debug         Whether to output debug info into the
 *                                         console.
 * @return {Object}  A Gettext instance
 */
function Gettext(options) {
    options = options || {};

    this.catalogs = {};
    this.locale = '';
    this.domain = 'messages';

    this.listeners = [];

    // Set source locale
    this.sourceLocale = '';
    if (options.sourceLocale) {
        if (typeof options.sourceLocale === 'string') {
            this.sourceLocale = options.sourceLocale;
        }
        else {
            this.warn('The `sourceLocale` option should be a string');
        }
    }

    // Set debug flag
    this.debug = 'debug' in options && options.debug === true;
}

/**
 * Adds an event listener.
 *
 * @param  {String}   eventName  An event name
 * @param  {Function} callback   An event handler function
 */
Gettext.prototype.on = function(eventName, callback) {
    this.listeners.push({
        eventName: eventName,
        callback: callback
    });
};

/**
 * Removes an event listener.
 *
 * @param  {String}   eventName  An event name
 * @param  {Function} callback   A previously registered event handler function
 */
Gettext.prototype.off = function(eventName, callback) {
    this.listeners = this.listeners.filter(function(listener) {
        return (
            listener.eventName === eventName &&
            listener.callback === callback
        ) === false;
    });
};

/**
 * Emits an event to all registered event listener.
 *
 * @private
 * @param  {String} eventName  An event name
 * @param  {any}    eventData  Data to pass to event listeners
 */
Gettext.prototype.emit = function(eventName, eventData) {
    for (var i = 0; i < this.listeners.length; i++) {
        var listener = this.listeners[i];
        if (listener.eventName === eventName) {
            listener.callback(eventData);
        }
    }
};

/**
 * Logs a warning to the console if debug mode is enabled.
 *
 * @ignore
 * @param  {String} message  A warning message
 */
Gettext.prototype.warn = function(message) {
    if (this.debug) {
        console.warn(message);
    }

    this.emit('error', new Error(message));
};

/**
 * Stores a set of translations in the set of gettext
 * catalogs.
 *
 * @example
 *     gt.addTranslations('sv-SE', 'messages', translationsObject)
 *
 * @param {String} locale        A locale string
 * @param {String} domain        A domain name
 * @param {Object} translations  An object of gettext-parser JSON shape
 */
Gettext.prototype.addTranslations = function(locale, domain, translations) {
    if (!this.catalogs[locale]) {
        this.catalogs[locale] = {};
    }

    this.catalogs[locale][domain] = translations;
};

/**
 * Sets the locale to get translated messages for.
 *
 * @example
 *     gt.setLocale('sv-SE')
 *
 * @param {String} locale  A locale
 */
Gettext.prototype.setLocale = function(locale) {
    if (typeof locale !== 'string') {
        this.warn(
            'You called setLocale() with an argument of type ' + (typeof locale) + '. ' +
            'The locale must be a string.'
        );
        return;
    }

    if (locale.trim() === '') {
        this.warn('You called setLocale() with an empty value, which makes little sense.');
    }

    if (locale !== this.sourceLocale && !this.catalogs[locale]) {
        this.warn('You called setLocale() with "' + locale + '", but no translations for that locale has been added.');
    }

    this.locale = locale;
};

/**
 * Sets the default gettext domain.
 *
 * @example
 *     gt.setTextDomain('domainname')
 *
 * @param {String} domain  A gettext domain name
 */
Gettext.prototype.setTextDomain = function(domain) {
    if (typeof domain !== 'string') {
        this.warn(
            'You called setTextDomain() with an argument of type ' + (typeof domain) + '. ' +
            'The domain must be a string.'
        );
        return;
    }

    if (domain.trim() === '') {
        this.warn('You called setTextDomain() with an empty `domain` value.');
    }

    this.domain = domain;
};

/**
 * Translates a string using the default textdomain
 *
 * @example
 *     gt.gettext('Some text')
 *
 * @param  {String} msgid  String to be translated
 * @return {String} Translation or the original string if no translation was found
 */
Gettext.prototype.gettext = function(msgid) {
    return this.dnpgettext(this.domain, '', msgid);
};

/**
 * Translates a string using a specific domain
 *
 * @example
 *     gt.dgettext('domainname', 'Some text')
 *
 * @param  {String} domain  A gettext domain name
 * @param  {String} msgid   String to be translated
 * @return {String} Translation or the original string if no translation was found
 */
Gettext.prototype.dgettext = function(domain, msgid) {
    return this.dnpgettext(domain, '', msgid);
};

/**
 * Translates a plural string using the default textdomain
 *
 * @example
 *     gt.ngettext('One thing', 'Many things', numberOfThings)
 *
 * @param  {String} msgid        String to be translated when count is not plural
 * @param  {String} msgidPlural  String to be translated when count is plural
 * @param  {Number} count        Number count for the plural
 * @return {String} Translation or the original string if no translation was found
 */
Gettext.prototype.ngettext = function(msgid, msgidPlural, count) {
    return this.dnpgettext(this.domain, '', msgid, msgidPlural, count);
};

/**
 * Translates a plural string using a specific textdomain
 *
 * @example
 *     gt.dngettext('domainname', 'One thing', 'Many things', numberOfThings)
 *
 * @param  {String} domain       A gettext domain name
 * @param  {String} msgid        String to be translated when count is not plural
 * @param  {String} msgidPlural  String to be translated when count is plural
 * @param  {Number} count        Number count for the plural
 * @return {String} Translation or the original string if no translation was found
 */
Gettext.prototype.dngettext = function(domain, msgid, msgidPlural, count) {
    return this.dnpgettext(domain, '', msgid, msgidPlural, count);
};

/**
 * Translates a string from a specific context using the default textdomain
 *
 * @example
 *    gt.pgettext('sports', 'Back')
 *
 * @param  {String} msgctxt  Translation context
 * @param  {String} msgid    String to be translated
 * @return {String} Translation or the original string if no translation was found
 */
Gettext.prototype.pgettext = function(msgctxt, msgid) {
    return this.dnpgettext(this.domain, msgctxt, msgid);
};

/**
 * Translates a string from a specific context using s specific textdomain
 *
 * @example
 *     gt.dpgettext('domainname', 'sports', 'Back')
 *
 * @param  {String} domain   A gettext domain name
 * @param  {String} msgctxt  Translation context
 * @param  {String} msgid    String to be translated
 * @return {String} Translation or the original string if no translation was found
 */
Gettext.prototype.dpgettext = function(domain, msgctxt, msgid) {
    return this.dnpgettext(domain, msgctxt, msgid);
};

/**
 * Translates a plural string from a specific context using the default textdomain
 *
 * @example
 *     gt.npgettext('sports', 'Back', '%d backs', numberOfBacks)
 *
 * @param  {String} msgctxt      Translation context
 * @param  {String} msgid        String to be translated when count is not plural
 * @param  {String} msgidPlural  String to be translated when count is plural
 * @param  {Number} count        Number count for the plural
 * @return {String} Translation or the original string if no translation was found
 */
Gettext.prototype.npgettext = function(msgctxt, msgid, msgidPlural, count) {
    return this.dnpgettext(this.domain, msgctxt, msgid, msgidPlural, count);
};

/**
 * Translates a plural string from a specifi context using a specific textdomain
 *
 * @example
 *     gt.dnpgettext('domainname', 'sports', 'Back', '%d backs', numberOfBacks)
 *
 * @param  {String} domain       A gettext domain name
 * @param  {String} msgctxt      Translation context
 * @param  {String} msgid        String to be translated
 * @param  {String} msgidPlural  If no translation was found, return this on count!=1
 * @param  {Number} count        Number count for the plural
 * @return {String} Translation or the original string if no translation was found
 */
Gettext.prototype.dnpgettext = function(domain, msgctxt, msgid, msgidPlural, count) {
    var defaultTranslation = msgid;
    var translation;
    var index;

    msgctxt = msgctxt || '';

    if (!isNaN(count) && count !== 1) {
        defaultTranslation = msgidPlural || msgid;
    }

    translation = this._getTranslation(domain, msgctxt, msgid);

    if (translation) {
        if (typeof count === 'number') {
            var pluralsFunc = plurals[Gettext.getLanguageCode(this.locale)].pluralsFunc;
            index = pluralsFunc(count);
            if (typeof index === 'boolean') {
                index = index ? 1 : 0;
            }
        } else {
            index = 0;
        }

        return translation.msgstr[index] || defaultTranslation;
    }
    else if (!this.sourceLocale || this.locale !== this.sourceLocale) {
        this.warn('No translation was found for msgid "' + msgid + '" in msgctxt "' + msgctxt + '" and domain "' + domain + '"');
    }

    return defaultTranslation;
};

/**
 * Retrieves comments object for a translation. The comments object
 * has the shape `{ translator, extracted, reference, flag, previous }`.
 *
 * @example
 *     const comment = gt.getComment('domainname', 'sports', 'Backs')
 *
 * @private
 * @param  {String} domain   A gettext domain name
 * @param  {String} msgctxt  Translation context
 * @param  {String} msgid    String to be translated
 * @return {Object} Comments object or false if not found
 */
Gettext.prototype.getComment = function(domain, msgctxt, msgid) {
    var translation;

    translation = this._getTranslation(domain, msgctxt, msgid);
    if (translation) {
        return translation.comments || {};
    }

    return {};
};

/**
 * Retrieves translation object from the domain and context
 *
 * @private
 * @param  {String} domain   A gettext domain name
 * @param  {String} msgctxt  Translation context
 * @param  {String} msgid    String to be translated
 * @return {Object} Translation object or false if not found
 */
Gettext.prototype._getTranslation = function(domain, msgctxt, msgid) {
    msgctxt = msgctxt || '';

    return get(this.catalogs, [this.locale, domain, 'translations', msgctxt, msgid]);
};

/**
 * Returns the language code part of a locale
 *
 * @example
 *     Gettext.getLanguageCode('sv-SE')
 *     // -> "sv"
 *
 * @private
 * @param   {String} locale  A case-insensitive locale string
 * @returns {String} A language code
 */
Gettext.getLanguageCode = function(locale) {
    return locale.split(/[\-_]/)[0].toLowerCase();
};

/* C-style aliases */

/**
 * C-style alias for [setTextDomain](#gettextsettextdomaindomain)
 *
 * @see Gettext#setTextDomain
 */
Gettext.prototype.textdomain = function(domain) {
    if (this.debug) {
        console.warn('textdomain(domain) was used to set locales in node-gettext v1. ' +
            'Make sure you are using it for domains, and switch to setLocale(locale) if you are not.\n\n ' +
            'To read more about the migration from node-gettext v1 to v2, ' +
            'see https://github.com/alexanderwallin/node-gettext/#migrating-from-1x-to-2x\n\n' +
            'This warning will be removed in the final 2.0.0');
    }

    this.setTextDomain(domain);
};

/**
 * C-style alias for [setLocale](#gettextsetlocalelocale)
 *
 * @see Gettext#setLocale
 */
Gettext.prototype.setlocale = function(locale) {
    this.setLocale(locale);
};

/* Deprecated functions */

/**
 * This function will be removed in the final 2.0.0 release.
 *
 * @deprecated
 */
Gettext.prototype.addTextdomain = function() {
    console.error('addTextdomain() is deprecated.\n\n' +
        '* To add translations, use addTranslations()\n' +
        '* To set the default domain, use setTextDomain() (or its alias textdomain())\n' +
        '\n' +
        'To read more about the migration from node-gettext v1 to v2, ' +
        'see https://github.com/alexanderwallin/node-gettext/#migrating-from-1x-to-2x');
};

var dist = {};

Object.defineProperty(dist, "__esModule", {
  value: true
});
dist.getCanonicalLocale = getCanonicalLocale;
dist.getDayNames = getDayNames;
dist.getDayNamesMin = getDayNamesMin;
dist.getDayNamesShort = getDayNamesShort;
dist.getFirstDay = getFirstDay;
dist.getLanguage = getLanguage;
dist.getLocale = getLocale;
dist.getMonthNames = getMonthNames;
dist.getMonthNamesShort = getMonthNamesShort;
dist.translate = translate;
dist.translatePlural = translatePlural;





/// <reference types="@nextcloud/typings" />

/**
 * Returns the user's locale
 */
function getLocale() {
  return document.documentElement.dataset.locale || 'en';
}

function getCanonicalLocale() {
  return getLocale().replace(/_/g, '-');
}
/**
 * Returns the user's language
 */


function getLanguage() {
  return document.documentElement.lang || 'en';
}

/**
 * Translate a string
 *
 * @param {string} app the id of the app for which to translate the string
 * @param {string} text the string to translate
 * @param {object} vars map of placeholder key to value
 * @param {number} number to replace %n with
 * @param {object} [options] options object
 * @return {string}
 */
function translate(app, text, vars, count, options) {
  if (typeof OC === 'undefined') {
    console.warn('No OC found');
    return text;
  }

  return OC.L10N.translate(app, text, vars, count, options);
}
/**
 * Translate a plural string
 *
 * @param {string} app the id of the app for which to translate the string
 * @param {string} textSingular the string to translate for exactly one object
 * @param {string} textPlural the string to translate for n objects
 * @param {number} count number to determine whether to use singular or plural
 * @param {Object} vars of placeholder key to value
 * @param {object} options options object
 * @return {string}
 */


function translatePlural(app, textSingular, textPlural, count, vars, options) {
  if (typeof OC === 'undefined') {
    console.warn('No OC found');
    return textSingular;
  }

  return OC.L10N.translatePlural(app, textSingular, textPlural, count, vars, options);
}
/**
 * Get the first day of the week
 *
 * @return {number}
 */


function getFirstDay() {
  if (typeof window.firstDay === 'undefined') {
    console.warn('No firstDay found');
    return 1;
  }

  return window.firstDay;
}
/**
 * Get a list of day names (full names)
 *
 * @return {string[]}
 */


function getDayNames() {
  if (typeof window.dayNames === 'undefined') {
    console.warn('No dayNames found');
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  }

  return window.dayNames;
}
/**
 * Get a list of day names (short names)
 *
 * @return {string[]}
 */


function getDayNamesShort() {
  if (typeof window.dayNamesShort === 'undefined') {
    console.warn('No dayNamesShort found');
    return ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'];
  }

  return window.dayNamesShort;
}
/**
 * Get a list of day names (minified names)
 *
 * @return {string[]}
 */


function getDayNamesMin() {
  if (typeof window.dayNamesMin === 'undefined') {
    console.warn('No dayNamesMin found');
    return ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  }

  return window.dayNamesMin;
}
/**
 * Get a list of month names (full names)
 *
 * @return {string[]}
 */


function getMonthNames() {
  if (typeof window.monthNames === 'undefined') {
    console.warn('No monthNames found');
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  }

  return window.monthNames;
}
/**
 * Get a list of month names (short names)
 *
 * @return {string[]}
 */


function getMonthNamesShort() {
  if (typeof window.monthNamesShort === 'undefined') {
    console.warn('No monthNamesShort found');
    return ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
  }

  return window.monthNamesShort;
}

Object.defineProperty(gettext$1, "__esModule", {
  value: true
});
var getGettextBuilder_1 = gettext$1.getGettextBuilder = getGettextBuilder;











var _nodeGettext = _interopRequireDefault(gettext);

var _ = dist;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var GettextBuilder = /*#__PURE__*/function () {
  function GettextBuilder() {
    _classCallCheck(this, GettextBuilder);

    this.translations = {};
    this.debug = false;
  }

  _createClass(GettextBuilder, [{
    key: "setLanguage",
    value: function setLanguage(language) {
      this.locale = language;
      return this;
    }
  }, {
    key: "detectLocale",
    value: function detectLocale() {
      return this.setLanguage((0, _.getLanguage)().replace('-', '_'));
    }
  }, {
    key: "addTranslation",
    value: function addTranslation(language, data) {
      this.translations[language] = data;
      return this;
    }
  }, {
    key: "enableDebugMode",
    value: function enableDebugMode() {
      this.debug = true;
      return this;
    }
  }, {
    key: "build",
    value: function build() {
      return new GettextWrapper(this.locale || 'en', this.translations, this.debug);
    }
  }]);

  return GettextBuilder;
}();

var GettextWrapper = /*#__PURE__*/function () {
  function GettextWrapper(locale, data, debug) {
    _classCallCheck(this, GettextWrapper);

    this.gt = new _nodeGettext.default({
      debug: debug,
      sourceLocale: 'en'
    });

    for (var key in data) {
      this.gt.addTranslations(key, 'messages', data[key]);
    }

    this.gt.setLocale(locale);
  }

  _createClass(GettextWrapper, [{
    key: "subtitudePlaceholders",
    value: function subtitudePlaceholders(translated, vars) {
      return translated.replace(/{([^{}]*)}/g, function (a, b) {
        var r = vars[b];

        if (typeof r === 'string' || typeof r === 'number') {
          return r.toString();
        } else {
          return a;
        }
      });
    }
  }, {
    key: "gettext",
    value: function gettext(original) {
      var placeholders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.subtitudePlaceholders(this.gt.gettext(original), placeholders);
    }
  }, {
    key: "ngettext",
    value: function ngettext(singular, plural, count) {
      var placeholders = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      return this.subtitudePlaceholders(this.gt.ngettext(singular, plural, count).replace(/%n/g, count.toString()), placeholders);
    }
  }]);

  return GettextWrapper;
}();

function getGettextBuilder() {
  return new GettextBuilder();
}

var gtBuilder = getGettextBuilder_1().detectLocale();
[{
  "locale": "ar",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "S1 SYSTEMS | BP <info@s1.sa>, 2020",
      "Language-Team": "Arabic (https://www.transifex.com/nextcloud/teams/64236/ar/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "ar",
      "Plural-Forms": "nplurals=6; plural=n==0 ? 0 : n==1 ? 1 : n==2 ? 2 : n%100>=3 && n%100<=10 ? 3 : n%100>=11 && n%100<=99 ? 4 : 5;"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nS1 SYSTEMS | BP <info@s1.sa>, 2020\n"
          },
          "msgstr": ["Last-Translator: S1 SYSTEMS | BP <info@s1.sa>, 2020\nLanguage-Team: Arabic (https://www.transifex.com/nextcloud/teams/64236/ar/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: ar\nPlural-Forms: nplurals=6; plural=n==0 ? 0 : n==1 ? 1 : n==2 ? 2 : n%100>=3 && n%100<=10 ? 3 : n%100>=11 && n%100<=99 ? 4 : 5;\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:191"
          },
          "msgstr": ["تراجع"]
        }
      }
    }
  }
}, {
  "locale": "ast",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "enolp <enolp@softastur.org>, 2020",
      "Language-Team": "Asturian (https://www.transifex.com/nextcloud/teams/64236/ast/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "ast",
      "Plural-Forms": "nplurals=2; plural=(n != 1);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nenolp <enolp@softastur.org>, 2020\n"
          },
          "msgstr": ["Last-Translator: enolp <enolp@softastur.org>, 2020\nLanguage-Team: Asturian (https://www.transifex.com/nextcloud/teams/64236/ast/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: ast\nPlural-Forms: nplurals=2; plural=(n != 1);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:187"
          },
          "msgstr": ["Desfacer"]
        }
      }
    }
  }
}, {
  "locale": "br",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Kervoas-Le Nabat Ewen <ewenkervoas@free.fr>, 2020",
      "Language-Team": "Breton (https://www.transifex.com/nextcloud/teams/64236/br/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "br",
      "Plural-Forms": "nplurals=5; plural=((n%10 == 1) && (n%100 != 11) && (n%100 !=71) && (n%100 !=91) ? 0 :(n%10 == 2) && (n%100 != 12) && (n%100 !=72) && (n%100 !=92) ? 1 :(n%10 ==3 || n%10==4 || n%10==9) && (n%100 < 10 || n% 100 > 19) && (n%100 < 70 || n%100 > 79) && (n%100 < 90 || n%100 > 99) ? 2 :(n != 0 && n % 1000000 == 0) ? 3 : 4);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nKervoas-Le Nabat Ewen <ewenkervoas@free.fr>, 2020\n"
          },
          "msgstr": ["Last-Translator: Kervoas-Le Nabat Ewen <ewenkervoas@free.fr>, 2020\nLanguage-Team: Breton (https://www.transifex.com/nextcloud/teams/64236/br/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: br\nPlural-Forms: nplurals=5; plural=((n%10 == 1) && (n%100 != 11) && (n%100 !=71) && (n%100 !=91) ? 0 :(n%10 == 2) && (n%100 != 12) && (n%100 !=72) && (n%100 !=92) ? 1 :(n%10 ==3 || n%10==4 || n%10==9) && (n%100 < 10 || n% 100 > 19) && (n%100 < 70 || n%100 > 79) && (n%100 < 90 || n%100 > 99) ? 2 :(n != 0 && n % 1000000 == 0) ? 3 : 4);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:187"
          },
          "msgstr": ["Disober"]
        }
      }
    }
  }
}, {
  "locale": "ca",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Marc Riera <marcriera@softcatala.org>, 2020",
      "Language-Team": "Catalan (https://www.transifex.com/nextcloud/teams/64236/ca/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "ca",
      "Plural-Forms": "nplurals=2; plural=(n != 1);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nMarc Riera <marcriera@softcatala.org>, 2020\n"
          },
          "msgstr": ["Last-Translator: Marc Riera <marcriera@softcatala.org>, 2020\nLanguage-Team: Catalan (https://www.transifex.com/nextcloud/teams/64236/ca/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: ca\nPlural-Forms: nplurals=2; plural=(n != 1);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:187"
          },
          "msgstr": ["Desfés"]
        }
      }
    }
  }
}, {
  "locale": "cs",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Pavel Borecki <pavel.borecki@gmail.com>, 2020",
      "Language-Team": "Czech (https://www.transifex.com/nextcloud/teams/64236/cs/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "cs",
      "Plural-Forms": "nplurals=4; plural=(n == 1 && n % 1 == 0) ? 0 : (n >= 2 && n <= 4 && n % 1 == 0) ? 1: (n % 1 != 0 ) ? 2 : 3;"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nPavel Borecki <pavel.borecki@gmail.com>, 2020\n"
          },
          "msgstr": ["Last-Translator: Pavel Borecki <pavel.borecki@gmail.com>, 2020\nLanguage-Team: Czech (https://www.transifex.com/nextcloud/teams/64236/cs/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: cs\nPlural-Forms: nplurals=4; plural=(n == 1 && n % 1 == 0) ? 0 : (n >= 2 && n <= 4 && n % 1 == 0) ? 1: (n % 1 != 0 ) ? 2 : 3;\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:187"
          },
          "msgstr": ["Zpět"]
        }
      }
    }
  }
}, {
  "locale": "cs_CZ",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Pavel Borecki <pavel.borecki@gmail.com>, 2020",
      "Language-Team": "Czech (Czech Republic) (https://www.transifex.com/nextcloud/teams/64236/cs_CZ/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "cs_CZ",
      "Plural-Forms": "nplurals=4; plural=(n == 1 && n % 1 == 0) ? 0 : (n >= 2 && n <= 4 && n % 1 == 0) ? 1: (n % 1 != 0 ) ? 2 : 3;"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nPavel Borecki <pavel.borecki@gmail.com>, 2020\n"
          },
          "msgstr": ["Last-Translator: Pavel Borecki <pavel.borecki@gmail.com>, 2020\nLanguage-Team: Czech (Czech Republic) (https://www.transifex.com/nextcloud/teams/64236/cs_CZ/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: cs_CZ\nPlural-Forms: nplurals=4; plural=(n == 1 && n % 1 == 0) ? 0 : (n >= 2 && n <= 4 && n % 1 == 0) ? 1: (n % 1 != 0 ) ? 2 : 3;\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:187"
          },
          "msgstr": ["Zpět"]
        }
      }
    }
  }
}, {
  "locale": "da",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Martin Bonde <Martin@maboni.dk>, 2020",
      "Language-Team": "Danish (https://www.transifex.com/nextcloud/teams/64236/da/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "da",
      "Plural-Forms": "nplurals=2; plural=(n != 1);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nMartin Bonde <Martin@maboni.dk>, 2020\n"
          },
          "msgstr": ["Last-Translator: Martin Bonde <Martin@maboni.dk>, 2020\nLanguage-Team: Danish (https://www.transifex.com/nextcloud/teams/64236/da/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: da\nPlural-Forms: nplurals=2; plural=(n != 1);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:192"
          },
          "msgstr": ["Fortryd"]
        }
      }
    }
  }
}, {
  "locale": "de",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Mark Ziegler <mark.ziegler@rakekniven.de>, 2020",
      "Language-Team": "German (https://www.transifex.com/nextcloud/teams/64236/de/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "de",
      "Plural-Forms": "nplurals=2; plural=(n != 1);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nMark Ziegler <mark.ziegler@rakekniven.de>, 2020\n"
          },
          "msgstr": ["Last-Translator: Mark Ziegler <mark.ziegler@rakekniven.de>, 2020\nLanguage-Team: German (https://www.transifex.com/nextcloud/teams/64236/de/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: de\nPlural-Forms: nplurals=2; plural=(n != 1);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:187"
          },
          "msgstr": ["Rückgängig"]
        }
      }
    }
  }
}, {
  "locale": "de_DE",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Gustav Gyges, 2021",
      "Language-Team": "German (Germany) (https://www.transifex.com/nextcloud/teams/64236/de_DE/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "de_DE",
      "Plural-Forms": "nplurals=2; plural=(n != 1);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nGustav Gyges, 2021\n"
          },
          "msgstr": ["Last-Translator: Gustav Gyges, 2021\nLanguage-Team: German (Germany) (https://www.transifex.com/nextcloud/teams/64236/de_DE/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: de_DE\nPlural-Forms: nplurals=2; plural=(n != 1);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:192"
          },
          "msgstr": ["Rückgängig machen"]
        }
      }
    }
  }
}, {
  "locale": "el",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "ByteGet, 2020",
      "Language-Team": "Greek (https://www.transifex.com/nextcloud/teams/64236/el/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "el",
      "Plural-Forms": "nplurals=2; plural=(n != 1);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nByteGet, 2020\n"
          },
          "msgstr": ["Last-Translator: ByteGet, 2020\nLanguage-Team: Greek (https://www.transifex.com/nextcloud/teams/64236/el/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: el\nPlural-Forms: nplurals=2; plural=(n != 1);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:187"
          },
          "msgstr": ["Αναίρεση"]
        }
      }
    }
  }
}, {
  "locale": "en_GB",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Jeff Gunn <planemastr1@gmail.com>, 2021",
      "Language-Team": "English (United Kingdom) (https://www.transifex.com/nextcloud/teams/64236/en_GB/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "en_GB",
      "Plural-Forms": "nplurals=2; plural=(n != 1);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nJeff Gunn <planemastr1@gmail.com>, 2021\n"
          },
          "msgstr": ["Last-Translator: Jeff Gunn <planemastr1@gmail.com>, 2021\nLanguage-Team: English (United Kingdom) (https://www.transifex.com/nextcloud/teams/64236/en_GB/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: en_GB\nPlural-Forms: nplurals=2; plural=(n != 1);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:192"
          },
          "msgstr": ["Undo"]
        }
      }
    }
  }
}, {
  "locale": "eo",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Va Milushnikov <va.milushnikov@gmail.com>, 2020",
      "Language-Team": "Esperanto (https://www.transifex.com/nextcloud/teams/64236/eo/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "eo",
      "Plural-Forms": "nplurals=2; plural=(n != 1);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nVa Milushnikov <va.milushnikov@gmail.com>, 2020\n"
          },
          "msgstr": ["Last-Translator: Va Milushnikov <va.milushnikov@gmail.com>, 2020\nLanguage-Team: Esperanto (https://www.transifex.com/nextcloud/teams/64236/eo/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: eo\nPlural-Forms: nplurals=2; plural=(n != 1);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:191"
          },
          "msgstr": ["Malfari"]
        }
      }
    }
  }
}, {
  "locale": "es",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Gabriel Anca <gabrielancacorral@gmail.com>, 2020",
      "Language-Team": "Spanish (https://www.transifex.com/nextcloud/teams/64236/es/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "es",
      "Plural-Forms": "nplurals=2; plural=(n != 1);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nGabriel Anca <gabrielancacorral@gmail.com>, 2020\n"
          },
          "msgstr": ["Last-Translator: Gabriel Anca <gabrielancacorral@gmail.com>, 2020\nLanguage-Team: Spanish (https://www.transifex.com/nextcloud/teams/64236/es/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: es\nPlural-Forms: nplurals=2; plural=(n != 1);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:192"
          },
          "msgstr": ["Deshacer"]
        }
      }
    }
  }
}, {
  "locale": "es_AR",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Matias Iglesias, 2022",
      "Language-Team": "Spanish (Argentina) (https://www.transifex.com/nextcloud/teams/64236/es_AR/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "es_AR",
      "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nMatias Iglesias, 2022\n"
          },
          "msgstr": ["Last-Translator: Matias Iglesias, 2022\nLanguage-Team: Spanish (Argentina) (https://www.transifex.com/nextcloud/teams/64236/es_AR/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: es_AR\nPlural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:223"
          },
          "msgstr": ["Deshacer"]
        }
      }
    }
  }
}, {
  "locale": "es_MX",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Luis Francisco Castro, 2022",
      "Language-Team": "Spanish (Mexico) (https://www.transifex.com/nextcloud/teams/64236/es_MX/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "es_MX",
      "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nLuis Francisco Castro, 2022\n"
          },
          "msgstr": ["Last-Translator: Luis Francisco Castro, 2022\nLanguage-Team: Spanish (Mexico) (https://www.transifex.com/nextcloud/teams/64236/es_MX/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: es_MX\nPlural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:223"
          },
          "msgstr": ["Deshacer"]
        }
      }
    }
  }
}, {
  "locale": "eu",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Unai Tolosa Pontesta <utolosa002@gmail.com>, 2021",
      "Language-Team": "Basque (https://www.transifex.com/nextcloud/teams/64236/eu/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "eu",
      "Plural-Forms": "nplurals=2; plural=(n != 1);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nUnai Tolosa Pontesta <utolosa002@gmail.com>, 2021\n"
          },
          "msgstr": ["Last-Translator: Unai Tolosa Pontesta <utolosa002@gmail.com>, 2021\nLanguage-Team: Basque (https://www.transifex.com/nextcloud/teams/64236/eu/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: eu\nPlural-Forms: nplurals=2; plural=(n != 1);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:192"
          },
          "msgstr": ["Desegin"]
        }
      }
    }
  }
}, {
  "locale": "fa",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Mostafa Ahangarha <ahangarha@riseup.net>, 2020",
      "Language-Team": "Persian (https://www.transifex.com/nextcloud/teams/64236/fa/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "fa",
      "Plural-Forms": "nplurals=2; plural=(n > 1);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nMostafa Ahangarha <ahangarha@riseup.net>, 2020\n"
          },
          "msgstr": ["Last-Translator: Mostafa Ahangarha <ahangarha@riseup.net>, 2020\nLanguage-Team: Persian (https://www.transifex.com/nextcloud/teams/64236/fa/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: fa\nPlural-Forms: nplurals=2; plural=(n > 1);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:192"
          },
          "msgstr": ["بازگردانی"]
        }
      }
    }
  }
}, {
  "locale": "fi_FI",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "teemue, 2020",
      "Language-Team": "Finnish (Finland) (https://www.transifex.com/nextcloud/teams/64236/fi_FI/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "fi_FI",
      "Plural-Forms": "nplurals=2; plural=(n != 1);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nteemue, 2020\n"
          },
          "msgstr": ["Last-Translator: teemue, 2020\nLanguage-Team: Finnish (Finland) (https://www.transifex.com/nextcloud/teams/64236/fi_FI/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: fi_FI\nPlural-Forms: nplurals=2; plural=(n != 1);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:191"
          },
          "msgstr": ["Kumoa"]
        }
      }
    }
  }
}, {
  "locale": "fr",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "John Molakvoæ <skjnldsv@protonmail.com>, 2020",
      "Language-Team": "French (https://www.transifex.com/nextcloud/teams/64236/fr/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "fr",
      "Plural-Forms": "nplurals=2; plural=(n > 1);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nJohn Molakvoæ <skjnldsv@protonmail.com>, 2020\n"
          },
          "msgstr": ["Last-Translator: John Molakvoæ <skjnldsv@protonmail.com>, 2020\nLanguage-Team: French (https://www.transifex.com/nextcloud/teams/64236/fr/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: fr\nPlural-Forms: nplurals=2; plural=(n > 1);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:187"
          },
          "msgstr": ["Annuler"]
        }
      }
    }
  }
}, {
  "locale": "gl",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Miguel Anxo Bouzada <mbouzada@gmail.com>, 2020",
      "Language-Team": "Galician (https://www.transifex.com/nextcloud/teams/64236/gl/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "gl",
      "Plural-Forms": "nplurals=2; plural=(n != 1);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nMiguel Anxo Bouzada <mbouzada@gmail.com>, 2020\n"
          },
          "msgstr": ["Last-Translator: Miguel Anxo Bouzada <mbouzada@gmail.com>, 2020\nLanguage-Team: Galician (https://www.transifex.com/nextcloud/teams/64236/gl/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: gl\nPlural-Forms: nplurals=2; plural=(n != 1);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:187"
          },
          "msgstr": ["Desfacer"]
        }
      }
    }
  }
}, {
  "locale": "he",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Yaron Shahrabani <sh.yaron@gmail.com>, 2020",
      "Language-Team": "Hebrew (https://www.transifex.com/nextcloud/teams/64236/he/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "he",
      "Plural-Forms": "nplurals=4; plural=(n == 1 && n % 1 == 0) ? 0 : (n == 2 && n % 1 == 0) ? 1: (n % 10 == 0 && n % 1 == 0 && n > 10) ? 2 : 3;"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nYaron Shahrabani <sh.yaron@gmail.com>, 2020\n"
          },
          "msgstr": ["Last-Translator: Yaron Shahrabani <sh.yaron@gmail.com>, 2020\nLanguage-Team: Hebrew (https://www.transifex.com/nextcloud/teams/64236/he/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: he\nPlural-Forms: nplurals=4; plural=(n == 1 && n % 1 == 0) ? 0 : (n == 2 && n % 1 == 0) ? 1: (n % 10 == 0 && n % 1 == 0 && n > 10) ? 2 : 3;\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:187"
          },
          "msgstr": ["ביטול"]
        }
      }
    }
  }
}, {
  "locale": "hu_HU",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Balázs Meskó <meskobalazs@mailbox.org>, 2021",
      "Language-Team": "Hungarian (Hungary) (https://www.transifex.com/nextcloud/teams/64236/hu_HU/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "hu_HU",
      "Plural-Forms": "nplurals=2; plural=(n != 1);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nBalázs Meskó <meskobalazs@mailbox.org>, 2021\n"
          },
          "msgstr": ["Last-Translator: Balázs Meskó <meskobalazs@mailbox.org>, 2021\nLanguage-Team: Hungarian (Hungary) (https://www.transifex.com/nextcloud/teams/64236/hu_HU/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: hu_HU\nPlural-Forms: nplurals=2; plural=(n != 1);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:191"
          },
          "msgstr": ["Visszavonás"]
        }
      }
    }
  }
}, {
  "locale": "id",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "agus sutrisno <agussutrisno@smamsa.sch.id>, 2020",
      "Language-Team": "Indonesian (https://www.transifex.com/nextcloud/teams/64236/id/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "id",
      "Plural-Forms": "nplurals=1; plural=0;"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nagus sutrisno <agussutrisno@smamsa.sch.id>, 2020\n"
          },
          "msgstr": ["Last-Translator: agus sutrisno <agussutrisno@smamsa.sch.id>, 2020\nLanguage-Team: Indonesian (https://www.transifex.com/nextcloud/teams/64236/id/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: id\nPlural-Forms: nplurals=1; plural=0;\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:192"
          },
          "msgstr": ["Tidak jadi"]
        }
      }
    }
  }
}, {
  "locale": "is",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Sveinn í Felli <sv1@fellsnet.is>, 2020",
      "Language-Team": "Icelandic (https://www.transifex.com/nextcloud/teams/64236/is/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "is",
      "Plural-Forms": "nplurals=2; plural=(n % 10 != 1 || n % 100 == 11);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nSveinn í Felli <sv1@fellsnet.is>, 2020\n"
          },
          "msgstr": ["Last-Translator: Sveinn í Felli <sv1@fellsnet.is>, 2020\nLanguage-Team: Icelandic (https://www.transifex.com/nextcloud/teams/64236/is/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: is\nPlural-Forms: nplurals=2; plural=(n % 10 != 1 || n % 100 == 11);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:192"
          },
          "msgstr": ["Afturkalla"]
        }
      }
    }
  }
}, {
  "locale": "it",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Vincenzo Reale <vinx.reale@gmail.com>, 2020",
      "Language-Team": "Italian (https://www.transifex.com/nextcloud/teams/64236/it/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "it",
      "Plural-Forms": "nplurals=2; plural=(n != 1);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nVincenzo Reale <vinx.reale@gmail.com>, 2020\n"
          },
          "msgstr": ["Last-Translator: Vincenzo Reale <vinx.reale@gmail.com>, 2020\nLanguage-Team: Italian (https://www.transifex.com/nextcloud/teams/64236/it/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: it\nPlural-Forms: nplurals=2; plural=(n != 1);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:187"
          },
          "msgstr": ["Annulla"]
        }
      }
    }
  }
}, {
  "locale": "ja_JP",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "323484, 2020",
      "Language-Team": "Japanese (Japan) (https://www.transifex.com/nextcloud/teams/64236/ja_JP/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "ja_JP",
      "Plural-Forms": "nplurals=1; plural=0;"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\n323484, 2020\n"
          },
          "msgstr": ["Last-Translator: 323484, 2020\nLanguage-Team: Japanese (Japan) (https://www.transifex.com/nextcloud/teams/64236/ja_JP/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: ja_JP\nPlural-Forms: nplurals=1; plural=0;\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:187"
          },
          "msgstr": ["元に戻す"]
        }
      }
    }
  }
}, {
  "locale": "kab",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "ZiriSut, 2021",
      "Language-Team": "Kabyle (https://www.transifex.com/nextcloud/teams/64236/kab/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "kab",
      "Plural-Forms": "nplurals=2; plural=(n != 1);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nZiriSut, 2021\n"
          },
          "msgstr": ["Last-Translator: ZiriSut, 2021\nLanguage-Team: Kabyle (https://www.transifex.com/nextcloud/teams/64236/kab/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: kab\nPlural-Forms: nplurals=2; plural=(n != 1);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:192"
          },
          "msgstr": ["Sefsex"]
        }
      }
    }
  }
}, {
  "locale": "ko",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Brandon Han, 2021",
      "Language-Team": "Korean (https://www.transifex.com/nextcloud/teams/64236/ko/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "ko",
      "Plural-Forms": "nplurals=1; plural=0;"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nBrandon Han, 2021\n"
          },
          "msgstr": ["Last-Translator: Brandon Han, 2021\nLanguage-Team: Korean (https://www.transifex.com/nextcloud/teams/64236/ko/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: ko\nPlural-Forms: nplurals=1; plural=0;\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:192"
          },
          "msgstr": ["되돌리기"]
        }
      }
    }
  }
}, {
  "locale": "lt_LT",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Moo, 2020",
      "Language-Team": "Lithuanian (Lithuania) (https://www.transifex.com/nextcloud/teams/64236/lt_LT/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "lt_LT",
      "Plural-Forms": "nplurals=4; plural=(n % 10 == 1 && (n % 100 > 19 || n % 100 < 11) ? 0 : (n % 10 >= 2 && n % 10 <=9) && (n % 100 > 19 || n % 100 < 11) ? 1 : n % 1 != 0 ? 2: 3);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nMoo, 2020\n"
          },
          "msgstr": ["Last-Translator: Moo, 2020\nLanguage-Team: Lithuanian (Lithuania) (https://www.transifex.com/nextcloud/teams/64236/lt_LT/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: lt_LT\nPlural-Forms: nplurals=4; plural=(n % 10 == 1 && (n % 100 > 19 || n % 100 < 11) ? 0 : (n % 10 >= 2 && n % 10 <=9) && (n % 100 > 19 || n % 100 < 11) ? 1 : n % 1 != 0 ? 2: 3);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:187"
          },
          "msgstr": ["Atšaukti"]
        }
      }
    }
  }
}, {
  "locale": "mk",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Сашко Тодоров, 2020",
      "Language-Team": "Macedonian (https://www.transifex.com/nextcloud/teams/64236/mk/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "mk",
      "Plural-Forms": "nplurals=2; plural=(n % 10 == 1 && n % 100 != 11) ? 0 : 1;"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nСашко Тодоров, 2020\n"
          },
          "msgstr": ["Last-Translator: Сашко Тодоров, 2020\nLanguage-Team: Macedonian (https://www.transifex.com/nextcloud/teams/64236/mk/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: mk\nPlural-Forms: nplurals=2; plural=(n % 10 == 1 && n % 100 != 11) ? 0 : 1;\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:187"
          },
          "msgstr": ["Врати"]
        }
      }
    }
  }
}, {
  "locale": "mn",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "BATKHUYAG Ganbold <gbatkhuyag@gmail.com>, 2022",
      "Language-Team": "Mongolian (https://www.transifex.com/nextcloud/teams/64236/mn/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "mn",
      "Plural-Forms": "nplurals=2; plural=(n != 1);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nBATKHUYAG Ganbold <gbatkhuyag@gmail.com>, 2022\n"
          },
          "msgstr": ["Last-Translator: BATKHUYAG Ganbold <gbatkhuyag@gmail.com>, 2022\nLanguage-Team: Mongolian (https://www.transifex.com/nextcloud/teams/64236/mn/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: mn\nPlural-Forms: nplurals=2; plural=(n != 1);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:192"
          },
          "msgstr": ["Буцаах"]
        }
      }
    }
  }
}, {
  "locale": "mr",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Vinit Dhabre <VINIT@ymail.com>, 2021",
      "Language-Team": "Marathi (https://www.transifex.com/nextcloud/teams/64236/mr/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "mr",
      "Plural-Forms": "nplurals=2; plural=(n != 1);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nVinit Dhabre <VINIT@ymail.com>, 2021\n"
          },
          "msgstr": ["Last-Translator: Vinit Dhabre <VINIT@ymail.com>, 2021\nLanguage-Team: Marathi (https://www.transifex.com/nextcloud/teams/64236/mr/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: mr\nPlural-Forms: nplurals=2; plural=(n != 1);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:192"
          },
          "msgstr": ["पूर्ववत करा"]
        }
      }
    }
  }
}, {
  "locale": "my",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Htike Aung Kyaw <htikeagkyaw@gmail.com>, 2021",
      "Language-Team": "Burmese (https://www.transifex.com/nextcloud/teams/64236/my/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "my",
      "Plural-Forms": "nplurals=1; plural=0;"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nHtike Aung Kyaw <htikeagkyaw@gmail.com>, 2021\n"
          },
          "msgstr": ["Last-Translator: Htike Aung Kyaw <htikeagkyaw@gmail.com>, 2021\nLanguage-Team: Burmese (https://www.transifex.com/nextcloud/teams/64236/my/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: my\nPlural-Forms: nplurals=1; plural=0;\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:192"
          },
          "msgstr": ["နဂိုအတိုင်းပြန်ထားရန်"]
        }
      }
    }
  }
}, {
  "locale": "nb_NO",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "sverre.vikan <sverre.vikan@gmail.com>, 2020",
      "Language-Team": "Norwegian Bokmål (Norway) (https://www.transifex.com/nextcloud/teams/64236/nb_NO/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "nb_NO",
      "Plural-Forms": "nplurals=2; plural=(n != 1);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nsverre.vikan <sverre.vikan@gmail.com>, 2020\n"
          },
          "msgstr": ["Last-Translator: sverre.vikan <sverre.vikan@gmail.com>, 2020\nLanguage-Team: Norwegian Bokmål (Norway) (https://www.transifex.com/nextcloud/teams/64236/nb_NO/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: nb_NO\nPlural-Forms: nplurals=2; plural=(n != 1);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:192"
          },
          "msgstr": ["Angre"]
        }
      }
    }
  }
}, {
  "locale": "nl",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Robin Slot, 2020",
      "Language-Team": "Dutch (https://www.transifex.com/nextcloud/teams/64236/nl/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "nl",
      "Plural-Forms": "nplurals=2; plural=(n != 1);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nRobin Slot, 2020\n"
          },
          "msgstr": ["Last-Translator: Robin Slot, 2020\nLanguage-Team: Dutch (https://www.transifex.com/nextcloud/teams/64236/nl/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: nl\nPlural-Forms: nplurals=2; plural=(n != 1);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:191"
          },
          "msgstr": ["Ongedaan maken"]
        }
      }
    }
  }
}, {
  "locale": "oc",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Quentin PAGÈS, 2020",
      "Language-Team": "Occitan (post 1500) (https://www.transifex.com/nextcloud/teams/64236/oc/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "oc",
      "Plural-Forms": "nplurals=2; plural=(n > 1);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nQuentin PAGÈS, 2020\n"
          },
          "msgstr": ["Last-Translator: Quentin PAGÈS, 2020\nLanguage-Team: Occitan (post 1500) (https://www.transifex.com/nextcloud/teams/64236/oc/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: oc\nPlural-Forms: nplurals=2; plural=(n > 1);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:187"
          },
          "msgstr": ["Anullar"]
        }
      }
    }
  }
}, {
  "locale": "pl",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Robert Szmurło <robert.szmurlo@ee.pw.edu.pl>, 2020",
      "Language-Team": "Polish (https://www.transifex.com/nextcloud/teams/64236/pl/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "pl",
      "Plural-Forms": "nplurals=4; plural=(n==1 ? 0 : (n%10>=2 && n%10<=4) && (n%100<12 || n%100>14) ? 1 : n!=1 && (n%10>=0 && n%10<=1) || (n%10>=5 && n%10<=9) || (n%100>=12 && n%100<=14) ? 2 : 3);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nRobert Szmurło <robert.szmurlo@ee.pw.edu.pl>, 2020\n"
          },
          "msgstr": ["Last-Translator: Robert Szmurło <robert.szmurlo@ee.pw.edu.pl>, 2020\nLanguage-Team: Polish (https://www.transifex.com/nextcloud/teams/64236/pl/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: pl\nPlural-Forms: nplurals=4; plural=(n==1 ? 0 : (n%10>=2 && n%10<=4) && (n%100<12 || n%100>14) ? 1 : n!=1 && (n%10>=0 && n%10<=1) || (n%10>=5 && n%10<=9) || (n%100>=12 && n%100<=14) ? 2 : 3);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:187"
          },
          "msgstr": ["Cofnij"]
        }
      }
    }
  }
}, {
  "locale": "pt_BR",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Paulo Schopf, 2020",
      "Language-Team": "Portuguese (Brazil) (https://www.transifex.com/nextcloud/teams/64236/pt_BR/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "pt_BR",
      "Plural-Forms": "nplurals=2; plural=(n > 1);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nPaulo Schopf, 2020\n"
          },
          "msgstr": ["Last-Translator: Paulo Schopf, 2020\nLanguage-Team: Portuguese (Brazil) (https://www.transifex.com/nextcloud/teams/64236/pt_BR/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: pt_BR\nPlural-Forms: nplurals=2; plural=(n > 1);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:187"
          },
          "msgstr": ["Desfazer"]
        }
      }
    }
  }
}, {
  "locale": "pt_PT",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Manuela Silva <mmsrs@sky.com>, 2022",
      "Language-Team": "Portuguese (Portugal) (https://www.transifex.com/nextcloud/teams/64236/pt_PT/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "pt_PT",
      "Plural-Forms": "nplurals=3; plural=(n == 0 || n == 1) ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nManuela Silva <mmsrs@sky.com>, 2022\n"
          },
          "msgstr": ["Last-Translator: Manuela Silva <mmsrs@sky.com>, 2022\nLanguage-Team: Portuguese (Portugal) (https://www.transifex.com/nextcloud/teams/64236/pt_PT/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: pt_PT\nPlural-Forms: nplurals=3; plural=(n == 0 || n == 1) ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:223"
          },
          "msgstr": ["Anular"]
        }
      }
    }
  }
}, {
  "locale": "ro",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Mădălin Vasiliu <contact@madalinvasiliu.com>, 2022",
      "Language-Team": "Romanian (https://www.transifex.com/nextcloud/teams/64236/ro/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "ro",
      "Plural-Forms": "nplurals=3; plural=(n==1?0:(((n%100>19)||((n%100==0)&&(n!=0)))?2:1));"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nMădălin Vasiliu <contact@madalinvasiliu.com>, 2022\n"
          },
          "msgstr": ["Last-Translator: Mădălin Vasiliu <contact@madalinvasiliu.com>, 2022\nLanguage-Team: Romanian (https://www.transifex.com/nextcloud/teams/64236/ro/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: ro\nPlural-Forms: nplurals=3; plural=(n==1?0:(((n%100>19)||((n%100==0)&&(n!=0)))?2:1));\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:193"
          },
          "msgstr": ["Anulează"]
        }
      }
    }
  }
}, {
  "locale": "ru",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Andrey Atapin <atab@kirovedu.ru>, 2020",
      "Language-Team": "Russian (https://www.transifex.com/nextcloud/teams/64236/ru/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "ru",
      "Plural-Forms": "nplurals=4; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<12 || n%100>14) ? 1 : n%10==0 || (n%10>=5 && n%10<=9) || (n%100>=11 && n%100<=14)? 2 : 3);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nAndrey Atapin <atab@kirovedu.ru>, 2020\n"
          },
          "msgstr": ["Last-Translator: Andrey Atapin <atab@kirovedu.ru>, 2020\nLanguage-Team: Russian (https://www.transifex.com/nextcloud/teams/64236/ru/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: ru\nPlural-Forms: nplurals=4; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<12 || n%100>14) ? 1 : n%10==0 || (n%10>=5 && n%10<=9) || (n%100>=11 && n%100<=14)? 2 : 3);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:187"
          },
          "msgstr": ["Отменить"]
        }
      }
    }
  }
}, {
  "locale": "si",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Hela Basa, 2021",
      "Language-Team": "Sinhala (https://www.transifex.com/nextcloud/teams/64236/si/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "si",
      "Plural-Forms": "nplurals=2; plural=(n != 1);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nHela Basa, 2021\n"
          },
          "msgstr": ["Last-Translator: Hela Basa, 2021\nLanguage-Team: Sinhala (https://www.transifex.com/nextcloud/teams/64236/si/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: si\nPlural-Forms: nplurals=2; plural=(n != 1);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:192"
          },
          "msgstr": ["පෙරසේ"]
        }
      }
    }
  }
}, {
  "locale": "sk_SK",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "vladimirjendrol <vlado@jendrol.sk>, 2020",
      "Language-Team": "Slovak (Slovakia) (https://www.transifex.com/nextcloud/teams/64236/sk_SK/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "sk_SK",
      "Plural-Forms": "nplurals=4; plural=(n % 1 == 0 && n == 1 ? 0 : n % 1 == 0 && n >= 2 && n <= 4 ? 1 : n % 1 != 0 ? 2: 3);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nvladimirjendrol <vlado@jendrol.sk>, 2020\n"
          },
          "msgstr": ["Last-Translator: vladimirjendrol <vlado@jendrol.sk>, 2020\nLanguage-Team: Slovak (Slovakia) (https://www.transifex.com/nextcloud/teams/64236/sk_SK/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: sk_SK\nPlural-Forms: nplurals=4; plural=(n % 1 == 0 && n == 1 ? 0 : n % 1 == 0 && n >= 2 && n <= 4 ? 1 : n % 1 != 0 ? 2: 3);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:192"
          },
          "msgstr": ["Späť"]
        }
      }
    }
  }
}, {
  "locale": "sl",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Matej Urbančič <>, 2020",
      "Language-Team": "Slovenian (https://www.transifex.com/nextcloud/teams/64236/sl/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "sl",
      "Plural-Forms": "nplurals=4; plural=(n%100==1 ? 0 : n%100==2 ? 1 : n%100==3 || n%100==4 ? 2 : 3);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nMatej Urbančič <>, 2020\n"
          },
          "msgstr": ["Last-Translator: Matej Urbančič <>, 2020\nLanguage-Team: Slovenian (https://www.transifex.com/nextcloud/teams/64236/sl/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: sl\nPlural-Forms: nplurals=4; plural=(n%100==1 ? 0 : n%100==2 ? 1 : n%100==3 || n%100==4 ? 2 : 3);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:191"
          },
          "msgstr": ["Razveljavi"]
        }
      }
    }
  }
}, {
  "locale": "sr",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "aleksandar jevtic, 2022",
      "Language-Team": "Serbian (https://www.transifex.com/nextcloud/teams/64236/sr/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "sr",
      "Plural-Forms": "nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\naleksandar jevtic, 2022\n"
          },
          "msgstr": ["Last-Translator: aleksandar jevtic, 2022\nLanguage-Team: Serbian (https://www.transifex.com/nextcloud/teams/64236/sr/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: sr\nPlural-Forms: nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:223"
          },
          "msgstr": ["Poništi"]
        }
      }
    }
  }
}, {
  "locale": "sv",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Victor Nyberg <v70123@gmail.com>, 2021",
      "Language-Team": "Swedish (https://www.transifex.com/nextcloud/teams/64236/sv/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "sv",
      "Plural-Forms": "nplurals=2; plural=(n != 1);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nVictor Nyberg <v70123@gmail.com>, 2021\n"
          },
          "msgstr": ["Last-Translator: Victor Nyberg <v70123@gmail.com>, 2021\nLanguage-Team: Swedish (https://www.transifex.com/nextcloud/teams/64236/sv/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: sv\nPlural-Forms: nplurals=2; plural=(n != 1);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:191"
          },
          "msgstr": ["Ångra"]
        }
      }
    }
  }
}, {
  "locale": "ta",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "ஒளியன் Oliyan, 2022",
      "Language-Team": "Tamil (https://www.transifex.com/nextcloud/teams/64236/ta/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "ta",
      "Plural-Forms": "nplurals=2; plural=(n != 1);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nஒளியன் Oliyan, 2022\n"
          },
          "msgstr": ["Last-Translator: ஒளியன் Oliyan, 2022\nLanguage-Team: Tamil (https://www.transifex.com/nextcloud/teams/64236/ta/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: ta\nPlural-Forms: nplurals=2; plural=(n != 1);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:192"
          },
          "msgstr": ["செயல்தவிர்"]
        }
      }
    }
  }
}, {
  "locale": "th_TH",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Phongpanot Phairat <ppnplus@protonmail.com>, 2021",
      "Language-Team": "Thai (Thailand) (https://www.transifex.com/nextcloud/teams/64236/th_TH/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "th_TH",
      "Plural-Forms": "nplurals=1; plural=0;"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nPhongpanot Phairat <ppnplus@protonmail.com>, 2021\n"
          },
          "msgstr": ["Last-Translator: Phongpanot Phairat <ppnplus@protonmail.com>, 2021\nLanguage-Team: Thai (Thailand) (https://www.transifex.com/nextcloud/teams/64236/th_TH/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: th_TH\nPlural-Forms: nplurals=1; plural=0;\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:192"
          },
          "msgstr": ["เลิกทำ"]
        }
      }
    }
  }
}, {
  "locale": "tr",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Kaya Zeren <kayazeren@gmail.com>, 2020",
      "Language-Team": "Turkish (https://www.transifex.com/nextcloud/teams/64236/tr/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "tr",
      "Plural-Forms": "nplurals=2; plural=(n > 1);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nKaya Zeren <kayazeren@gmail.com>, 2020\n"
          },
          "msgstr": ["Last-Translator: Kaya Zeren <kayazeren@gmail.com>, 2020\nLanguage-Team: Turkish (https://www.transifex.com/nextcloud/teams/64236/tr/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: tr\nPlural-Forms: nplurals=2; plural=(n > 1);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:191"
          },
          "msgstr": ["Geri al"]
        }
      }
    }
  }
}, {
  "locale": "uk",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Oleksandr Panasyuk, 2021",
      "Language-Team": "Ukrainian (https://www.transifex.com/nextcloud/teams/64236/uk/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "uk",
      "Plural-Forms": "nplurals=4; plural=(n % 1 == 0 && n % 10 == 1 && n % 100 != 11 ? 0 : n % 1 == 0 && n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 1 : n % 1 == 0 && (n % 10 ==0 || (n % 10 >=5 && n % 10 <=9) || (n % 100 >=11 && n % 100 <=14 )) ? 2: 3);"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nOleksandr Panasyuk, 2021\n"
          },
          "msgstr": ["Last-Translator: Oleksandr Panasyuk, 2021\nLanguage-Team: Ukrainian (https://www.transifex.com/nextcloud/teams/64236/uk/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: uk\nPlural-Forms: nplurals=4; plural=(n % 1 == 0 && n % 10 == 1 && n % 100 != 11 ? 0 : n % 1 == 0 && n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 1 : n % 1 == 0 && (n % 10 ==0 || (n % 10 >=5 && n % 10 <=9) || (n % 100 >=11 && n % 100 <=14 )) ? 2: 3);\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:192"
          },
          "msgstr": ["Скасувати дію"]
        }
      }
    }
  }
}, {
  "locale": "vi",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Luu Thang <luuthang@vif.vn>, 2021",
      "Language-Team": "Vietnamese (https://www.transifex.com/nextcloud/teams/64236/vi/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "vi",
      "Plural-Forms": "nplurals=1; plural=0;"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nLuu Thang <luuthang@vif.vn>, 2021\n"
          },
          "msgstr": ["Last-Translator: Luu Thang <luuthang@vif.vn>, 2021\nLanguage-Team: Vietnamese (https://www.transifex.com/nextcloud/teams/64236/vi/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: vi\nPlural-Forms: nplurals=1; plural=0;\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:192"
          },
          "msgstr": ["Hoàn tác"]
        }
      }
    }
  }
}, {
  "locale": "zh_CN",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Henry Ji, 2022",
      "Language-Team": "Chinese (China) (https://www.transifex.com/nextcloud/teams/64236/zh_CN/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "zh_CN",
      "Plural-Forms": "nplurals=1; plural=0;"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nHenry Ji, 2022\n"
          },
          "msgstr": ["Last-Translator: Henry Ji, 2022\nLanguage-Team: Chinese (China) (https://www.transifex.com/nextcloud/teams/64236/zh_CN/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: zh_CN\nPlural-Forms: nplurals=1; plural=0;\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:192"
          },
          "msgstr": [" 撤消"]
        }
      }
    }
  }
}, {
  "locale": "zh_HK",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Cha Wong <cafetango@gmail.com>, 2021",
      "Language-Team": "Chinese (Hong Kong) (https://www.transifex.com/nextcloud/teams/64236/zh_HK/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "zh_HK",
      "Plural-Forms": "nplurals=1; plural=0;"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nCha Wong <cafetango@gmail.com>, 2021\n"
          },
          "msgstr": ["Last-Translator: Cha Wong <cafetango@gmail.com>, 2021\nLanguage-Team: Chinese (Hong Kong) (https://www.transifex.com/nextcloud/teams/64236/zh_HK/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: zh_HK\nPlural-Forms: nplurals=1; plural=0;\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:191"
          },
          "msgstr": ["還原"]
        }
      }
    }
  }
}, {
  "locale": "zh_TW",
  "json": {
    "charset": "utf-8",
    "headers": {
      "Last-Translator": "Natashia Maxins <railroad1987@gmail.com>, 2020",
      "Language-Team": "Chinese (Taiwan) (https://www.transifex.com/nextcloud/teams/64236/zh_TW/)",
      "Content-Type": "text/plain; charset=UTF-8",
      "Language": "zh_TW",
      "Plural-Forms": "nplurals=1; plural=0;"
    },
    "translations": {
      "": {
        "": {
          "msgid": "",
          "comments": {
            "translator": "\nTranslators:\nNatashia Maxins <railroad1987@gmail.com>, 2020\n"
          },
          "msgstr": ["Last-Translator: Natashia Maxins <railroad1987@gmail.com>, 2020\nLanguage-Team: Chinese (Taiwan) (https://www.transifex.com/nextcloud/teams/64236/zh_TW/)\nContent-Type: text/plain; charset=UTF-8\nLanguage: zh_TW\nPlural-Forms: nplurals=1; plural=0;\n"]
        },
        "Undo": {
          "msgid": "Undo",
          "comments": {
            "reference": "lib/toast.ts:192"
          },
          "msgstr": ["復原"]
        }
      }
    }
  }
}].map(function (data) {
  return gtBuilder.addTranslation(data.locale, data.json);
});
var gt = gtBuilder.build();
gt.ngettext.bind(gt);
var t = gt.gettext.bind(gt);

var ToastType = /*#__PURE__*/_createClass$1(function ToastType() {
  _classCallCheck$1(this, ToastType);
});
ToastType.ERROR = 'toast-error';
ToastType.WARNING = 'toast-warning';
ToastType.INFO = 'toast-info';
ToastType.SUCCESS = 'toast-success';
ToastType.PERMANENT = 'toast-error';
ToastType.UNDO = 'toast-undo';
var TOAST_ARIA_LIVE_OFF = 'off';
var TOAST_ARIA_LIVE_POLITE = 'polite';
var TOAST_ARIA_LIVE_ASSERTIVE = 'assertive';
var ToastAriaLive = /*#__PURE__*/_createClass$1(function ToastAriaLive() {
  _classCallCheck$1(this, ToastAriaLive);
});
ToastAriaLive.OFF = TOAST_ARIA_LIVE_OFF;
ToastAriaLive.POLITE = TOAST_ARIA_LIVE_POLITE;
ToastAriaLive.ASSERTIVE = TOAST_ARIA_LIVE_ASSERTIVE;
var TOAST_UNDO_TIMEOUT = 10000;
var TOAST_DEFAULT_TIMEOUT = 7000;
var TOAST_PERMANENT_TIMEOUT = -1;
/**
 * Show a toast message
 *
 * @param text Message to be shown in the toast, any HTML is removed by default
 * @param options
 */
function showMessage(data, options) {
  var _Toastify;
  var _a;
  options = Object.assign({
    timeout: TOAST_DEFAULT_TIMEOUT,
    isHTML: false,
    type: undefined,
    // An undefined selector defaults to the body element
    selector: undefined,
    onRemove: function onRemove() {},
    onClick: undefined,
    close: true
  }, options);
  if (typeof data === 'string' && !options.isHTML) {
    // fime mae sure that text is extracted
    var element = document.createElement('div');
    element.innerHTML = data;
    data = element.innerText;
  }
  var classes = (_a = options.type) !== null && _a !== void 0 ? _a : '';
  if (typeof options.onClick === 'function') {
    classes += ' toast-with-click ';
  }
  var isNode = data instanceof Node;
  var ariaLive = ToastAriaLive.POLITE;
  if (options.ariaLive) {
    ariaLive = options.ariaLive.toString();
  } else if (options.type === ToastType.ERROR || options.type === ToastType.UNDO) {
    ariaLive = ToastAriaLive.ASSERTIVE;
  }
  var toast = toastify_js__WEBPACK_IMPORTED_MODULE_0__((_Toastify = {}, _defineProperty(_Toastify, !isNode ? 'text' : 'node', data), _defineProperty(_Toastify, "duration", options.timeout), _defineProperty(_Toastify, "callback", options.onRemove), _defineProperty(_Toastify, "onClick", options.onClick), _defineProperty(_Toastify, "close", options.close), _defineProperty(_Toastify, "gravity", 'top'), _defineProperty(_Toastify, "selector", options.selector), _defineProperty(_Toastify, "position", 'right'), _defineProperty(_Toastify, "backgroundColor", ''), _defineProperty(_Toastify, "className", 'dialogs ' + classes), _defineProperty(_Toastify, "escapeMarkup", !options.isHTML), _defineProperty(_Toastify, "ariaLive", ariaLive), _Toastify));
  toast.showToast();
  return toast;
}
/**
 * Show a toast message with error styling
 *
 * @param text Message to be shown in the toast, any HTML is removed by default
 * @param options
 */
function showError(text, options) {
  return showMessage(text, Object.assign(Object.assign({}, options), {
    type: ToastType.ERROR
  }));
}
/**
 * Show a toast message with warning styling
 *
 * @param text Message to be shown in the toast, any HTML is removed by default
 * @param options
 */
function showWarning(text, options) {
  return showMessage(text, Object.assign(Object.assign({}, options), {
    type: ToastType.WARNING
  }));
}
/**
 * Show a toast message with info styling
 *
 * @param text Message to be shown in the toast, any HTML is removed by default
 * @param options
 */
function showInfo(text, options) {
  return showMessage(text, Object.assign(Object.assign({}, options), {
    type: ToastType.INFO
  }));
}
/**
 * Show a toast message with success styling
 *
 * @param text Message to be shown in the toast, any HTML is removed by default
 * @param options
 */
function showSuccess(text, options) {
  return showMessage(text, Object.assign(Object.assign({}, options), {
    type: ToastType.SUCCESS
  }));
}
/**
 * Show a toast message with undo styling
 *
 * @param text Message to be shown in the toast, any HTML is removed by default
 * @param onUndo Function that is called when the undo button is clicked
 * @param options
 */
function showUndo(text, onUndo, options) {
  // onUndo callback is mandatory
  if (!(onUndo instanceof Function)) {
    throw new Error('Please provide a valid onUndo method');
  }
  var toast;
  options = Object.assign(options || {}, {
    // force 10 seconds of timeout
    timeout: TOAST_UNDO_TIMEOUT,
    // remove close button
    close: false
  });
  // Generate undo layout
  var undoContent = document.createElement('span');
  var undoButton = document.createElement('button');
  undoContent.classList.add('toast-undo-container');
  undoButton.classList.add('toast-undo-button');
  undoButton.innerText = t('Undo');
  undoContent.innerText = text;
  undoContent.appendChild(undoButton);
  undoButton.addEventListener('click', function (event) {
    event.stopPropagation();
    onUndo(event);
    // Hide toast
    if ((toast === null || toast === void 0 ? void 0 : toast.hideToast) instanceof Function) {
      toast.hideToast();
    }
  });
  toast = showMessage(undoContent, Object.assign(Object.assign({}, options), {
    type: ToastType.UNDO
  }));
  return toast;
}


//# sourceMappingURL=index.mjs.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"adminSettings": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*******************************!*\
  !*** ./src/admin-settings.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nextcloud_dialogs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/dialogs */ "./node_modules/@nextcloud/dialogs/dist/index.mjs");
/* harmony import */ var _nextcloud_dialogs_dist_index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/dialogs/dist/index.css */ "./node_modules/@nextcloud/dialogs/dist/index.css");


document.addEventListener('DOMContentLoaded', function () {
  const inputHandler = function (evt) {
    saveSetting(this.id);
  };
  document.querySelector('#base_url').addEventListener('change', inputHandler);
  document.querySelector('#long_lived_access_token').addEventListener('change', inputHandler);
  document.querySelector('#hass_template').addEventListener('change', inputHandler);
  document.querySelector('#hass_template_refresh_interval').addEventListener('change', inputHandler);
});

/**
 * Save a setting by name.
 *
 * @param {string} settingName The name/id of the field.
 * @return {void}
 */
function saveSetting(settingName) {
  const settingValue = document.querySelector(`#${settingName}`).value;
  OCP.AppConfig.setValue('integration_homeassistant', settingName, settingValue, {
    success() {
      (0,_nextcloud_dialogs__WEBPACK_IMPORTED_MODULE_0__.showSuccess)(`Saved '${settingName.replaceAll('_', ' ').replaceAll('hass ', '')}'!`);
    },
    error() {
      (0,_nextcloud_dialogs__WEBPACK_IMPORTED_MODULE_0__.showError)(`Error while saving '${settingName}'`);
    }
  });
}
})();

/******/ })()
;
//# sourceMappingURL=admin-settings.js.map