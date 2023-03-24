import { Wallet, Client, AccountSet, AccountSetAsfFlags, convertStringToHex, AccountSetTfFlags } from 'xrpl';
import { ISSUER_WALLET_ETB_SEED, OPERATIONAL_WALLET_ETB_SEED, XRPL_NODE } from './0_config'

async function setDestinationTag() {

    let wallet = Wallet.fromSecret(ISSUER_WALLET_ETB_SEED);

    console.log(wallet);

    let client = new Client(XRPL_NODE);

    await client.connect();

    let accountSetTransaction:AccountSet = {
        TransactionType: "AccountSet",
        Account: wallet.classicAddress,
        SetFlag: AccountSetAsfFlags.asfDepositAuth
    }

    let accountSetResponse = await client.submit(accountSetTransaction, {autofill: true, wallet: wallet});

    console.log(accountSetResponse);

}

setDestinationTag();