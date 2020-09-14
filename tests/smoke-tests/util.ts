import Web3 from "web3";
import { JsonRpcResponse } from "web3-core-helpers";
import { spawn, ChildProcess } from "child_process";

export const CHAIN_URL = process.env.CHAIN_URL || `http://localhost:9933`;

export const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

export async function customRequest(web3: Web3, method: string, params: any[]) {
	return new Promise<JsonRpcResponse>((resolve, reject) => {
		(web3.currentProvider as any).send(
			{
				jsonrpc: "2.0",
				id: 1,
				method,
				params,
			},
			(error: Error | null, result?: JsonRpcResponse) => {
				if (error) {
					reject(
						`Failed to send custom request (${method} (${params.join(",")})): ${
							error.message || error.toString()
						}`
					);
				}
				resolve(result);
			}
		);
	});
}

export function describeWithWeb3(title: string, cb: (context: { web3: Web3 }) => void) {
	describe(title, () => {
		let context: { web3: Web3 } = { web3: null };

		// Making sure the Moonbeam node has started
		before("Setting up Web3 SDK", async function () {
			context.web3 = new Web3(CHAIN_URL);
		});

		cb(context);
	});
}
