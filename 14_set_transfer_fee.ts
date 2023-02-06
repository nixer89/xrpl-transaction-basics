import { Wallet, Client, AccountSet, AccountSetAsfFlags, decimalToTransferRate } from 'xrpl';
import { ISSUER_WALLET_1_SEED, OPERATIONAL_WALLET_1_SEED } from './0_config'

async function setTransferRate() {

    let wallet = Wallet.fromSecret(ISSUER_WALLET_1_SEED);

    console.log(wallet);

    let client = new Client("wss://testnet.xrpl-labs.com/");

    await client.connect();

    let accountSetTransaction:AccountSet = {
        TransactionType: "AccountSet",
        Account: wallet.classicAddress,
        //SetFlag: AccountSetAsfFlags.asfRequireDest,
        TransferRate: decimalToTransferRate("0.1")
    }

    let accountSetResponse = await client.submitAndWait(accountSetTransaction, {autofill: true, wallet: wallet});

    console.log(accountSetResponse);

}

setTransferRate();