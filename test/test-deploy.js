const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage", async () => {
	let simpleStorageFactory, simpleStorage;

	beforeEach(async () => {
		simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
		simpleStorage = await simpleStorageFactory.deploy();
	});

	it("Should start with a favorite number of 0", async () => {
		const currentValue = await simpleStorage.retrieve();
		const expectedValue = "0";

		assert.equal(currentValue.toString(), expectedValue);
		// expect(currentValue.toString()).to.equal(expectedValue);
	});

	it("Should update when store is called", async () => {
		const expectedValue = "22";
		const transactionResponse = await simpleStorage.store(expectedValue);
		await transactionResponse.wait(1);

		const currentValue = await simpleStorage.retrieve();

		assert.equal(currentValue.toString(), expectedValue);
	});
});
