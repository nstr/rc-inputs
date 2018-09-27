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
      autocompleteItems: [],
      tags: _this.props.tags ? _this.props.tags : []
    };
    _this.addTag = _this.addTag.bind(_this);
    _this.handelTag = _this.handelTag.bind(_this);
    _this.handleAutocomplete = _this.handleAutocomplete.bind(_this);
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

      if (this.props.inputValue) {
        var tagName = this.props.inputValue;
        this.setState({
          tagName: tagName
        });
        if (!!this.props.autocomplete) this.handleAutocomplete(tagName);
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

      if (!!nextProps["autocomplete"] && nextProps["autocomplete"].items) {
        if (nextProps.tags.length === 0 && nextProps.showAutocomplete) {
          this.setState({
            autocompleteItems: nextProps["autocomplete"].items
          });
        }

        if (nextProps.tags.length > 0 && nextProps.showAutocomplete) {
          this.setState({
            autocompleteItems: nextProps["autocomplete"].items.filter(function (item) {
              return !nextProps.tags.find(function (tag) {
                return JSON.stringify(tag) === JSON.stringify(item);
              });
            })
          });
        }

        if (this.props.showAutocomplete && nextProps.showAutocomplete !== this.props.showAutocomplete) {
          this.setState({
            autocompleteItems: []
          });
        }
      }

      if (this.props.inputValue) {
        var tagName = !!nextProps["inputValue"] ? nextProps["inputValue"] : "";
        this.setState({
          tagName: tagName
        });
        if (!!this.props.autocomplete) this.handleAutocomplete(tagName);
      }

      if (!this.props.inputValue && !nextProps.showAutocomplete) {
        this.setState({
          autocompleteItems: []
        });
      }
    }
  }, {
    key: "handelTag",
    value: function handelTag(e) {
      if (this.props.onInputChange) this.props.onInputChange(e);

      if (this.props.createTagOnPress) {
        var value = e.target.value;
        if (this.props.createTagOnPress.indexOf(value.slice(-1)) !== -1) {
          this.addTag({ target: { value: value.slice(0, -1) } });
        } else {
          this.setState({ tagName: e.target.value });
        }
      } else {
        this.setState({ tagName: e.target.value });
      }

      if (!!this.props.autocomplete) this.handleAutocomplete(e.target.value);
    }
  }, {
    key: "handleAutocomplete",
    value: function handleAutocomplete(value) {
      var autocomplete = this.props.autocomplete;

      if (!!autocomplete.items && autocomplete.items.length > 0 && value.length > 0) {
        var searchQuery = value.toLowerCase();

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
          autocompleteItems: arr
        });
      } else {
        if (!this.props.showAutocomplete) this.setState({
          autocompleteItems: []
        });
      }
    }
  }, {
    key: "addTag",
    value: function addTag(e) {
      var tags = e.target.value.length > 0 ? this.state.tags.concat([{ name: e.target.value }]) : this.state.tags;
      this.setState({
        tagName: "",
        tags: tags
      });
      if (this.props.onAdd) this.props.onAdd({ name: e.target.value });
      if (this.props.onChange) this.props.onChange(tags);
    }
  }, {
    key: "onSelect",
    value: function onSelect(item) {
      var tags = this.state.tags.concat([item]);

      this.setState({
        autocompleteItems: this.state.autocompleteItems.filter(function (i) {
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

      var autocomplete = _react2.default.createElement(_autocomplete2.default, {
        renderItem: this.props.renderAutocompleteItem,
        onSelect: this.onSelect,
        className: (0, _classnames2.default)("rc-tag-input", this.props.autocomplete && this.props.autocomplete.className),
        autocomplete: this.state.autocompleteItems,
        label: this.props.autocomplete && this.props.autocomplete.label
      });
      var autocompleteIsShown = this.props.showAutocomplete !== null ? this.props.showAutocomplete : !!this.props.autocomplete && this.state.autocompleteItems.length > 0;

      return _react2.default.createElement(
        "div",
        { className: (0, _classnames2.default)("rc-input-wrap", this.props.classNameWrap) },
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
          this.props.children ? _react2.default.createElement(
            "li",
            null,
            this.props.children,
            autocompleteIsShown && this.props.autocomplete.isUnderInput && autocomplete
          ) : _react2.default.createElement(
            "li",
            { className: "input-area" },
            _react2.default.createElement(_textInput2.default, {
              value: this.state.tagName,
              placeholder: this.props.placeholder,
              onChange: this.handelTag,
              clickableKeys: this.props.createTagOnKeys,
              onKeyClick: this.addTag,
              onFocus: this.props.onFocus,
              onBlur: this.props.onBlur,
              onPaste: this.props.onPaste
            }),
            autocompleteIsShown && this.props.autocomplete.isUnderInput && autocomplete
          )
        ),
        autocompleteIsShown && !this.props.autocomplete.isUnderInput && autocomplete
      );
    }
  }]);

  return TagInput;
}(_react2.default.Component);

exports.default = TagInput;


TagInput.propTypes = {
  children: _propTypes2.default.node,
  inputValue: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  tags: _propTypes2.default.array,
  autocomplete: _propTypes2.default.shape({
    label: _propTypes2.default.string,
    searchKey: _propTypes2.default.string,
    searchPath: _propTypes2.default.string,
    items: _propTypes2.default.array,
    className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]),
    isUnderInput: _propTypes2.default.bool
  }),
  renderAutocompleteItem: _propTypes2.default.func,
  showAutocomplete: _propTypes2.default.any,
  disableInput: _propTypes2.default.bool,
  createTagOnPress: _propTypes2.default.array,
  createTagOnKeys: _propTypes2.default.array,
  className: _propTypes2.default.string,
  classNameWrap: _propTypes2.default.string,
  dynamicInputWidth: _propTypes2.default.bool,
  onInputChange: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  onPaste: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onDelete: _propTypes2.default.func,
  onAdd: _propTypes2.default.func,
  onSelect: _propTypes2.default.func
};

TagInput.defaultProps = {
  disableInput: false,
  showAutocomplete: null,
  createTagOnKeys: [13]
};