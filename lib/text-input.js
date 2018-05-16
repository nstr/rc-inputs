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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextInput = function (_React$Component) {
  _inherits(TextInput, _React$Component);

  function TextInput(props) {
    _classCallCheck(this, TextInput);

    var _this = _possibleConstructorReturn(this, (TextInput.__proto__ || Object.getPrototypeOf(TextInput)).call(this, props));

    _this.handleData = _this.handleData.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(TextInput, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.props.autofill && !this.props.defaultValue) {
        clearInterval(this._listener);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.autofill && !this.props.defaultValue) {
        if (this.refs.input.value !== "") this.handleData({ target: this.refs.input });
        this._listener = setInterval(function () {
          if (this.props.value !== this.refs.input.value) this.handleData({ target: this.refs.input });
        }.bind(this), 500);
      }

      if (this.props.onFocus) this.refs.input.addEventListener("focus", this.props.onFocus);
      if (this.props.onBlur) this.refs.input.addEventListener("blur", this.props.onBlur);
    }
  }, {
    key: "onChange",
    value: function onChange(e) {
      if (this.props.onChange) this.props.onChange(e);
      if (this.onValid) this.onValid(e);
    }
  }, {
    key: "handleData",
    value: function handleData(e) {
      if (this.props.onEnter) {
        switch (e.keyCode) {
          case 13:
            this.props.onEnter(e.target.value);
            break;
        }
      }

      if (this.props.onKeyClick && this.props.clickableKeys) {
        if (this.props.clickableKeys.indexOf(e.keyCode) !== -1) {
          if (e.keyCode === 32) e.target.value = e.target.value.trim();
          this.props.onKeyClick(e);
        }
      }

      if (e.keyCode === 8 && e.target.value.length === 0 && !!this.props.onRemove) {
        this.props.onRemove();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var props = {};
      if (this.props.onPaste) props["onPaste"] = function (e) {
        return _this2.props.onPaste(e.clipboardData.getData("Text"));
      };
      return _react2.default.createElement("input", _extends({ type: this.props.type ? this.props.type : "text",
        ref: "input",
        value: this.props.value,
        className: this.props.className,
        placeholder: this.props.placeholder,
        onChange: this.onChange,
        onKeyUp: this.handleData,
        autoCapitalize: this.props.autoCapitalize
      }, props, {
        autoComplete: this.props.autoComplete }));
    }
  }]);

  return TextInput;
}(_react2.default.Component);

exports.default = TextInput;


TextInput.propTypes = {
  type: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  value: _propTypes2.default.string,
  defaultValue: _propTypes2.default.string,
  className: _propTypes2.default.string,
  autoComplete: _propTypes2.default.bool,
  clickableKeys: _propTypes2.default.array,
  onChange: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  onPaste: _propTypes2.default.func,
  onRemove: _propTypes2.default.func,
  onKeyClick: _propTypes2.default.func,
  onEnter: _propTypes2.default.func,
  autoCapitalize: _propTypes2.default.any,
  autofill: _propTypes2.default.bool
};

TextInput.defaultProps = {
  autoCapitalize: "off"
};