import { Wallet, Client, Payment, xrpToDrops, PaymentFlags } from 'xrpl';
import { ISSUER_WALLET_1_CURRENCY, ISSUER_WALLET_1_SEED, ISSUER_WALLET_2_SEED, OPERATIONAL_WALLET_1_SEED, OPERATIONAL_WALLET_2_SEED, USER_1_SEED } from './0_config'

async function payFamiliyMembers() {

    let issuer_wallet = Wallet.fromSeed(ISSUER_WALLET_1_SEED);

    let user_wallet = Wallet.fromSecret(USER_1_SEED);

    let client = new Client("wss://s.altnet.rippletest.net/");

    await client.connect();

    let payment:Payment = {
        TransactionType: "Payment",
        Account: user_wallet.classicAddress,
        Destination: issuer_wallet.classicAddress,
        DestinationTag: 12345,
        Amount: {
            issuer: issuer_wallet.classicAddress,
            currency: ISSUER_WALLET_1_CURRENCY,
            value: "600"
        }
    }

    let paymentResponse = await client.submit(payment, {autofill: true, wallet: user_wallet});

    console.log(paymentResponse);
}

payFamiliyMembers();

