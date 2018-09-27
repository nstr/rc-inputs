"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Autocomplete = function (_React$Component) {
  _inherits(Autocomplete, _React$Component);

  function Autocomplete(props) {
    _classCallCheck(this, Autocomplete);

    var _this = _possibleConstructorReturn(this, (Autocomplete.__proto__ || Object.getPrototypeOf(Autocomplete)).call(this, props));

    _this.onSelect = _this.onSelect.bind(_this);
    return _this;
  }

  _createClass(Autocomplete, [{
    key: "onSelect",
    value: function onSelect(item) {
      if (this.props.onSelect) this.props.onSelect(item);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        "ul",
        { className: (0, _classnames2.default)("rc-autocomplete", this.props.className) },
        this.props.label ? _react2.default.createElement(
          "li",
          { className: "rc-label-autocomplete" },
          _react2.default.createElement(
            "span",
            null,
            this.props.label
          )
        ) : null,
        !!this.props.autocomplete && this.props.autocomplete.map(function (item, index) {
          var props = {};
          if (item.href) {
            props["href"] = item.href;
            props["target"] = "_blank";
          }
          return _react2.default.createElement(
            "li",
            { key: "item-" + index, className: (0, _classnames2.default)("tag", "item", item.className), style: item.style, onClick: _this2.onSelect.bind(_this2, item) },
            _this2.props.renderItem ? _this2.props.renderItem(item) : _react2.default.createElement(
              "a",
              _extends({ className: "name" }, props),
              item.name ? item.name : item
            )
          );
        })
      );
    }
  }]);

  return Autocomplete;
}(_react2.default.Component);

exports.default = Autocomplete;


Autocomplete.propTypes = {
  autocomplete: _propTypes2.default.array,
  label: _propTypes2.default.string,
  onSelect: _propTypes2.default.func,
  renderItem: _propTypes2.default.func,
  className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array])
};