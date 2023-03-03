import { Wallet, Client, AccountSet, AccountSetAsfFlags, TrustSet, TrustSetFlags } from 'xrpl';
import { ISSUER_WALLET_ETB_CURRENCY, ISSUER_WALLET_ETB_SEED, OPERATIONAL_WALLET_ETB_SEED, USER_1_SEED, XRPL_NODE } from './0_config'

async function setTrustLine() {

    let issuerWallet = Wallet.fromSecret(ISSUER_WALLET_ETB_SEED);
    let operationalWallet = Wallet.fromSecret(OPERATIONAL_WALLET_ETB_SEED);
    let user_wallet = Wallet.fromSecret(USER_1_SEED);

    //console.log(wallet);

    let client = new Client(XRPL_NODE);

    await client.connect();

    let trustSetTransaction:TrustSet = {
        TransactionType: "TrustSet",
        Account: issuerWallet.classicAddress,
        Flags: TrustSetFlags.tfSetfAuth,
        LimitAmount: {
            issuer: user_wallet.classicAddress,
            currency: ISSUER_WALLET_ETB_CURRENCY,
            value: "0"
        }
    }

    let trustSetResponse = await client.submit(trustSetTransaction, {autofill: true, wallet: issuerWallet});

    console.log(trustSetResponse);

}

setTrustLine();