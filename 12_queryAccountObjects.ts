import { Wallet, Client, AccountObjectsRequest } from 'xrpl';
import { WALLET_SEED_1, WALLET_SEED_2, WALLET_SEED_3 } from './0_config'

async function getAccountObjects() {

    let issuer_wallet = Wallet.fromSeed(WALLET_SEED_1);

    let sender_wallet = Wallet.fromSecret(WALLET_SEED_2);

    let user_wallet = Wallet.fromSecret(WALLET_SEED_3);

    let client = new Client("wss://testnet.xrpl-labs.com/");

    await client.connect();

    console.log("are we connected? " + client.isConnected());

    let accountObjectsRequest:AccountObjectsRequest = {
        command: 'account_objects',
        account: sender_wallet.classicAddress
    }

    let accountObjectsResponse = await client.request(accountObjectsRequest);

    console.log(accountObjectsResponse.result.account_objects);

    let accountObjectsRequest2:AccountObjectsRequest = {
        command: 'account_objects',
        account: user_wallet.classicAddress
    }

    let accountObjectsResponse2 = await client.request(accountObjectsRequest2);

    console.log(accountObjectsResponse2.result.account_objects);
}

getAccountObjects();