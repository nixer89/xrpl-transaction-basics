import { Wallet, Client, AccountSet, AccountSetAsfFlags } from 'xrpl';
import { ISSUER_WALLET_ETB_SEED, XRPL_NODE } from './0_config'

async function setDefaultRipple() {

    let issuer_wallet = Wallet.fromSecret(ISSUER_WALLET_ETB_SEED);

    console.log(issuer_wallet);

    let client = new Client(XRPL_NODE);

    await client.connect();

    let accountSetTransaction:AccountSet = {
        TransactionType: "AccountSet",
        Account: issuer_wallet.classicAddress,
        SetFlag: AccountSetAsfFlags.asfRequireAuth
    }

    let accountSetResponse = await client.submit(accountSetTransaction, {autofill: true, wallet: issuer_wallet});

    console.log(accountSetResponse);

}

setDefaultRipple();