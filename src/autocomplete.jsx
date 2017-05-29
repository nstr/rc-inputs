import React from "react";
import classNames from "classnames";

export default class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }
  onSelect(item) {
    console.log("item", item);
    if (this.props.onSelect) this.props.onSelect(item);
  }
  render() {
    return (
      <ul className={classNames("rc-autocomplete", this.props.className)}>
        {
          this.props.label ? (
            <li className="rc-label-autocomplete">
              <span>
                {this.props.label}
              </span>
            </li>
          ) : null
        }
        {
          !!this.props.autocomplete && this.props.autocomplete.map((item, index) => {
            let props = {};
            if (item.href) {
              props["href"] = item.href;
              props["target"] = "_blank";
            }
            return(
              <li key={`item-${index}`} className={classNames("tag", "item", item.className)} style={item.style}>
                <a className="name" {...props} onClick={this.onSelect.bind(this, item)}>
                  {item.name ? item.name : item}
                </a>
              </li>
            );
          })
        }
      </ul>
    );
  }
}
