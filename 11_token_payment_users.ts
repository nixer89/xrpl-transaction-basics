import { Wallet, Client, Payment, xrpToDrops, PaymentFlags } from 'xrpl';
import { ISSUER_WALLET_1_SEED, ISSUER_WALLET_2_CURRENCY, ISSUER_WALLET_2_SEED, OPERATIONAL_WALLET_1_SEED, OPERATIONAL_WALLET_2_SEED, USER_1_SEED } from './0_config'

async function createCurrency() {

    let issuer_wallet = Wallet.fromSeed(ISSUER_WALLET_2_SEED);

    let operational_wallet = Wallet.fromSecret(OPERATIONAL_WALLET_2_SEED);

    let user_wallet = Wallet.fromSecret(USER_1_SEED);

    let client = new Client("wss://s.altnet.rippletest.net/");

    await client.connect();

    let payment:Payment = {
        TransactionType: "Payment",
        Account: operational_wallet.classicAddress,
        Destination: user_wallet.classicAddress,
        //Flags: PaymentFlags.tfPartialPayment,
        Amount: {
            issuer: issuer_wallet.classicAddress,
            currency: ISSUER_WALLET_2_CURRENCY,
            value: "1000"
        }
    }

    let paymentResponse = await client.submit(payment, {autofill: true, wallet: operational_wallet});

    console.log(paymentResponse);
}

createCurrency();

