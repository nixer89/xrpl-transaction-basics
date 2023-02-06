import { Wallet, Client, AccountSet, AccountSetAsfFlags } from 'xrpl';
import { ISSUER_WALLET_1_SEED, ISSUER_WALLET_2_SEED } from './0_config'

async function setDefaultRipple() {

    let issuerWallet = Wallet.fromSecret(ISSUER_WALLET_2_SEED);

    console.log(issuerWallet);

    let client = new Client("wss://testnet.xrpl-labs.com/");

    await client.connect();

    let accountSetTransaction:AccountSet = {
        TransactionType: "AccountSet",
        Account: issuerWallet.classicAddress,
        SetFlag: AccountSetAsfFlags.asfDefaultRipple
    }

    let accountSetResponse = await client.submit(accountSetTransaction, {autofill: true, wallet: issuerWallet});

    console.log(accountSetResponse);

}

setDefaultRipple();