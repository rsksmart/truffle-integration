import React, { Component } from "react"

import connect from "../helpers/connect"

class EventItem extends Component {
  render() {
    const { name, contract, transactionHash, blockTime, logIndex } = this.props
    const goToEventDetails = () =>
      this.props.dispatch(push(`/event_details/${transactionHash}/${logIndex}`))
    return (
      <div className="EventItem" onClick={goToEventDetails}>
        <div className="name">
          <div className="label">NAME</div>
          <div className="value">{name || "ENCODED EVENT"}</div>
        </div>
        <div className="data">
          <div className="dataItem">
            <div className="label">CONTRACT</div>
            <div className="value">{contract}</div>
          </div>
          <div className="dataItem">
            <div className="label">TX HASH</div>
            <div className="value">{transactionHash}</div>
          </div>
          <div className="dataItem">
            <div className="label">LOG INDEX</div>
            <div className="value">{logIndex}</div>
          </div>
          <div className="dataItem">
            <div className="label">BLOCK TIME</div>
            <div className="value">{blockTime}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(EventItem)
