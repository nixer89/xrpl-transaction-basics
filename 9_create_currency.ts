import { Wallet, Client, Payment, xrpToDrops } from 'xrpl';
import { ISSUER_WALLET_SEED, USER_1_SEED } from './0_config'

async function createCurrency() {

    let issuer_wallet = Wallet.fromSeed(ISSUER_WALLET_SEED);

    let receiver_wallet = Wallet.fromSecret(USER_1_SEED);

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

