import { Wallet, Client, AccountSet, AccountSetAsfFlags, TrustSet, TrustSetFlags } from 'xrpl';
import { ISSUER_WALLET_ETB_CURRENCY, ISSUER_WALLET_ETB_SEED, OPERATIONAL_WALLET_ETB_SEED, XRPL_NODE } from './0_config'

async function setTrustLine() {

    let issuer_wallet = Wallet.fromSecret(ISSUER_WALLET_ETB_SEED);
    let user_wallet = Wallet.fromSecret(OPERATIONAL_WALLET_ETB_SEED);

    //console.log(wallet);

    let client = new Client(XRPL_NODE);

    await client.connect();

    let trustSetTransaction:TrustSet = {
        TransactionType: "TrustSet",
        Account: issuer_wallet.classicAddress,
        Flags: TrustSetFlags.tfSetFreeze,
        LimitAmount: {
            issuer: user_wallet.classicAddress,
            currency: ISSUER_WALLET_ETB_CURRENCY,
            value: "0"
        }
    }

    let trustSetResponse = await client.submitAndWait(trustSetTransaction, {autofill: true, wallet: issuer_wallet});

    console.log(trustSetResponse);

}

setTrustLine();