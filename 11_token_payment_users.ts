import { Wallet, Client, Payment, xrpToDrops } from 'xrpl';
import { ISSUER_WALLET_SEED, USER_1_SEED, USER_2_SEED } from './0_config'

async function createCurrency() {

    let issuer_wallet = Wallet.fromSeed(ISSUER_WALLET_SEED);

    let sender_wallet = Wallet.fromSecret(USER_1_SEED);

    let user_wallet = Wallet.fromSecret(USER_2_SEED);

    let client = new Client("wss://s.altnet.rippletest.net/");

    await client.connect();

    let payment:Payment = {
        TransactionType: "Payment",
        Account: sender_wallet.classicAddress,
        Destination: user_wallet.classicAddress,
        DestinationTag: 1234,
        Amount: {
            issuer: issuer_wallet.classicAddress,
            currency: "AAA",
            value: "1234"
        }
    }

    let paymentResponse = await client.submitAndWait(payment, {autofill: true, wallet: sender_wallet});

    console.log(paymentResponse);
}

createCurrency();

