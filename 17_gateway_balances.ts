import { Wallet, Client, AccountInfoRequest, GatewayBalancesRequest } from 'xrpl';
import { ISSUER_WALLET_1_SEED, OPERATIONAL_WALLET_1_SEED, USER_1_SEED } from './0_config'


async function getGatewayBalances() {

    let issuerWallet = Wallet.fromSeed(ISSUER_WALLET_1_SEED);

    let client = new Client("wss://testnet.xrpl-labs.com/");

    await client.connect();

    console.log("are we connected? " + client.isConnected());

    let gatewayBalancesRequest:GatewayBalancesRequest = {
        command: "gateway_balances",
        account: issuerWallet.classicAddress
    }

    let gatewayBalancesResponse = await client.request(gatewayBalancesRequest);

    console.log(gatewayBalancesResponse);

}


getGatewayBalances();