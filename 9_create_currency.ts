import { Wallet, Client, Payment, xrpToDrops } from 'xrpl';
import { ISSUER_WALLET_1_SEED, ISSUER_WALLET_2_CURRENCY, ISSUER_WALLET_2_SEED, OPERATIONAL_WALLET_1_SEED, OPERATIONAL_WALLET_2_SEED, USER_1_SEED } from './0_config'

async function createCurrency() {

    let issuer_wallet2 = Wallet.fromSeed(ISSUER_WALLET_2_SEED);

    let operational_wallet2 = Wallet.fromSecret(OPERATIONAL_WALLET_2_SEED);

    let user_wallet = Wallet.fromSecret(USER_1_SEED)

    let client = new Client("wss://s.altnet.rippletest.net/");

    await client.connect();

    let payment:Payment = {
        TransactionType: "Payment",
        Account: issuer_wallet2.classicAddress,
        Destination: operational_wallet2.classicAddress,
        Amount: {
            issuer: operational_wallet2.classicAddress,
            currency: ISSUER_WALLET_2_CURRENCY,
            value: "100000"
        }
    }

    let paymentResponse = await client.submit(payment, {autofill: true, wallet: issuer_wallet2});

    console.log(paymentResponse);
}

createCurrency();

