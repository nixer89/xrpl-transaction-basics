import { Wallet, Client, Payment, xrpToDrops } from 'xrpl';
import { ISSUER_WALLET_ETB_CURRENCY, ISSUER_WALLET_ETB_SEED, ISSUER_WALLET_GBP_CURRENCY, ISSUER_WALLET_GBP_SEED, OPERATIONAL_WALLET_ETB_SEED, OPERATIONAL_WALLET_GBP_SEED, USER_1_SEED, XRPL_NODE } from './0_config'

async function createCurrency() {

    let issuer_wallet2 = Wallet.fromSeed(ISSUER_WALLET_GBP_SEED);

    let operational_wallet2 = Wallet.fromSecret(OPERATIONAL_WALLET_GBP_SEED);

    let user_wallet = Wallet.fromSecret(USER_1_SEED)

    let client = new Client(XRPL_NODE);

    await client.connect();

    let payment:Payment = {
        TransactionType: "Payment",
        Account: issuer_wallet2.classicAddress,
        Destination: operational_wallet2.classicAddress,
        Amount: {
            issuer: issuer_wallet2.classicAddress,
            currency: ISSUER_WALLET_GBP_CURRENCY,
            value: "1000000"
        }
    }

    let paymentResponse = await client.submit(payment, {autofill: true, wallet: issuer_wallet2});

    console.log(paymentResponse);
}

createCurrency();

