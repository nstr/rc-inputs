"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

require("../styles/select.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getRandomInt() {
  return Math.floor(Math.random() * (1000000000000 - 1 + 1)) + 1;
}

var Select = function (_React$Component) {
  _inherits(Select, _React$Component);

  function Select(props) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

    _this.state = {
      id: "select-" + getRandomInt(),
      selected: !!_this.props.selected ? _this.props.selected : _this.props.placeholder ? _this.props.placeholder : _this.props.options[0],
      isOpen: false
    };
    _this.selectOption = _this.selectOption.bind(_this);
    _this.toggleList = _this.toggleList.bind(_this);
    _this.hideThis = _this.hideThis.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(Select, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.state.isOpen) {
        document.body.addEventListener("click", this.handleClick);
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps["selected"]) {
        this.setState({
          selected: nextProps["selected"]
        });
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      if (e.target.closest("#" + this.state.id) === null && this.state.isOpen === true) {
        this.hideThis();
      }
    }
  }, {
    key: "hideThis",
    value: function hideThis() {
      this.toggleList();
      document.body.removeEventListener("click", this.handleClick);
    }
  }, {
    key: "toggleList",
    value: function toggleList() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  }, {
    key: "selectOption",
    value: function selectOption(option) {
      this.setState({
        selected: option,
        isOpen: false
      });
      if (this.props.onChange) this.props.onChange(option);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        "div",
        { className: (0, _classnames2.default)("react-inputs-select", this.props.className) },
        _react2.default.createElement(
          "div",
          { className: (0, _classnames2.default)("current", this.state.selected.className, {
              "arrow": !this.props.customeArrow,
              "open": this.state.isOpen
            }), onClick: this.toggleList, style: this.state.selected.style },
          function () {
            if (_this2.state.selected && _this2.state.selected.option) {
              return _this2.state.selected.option;
            } else {
              return _this2.state.selected;
            }
          }(),
          function () {
            if (_this2.props.customeArrow) {
              return _this2.props.customeArrow;
            }
          }()
        ),
        _react2.default.createElement(
          "ul",
          { className: this.state.isOpen ? "list open" : "list", id: this.state.id },
          this.props.options.map(function (option, index) {
            var _React$createElement;

            return _react2.default.createElement(
              "li",
              (_React$createElement = { key: "select-" + _this2.state.id + "-option-" + index,
                style: option.style,
                className: option.className
              }, _defineProperty(_React$createElement, "style", option.style), _defineProperty(_React$createElement, "onClick", _this2.selectOption.bind(_this2, option)), _React$createElement),
              option.option ? option.option : option
            );
          })
        )
      );
    }
  }]);

  return Select;
}(_react2.default.Component);

exports.default = Select;