import React from "react";

export default class TextInput extends React.Component{
  constructor(props) {
    super(props);
    this.handleData = this.handleData.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    if (this.props.onChange) this.props.onChange(e);
    if (this.onValid) this.onValid(e);
  }
  handleData(e) {
    if (this.props.onEnter) {
      switch (e.keyCode) {
      case 13:
        this.props.onEnter(e.target.value);
        break;
      }
    }

    if (this.props.onKeyClick && this.props.clickableKeys) {
      this.props.clickableKeys.forEach(key => {
        if (key === e.keyCode) this.props.onKeyClick(e.target.value);
      });
    }
  }
  componentDidMount() {
    if (this.props.autofill && !this.props.defaultValue) {
      if (this.refs.input.value !== "") this.handleData({target: this.refs.input});
      this._listener = setInterval(function () {
        if (this.props.value !== this.refs.input.value) this.handleData({target: this.refs.input});
      }.bind(this), 500);
    }
  }
  componentWillUnmount() {
    if (this.props.autofill && !this.props.defaultValue) {
      clearInterval(this._listener);
    }
  }
  render() {
      return <input type={this.props.type ? this.props.type : "text"}
        ref="input"
        value={this.props.value}
        className={this.props.className}
        placeholder={this.props.placeholder}
        onChange={this.onChange}
        onKeyUp={this.handleData}
        autoComplete={this.props.autoComplete}/>;
  }
}
