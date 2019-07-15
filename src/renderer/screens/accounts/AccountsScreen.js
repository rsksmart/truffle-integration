import React, { Component } from "react";

import connect from "../helpers/connect";

import AccountList from "./AccountList";

class AccountsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="AccountsScreen">
        <main>
          <AccountList
            accounts={this.props.accounts.addresses}
            balances={this.props.accounts.balances}
            nonces={this.props.accounts.nonces}
            privateKeys={this.props.core.privateKeys}
          />
        </main>
      </div>
    );
  }
}

export default connect(
  AccountsScreen,
  "core",
  "accounts",
);
