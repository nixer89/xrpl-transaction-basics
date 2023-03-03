import { Wallet, Client, AccountSet, AccountSetAsfFlags, TrustSet, TrustSetFlags } from 'xrpl';
import { ISSUER_WALLET_ETB_CURRENCY, ISSUER_WALLET_ETB_SEED, ISSUER_WALLET_GBP_CURRENCY, ISSUER_WALLET_GBP_SEED, OPERATIONAL_WALLET_ETB_SEED, OPERATIONAL_WALLET_GBP_SEED, USER_1_SEED, XRPL_NODE } from './0_config'

async function setTrustLine() {

    let issuerWallet2 = Wallet.fromSecret(ISSUER_WALLET_ETB_SEED);
    let operationalWallet2 = Wallet.fromSecret(OPERATIONAL_WALLET_GBP_SEED);
    let userWallet = Wallet.fromSecret(USER_1_SEED);

    //console.log(wallet);

    let client = new Client(XRPL_NODE);

    await client.connect();

    let trustSetTransaction:TrustSet = {
        TransactionType: "TrustSet",
        Account: userWallet.classicAddress,
        Flags: TrustSetFlags.tfSetNoRipple,
        LimitAmount: {
            issuer: issuerWallet2.classicAddress,
            currency: ISSUER_WALLET_ETB_CURRENCY,
            value: "1000000"
        }
    }

    let trustSetResponse = await client.submit(trustSetTransaction, {autofill: true, wallet: userWallet});

    console.log(trustSetResponse);

}

setTrustLine();