import React, { Component } from "react";
import SponsorBar from "../SponsorComponent/SponsorBar";
import SingleRequest from "../requestComponents/SingleRequest";
import { Link } from "react-router-dom";
import DonateButtonContainer from "../requestComponents/donateButton/DonateButtonContainer";
import MakeRequestContainer from "../requestComponents/makeRequest/MakeRequestContainer";

import PropTypes from "prop-types";

class Home extends Component {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.web3 = context.drizzle.web3;
    this.account = this.props.accounts;
    this.state = {
      sponsorAddress: 0x0,
      emergencyDetails: "",
      getHotelsLength: 0,
      dataKeys: [],
      requestCount: 0,
      requests: [],
      requestDetails: [],
      balanceRemaining: 0,
    };
  }

  componentDidMount() {
    console.log("This.wtindex", this.props.WTIndex);
    console.log("This.status", this.props.drizzleStatus);
    console.log("This.web3", this.web3);
    console.log("This.context", this.context);
    console.log("This.drizzle.contracts", this.contracts.WTIndex);
    this.getTravelReqestCount();
    this.setOwner();
    this.getEmergencyDetails();
    //this.getTravelRequests();
  }

  async componentDidUpdate(prevProps) {
    if (
      prevProps.WTIndex.initialized === false &&
      this.props.WTIndex.initialized === true
    ) {
      console.log("Component did update!");
    }
  }

  setOwner = async () => {
    try {
      const sponsorAddress = await this.contracts.WTIndex.methods
        .owner()
        .call();
      console.log("The owner is:", sponsorAddress);
      this.setState({ sponsorAddress });
    } catch (error) {
      console.log(error);
    }
  };

  getEmergencyDetails = async () => {
    try {
      const emergencyDetails = await this.contracts.WTIndex.methods.DataUri().call();
      console.log("The details are:", emergencyDetails);
      this.setState({emergencyDetails})
    } catch (error) {
      console.log(error)
    }
  }

  getTravelReqestCount = async () => {
    //console.log("Inside Get Travel Requests", this.contracts.WTIndex);
    try {
      const requestCount = await this.contracts.WTIndex.methods
        .getHotelsLength()
        .call();
      console.log("The request Count is: ", requestCount);
      this.setState({ requestCount });
      this.getTravelRequestDetail(requestCount);
    } catch (error) {
      console.log(error);
    }
  };

  getTravelRequests = async () => {
    try {
      const requests = await this.contracts.WTIndex.methods.getHotels().call();
      console.log("The travel request array: ", requests);
      this.setState({ requests });
    } catch (error) {
      console.log(error);
    }
  };

  getTravelRequestDetail = async num => {
    let requests = [];
    for (let x = 0; x < num - 1; x++) {
      try {
        const requestDetail = await this.contracts.WTIndex.methods
          .getHotelByListIndex(x)
          .call();
        console.log("requestDetail", requestDetail);
        requests.push(requestDetail);
      } catch (error) {
        console.log(error);
      }

      this.setState({ requestDetails: requests });
    }

    //console.log("The Request array", requests);
  };

  render() {

    const list = this.state.requestDetails.map((req, i) => {
      return (
        <div className="SingleRequest">
          <SingleRequest
            key={i}
            donationAddress={req[0]}
            dataURI={req[2]}
            donationRequired={req[3]}
            thisAccount={this.account}
            sponsor={this.state.sponsorAddress}

          />
        </div>
      );
    });

    return (
      <main>
        <div className="outerBox">
          <div className="requests">
            <div className="titleBox"><span className="AppName">EMERGENCY TRAVEL</span></div>
            {/* <div className="account-data">
            ACCOUNT FUNDS:{" "}
            <AccountData accountIndex="0" units="ether" precision="3" />
          </div> */}
            <div className="sponsorBar">
              <SponsorBar
                sponsorAddress={this.state.sponsorAddress}
                emergencyDetails={this.state.emergencyDetails}
              />
            </div>
            <div className="menu"><Link to="/request/">**Make Request**</Link></div>
            <div className="request-count">
            
            Travel Requests: {this.state.requestCount-1}
            </div>
            <div className="request-list">{list}</div>
            
          </div>
          
        </div>
      </main>
    );
  }
}

Home.contextTypes = {
  drizzle: PropTypes.object
};

Home.propTypes = {
  shelter: PropTypes.object.isRequired,
  WTIndex: PropTypes.obj
};
export default Home;
