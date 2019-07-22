import React, { Component } from "react";
import { toChecksumAddress } from "../../../helpers/checksumAddress";

export default class ChecksumAddress extends Component {
  render() {
    return <span>{toChecksumAddress(this.props.address)}</span>;
  }
}
