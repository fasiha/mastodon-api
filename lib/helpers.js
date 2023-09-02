"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* eslint-disable no-param-reassign */
var Helpers = /*#__PURE__*/function () {
  function Helpers() {
    _classCallCheck(this, Helpers);
  }
  _createClass(Helpers, null, [{
    key: "moveParamsIntoPath",
    value:
    /**
     * For each `/:param` fragment in path, move the value in params
     * at that key to path. If the key is not found in params, throw.
     * Modifies both params and path values.
     *
     * @param {Object} params
     * @param {String} path
     * @return {XML|string|void|*}
     */
    function moveParamsIntoPath(params, path) {
      var rgxParam = /\/:(\w+)/g;
      path = path.replace(rgxParam, function (hit) {
        var paramName = hit.slice(2);
        var suppliedVal = params[paramName];
        if (!suppliedVal) {
          throw new Error("Mastodon: Params object is missing a required parameter for this request: ".concat(paramName));
        }
        delete params[paramName];
        return "/".concat(suppliedVal);
      });
      return path;
    }

    /**
     * When Mastodon returns a response that looks like an error response,
     * use this function to attach the error info in the response body to `err`.
     *
     * @param {Error} err
     * @param {Object} body
     */
  }, {
    key: "attachBodyInfoToError",
    value: function attachBodyInfoToError(err, body) {
      err.mastodonReply = body;
      if (!body) return err;
      if (body.error) {
        // the body itself is an error object
        err.message = body.error;
        err.allErrors = err.allErrors.concat([body]);
      } else if (body.errors && body.errors.length) {
        // body contains multiple error objects
        err.message = body.errors[0].message;
        err.code = body.errors[0].code;
        err.allErrors = err.allErrors.concat(body.errors);
      }
      return err;
    }

    /**
     * Mastodon error object
     *
     * @param {String} message
     * @return {Error}
     */
  }, {
    key: "makeMastodonError",
    value: function makeMastodonError(message) {
      var err = Error();
      if (message) err.message = message;
      err.code = null;
      err.allErrors = [];
      err.mastodonReply = null;
      return err;
    }
  }]);
  return Helpers;
}();
var _default = Helpers;
exports["default"] = _default;