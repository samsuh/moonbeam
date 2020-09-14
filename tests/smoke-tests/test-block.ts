import { expect } from "chai";

import { describeWithWeb3, sleep } from "./util";

describeWithWeb3("Moonbeam Smoke Tests (Block)", (context) => {
	it("block number should be at block > 0", async function () {
		expect(await context.web3.eth.getBlockNumber()).to.be.gt(1);
	});

	it("block number should be increased after 7 seconds", async function () {
		this.timeout(10000);
		// Not ideal test, but we don't have control over block production in those environment.
		const initialBlockNumber = await context.web3.eth.getBlockNumber();
		await sleep(7000);
		const followingBlockNumber = await context.web3.eth.getBlockNumber();
		expect(followingBlockNumber).to.be.gt(initialBlockNumber + 1);
	});
});
