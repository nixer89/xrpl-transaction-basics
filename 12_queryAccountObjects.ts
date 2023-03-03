import { Wallet, Client, AccountObjectsRequest } from 'xrpl';
import { ISSUER_WALLET_ETB_SEED, OPERATIONAL_WALLET_ETB_SEED, USER_1_SEED, XRPL_NODE } from './0_config'


const RIPPLE_STATE_LOW_FREEZE:number = 4194304;
const RIPPLE_STATE_LOW_AUTH:number = 262144;

const RIPPLE_STATE_HIGH_NO_RIPPLE:number = 2097152;
const RIPPLE_STATE_HIGH_FREEZE:number = 8388608;

async function getAccountObjects() {

    let issuer_wallet = Wallet.fromSeed(ISSUER_WALLET_ETB_SEED);

    let operational_wallet = Wallet.fromSecret(OPERATIONAL_WALLET_ETB_SEED);

    let user_wallet = Wallet.fromSecret(USER_1_SEED);

    let client = new Client(XRPL_NODE);

    await client.connect();

    console.log("are we connected? " + client.isConnected());

    let accountObjectsRequest:AccountObjectsRequest = {
        command: 'account_objects',
        account: issuer_wallet.classicAddress
    }

    let accountObjectsResponse = await client.request(accountObjectsRequest);

    console.log(accountObjectsResponse.result.account_objects);

    console.log("is rippling disabled USER_1? " + isFlagEnabled(accountObjectsResponse.result.account_objects[0].Flags, RIPPLE_STATE_HIGH_NO_RIPPLE));
    console.log("is rippling disabled USER_2? " + isFlagEnabled(accountObjectsResponse.result.account_objects[1].Flags, RIPPLE_STATE_HIGH_NO_RIPPLE));

    console.log("is trustline frozen USER_1? " + isFlagEnabled(accountObjectsResponse.result.account_objects[0].Flags, RIPPLE_STATE_HIGH_FREEZE));
    console.log("is trustline frozen USER_2? " + isFlagEnabled(accountObjectsResponse.result.account_objects[1].Flags, RIPPLE_STATE_HIGH_FREEZE));

    /**let accountObjectsRequest2:AccountObjectsRequest = {
        command: 'account_objects',
        account: user_wallet.classicAddress
    }

    let accountObjectsResponse2 = await client.request(accountObjectsRequest2);

    console.log(accountObjectsResponse2.result.account_objects);
    **/

    function isFlagEnabled(flagPropertyValue:number, flagToCheck: number) {
        return flagPropertyValue > 0 && (flagPropertyValue & flagToCheck) == flagToCheck;
    }
    
}

getAccountObjects();