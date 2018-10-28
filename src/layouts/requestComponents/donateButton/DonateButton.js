import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class DonateButton extends Component {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.web3 = context.drizzle.web3;
    this.state = {
      amountToDonate: 0,
      userAddress: this.props.accounts
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ amountToDonate: event.target.value });
  }

  async handleSubmit(event) {
    let nonce = await this.web3.eth.getTransactionCount(
      this.state.userAddress[0]
    );
    
    const amount = this.state.amountToDonate.toString();

    const amountInWei = this.web3.utils.toWei(amount, "ether");
    

    const transactionHash = await this.web3.eth.sendTransaction(
        {
          from: this.state.userAddress[0],
          to: this.props.donationAddress,
          value: amountInWei,
        },
        (err, transactionHash) => {
          if (err) {
            console.log(err);
          } else {
            console.log(transactionHash);
          }
        },
      );
    //event.preventDefault();
    console.log("Success!", transactionHash);
  }

  componentDidMount() {

  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="number"
            value={this.state.amountToDonate}
            onChange={this.handleChange}
          />
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={this.handleSubmit}
          >
            Donate
          </Button>
        </form>
      </div>
    );
  }
}

DonateButton.contextTypes = {
  drizzle: PropTypes.object
};

DonateButton.propTypes = {
  shelter: PropTypes.object.isRequired,
  WTIndex: PropTypes.obj
};

DonateButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DonateButton);
