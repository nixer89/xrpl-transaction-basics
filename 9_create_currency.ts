import { Wallet, Client, Payment, xrpToDrops } from 'xrpl';
import { WALLET_SEED_1, WALLET_SEED_2 } from './0_config'

async function createCurrency() {

    let issuer_wallet = Wallet.fromSeed(WALLET_SEED_1);

    let receiver_wallet = Wallet.fromSecret(WALLET_SEED_2);

    let client = new Client("wss://s.altnet.rippletest.net/");

    await client.connect();

    let payment:Payment = {
        TransactionType: "Payment",
        Account: receiver_wallet.classicAddress,
        Destination: issuer_wallet.classicAddress,
        DestinationTag: 1,
        Amount: {
            issuer: issuer_wallet.classicAddress,
            currency: "AAA",
            value: "1000"
        }
    }

    let paymentResponse = await client.submitAndWait(payment, {autofill: true, wallet: receiver_wallet});

    console.log(paymentResponse);
}

createCurrency();

