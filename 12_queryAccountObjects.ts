import { Wallet, Client, AccountObjectsRequest } from 'xrpl';
import { ISSUER_WALLET_SEED, OPERATIONAL_WALLET_SEED, USER_1_SEED } from './0_config'


const RIPPLE_STATE_LOW_FREEZE:number = 4194304;
const RIPPLE_STATE_LOW_AUTH:number = 262144;

async function getAccountObjects() {

    let issuer_wallet = Wallet.fromSeed(ISSUER_WALLET_SEED);

    let operational_wallet = Wallet.fromSecret(OPERATIONAL_WALLET_SEED);

    let user_wallet = Wallet.fromSecret(USER_1_SEED);

    let client = new Client("wss://testnet.xrpl-labs.com/");

    await client.connect();

    console.log("are we connected? " + client.isConnected());

    let accountObjectsRequest:AccountObjectsRequest = {
        command: 'account_objects',
        account: operational_wallet.classicAddress
    }

    let accountObjectsResponse = await client.request(accountObjectsRequest);

    console.log(accountObjectsResponse.result.account_objects);

    console.log("is authorized? " + isFlagEnabled(accountObjectsResponse.result.account_objects[0].Flags, RIPPLE_STATE_LOW_AUTH));

    /**let accountObjectsRequest2:AccountObjectsRequest = {
        command: 'account_objects',
        account: user_wallet.classicAddress
    }

    let accountObjectsResponse2 = await client.request(accountObjectsRequest2);

    console.log(accountObjectsResponse2.result.account_objects);
    **/

    function isFlagEnabled(trustlineFlag:number, flagToCheck: number) {
        return trustlineFlag > 0 && (trustlineFlag & flagToCheck) == flagToCheck;
    }
    
}

getAccountObjects();