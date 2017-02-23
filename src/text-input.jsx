import React from "react";

export default class TextInput extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue ? this.props.defaultValue : ""
    };
    this.handleData = this.handleData.bind(this);
  }
  handleData(e) {
    if (this.props.onEnter) {
      switch (e.keyCode) {
      case 13:
        this.props.onEnter(this.state.value);
        break;
      }
    }
    if (this.props.onChange) this.props.onChange(e);
    if (this.onValid) {
      this.onValid(e);
    }
    this.setState({
      value: e.target.value
    });
  }
  componentDidMount() {
    if (this.props.autofill && !this.props.defaultValue) {
      if (this.refs.input.value !== "") this.handleData({target: this.refs.input});
      this._listener = setInterval(function () {
        if (this.state.value !== this.refs.input.value) this.handleData({target: this.refs.input});
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
        defaultValue={this.props.defaultValue}
        className={this.props.className}
        placeholder={this.props.placeholder}
        onKeyUp={this.handleData}
        autoComplete={this.props.autoComplete}/>;
  }
}
