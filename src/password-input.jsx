import React from "react";

import TextInput from "./text-input.jsx";

export class PasswordInput extends TextInput{
  constructor(props) {
    super(props);
  }
  onValid(e) {
    if (!!this.props.onValid && this.props.pattern) {
      this.props.onValid(new RegExp(this.props.pattern).test(e.target.value), e);
    }
  }
}

PasswordInput.propTypes = {
  type: React.PropTypes.string.isRequired,
  pattern: React.PropTypes.string
};

PasswordInput.defaultProps = {
  type: "password"
};
