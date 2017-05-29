import React from "react";
import classNames from "classnames";

import Autocomplete from "./autocomplete";

export default class TagInput extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tagName: "",
      autocomplete: [],
      tags: this.props.tags ? this.props.tags : []
    };
    this.addTag = this.addTag.bind(this);
    this.handelTag = this.handelTag.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  componentDidMount() {
    if (this.props.dynamicInputWidth) {
      this.refs.tagInput.style.display = "flex";
      this.refs.tagInput.style.flexWrap = "wrap";
      this.refs.tagInput.lastChild.style.flex = "1 1";
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps["tags"]) {
      this.setState({
        tags: nextProps.tags
      });
    }
  }
  handelTag(e) {
    this.setState({tagName: e.target.value});

    const autocomplete = this.props.autocomplete;

    if (!!autocomplete && !!autocomplete.items && autocomplete.items.length > 0 && e.target.value.length > 0) {
      let searchQuery = e.target.value.toLowerCase();

      const arr = autocomplete.items.filter((el) => {
        if (!!autocomplete.key) {
          if (!el[autocomplete.key]) return false;
          const key = `${el[autocomplete.key]}`.toLowerCase();
          return key.indexOf(searchQuery) !== -1;
        }
        else if (!!autocomplete.path) {
          return autocomplete.path.split(".").reduce((obj, key, i, arr) => {
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
        autocomplete: arr
      });
    }
    else {
      this.setState({
        autocomplete: []
      });
    }
  }
  addTag(e) {
    if(e.keyCode === 13) {
      const tags = this.state.tagName.length > 0 ? this.state.tags.concat([{name: this.state.tagName}]) : this.state.tags;
      this.setState({
        tagName: "",
        tags
      });
      if (this.props.onAdd) this.props.onAdd({name: this.state.tagName});
      if (this.props.onChange) this.props.onChange(tags);
    }
  }
  onSelect(item) {
    const tags = this.state.tags.concat([item]);
    console.log("tags", tags);
    this.setState({
      tagName: "",
      tags
    });
  }
  onDelete(actionIndex, tag) {
    let tags = this.state.tags.filter((tag, tagIndex) => {
      if (tagIndex !== actionIndex) {
        return tag;
      }
    });
    this.setState({
      tags
    });
    if (this.props.onDelete) this.props.onDelete(actionIndex, tag, tags);
    if (this.props.onChange) this.props.onChange(tags);
  }
  render() {

    return (
      <div className="rc-input-wrap">
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
                  <a onClick={this.onDelete.bind(this, index, tag)} className="btn-close" />
                </li>
              );
            })
          }
          {
            (() => {
              if (!this.props.disableInput) {
                return (
                  <li className="input-area">
                    <input type="text"
                      placeholder={this.props.placeholder}
                      onChange={this.handelTag}
                      onKeyUp={this.addTag} value={this.state.tagName}/>
                  </li>
                );
              }
            })()
          }
          {
            this.props.children
          }
        </ul>
        {
          !!this.props.autocomplete && this.state.autocomplete.length > 0 ? (
            <Autocomplete
              onSelect={this.onSelect}
              className={this.props.autocomplete.className}
              autocomplete={this.state.autocomplete}
              label={this.props.autocomplete.label}
            />
          ) : null
        }
      </div>
    );
  }
}

TagInput.propTypes = {
  tags: React.PropTypes.array,
  autocomplete: React.PropTypes.shape({
    label: React.PropTypes.string,
    searchKey: React.PropTypes.string,
    searchPath: React.PropTypes.string,
    items: React.PropTypes.array
  }),
  disableInput: React.PropTypes.bool,
  createTagOnPress: React.PropTypes.array
};

TagInput.defaultProps = {
  disableInput: false,
  createTagOnPress: [13]
};
