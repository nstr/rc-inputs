import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Autocomplete from "./autocomplete";
import TextInput from "./text-input";

export default class TagInput extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tagName: !!this.props.inputValue ? this.props.inputValue : "",
      autocompleteItems: [],
      tags: this.props.tags ? this.props.tags : []
    };
    this.addTag = this.addTag.bind(this);
    this.handelTag = this.handelTag.bind(this);
    this.handleAutocomplete = this.handleAutocomplete.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  componentDidMount() {
    if (this.props.dynamicInputWidth) {
      this.refs.tagInput.style.display = "flex";
      this.refs.tagInput.style.flexWrap = "wrap";
      this.refs.tagInput.lastChild.style.flex = "1 1";
    }

    if (this.props.inputValue) {
      let tagName = this.props.inputValue;
      this.setState({
        tagName: tagName
      });
      if (!!this.props.autocomplete) this.handleAutocomplete(tagName);
    }
  }
  componentWillReceiveProps(nextProps) {
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
          autocompleteItems: nextProps["autocomplete"].items.filter(item => {
            return !nextProps.tags.find(tag => JSON.stringify(tag) === JSON.stringify(item));
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
      let tagName = !!nextProps["inputValue"] ? nextProps["inputValue"] : "";
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
  handelTag(e) {
    if (this.props.onInputChange) this.props.onInputChange(e);

    if (this.props.createTagOnPress) {
      let value = e.target.value;
      if (this.props.createTagOnPress.indexOf(value.slice(-1)) !== -1) {
        this.addTag({target: {value: value.slice(0, -1)}});
      } else {
        this.setState({tagName: e.target.value});
      }
    } else {
      this.setState({tagName: e.target.value});
    }

    if (!!this.props.autocomplete) this.handleAutocomplete(e.target.value);
  }
  handleAutocomplete(value) {
    const autocomplete = this.props.autocomplete;

    if (!!autocomplete.items && autocomplete.items.length > 0 && value.length > 0) {
      let searchQuery = value.toLowerCase();

      const arr = autocomplete.items.filter((el) => {
        if (!!autocomplete.searchKey) {
          if (!el[autocomplete.searchKey]) return false;
          const key = `${el[autocomplete.searchKey]}`.toLowerCase();
          return key.indexOf(searchQuery) !== -1;
        }
        else if (!!autocomplete.searchPath) {
          return autocomplete.searchPath.split(".").reduce((obj, key, i, arr) => {
            if (arr.length - 1 === i) {
              const k = `${obj[key]}`.toLowerCase();
              return k.indexOf(searchQuery) !== -1;
            }
            return obj[key];
          }, el);
        }
        else {
          const key = `${el}`.toLowerCase();
          return key.indexOf(searchQuery) !== -1;
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
  addTag(e) {
    const tags = e.target.value.length > 0 ? this.state.tags.concat([{name: e.target.value}]) : this.state.tags;
    this.setState({
      tagName: "",
      tags
    });
    if (this.props.onAdd) this.props.onAdd({name: e.target.value});
    if (this.props.onChange) this.props.onChange(tags);
  }
  onSelect(item) {
    const tags = this.state.tags.concat([item]);

    this.setState({
      autocompleteItems: this.state.autocompleteItems.filter((i) => JSON.stringify(i) !== JSON.stringify(item)),
      tagName: "",
      tags
    });

    if (this.props.onAdd) this.props.onAdd(item);
    if (this.props.onChange) this.props.onChange(tags);
    if (this.props.onSelect) this.props.onSelect(item, tags);
  }
  onDelete(tag, actionIndex) {
    let tags = this.state.tags.filter((tag, tagIndex) => {
      if (tagIndex !== actionIndex) {
        return tag;
      }
    });
    this.setState({
      tags
    });
    if (this.props.onDelete) this.props.onDelete(tag, actionIndex, tags);
    if (this.props.onChange) this.props.onChange(tags);
  }
  render() {
    const autocomplete = <Autocomplete
      renderItem={this.props.renderAutocompleteItem}
      onSelect={this.onSelect}
      className={classNames("rc-tag-input", this.props.autocomplete && this.props.autocomplete.className)}
      autocomplete={this.state.autocompleteItems}
      label={this.props.autocomplete && this.props.autocomplete.label}
    />;
    const autocompleteIsShown = this.props.showAutocomplete !== null ? this.props.showAutocomplete :
    !!this.props.autocomplete && this.state.autocompleteItems.length > 0;

    return (
      <div className={classNames("rc-input-wrap", this.props.classNameWrap)}>
        <ul className={classNames("rc-tag-input", this.props.className)} ref="tagInput">
          {
            this.state.tags.map((tag, index) => {
              let props = {};
              if (tag.href) {
                props["href"] = tag.href;
                props["target"] = "_blank";
              }
              return(
                <li key={`tag-${index}`} className={classNames("tag", tag.className)} style={tag.style}>
                  <a className="name" {...props}>
                    {tag.name ? tag.name : tag}
                  </a>
                  <a onClick={this.onDelete.bind(this, tag, index)} className="btn-close" />
                </li>
              );
            })
          }
          {
            this.props.children ? (
              <li>
                {this.props.children}
                {
                  autocompleteIsShown && this.props.autocomplete.isUnderInput && autocomplete
                }
              </li>
            ) : (
              <li className="input-area">
                <TextInput
                  value={this.state.tagName}
                  placeholder={this.props.placeholder}
                  onChange={this.handelTag}
                  clickableKeys={this.props.createTagOnKeys}
                  onKeyClick={this.addTag}
                  onFocus={this.props.onFocus}
                  onBlur={this.props.onBlur}
                  onPaste={this.props.onPaste}
                />
                {
                  autocompleteIsShown && this.props.autocomplete.isUnderInput && autocomplete
                }
              </li>
            )
          }
        </ul>
        {
          autocompleteIsShown && !this.props.autocomplete.isUnderInput && autocomplete
        }
      </div>
    );
  }
}

TagInput.propTypes = {
  children: PropTypes.node,
  inputValue: PropTypes.string,
  placeholder: PropTypes.string,
  tags: PropTypes.array,
  autocomplete: PropTypes.shape({
    label: PropTypes.string,
    searchKey: PropTypes.string,
    searchPath: PropTypes.string,
    items: PropTypes.array,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    isUnderInput: PropTypes.bool
  }),
  renderAutocompleteItem: PropTypes.func,
  showAutocomplete: PropTypes.any,
  disableInput: PropTypes.bool,
  createTagOnPress: PropTypes.array,
  createTagOnKeys: PropTypes.array,
  className: PropTypes.string,
  classNameWrap: PropTypes.string,
  dynamicInputWidth: PropTypes.bool,
  onInputChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onPaste: PropTypes.func,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  onAdd: PropTypes.func,
  onSelect: PropTypes.func,
};

TagInput.defaultProps = {
  disableInput: false,
  showAutocomplete: null,
  createTagOnKeys: [13],
};
