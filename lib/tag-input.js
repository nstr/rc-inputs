"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TagInput = function (_React$Component) {
  _inherits(TagInput, _React$Component);

  function TagInput(props) {
    _classCallCheck(this, TagInput);

    var _this = _possibleConstructorReturn(this, (TagInput.__proto__ || Object.getPrototypeOf(TagInput)).call(this, props));

    _this.state = {
      tagName: "",
      tags: _this.props.tags ? _this.props.tags : []
    };
    _this.addTag = _this.addTag.bind(_this);
    _this.removeThis = _this.removeThis.bind(_this);
    _this.handelTag = _this.handelTag.bind(_this);
    return _this;
  }

  _createClass(TagInput, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps["tags"]) {
        this.setState({
          tags: nextProps.tags
        });
      }
    }
  }, {
    key: "addTag",
    value: function addTag(e) {
      if (e.keyCode === 13) {
        this.props.addTag({ name: this.state.tagName, type: "tag" });
        this.setState({ tagName: "" });
      }
    }
  }, {
    key: "removeThis",
    value: function removeThis(tags, index) {
      this.props.removeThis(tags, index);
    }
  }, {
    key: "handelTag",
    value: function handelTag(e) {
      this.setState({ tagName: e.target.value });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        "ul",
        { className: "tag-input" },
        this.state.tags.map(function (tag, index) {
          var props = {};
          if (tag.href) {
            props["href"] = tag.href;
            props["target"] = "_blank";
          }
          return _react2.default.createElement(
            "li",
            { key: "tag-" + index, className: "tag " + tag.className },
            _react2.default.createElement(
              "a",
              _extends({ className: "name" }, props),
              tag.name
            ),
            _react2.default.createElement("a", { onClick: _this2.removeThis.bind(_this2, tag, index), className: "btn-close" })
          );
        }),
        function () {
          if (!_this2.props.disableInput) {
            return _react2.default.createElement(
              "li",
              { className: "input-area" },
              _react2.default.createElement("input", { type: "text", onChange: _this2.handelTag, onKeyUp: _this2.addTag, value: _this2.state.tagName })
            );
          }
        }()
      );
    }
  }]);

  return TagInput;
}(_react2.default.Component);

exports.default = TagInput;


TagInput.propTypes = {
  disableInput: _react2.default.PropTypes.bool,
  createTagOnPress: _react2.default.PropTypes.array,
  tagRules: _react2.default.PropTypes.string
};

TagInput.defaultProps = {
  disableInput: false,
  createTagOnPress: [13]
};