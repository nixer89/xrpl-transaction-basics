import { Wallet, Client, AccountSet, AccountSetAsfFlags, TrustSet, TrustSetFlags } from 'xrpl';
import { WALLET_SEED_1, WALLET_SEED_2 } from './0_config'

async function setTrustLine() {

    let issuer_wallet = Wallet.fromSecret(WALLET_SEED_1);
    let user_wallet = Wallet.fromSecret(WALLET_SEED_2);

    //console.log(wallet);

    let client = new Client("wss://testnet.xrpl-labs.com/");

    await client.connect();

    let trustSetTransaction:TrustSet = {
        TransactionType: "TrustSet",
        Account: user_wallet.classicAddress,
        Flags: TrustSetFlags.tfSetNoRipple,
        LimitAmount: {
            issuer: issuer_wallet.classicAddress,
            currency: "AAA",
            value: "100000"
        }
    }

    let trustSetResponse = await client.submitAndWait(trustSetTransaction, {autofill: true, wallet: user_wallet});

    console.log(trustSetResponse);

}

setTrustLine();