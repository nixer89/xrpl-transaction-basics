import { Wallet, Client, Payment, xrpToDrops, PaymentFlags } from 'xrpl';
import { ISSUER_WALLET_ETB_CURRENCY, ISSUER_WALLET_ETB_SEED, ISSUER_WALLET_GBP_CURRENCY, ISSUER_WALLET_GBP_SEED, OPERATIONAL_WALLET_ETB_SEED, OPERATIONAL_WALLET_GBP_SEED, USER_1_SEED, XRPL_NODE } from './0_config'

async function createCurrency() {

    let issuer_wallet_etb = Wallet.fromSeed(ISSUER_WALLET_ETB_SEED);
    let issuer_wallet_gbp = Wallet.fromSeed(ISSUER_WALLET_GBP_SEED);

    let operational_wallet_etb = Wallet.fromSecret(OPERATIONAL_WALLET_ETB_SEED);
    let operational_wallet_gbp = Wallet.fromSecret(OPERATIONAL_WALLET_GBP_SEED);

    let user_wallet = Wallet.fromSecret(USER_1_SEED);

    let client = new Client(XRPL_NODE);

    await client.connect();

    let payment:Payment = {
        TransactionType: "Payment",
        Account: operational_wallet_etb.classicAddress,
        Destination: user_wallet.classicAddress,
        //Flags: PaymentFlags.tfPartialPayment,
        Amount: {
            issuer: issuer_wallet_etb.classicAddress,
            currency: ISSUER_WALLET_ETB_CURRENCY,
            value: "1000"
        },
        Flags: PaymentFlags.tfPartialPayment
    }

    let paymentResponse = await client.submit(payment, {autofill: true, wallet: operational_wallet_etb});

    console.log(paymentResponse);

    process.exit(0);
}

createCurrency();

