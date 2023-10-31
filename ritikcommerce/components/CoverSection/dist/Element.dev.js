"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CoverP = exports.CoverH1 = exports.CoverContent = exports.CoverBg = exports.CoverContainer = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  margin-top: 24px;\n  color: #fff;\n  font-size: 24px;\n  text-align: center;\n  max-width: 600px;\n\n  @media screen and (max-width: 768px) {\n    font-size: 22px;\n  }\n\n  @media screen and (max-width: 480px) {\n    font-size: 18px;\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  color: #fff;\n  font-size: 48px;\n  text-align: center;\n\n  @media screen and (max-width: 768px) {\n    font-size: 40px;\n  }\n  \n  @media screen and (max-width: 480px) {\n    font-size: 32px;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  z-index: 3;\n  max-width: 1200px;\n  position: absolute;\n  padding: 8px 24px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  background: #0c0c0c;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 0 30px;\n  height: 800px;\n  position: relative;\n  z-index: 1;\n\n  :before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%),\n    linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 100%);\n    z-index: 2;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var CoverContainer = _styledComponents["default"].div(_templateObject());

exports.CoverContainer = CoverContainer;

var CoverBg = _styledComponents["default"].div(_templateObject2());

exports.CoverBg = CoverBg;

var CoverContent = _styledComponents["default"].div(_templateObject3());

exports.CoverContent = CoverContent;

var CoverH1 = _styledComponents["default"].h1(_templateObject4());

exports.CoverH1 = CoverH1;

var CoverP = _styledComponents["default"].p(_templateObject5());

exports.CoverP = CoverP;