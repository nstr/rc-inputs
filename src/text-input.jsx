import React from "react";
import PropTypes from "prop-types";

export default class TextInput extends React.Component{
  constructor(props) {
    super(props);
    this.handleData = this.handleData.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentWillUnmount() {
    if (this.props.autofill && !this.props.defaultValue) {
      clearInterval(this._listener);
    }
  }
  componentDidMount() {
    if (this.props.autofill && !this.props.defaultValue) {
      if (this.refs.input.value !== "") this.handleData({target: this.refs.input});
      this._listener = setInterval(function () {
        if (this.props.value !== this.refs.input.value) this.handleData({target: this.refs.input});
      }.bind(this), 500);
    }

    if (this.props.onFocus) this.refs.input.addEventListener("focus", this.props.onFocus);
    if (this.props.onBlur) this.refs.input.addEventListener("blur", this.props.onBlur);
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
      if (this.props.clickableKeys.indexOf(e.keyCode) !== -1) {
        if (e.keyCode === 32) e.target.value = e.target.value.trim();
        this.props.onKeyClick(e);
      }
    }

    if (e.keyCode === 8 && e.target.value.length === 0 && !!this.props.onRemove) {
      this.props.onRemove();
    }
  }
  render() {
      let props = {};
      if (this.props.onPaste) props["onPaste"] = (e) => this.props.onPaste(e.clipboardData.getData("Text"));
      return <input type={this.props.type ? this.props.type : "text"}
        ref="input"
        value={this.props.value}
        className={this.props.className}
        placeholder={this.props.placeholder}
        onChange={this.onChange}
        onKeyUp={this.handleData}
        autoCapitalize={this.props.autoCapitalize}
        {...props}
        autoComplete={this.props.autoComplete}/>;
  }
}

TextInput.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  autoComplete: PropTypes.bool,
  clickableKeys: PropTypes.array,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onPaste: PropTypes.func,
  onRemove: PropTypes.func,
  onKeyClick: PropTypes.func,
  onEnter: PropTypes.func,
  autoCapitalize: PropTypes.any,
  autofill: PropTypes.bool
};

TextInput.defaultProps = {
  autoCapitalize: "off"
};
