import React, { Component } from "react";
import Moment from "react-moment";

import { toChecksumAddress } from "../../../helpers/checksumAddress";

class DecodedEventDetails extends Component {
  /**
   * @description: 
   * @param {Object} returnVal 
   * @return: {String} if the value is an address, return a formatted address.if the value is type of array,
    the string will return after be separated by commas
   */
  formatReturnValWithRskRule(returnVal) {
    if (Array.isArray(returnVal.value)) {
      if (returnVal.name === "to") {
        let formattedAddresses = returnVal.value.map(val =>
          toChecksumAddress(val),
        );
        return formattedAddresses.join(", ");
      } else {
        return returnVal.value.join(", ");
      }
    } else {
      return returnVal.name === "to"
        ? toChecksumAddress(returnVal.value)
        : returnVal.value;
    }
  }
  renderReturnValue(returnValues) {
    return returnValues.map((returnVal, index) => (
      <div className="DataRow" key={index}>
        <div className="DataPoint">
          <div className="Label">{returnVal.name}</div>
          <div className="Value">
            {this.formatReturnValWithRskRule(returnVal)}
          </div>
        </div>
      </div>
    ));
  }

  render() {
    const { event } = this.props;
    const {
      transactionHash,
      timestamp,
      contractName,
      contractAddress,
      signature,
      logIndex,
    } = event;

    return (
      <div className="DecodedEventDetails">
        <div className="DataSection">
          <div className="DataRow">
            <div className="DataPoint">
              <div className="Label">CONTRACT NAME</div>
              <div className="Value">{contractName}</div>
            </div>
            <div className="DataPoint">
              <div className="Label">CONTRACT ADDRESS</div>
              <div className="Value">{toChecksumAddress(contractAddress)}</div>
            </div>
          </div>
        </div>
        <div className="DataSection">
          <div className="DataRow">
            <div className="DataPoint">
              <div className="Label">SIGNATURE (DECODED)</div>
              <div className="Value">{signature}</div>
            </div>
          </div>
          <div className="DataRow">
            <div className="DataPoint">
              <div className="Label">TX HASH</div>
              <div className="Value">{transactionHash}</div>
            </div>
            <div className="DataPoint">
              <div className="Label">LOG INDEX</div>
              <div className="Value">{logIndex}</div>
            </div>
            <div className="DataPoint">
              <div className="Label">BLOCK TIME</div>
              <div className="Value">
                <Moment unix format="YYYY-MM-DD HH:mm:ss">
                  {timestamp}
                </Moment>
              </div>
            </div>
          </div>
        </div>
        <div className="SectionHeading">
          <h1>RETURN VALUES</h1>
        </div>

        <div className="DataSection">
          {event.returnValues ? this.renderReturnValue(event.returnValues) : ""}
        </div>
      </div>
    );
  }
}

export default DecodedEventDetails;
