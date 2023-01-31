import { Wallet, Client, AccountInfoRequest } from 'xrpl';
import { ISSUER_WALLET_SEED, USER_1_SEED } from './0_config'

const ROOT_FLAG_REQUIREDESTINATION_TAG:number = 131072;
const ROOT_FLAG_DEFAULT_RIPPLE:number = 8388608;

async function getAccountInfo() {

    let wallet = Wallet.fromSeed(ISSUER_WALLET_SEED);

    let wallet2 = Wallet.fromSecret(USER_1_SEED);

    console.log(wallet);
    console.log(wallet2);

    let client = new Client("wss://testnet.xrpl-labs.com/");

    await client.connect();

    console.log("are we connected? " + client.isConnected());

    let accountInfoRequest:AccountInfoRequest = {
        command: "account_info",
        account: wallet.classicAddress
    }

    let accountInfoResponse = await client.request(accountInfoRequest);

    console.log(accountInfoResponse);

    let accountInfoRequest_2:AccountInfoRequest = {
        command: "account_info",
        account: wallet2.classicAddress
    }

    let accountInfoResponse_2 = await client.request(accountInfoRequest_2);

    console.log(accountInfoResponse_2);

    console.log("is destination Tag enabled: " + isFlagEnabled(accountInfoResponse.result.account_data.Flags, ROOT_FLAG_REQUIREDESTINATION_TAG));
    console.log("is destination Tag enabled: " + isFlagEnabled(accountInfoResponse_2.result.account_data.Flags, ROOT_FLAG_REQUIREDESTINATION_TAG));
}

function isFlagEnabled(accountFalgs:number, flagToCheck: number) {
    return accountFalgs > 0 && (accountFalgs & flagToCheck) == flagToCheck;
}

getAccountInfo();