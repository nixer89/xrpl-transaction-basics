import { Wallet, Client, AccountSet, AccountSetAsfFlags } from 'xrpl';
import { WALLET_SEED_1 } from './0_config'

async function setDefaultRipple() {

    let wallet = Wallet.fromSecret(WALLET_SEED_1);

    console.log(wallet);

    let client = new Client("wss://testnet.xrpl-labs.com/");

    await client.connect();

    let accountSetTransaction:AccountSet = {
        TransactionType: "AccountSet",
        Account: wallet.classicAddress,
        SetFlag: AccountSetAsfFlags.asfDefaultRipple
    }

    let accountSetResponse = await client.submitAndWait(accountSetTransaction, {autofill: true, wallet: wallet});

    console.log(accountSetResponse);

}

setDefaultRipple();