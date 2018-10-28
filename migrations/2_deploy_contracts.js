
const WTIndex = artifacts.require("WTIndex");

module.exports = function(deployer, network, accounts) {
  console.log("Network:", network);
  console.log("Accounts:", accounts);

  const lifTokenAddress =
    network == "mainnent"
      ? "0xeb9951021698b42e4399f9cbb6267aa35f82d59d"
      : "0x5FDFBa355A30FB00ee12965cf3a1c24CA8DF77FB";

  deployer
    .deploy(WTIndex, 1, "Air France: Syria Rescue")
    .then(function(wtIndexContract) {
      console.log("WTIndex address:", wtIndexContract.address);
      wtIndexContract.setLifToken(lifTokenAddress).then(function(tx) {
        console.log("LifToken set on tx:", tx.tx);
      });
      wtIndexContract.registerHotel("Familly of Three", 3).then(function(tx) {
        console.log("Familly of three registered", tx.tx);
      });
      wtIndexContract.registerHotel("Familly of Four", 4).then(function(tx) {
        console.log("Familly of four registered", tx.tx);
      });
      wtIndexContract.registerHotel("Familly of 6", 6).then(function(tx) {
        console.log("Familly of six registered", tx.tx);
      });
    });
};
