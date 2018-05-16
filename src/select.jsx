import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function getRandomInt() {
  return Math.floor(Math.random() * (1000000000000 - 1 + 1)) + 1;
}

export default class Select extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      id: `select-${getRandomInt()}`,
      selected: (!!this.props.selected) ? this.props.selected : this.props.placeholder ? this.props.placeholder : null,
      isOpen: false
    };
    this.selectOption = this.selectOption.bind(this);
    this.toggleList = this.toggleList.bind(this);
    this.hideThis = this.hideThis.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidUpdate() {
    if (this.state.isOpen) {
      document.body.addEventListener("click", this.handleClick);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps["selected"]) {
      this.setState({
        selected: nextProps["selected"]
      });
    }
    if (nextProps["options"]) {
      this.setState({
        options: nextProps["options"]
      });
    }
  }
  handleClick(e) {
    if (!e.target.closest(`#current-${this.state.id}`) && (e.target.closest(`#list-${this.state.id}`) === null) && (this.state.isOpen === true)) {
      this.hideThis();
    }
  }
  hideThis() {
    this.toggleList();
    document.body.removeEventListener("click", this.handleClick);
  }
  toggleList() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  selectOption(option, index) {
    this.setState({
      selected: option,
      isOpen: false
    });
    if (this.props.onChange) this.props.onChange(option, index);
  }
  render() {
    return (
      <div className={classNames("rc-select", this.props.className)}>
        <div className={classNames("current", this.state.selected ? this.state.selected.className : null, {
          "arrow": !this.props.customeArrow,
          "open": this.state.isOpen
        })} onClick={this.toggleList} id={`current-${this.state.id}`}
          style={this.state.selected ? this.state.selected.style : null}>
          {
            (() => {
              if (this.state.selected && this.state.selected.option) {
                return this.state.selected.option;
              }
              else {
                return this.state.selected;
              }
            })()
          }
          {
            (() => {
              if (this.props.customeArrow) {
                return this.props.customeArrow;
              }
            })()
          }
        </div>
        <ul className={classNames("list", this.props.dropdownClassName, {
          "open": this.state.isOpen
        })} id={`list-${this.state.id}`}>
          {
            this.props.options.length > 0 ? this.props.options.map((option, index) => {
              let classNames = [];
              if (option.className) classNames.push(option.className);
              try {
                if (!!this.props.activeClass && JSON.stringify(option) === JSON.stringify(this.state.selected)) classNames.push(this.props.activeClass);
              } catch (_) {
                if (index === this.props.activeIndex) classNames.push(this.props.activeClass);
              }
              return (
                <li key={`${this.state.id}-option-${index}`}
                  style={option.style}
                  className={classNames.join(" ")}
                  onClick={this.selectOption.bind(this, option, index)}>
                  {option.option ? option.option : option}
                </li>
              );
            }) : this.props.listPlaceholder ? (
              <li
                style={this.props.listPlaceholder.style}
                className={this.props.listPlaceholder.className}>
                {this.props.listPlaceholder.option ? this.props.listPlaceholder.option : this.props.listPlaceholder}
              </li>
            ) : null
          }
        </ul>
      </div>
    );
  }
}

Select.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  activeIndex: PropTypes.number,
  activeClass: PropTypes.string,
  dropdownClassName: PropTypes.string,
  customeArrow: PropTypes.any,
  selected: PropTypes.any,
  placeholder: PropTypes.any,
  listPlaceholder: PropTypes.any
};
