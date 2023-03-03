import { Wallet, Client, Payment, xrpToDrops, OfferCreate, OfferCreateFlags } from 'xrpl';
import { ISSUER_WALLET_ETB_CURRENCY, ISSUER_WALLET_ETB_SEED, ISSUER_WALLET_GBP_CURRENCY, ISSUER_WALLET_GBP_SEED, OPERATIONAL_WALLET_ETB_SEED, USER_1_SEED, XRPL_NODE } from './0_config'

async function fundViaPayment() {

    let issuer_wallet_1 = Wallet.fromSeed(ISSUER_WALLET_ETB_SEED);
    let operational_wallet_1= Wallet.fromSecret(OPERATIONAL_WALLET_ETB_SEED);

    let issuer_wallet_2 = Wallet.fromSeed(ISSUER_WALLET_GBP_SEED);

    let user_wallet = Wallet.fromSeed(USER_1_SEED);

    let client = new Client(XRPL_NODE);

    await client.connect();

    let sellFromUserWallet:OfferCreate = {
        TransactionType: "OfferCreate",
        Account: user_wallet.classicAddress,
        Flags: OfferCreateFlags.tfSell,
        TakerGets: {
            issuer: issuer_wallet_2.classicAddress,
            currency: ISSUER_WALLET_GBP_CURRENCY,
            value: "10"
        },
        TakerPays: {
            issuer: issuer_wallet_1.classicAddress,
            currency: ISSUER_WALLET_ETB_CURRENCY,
            value: "100"
        }
    }

    /**
     * Buy vs. Sell: By default, Offers are "buy" Offers and are considered fully filled when you have acquired the entire "buy" (TakerPays) amount. 
     * (You may spend less than you expected while receiving the specified amount.) By contrast, a "Sell" Offer is only considered fully filled when you have spent the entire "sell" (TakerGets) amount. 
     * (You may receive more than you expected while spending the specified amount.) This is only relevant if the Offer initially executes at better than its requested exchange rate: 
     * after the Offer gets placed into the ledger, it only ever executes at exactly the requested exchange rate.
     */

    let offerResponse = await client.submit(sellFromUserWallet, {autofill: true, wallet: user_wallet});

    console.log(offerResponse);

    process.exit(0);
}

fundViaPayment();

