import React, { Component } from "react";
import QrReader from "react-qr-reader";
import SponsorBar from "../../../SponsorComponent/SponsorBar";

import PropTypes from "prop-types";

class VerifyQR extends Component {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.web3 = context.drizzle.web3;
    this.account = this.props.accounts;
    this.verifyAddress = this.props.donationAddress;
    this.state = {
      sponsorAddress: 0x0,
      emergencyDetails: "",
      getHotelsLength: 0,
      dataKeys: [],
      requestCount: 0,
      requests: [],
      requestDetails: [],
      balanceRemaining: 0,
      delay: 300,
      result: "No result",
      resultValue: false,
    };

    this.handleScan = this.handleScan.bind(this);
  }

  componentDidMount() {}

  handleScan(data) {
    if (data) {
      this.setState({
        result: data
      });
    }
    if (data === this.verifyAddress){
        this.setState({resultValue: true});
    }
  }

  handleError(err) {
    console.error(err);
  }

  //console.log("The Request array", requests);

  doResultsMatch = () => {
      console.log("The state result", this.state.result, "the address", this.verifyAddress);
    return this.state.result === this.verifyAddress;
  };

  render() {
    return (
      <div>
        <QrReader
          delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "100%" }}
        />
        <p>
          {this.state.resultValue ? (
            <div className="resultsMatch">MATCH!</div>
          ) : (
            <div className="noMatch">No Match.</div>
          )}
        </p>
      </div>
    );
  }
}

VerifyQR.contextTypes = {
  drizzle: PropTypes.object
};

VerifyQR.propTypes = {
  shelter: PropTypes.object.isRequired,
  WTIndex: PropTypes.obj
};
export default VerifyQR;
