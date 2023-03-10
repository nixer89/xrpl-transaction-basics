import { Wallet, Client, Payment, xrpToDrops } from 'xrpl';
import { ISSUER_WALLET_ETB_SEED, OPERATIONAL_WALLET_ETB_SEED, XRPL_NODE } from './0_config'

async function fundViaPayment() {

    let issuer_wallet = Wallet.fromSeed(ISSUER_WALLET_ETB_SEED);

    let wallet_no_xrp = Wallet.fromSecret(OPERATIONAL_WALLET_ETB_SEED);

    //console.log(wallet);
    //console.log(wallet2);

    let client = new Client(XRPL_NODE);

    await client.connect();

    //console.log("are we connected? " + client.isConnected());

    let payment:Payment = {
        TransactionType: "Payment",
        Account: issuer_wallet.classicAddress,
        Destination: wallet_no_xrp.classicAddress,
        DestinationTag: 123,
        Amount: xrpToDrops(1),
        
    }

    let paymentResponse = await client.submit(payment, {autofill: true, wallet: issuer_wallet});

    console.log(paymentResponse);
}

fundViaPayment();

