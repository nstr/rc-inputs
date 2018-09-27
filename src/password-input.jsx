import PropTypes from "prop-types";
import TextInput from "./text-input";

export default class PasswordInput extends TextInput{
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
  type: PropTypes.string.isRequired,
  pattern: PropTypes.string
};

PasswordInput.defaultProps = {
  type: "password"
};
