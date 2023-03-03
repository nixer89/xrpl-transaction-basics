import { Wallet, Client, AccountInfoRequest, GatewayBalancesRequest } from 'xrpl';
import { ISSUER_WALLET_ETB_SEED, OPERATIONAL_WALLET_ETB_SEED, USER_1_SEED, XRPL_NODE } from './0_config'


async function getGatewayBalances() {

    let issuerWallet = Wallet.fromSeed(ISSUER_WALLET_ETB_SEED);

    let client = new Client(XRPL_NODE);

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