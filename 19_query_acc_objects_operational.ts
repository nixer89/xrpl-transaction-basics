import { Wallet, Client, AccountObjectsRequest } from 'xrpl';
import { ISSUER_WALLET_ETB_SEED, OPERATIONAL_WALLET_ETB_SEED, USER_1_SEED, XRPL_NODE } from './0_config'

async function getOffers() {

    let wallet = Wallet.fromSecret(OPERATIONAL_WALLET_ETB_SEED);

    let client = new Client(XRPL_NODE);

    await client.connect();

    console.log("are we connected? " + client.isConnected());

    let accountObjectsRequest:AccountObjectsRequest = {
        command: 'account_objects',
        account: wallet.classicAddress,
        type: 'offer'
    }

    let accountObjectsResponse = await client.request(accountObjectsRequest);

    console.log(accountObjectsResponse.result.account_objects);

    process.exit(0);
}

getOffers();