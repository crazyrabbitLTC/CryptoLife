var mnemonic = require("./secrets");

var HDWalletProvider = require("truffle-hdwallet-provider");



module.exports = {
  networks: {
    development: {
      provider: () =>
      new HDWalletProvider(mnemonic, "https://dai.poa.network/"),
    network_id: '100',
    },
    ropsten: {
      // must be a thunk, otherwise truffle commands may hang in CI
      provider: () =>
        new HDWalletProvider(mnemonic, "https://dai.poa.network/"),
      network_id: '100',
    }
  }
};

// module.exports = {
//   migrations_directory: "./migrations",
//   networks: {
//     development: {
//       host: "localhost",
//       port: 7545,
//       network_id: "*" // Match any network id
//     }
//   },
//   solc: {
//     optimizer: {
//       enabled: true,
//       runs: 500
//     }
//   } 
// };
