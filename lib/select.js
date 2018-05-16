"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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
      selected: !!_this.props.selected ? _this.props.selected : _this.props.placeholder ? _this.props.placeholder : null,
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
      if (nextProps["options"]) {
        this.setState({
          options: nextProps["options"]
        });
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      if (!e.target.closest("#current-" + this.state.id) && e.target.closest("#list-" + this.state.id) === null && this.state.isOpen === true) {
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
    value: function selectOption(option, index) {
      this.setState({
        selected: option,
        isOpen: false
      });
      if (this.props.onChange) this.props.onChange(option, index);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        "div",
        { className: (0, _classnames2.default)("rc-select", this.props.className) },
        _react2.default.createElement(
          "div",
          { className: (0, _classnames2.default)("current", this.state.selected ? this.state.selected.className : null, {
              "arrow": !this.props.customeArrow,
              "open": this.state.isOpen
            }), onClick: this.toggleList, id: "current-" + this.state.id,
            style: this.state.selected ? this.state.selected.style : null },
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
          { className: (0, _classnames2.default)("list", this.props.dropdownClassName, {
              "open": this.state.isOpen
            }), id: "list-" + this.state.id },
          this.props.options.length > 0 ? this.props.options.map(function (option, index) {
            var classNames = [];
            if (option.className) classNames.push(option.className);
            try {
              if (!!_this2.props.activeClass && JSON.stringify(option) === JSON.stringify(_this2.state.selected)) classNames.push(_this2.props.activeClass);
            } catch (_) {
              if (index === _this2.props.activeIndex) classNames.push(_this2.props.activeClass);
            }
            return _react2.default.createElement(
              "li",
              { key: _this2.state.id + "-option-" + index,
                style: option.style,
                className: classNames.join(" "),
                onClick: _this2.selectOption.bind(_this2, option, index) },
              option.option ? option.option : option
            );
          }) : this.props.listPlaceholder ? _react2.default.createElement(
            "li",
            {
              style: this.props.listPlaceholder.style,
              className: this.props.listPlaceholder.className },
            this.props.listPlaceholder.option ? this.props.listPlaceholder.option : this.props.listPlaceholder
          ) : null
        )
      );
    }
  }]);

  return Select;
}(_react2.default.Component);

exports.default = Select;


Select.propTypes = {
  options: _propTypes2.default.array,
  onChange: _propTypes2.default.func,
  className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]),
  activeIndex: _propTypes2.default.number,
  activeClass: _propTypes2.default.string,
  dropdownClassName: _propTypes2.default.string,
  customeArrow: _propTypes2.default.any,
  selected: _propTypes2.default.any,
  placeholder: _propTypes2.default.any,
  listPlaceholder: _propTypes2.default.any
};