import { Wallet, Client, Payment, xrpToDrops, PaymentFlags, DepositPreauth } from 'xrpl';
import { ISSUER_WALLET_ETB_CURRENCY, ISSUER_WALLET_ETB_SEED, ISSUER_WALLET_GBP_SEED, OPERATIONAL_WALLET_ETB_SEED, OPERATIONAL_WALLET_GBP_SEED, USER_1_SEED, XRPL_NODE } from './0_config'

async function payFamiliyMembers() {

    let issuer_wallet = Wallet.fromSeed(ISSUER_WALLET_ETB_SEED);

    let user_wallet = Wallet.fromSecret(USER_1_SEED);

    let client = new Client(XRPL_NODE);

    await client.connect();

    let depositPreAuth:DepositPreauth = {
        TransactionType: "DepositPreauth",
        Account: issuer_wallet.classicAddress,
        Authorize: user_wallet.classicAddress,
    }

    let depositPreAuthResponse = await client.submit(depositPreAuth, {autofill: true, wallet: issuer_wallet});

    console.log(depositPreAuthResponse);

    process.exit(0);
}

payFamiliyMembers();

