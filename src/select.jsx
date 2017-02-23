import React from "react";
import classNames from "classnames";
import "../styles/select.scss";

function getRandomInt() {
  return Math.floor(Math.random() * (1000000000000 - 1 + 1)) + 1;
}

export default class Select extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      id: `select-${getRandomInt()}`,
      selected: (!!this.props.selected) ? this.props.selected : this.props.placeholder ? this.props.placeholder : this.props.options[0],
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
  }
  handleClick(e) {
    if ((e.target.closest(`#${this.state.id}`) === null) && (this.state.isOpen === true)) {
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
      <div className={classNames("react-inputs-select", this.props.className)}>
        <div className={classNames("current", this.state.selected.className, {
          "arrow": !this.props.customeArrow,
          "open": this.state.isOpen
        })} onClick={this.toggleList} style={this.state.selected.style}>
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
        <ul className={this.state.isOpen ? "list open" : "list"} id={this.state.id}>
          {
            this.props.options.map((option, index) => {
              return (
                <li key={`select-${this.state.id}-option-${index}`}
                  style={option.style}
                  className={option.className}
                  style={option.style}
                  onClick={this.selectOption.bind(this, option)}>
                  {option.option ? option.option : option}
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}
