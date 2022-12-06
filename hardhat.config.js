require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("./tasks/block-number");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	defaultNetwork: "hardhat",
	networks: {
		goreli: {
			url: process.env.GORELI_RPC_URL || "https://eth-goreli/example",
			accounts: [process.env.GORELI_PRIVATE_KEY || "0xkey"],
			chainId: 5,
		},
		// * RUNNING HARDHAT NETWORK ON LOCALHOST
		localhost: {
			url: process.env.LOCALHOST_URL,
			// *ACCOUNTS ALREADY GIVEN.
			chainId: 31337,
		},
	},
	solidity: "0.8.7",
	etherscan: {
		apiKey: process.env.ETHERSCAN_API_KEY || "key",
	},
	gasReporter: {
		enabled: true,
		outputFile: "gas-report.txt",
		noColors: true,
		currency: "USD",
		coinmarketcap: process.env.COINMARKETCAP_API_KEY || "key",
		// ! TO CHANGE NETWORK BELOW
		// token: "MATIC",
	},
};
