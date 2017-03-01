import React from "react";
import classNames from "classnames";

export default class TagInput extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tagName: "",
      tags: this.props.tags ? this.props.tags : []
    };
    this.addTag = this.addTag.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.handelTag = this.handelTag.bind(this);
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
  }
  addTag(e) {
    if(e.keyCode === 13) {
      const tags = this.state.tags.concat([{name: this.state.tagName}]);
      this.setState({
        tagName: "",
        tags
      });
      if (this.props.onAdd) this.props.onAdd({name: this.state.tagName});
      if (this.props.onChange) this.props.onChange(tags);
    }
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

    return(
      <ul className="rc-tag-input">
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
      </ul>
    );
  }
}

TagInput.propTypes = {
  disableInput: React.PropTypes.bool,
  createTagOnPress: React.PropTypes.array,
  tagRules: React.PropTypes.string
};

TagInput.defaultProps = {
  disableInput: false,
  createTagOnPress: [13]
};
