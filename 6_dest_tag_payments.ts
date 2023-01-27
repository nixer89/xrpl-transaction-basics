import { Wallet, Client, Payment, xrpToDrops } from 'xrpl';
import { WALLET_SEED_1, WALLET_SEED_2 } from './0_config'

async function fundViaPayment() {

    let wallet_with_xrp = Wallet.fromSeed(WALLET_SEED_1);

    let wallet_no_xrp = Wallet.fromSecret(WALLET_SEED_2);

    //console.log(wallet);
    //console.log(wallet2);

    let client = new Client("wss://s.altnet.rippletest.net/");

    await client.connect();

    //console.log("are we connected? " + client.isConnected());

    let payment:Payment = {
        TransactionType: "Payment",
        Account: wallet_with_xrp.classicAddress,
        Destination: wallet_no_xrp.classicAddress,
        DestinationTag: 123,
        Amount: xrpToDrops(1),
        
    }

    let paymentResponse = await client.submit(payment, {autofill: true, wallet: wallet_with_xrp});

    console.log(paymentResponse);
}

fundViaPayment();

