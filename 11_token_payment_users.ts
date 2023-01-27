import { Wallet, Client, Payment, xrpToDrops } from 'xrpl';
import { WALLET_SEED_1, WALLET_SEED_2, WALLET_SEED_3 } from './0_config'

async function createCurrency() {

    let issuer_wallet = Wallet.fromSeed(WALLET_SEED_1);

    let sender_wallet = Wallet.fromSecret(WALLET_SEED_2);

    let user_wallet = Wallet.fromSecret(WALLET_SEED_3);

    let client = new Client("wss://s.altnet.rippletest.net/");

    await client.connect();

    let payment:Payment = {
        TransactionType: "Payment",
        Account: sender_wallet.classicAddress,
        Destination: user_wallet.classicAddress,
        Amount: {
            issuer: issuer_wallet.classicAddress,
            currency: "AAA",
            value: "1000"
        }
    }

    let paymentResponse = await client.submitAndWait(payment, {autofill: true, wallet: sender_wallet});

    console.log(paymentResponse);
}

createCurrency();

