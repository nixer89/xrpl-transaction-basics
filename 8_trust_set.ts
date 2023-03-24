import { Wallet, Client, AccountSet, AccountSetAsfFlags, TrustSet, TrustSetFlags } from 'xrpl';
import { ISSUER_WALLET_ETB_CURRENCY, ISSUER_WALLET_ETB_SEED, ISSUER_WALLET_GBP_CURRENCY, ISSUER_WALLET_GBP_SEED, OPERATIONAL_WALLET_ETB_SEED, OPERATIONAL_WALLET_GBP_SEED, USER_1_SEED, XRPL_NODE } from './0_config'

async function setTrustLine() {

    let issuerWallet = Wallet.fromSecret(ISSUER_WALLET_GBP_SEED);
    let operationalWallet2 = Wallet.fromSecret(OPERATIONAL_WALLET_ETB_SEED);
    let userWallet = Wallet.fromSecret(USER_1_SEED);

    //console.log(wallet);

    let client = new Client(XRPL_NODE);

    await client.connect();

    let trustSetTransaction:TrustSet = {
        TransactionType: "TrustSet",
        Account: operationalWallet2.classicAddress,
        Flags: TrustSetFlags.tfSetNoRipple,
        LimitAmount: {
            issuer: issuerWallet.classicAddress,
            currency: ISSUER_WALLET_GBP_CURRENCY,
            value: "1000000"
        }
    }

    let trustSetResponse = await client.submit(trustSetTransaction, {autofill: true, wallet: operationalWallet2});

    console.log(trustSetResponse);

    process.exit(0);

}

setTrustLine();