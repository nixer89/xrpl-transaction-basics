import { Wallet, Client, Payment, xrpToDrops } from 'xrpl';
import { ISSUER_WALLET_SEED, OPERATIONAL_WALLET_SEED, USER_1_SEED } from './0_config'

async function createCurrency() {

    let issuer_wallet = Wallet.fromSeed(ISSUER_WALLET_SEED);

    let operational_wallet = Wallet.fromSecret(OPERATIONAL_WALLET_SEED);

    let user_wallet = Wallet.fromSecret(USER_1_SEED)

    let client = new Client("wss://s.altnet.rippletest.net/");

    await client.connect();

    let payment:Payment = {
        TransactionType: "Payment",
        Account: user_wallet.classicAddress,
        Destination: issuer_wallet.classicAddress,
        DestinationTag: 111,
        Amount: {
            issuer: user_wallet.classicAddress,
            currency: "BBB",
            value: "1000000"
        }
    }

    let paymentResponse = await client.submit(payment, {autofill: true, wallet: user_wallet});

    console.log(paymentResponse);
}

createCurrency();

