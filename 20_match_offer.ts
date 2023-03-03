import { Wallet, Client, Payment, xrpToDrops, OfferCreate, OfferCreateFlags } from 'xrpl';
import { ISSUER_WALLET_ETB_CURRENCY, ISSUER_WALLET_ETB_SEED, ISSUER_WALLET_GBP_CURRENCY, ISSUER_WALLET_GBP_SEED, OPERATIONAL_WALLET_ETB_SEED, USER_1_SEED, XRPL_NODE } from './0_config'

async function matchOffer() {

    let issuer_wallet_1 = Wallet.fromSeed(ISSUER_WALLET_ETB_SEED);

    let issuer_wallet_2 = Wallet.fromSeed(ISSUER_WALLET_GBP_SEED);
    let user_wallet_1 = Wallet.fromSecret(USER_1_SEED);

    let client = new Client(XRPL_NODE);

    await client.connect();

    let newOffer:OfferCreate = {
        TransactionType: "OfferCreate",
        Account: user_wallet_1.classicAddress,
        Flags: OfferCreateFlags.tfSell,
        TakerGets: {
            issuer: issuer_wallet_2.classicAddress,
            currency: ISSUER_WALLET_GBP_CURRENCY,
            value: "100"
        },
        TakerPays: {
            issuer: issuer_wallet_1.classicAddress,
            currency: ISSUER_WALLET_ETB_CURRENCY,
            value: "1000"
        }
    }

    let offerResponse = await client.submit(newOffer, {autofill: true, wallet: user_wallet_1});

    console.log(offerResponse);

    process.exit(0);

}

matchOffer();

