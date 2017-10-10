import React from "react";
import PropTypes from "prop-types";

import TextInput from "./text-input";

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default class EmailInput extends TextInput{
  constructor(props) {
    super(props);
  }
  onValid(e) {
    if (!!this.props.onValid) {
      this.props.onValid(validateEmail(e.target.value), e);
    }
  }
}

EmailInput.propTypes = {
  type: PropTypes.string.isRequired
};

EmailInput.defaultProps = {
  type: "email"
};
