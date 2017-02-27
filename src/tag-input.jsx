import React from "react";

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
      this.setState({
        tagName: "",
        tags: this.state.tags.concat([{name: this.state.tagName}])
      });
      if (this.props.addTag) this.props.addTag({name: this.state.tagName});
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
              <li key={`tag-${index}`} className={`tag ${tag.className}`}>
                <a className="name" {...props}>
                  {tag.name}
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
