import React, { Component } from "react";
import ipfs from "../../home/ipfs/ipfs";
import { Button } from "reactstrap";
import MakeRequestTextForm from "./MakeRequestTextForm";

import PropTypes from "prop-types";

class MakeRequest extends Component {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.web3 = context.drizzle.web3;
    this.state = {
      ipfsHash: null,
      buffer: "",
      ethAddress: "",
      transactionHash: "",
      txReceipt: "",
      personalStory: {},
      completeHash: "",
      
    };
  }

  //Take file input from user
  captureFile = event => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
  };

  convertToBuffer = async reader => {
    //file is converted to a buffer for upload to IPFS
    const buffer = await Buffer.from(reader.result);
    //set this buffer-using es6 syntax
    this.setState({ buffer });
  };

  onClick = async () => {
    try {
      this.setState({ blockNumber: "waiting.." });
      this.setState({ gasUsed: "waiting..." });
      await this.web3.eth.getTransactionReceipt(
        this.state.transactionHash,
        (err, txReceipt) => {
          console.log(err, txReceipt);
          this.setState({ txReceipt });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  onSubmit = async event => {
    event.preventDefault();

    //save document to IPFS,return its hash#, and set hash# to state
    await ipfs.add(this.state.buffer, (err, ipfsHash) => {
      console.log(err, ipfsHash);
      //setState by setting ipfsHash to ipfsHash[0].hash
      this.setState({ ipfsHash: ipfsHash[0].hash });
      console.log("The IPFS HASH IS", ipfsHash);
    });
  };

  onSubmitForm = async event => {
    event.preventDefault();

    //save document to IPFS,return its hash#, and set hash# to state
    await ipfs.add(this.state.buffer, (err, ipfsHash) => {
      console.log(err, ipfsHash);
      //setState by setting ipfsHash to ipfsHash[0].hash
      this.setState({ ipfsHash: ipfsHash[0].hash });
      console.log("The IPFS HASH IS", ipfsHash);
    });
  };

  createFullJsonObjectAndSendToIPFS = async personalStory => {
    let requestObject = JSON.stringify({
      photoURI: this.state.ipfsHash,
      FullName: personalStory.fullName,
      HeadCount: personalStory.numberOfPeople,
      Story: personalStory.personalStory
    });

    console.log("This is the stringified object", requestObject);

    try {
      const buffer = await Buffer.from(requestObject);
      const hash = await ipfs.add(buffer);
      console.log("This is the hash", hash[0]);

      console.log("This is the headcount sent to make transaction", personalStory.numberOfPeople)
      this.createNewRequestOnBlockchain(
        hash[0],
        personalStory.numberOfPeople
      );
    } catch (error) {
      console.log(error);
    }
  };

  ipfsImage = () => {
    let link = "https://ipfs.io/ipfs/" + this.state.ipfsHash;
    console.log("The link", link);
    return link;
  };

  setPersonalStoryAndSubmitToBlockchain = (
    fullName,
    numberOfPeople,
    personalStory
  ) => {
    console.log(
      "This is personal Story",
      fullName,
      numberOfPeople,
      personalStory
    );
    const personalStoryObject = {
      personalStory: { fullName, numberOfPeople, personalStory }
    };
    this.setState(() => {
      {
        fullName, numberOfPeople, personalStory;
      }
    });
    //console.log("Peraonsl story Set!", personalStory);
    this.createFullJsonObjectAndSendToIPFS(personalStoryObject);
  };

  createNewRequestOnBlockchain = async (requestHash, personCount = 1) => {
      console.log("What is request hash?", requestHash.hash, "and Count?", personCount);
    try {
      const transactionHash = await this.contracts.WTIndex.methods
        .registerHotel(requestHash.hash, personCount)
        .send();

        this.setState({transactionHash});
      //console.log("Transaction Hotel Made!", transactionHash);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="requestContainer">
        <div className="uploadIPFS">To request Emergency Travel:</div>
        <div className="uploadImageBox">
          {this.state.ipfsHash ? (
            <img className="uploadedImage" src={this.ipfsImage()} />
          ) : (
            <h3> Upload Photo: </h3>
          )}
        </div>
        <div className="submitImage">
        <form onSubmit={this.onSubmit}>
          <input type="file" onChange={this.captureFile} />
          <Button bsStyle="primary" type="submit">
            UpLoad
          </Button>
        </form>
        </div>
        <div className="requestTextForm" >
        <MakeRequestTextForm
          setPersonalStory={this.setPersonalStoryAndSubmitToBlockchain}
        />
        </div>
        Powered by <a href="https://windingtree.com/">Winding Tree</a>.
      </div>
    );
  }
}

MakeRequest.contextTypes = {
  drizzle: PropTypes.object
};

MakeRequest.propTypes = {
  shelter: PropTypes.object.isRequired,
  WTIndex: PropTypes.obj
};

export default MakeRequest;
