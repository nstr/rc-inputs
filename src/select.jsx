import React from "react";
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
  selectOption(option) {
    this.setState({
      selected: option,
      isOpen: false
    });
    if (this.props.onChange) this.props.onChange(option);
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
        <ul className={this.state.isOpen ? "list open" : "list"} id={`list-${this.state.id}`}>
          {
            this.props.options.length > 0 ? this.props.options.map((option, index) => {
              return (
                <li key={`${this.state.id}-option-${index}`}
                  style={option.style}
                  className={option.className}
                  style={option.style}
                  onClick={this.selectOption.bind(this, option)}>
                  {option.option ? option.option : option}
                </li>
              );
            }) : this.props.listPlaceholder ? (
              <li style={this.props.listPlaceholder.style}
                className={this.props.listPlaceholder.className}
                style={this.props.listPlaceholder.style}>
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
  options: React.PropTypes.array,
  selected: React.PropTypes.any,
  placeholder: React.PropTypes.any,
  listPlaceholder: React.PropTypes.any
};
