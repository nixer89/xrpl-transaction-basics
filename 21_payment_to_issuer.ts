import { Wallet, Client, Payment, xrpToDrops, PaymentFlags } from 'xrpl';
import { ISSUER_WALLET_ETB_CURRENCY, ISSUER_WALLET_ETB_SEED, ISSUER_WALLET_GBP_SEED, OPERATIONAL_WALLET_ETB_SEED, OPERATIONAL_WALLET_GBP_SEED, USER_1_SEED, XRPL_NODE } from './0_config'

async function payFamiliyMembers() {

    let issuer_wallet = Wallet.fromSeed(ISSUER_WALLET_ETB_SEED);

    let user_wallet = Wallet.fromSecret(USER_1_SEED);

    let client = new Client(XRPL_NODE);

    await client.connect();

    let payment:Payment = {
        TransactionType: "Payment",
        Account: user_wallet.classicAddress,
        Destination: issuer_wallet.classicAddress,
        DestinationTag: 12345,
        Amount: {
            issuer: issuer_wallet.classicAddress,
            currency: ISSUER_WALLET_ETB_CURRENCY,
            value: "10"
        }
    }

    let paymentResponse = await client.submit(payment, {autofill: true, wallet: user_wallet});

    console.log(paymentResponse);

    process.exit();
}

payFamiliyMembers();

