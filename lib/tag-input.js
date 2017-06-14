"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _autocomplete = require("./autocomplete");

var _autocomplete2 = _interopRequireDefault(_autocomplete);

var _textInput = require("./text-input");

var _textInput2 = _interopRequireDefault(_textInput);

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
      tagName: !!_this.props.inputValue ? _this.props.inputValue : "",
      autocomplete: [],
      tags: _this.props.tags ? _this.props.tags : []
    };
    _this.addTag = _this.addTag.bind(_this);
    _this.handelTag = _this.handelTag.bind(_this);
    _this.onSelect = _this.onSelect.bind(_this);
    _this.onDelete = _this.onDelete.bind(_this);
    return _this;
  }

  _createClass(TagInput, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.dynamicInputWidth) {
        this.refs.tagInput.style.display = "flex";
        this.refs.tagInput.style.flexWrap = "wrap";
        this.refs.tagInput.lastChild.style.flex = "1 1";
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (!!nextProps["tags"]) {
        this.setState({
          tags: nextProps.tags
        });
      }
      if (!!nextProps["autocomplete"]) {
        this.setState({
          autocomplete: nextProps["autocomplete"]
        });
      }
      if (!!nextProps["inputValue"]) {
        this.setState({
          tagName: nextProps["inputValue"]
        });
      }
    }
  }, {
    key: "handelTag",
    value: function handelTag(e) {
      this.setState({ tagName: e.target.value });
      var autocomplete = this.props.autocomplete;

      if (!!autocomplete && !!autocomplete.items && autocomplete.items.length > 0 && e.target.value.length > 0) {
        var searchQuery = e.target.value.toLowerCase();

        var arr = autocomplete.items.filter(function (el) {
          if (!!autocomplete.searchKey) {
            if (!el[autocomplete.searchKey]) return false;
            var key = ("" + el[autocomplete.searchKey]).toLowerCase();
            return key.indexOf(searchQuery) !== -1;
          } else if (!!autocomplete.searchPath) {
            return autocomplete.searchPath.split(".").reduce(function (obj, key, i, arr) {
              if (arr.length - 1 === i) {
                var k = ("" + obj[key]).toLowerCase();
                return k.indexOf(searchQuery) !== -1;
              }
              return obj[key];
            }, el);
          } else {
            var _key = ("" + el).toLowerCase();
            return _key.indexOf(searchQuery) !== -1;
          }
        });

        this.setState({
          autocomplete: arr
        });
      } else {
        this.setState({
          autocomplete: []
        });
      }
      if (this.props.onInputChange) this.props.onInputChange(e);
    }
  }, {
    key: "addTag",
    value: function addTag() {
      var tags = this.state.tagName.length > 0 ? this.state.tags.concat([{ name: this.state.tagName }]) : this.state.tags;
      this.setState({
        tagName: "",
        tags: tags
      });
      if (this.props.onAdd) this.props.onAdd({ name: this.state.tagName });
      if (this.props.onChange) this.props.onChange(tags);
    }
  }, {
    key: "onSelect",
    value: function onSelect(item) {
      var tags = this.state.tags.concat([item]);

      this.setState({
        autocomplete: this.state.autocomplete.filter(function (i) {
          return JSON.stringify(i) !== JSON.stringify(item);
        }),
        tagName: "",
        tags: tags
      });

      if (this.props.onAdd) this.props.onAdd(item);
      if (this.props.onChange) this.props.onChange(tags);
      if (this.props.onSelect) this.props.onSelect(item, tags);
    }
  }, {
    key: "onDelete",
    value: function onDelete(tag, actionIndex) {
      var tags = this.state.tags.filter(function (tag, tagIndex) {
        if (tagIndex !== actionIndex) {
          return tag;
        }
      });
      this.setState({
        tags: tags
      });
      if (this.props.onDelete) this.props.onDelete(tag, actionIndex, tags);
      if (this.props.onChange) this.props.onChange(tags);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        "div",
        { className: "rc-input-wrap" },
        _react2.default.createElement(
          "ul",
          { className: (0, _classnames2.default)("rc-tag-input", this.props.className), ref: "tagInput" },
          this.state.tags.map(function (tag, index) {
            var props = {};
            if (tag.href) {
              props["href"] = tag.href;
              props["target"] = "_blank";
            }
            return _react2.default.createElement(
              "li",
              { key: "tag-" + index, className: (0, _classnames2.default)("tag", tag.className), style: tag.style },
              _react2.default.createElement(
                "a",
                _extends({ className: "name" }, props),
                tag.name ? tag.name : tag
              ),
              _react2.default.createElement("a", { onClick: _this2.onDelete.bind(_this2, tag, index), className: "btn-close" })
            );
          }),
          function () {
            if (!_this2.props.disableInput) {
              return _react2.default.createElement(
                "li",
                { className: "input-area" },
                _react2.default.createElement(_textInput2.default, {
                  value: _this2.state.tagName,
                  placeholder: _this2.props.placeholder,
                  onChange: _this2.handelTag,
                  clickableKeys: _this2.props.createTagOnPress,
                  onKeyClick: _this2.addTag,
                  onFocus: _this2.props.onFocus,
                  onBlur: _this2.props.onBlur
                })
              );
            }
          }(),
          this.props.children
        ),
        !!this.props.autocomplete && this.state.autocomplete.length > 0 ? _react2.default.createElement(_autocomplete2.default, {
          onSelect: this.onSelect,
          className: (0, _classnames2.default)("rc-tag-input", this.props.autocomplete.className),
          autocomplete: this.state.autocomplete,
          label: this.props.autocomplete.label
        }) : null
      );
    }
  }]);

  return TagInput;
}(_react2.default.Component);

exports.default = TagInput;


TagInput.propTypes = {
  inputValue: _react2.default.PropTypes.string,
  tags: _react2.default.PropTypes.array,
  autocomplete: _react2.default.PropTypes.shape({
    label: _react2.default.PropTypes.string,
    searchKey: _react2.default.PropTypes.string,
    searchPath: _react2.default.PropTypes.string,
    items: _react2.default.PropTypes.array
  }),
  disableInput: _react2.default.PropTypes.bool,
  createTagOnPress: _react2.default.PropTypes.array
};

TagInput.defaultProps = {
  disableInput: false,
  createTagOnPress: [13]
};