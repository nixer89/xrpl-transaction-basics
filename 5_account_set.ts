import { Wallet, Client, AccountSet, AccountSetAsfFlags, convertStringToHex } from 'xrpl';
import { ISSUER_WALLET_SEED, USER_1_SEED } from './0_config'

async function setDestinationTag() {

    let wallet = Wallet.fromSecret(ISSUER_WALLET_SEED);

    console.log(wallet);

    let client = new Client("wss://testnet.xrpl-labs.com/");

    await client.connect();

    let accountSetTransaction:AccountSet = {
        TransactionType: "AccountSet",
        Account: wallet.classicAddress,
        SetFlag: AccountSetAsfFlags.asfRequireDest
    }

    let accountSetResponse = await client.submitAndWait(accountSetTransaction, {autofill: true, wallet: wallet});

    console.log(accountSetResponse);

}

setDestinationTag();