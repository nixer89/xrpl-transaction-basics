import { Wallet, Client, AccountSet, AccountSetAsfFlags, convertStringToHex } from 'xrpl';
import { WALLET_SEED_1, WALLET_SEED_2 } from './0_config'

async function setDestinationTag() {

    let wallet = Wallet.fromSecret(WALLET_SEED_1);

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