import { Wallet, Client, AccountObjectsRequest } from 'xrpl';
import { ISSUER_WALLET_1_SEED, OPERATIONAL_WALLET_1_SEED, USER_1_SEED } from './0_config'

async function getOffers() {

    let operational_wallet = Wallet.fromSecret(OPERATIONAL_WALLET_1_SEED);

    let client = new Client("wss://testnet.xrpl-labs.com/");

    await client.connect();

    console.log("are we connected? " + client.isConnected());

    let accountObjectsRequest:AccountObjectsRequest = {
        command: 'account_objects',
        account: operational_wallet.classicAddress,
        type: 'offer'
    }

    let accountObjectsResponse = await client.request(accountObjectsRequest);

    console.log(accountObjectsResponse.result.account_objects);
}

getOffers();