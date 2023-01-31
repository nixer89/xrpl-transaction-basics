import { Wallet, Client, Payment, xrpToDrops } from 'xrpl';
import { ISSUER_WALLET_SEED, USER_1_SEED } from './0_config'

async function fundViaPayment() {

    let wallet_with_xrp = Wallet.fromSeed(ISSUER_WALLET_SEED);

    let wallet_no_xrp = Wallet.fromSecret(USER_1_SEED);

    //console.log(wallet);
    //console.log(wallet2);

    let client = new Client("wss://s.altnet.rippletest.net/");

    await client.connect();

    //console.log("are we connected? " + client.isConnected());

    let payment:Payment = {
        TransactionType: "Payment",
        Account: wallet_with_xrp.classicAddress,
        Destination: wallet_no_xrp.classicAddress,
        Amount: xrpToDrops(300),
        Sequence: 34832723,
        Fee: "10"
    }
    
    let payment2:Payment = {
        TransactionType: "Payment",
        Account: wallet_with_xrp.classicAddress,
        Destination: wallet_no_xrp.classicAddress,
        Amount: xrpToDrops(300),
        Sequence: 34832724,
        Fee: "10"
    }

    let signedTransaction = wallet_with_xrp.sign(payment);
    let signedTransaction2 = wallet_with_xrp.sign(payment2);


    let paymentResponse = await client.submit(signedTransaction.tx_blob);
    let paymentResponse2 = await client.submit(signedTransaction2.tx_blob);

    console.log(paymentResponse);
    console.log(paymentResponse2);
}

fundViaPayment();
