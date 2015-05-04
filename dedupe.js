/*!
  Copyright (c) 2015 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

var classNames = (function () {
	'use strict';

	function _parseArray (resultSet, array) {
		var length = array.length;

		for (var i = 0; i < length; ++i) {
			_parse(resultSet, array[i]);
		}
	}

	function _parseObject (resultSet, object) {
		for (var k in object) {
			if (object.hasOwnProperty(k)) {
				if (object[k]) {
					resultSet[k] = true

				} else {
					delete resultSet[k]
				}
			}
		}
	}

	function _parseNumber (resultSet, num) {
		resultSet[num] = true;
	}

	var SPACE = /\s+/;
	function _parseString (resultSet, str) {
		var array = str.split(SPACE);
		var length = array.length;

		for (var i = 0; i < length; ++i) {
			resultSet[array[i]] = true;
		}
	}

	function _parse (resultSet, arg) {
		// 'foo bar'
		if ('string' === typeof arg) {
			_parseString(resultSet, arg)

		// ['foo', 'bar', ...]
		} else if (Array.isArray(arg)) {
			_parseArray(resultSet, arg)

		// { 'foo': true, ... }
		} else if ('object' === typeof arg) {
			_parseObject(resultSet, arg)

		// '130'
		} else if ('number' === typeof arg) {
			_parseNumber(resultSet, arg)
		}
	}

	function _classNames () {
		var classSet = {};
		var argLength = arguments.length;

		for (var i = 0; i < argLength; ++i) {
			_parse(classSet, arguments[i]);
		}

		return Object.keys(classSet).join(' ')
	}

	return _classNames;

})();

// safely export classNames for node / browserify
if (typeof module !== 'undefined' && module.exports) {
	module.exports = classNames;
}

// safely export classNames for RequireJS
if (typeof define !== 'undefined' && define.amd) {
	define('classNames', [], function() {
		return classNames;
	});
}
