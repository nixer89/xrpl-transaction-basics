import { Wallet, Client, AccountSet, AccountSetAsfFlags, TrustSet, TrustSetFlags } from 'xrpl';
import { ISSUER_WALLET_1_CURRENCY, ISSUER_WALLET_1_SEED, ISSUER_WALLET_2_CURRENCY, ISSUER_WALLET_2_SEED, USER_1_SEED } from './0_config'

async function setTrustLine() {

    let issuer_wallet = Wallet.fromSecret(ISSUER_WALLET_2_SEED);
    let user_wallet = Wallet.fromSecret(USER_1_SEED);

    //console.log(wallet);

    let client = new Client("wss://testnet.xrpl-labs.com/");

    await client.connect();

    let trustSetTransaction:TrustSet = {
        TransactionType: "TrustSet",
        Account: user_wallet.classicAddress,
        Flags: TrustSetFlags.tfSetNoRipple,
        LimitAmount: {
            issuer: issuer_wallet.classicAddress,
            currency: ISSUER_WALLET_2_CURRENCY,
            value: "400000"
        }
    }

    let trustSetResponse = await client.submit(trustSetTransaction, {autofill: true, wallet: user_wallet});

    console.log(trustSetResponse);

}

setTrustLine();