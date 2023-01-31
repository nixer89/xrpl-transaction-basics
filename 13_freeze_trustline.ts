import { Wallet, Client, AccountSet, AccountSetAsfFlags, TrustSet, TrustSetFlags } from 'xrpl';
import { ISSUER_WALLET_SEED, USER_1_SEED } from './0_config'

async function setTrustLine() {

    let issuer_wallet = Wallet.fromSecret(ISSUER_WALLET_SEED);
    let user_wallet = Wallet.fromSecret(USER_1_SEED);

    //console.log(wallet);

    let client = new Client("wss://testnet.xrpl-labs.com/");

    await client.connect();

    let trustSetTransaction:TrustSet = {
        TransactionType: "TrustSet",
        Account: issuer_wallet.classicAddress,
        Flags: TrustSetFlags.tfSetFreeze,
        LimitAmount: {
            issuer: user_wallet.classicAddress,
            currency: "AAA",
            value: "0"
        }
    }

    let trustSetResponse = await client.submitAndWait(trustSetTransaction, {autofill: true, wallet: issuer_wallet});

    console.log(trustSetResponse);

}

setTrustLine();