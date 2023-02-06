import { Wallet, Client, AccountSet, AccountSetAsfFlags, TrustSet, TrustSetFlags } from 'xrpl';
import { ISSUER_WALLET_1_CURRENCY, ISSUER_WALLET_1_SEED, OPERATIONAL_WALLET_1_SEED, USER_1_SEED } from './0_config'

async function setTrustLine() {

    let issuerWallet = Wallet.fromSecret(ISSUER_WALLET_1_SEED);
    let operationalWallet = Wallet.fromSecret(OPERATIONAL_WALLET_1_SEED);
    let user_wallet = Wallet.fromSecret(USER_1_SEED);

    //console.log(wallet);

    let client = new Client("wss://testnet.xrpl-labs.com/");

    await client.connect();

    let trustSetTransaction:TrustSet = {
        TransactionType: "TrustSet",
        Account: issuerWallet.classicAddress,
        Flags: TrustSetFlags.tfSetfAuth,
        LimitAmount: {
            issuer: user_wallet.classicAddress,
            currency: ISSUER_WALLET_1_CURRENCY,
            value: "0"
        }
    }

    let trustSetResponse = await client.submit(trustSetTransaction, {autofill: true, wallet: issuerWallet});

    console.log(trustSetResponse);

}

setTrustLine();