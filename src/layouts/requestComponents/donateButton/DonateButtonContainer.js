import DonateButton from './DonateButton'
import { drizzleConnect } from 'drizzle-react'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    // SimpleStorage: state.contracts.SimpleStorage,
    // TutorialToken: state.contracts.TutorialToken,
    web3: state.web3,
    drizzleStatus: state.drizzleStatus,
    WTIndex: state.contracts.WTIndex,
  }
}

const DonateButtonContainer = drizzleConnect(DonateButton, mapStateToProps);


export default DonateButtonContainer;
