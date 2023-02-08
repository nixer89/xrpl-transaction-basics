import { Wallet, Client, AccountSet, AccountSetAsfFlags, TrustSet, TrustSetFlags } from 'xrpl';
import { ISSUER_WALLET_1_CURRENCY, ISSUER_WALLET_1_SEED, ISSUER_WALLET_2_CURRENCY, ISSUER_WALLET_2_SEED, OPERATIONAL_WALLET_1_SEED, OPERATIONAL_WALLET_2_SEED, USER_1_SEED } from './0_config'

async function setTrustLine() {

    let issuerWallet2 = Wallet.fromSecret(ISSUER_WALLET_1_SEED);
    let operationalWallet2 = Wallet.fromSecret(OPERATIONAL_WALLET_2_SEED);
    let userWallet = Wallet.fromSecret(USER_1_SEED);

    //console.log(wallet);

    let client = new Client("wss://testnet.xrpl-labs.com/");

    await client.connect();

    let trustSetTransaction:TrustSet = {
        TransactionType: "TrustSet",
        Account: userWallet.classicAddress,
        Flags: TrustSetFlags.tfSetNoRipple,
        LimitAmount: {
            issuer: issuerWallet2.classicAddress,
            currency: ISSUER_WALLET_1_CURRENCY,
            value: "1000000"
        }
    }

    let trustSetResponse = await client.submit(trustSetTransaction, {autofill: true, wallet: userWallet});

    console.log(trustSetResponse);

}

setTrustLine();