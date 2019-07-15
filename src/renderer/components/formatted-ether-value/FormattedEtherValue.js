import React, { Component } from "react";
import PropTypes from "prop-types";
import RBTCtcUnits from "../../../helper/rbtc-units";

export default class FormattedEtherValue extends Component {
  render() {
    const satoshiValueInRBTC = parseFloat(
      RBTCtcUnits.convert(
        this.props.value,
        this.props.fromUnit,
        this.props.toUnit,
      ),
    ).toFixed(2);
    return (
      <span
        title={satoshiValueInRBTC}
      >{`${satoshiValueInRBTC} ${this.props.toUnit.toUpperCase()}`}</span>
    );
  }
}

FormattedEtherValue.propTypes = {
  value: PropTypes.string,
  fromUnit: PropTypes.string,
  toUnit: PropTypes.string,
};

FormattedEtherValue.defaultProps = {
  fromUnit: "wei",
  toUnit: "rbtc",
};
