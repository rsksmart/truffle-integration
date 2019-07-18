import React, { Component } from "react";
import PropTypes from "prop-types";
import RBTCtcUnits from "../../../helpers/rbtc-units";

export default class FormattedEtherValue extends Component {
  render() {
    const weiValueInRBTC = parseFloat(
      RBTCtcUnits.convert(
        this.props.value,
        this.props.fromUnit,
        this.props.toUnit,
      )
    ).toFixed(4);
    return (
      <span
        title={weiValueInRBTC}
      >{`${weiValueInRBTC} ${this.props.toUnit}`}</span>
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
  toUnit: "rBTC",
};
