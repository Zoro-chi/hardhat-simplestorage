const { ethers, run, network } = require("hardhat");

const main = async () => {
	const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
	console.log("Deployin contract ...");
	const simpleStorage = await SimpleStorageFactory.deploy();
	await simpleStorage.deployed();
	console.log(`Deployed contract to: ${simpleStorage.address}`);

	// ! VERIFY ONLY ON TESTNET AND NOT HARDHAT NETWORK
	if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
		console.log("Waiting for block confirmations ...");
		await simpleStorage.deployTransaction.wait(6);
		await verify(simpleStorage.address, []);
	}

	const currentValue = await simpleStorage.retrieve();
	console.log(`Current value is: ${currentValue}`);
	const transactionResponse = await simpleStorage.store(22);
	await transactionResponse.wait(1);
	const updatedValue = await simpleStorage.retrieve();
	console.log(`Updated value is: ${updatedValue}`);
};

const verify = async (contractAddress, args) => {
	console.log("Verifying contract ...");
	try {
		await run("verify:verify", {
			address: contractAddress,
			constructorArguments: args,
		});
	} catch (error) {
		if (error.message.toLowerCase().includes("already verified")) {
			console.log("Already verified");
		} else {
			console.log(error);
		}
	}
};

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
