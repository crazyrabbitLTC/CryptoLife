import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import "react-sweet-progress/lib/style.css";
import MakeRequestContainer from './MakeRequestContainer';
import SponsorBar from '../../SponsorComponent/SponsorBar';
import { Link } from "react-router-dom";

const styles = {
  card: {
     maxWidth: 345,
     
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover',
  },
};

class OuterRequest extends Component {
  constructor(props, context){
    super(props, context);
    this.contracts = context.drizzle.contracts;
    this.web3 = context.drizzle.web3;
    this.state = {
      sponsorAddress: 0x0,
      emergencyDetails: "",
    }
  }
  
  //const { classes, donationAddress, donationRequired} = this.props;

 
   componentDidMount() {
    this.setOwner();
   }

   setOwner = async () => {
    try {
      const sponsorAddress = await this.contracts.WTIndex.methods
        .owner()
        .call();
      
      this.setState({ sponsorAddress });
    } catch (error) {
      console.log(error);
    }
  };

   render() {
  return (<main>
    <div className="outerBox">
      <div className="requests"><div className="titleBox">EMERGENCY TRAVEL</div>
      <div className="sponsorBar">
              <SponsorBar
                sponsorAddress={this.state.sponsorAddress}
                emergencyDetails={this.state.emergencyDetails}
              />
            </div>
            <div className="menu"><Link to="/">Home</Link></div>
    <div><MakeRequestContainer /></div>
    </div></div></main>
  );
  }
}


OuterRequest.contextTypes = {
  drizzle: PropTypes.object
};

OuterRequest.propTypes = {
  shelter: PropTypes.object.isRequired,
  WTIndex: PropTypes.obj,
  // classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OuterRequest
);