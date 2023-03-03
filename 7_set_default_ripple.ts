import { Wallet, Client, AccountSet, AccountSetAsfFlags } from 'xrpl';
import { ISSUER_WALLET_ETB_SEED, ISSUER_WALLET_GBP_SEED, XRPL_NODE } from './0_config'

async function setDefaultRipple() {

    let issuerWallet = Wallet.fromSecret(ISSUER_WALLET_GBP_SEED);

    console.log(issuerWallet);

    let client = new Client(XRPL_NODE);

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