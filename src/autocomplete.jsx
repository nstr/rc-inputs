import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }
  onSelect(item) {
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
              <li key={`item-${index}`} className={classNames("tag", "item", item.className)} style={item.style} onClick={this.onSelect.bind(this, item)}>
                {
                  this.props.renderItem ? this.props.renderItem(item) : (
                    <a className="name" {...props}>
                      {item.name ? item.name : item}
                    </a>
                  )
                }
              </li>
            );
          })
        }
      </ul>
    );
  }
}

Autocomplete.propTypes = {
  autocomplete: PropTypes.array,
  label: PropTypes.string,
  onSelect: PropTypes.func,
  renderItem: PropTypes.func,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
};
