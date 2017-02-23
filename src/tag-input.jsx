import React from "react";

export default class TagInput extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tagName: "",
      tags: this.props.tags ? this.props.tags : []
    };
    this.addTag = this.addTag.bind(this);
    this.removeThis = this.removeThis.bind(this);
    this.handelTag = this.handelTag.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps["tags"]) {
      this.setState({
        tags: nextProps.tags
      });
    }
  }
  addTag(e) {
    if(e.keyCode === 13) {
      this.props.addTag({name: this.state.tagName, type: "tag"});
      this.setState({tagName: ""});
    }
  }
  removeThis(tags, index) {
    this.props.removeThis(tags, index);
  }
  handelTag(e) {
    this.setState({tagName: e.target.value});
  }
  render() {

    return(
      <ul className="tag-input">
        {
          this.state.tags.map((tag, index) => {
            let props = {};
            if (tag.href) {
              props["href"] = tag.href;
              props["target"] = "_blank";
            }
            return(
              <li key={`tag-${index}`} className={`tag ${tag.className}`}>
                <a className="name" {...props}>
                  {tag.name}
                </a>
                <a onClick={this.removeThis.bind(this, tag, index)} className="btn-close" />
              </li>
            );
          })
        }
        {
          (() => {
            if (!this.props.disableInput) {
              return (
                <li className="input-area">
                  <input type="text" onChange={this.handelTag} onKeyUp={this.addTag} value={this.state.tagName}/>
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
