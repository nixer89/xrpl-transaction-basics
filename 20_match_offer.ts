import { Wallet, Client, Payment, xrpToDrops, OfferCreate, OfferCreateFlags } from 'xrpl';
import { ISSUER_WALLET_1_CURRENCY, ISSUER_WALLET_1_SEED, ISSUER_WALLET_2_CURRENCY, ISSUER_WALLET_2_SEED, OPERATIONAL_WALLET_1_SEED, USER_1_SEED } from './0_config'

async function matchOffer() {

    let issuer_wallet_1 = Wallet.fromSeed(ISSUER_WALLET_1_SEED);

    let issuer_wallet_2 = Wallet.fromSeed(ISSUER_WALLET_2_SEED);
    let user_wallet_1 = Wallet.fromSecret(USER_1_SEED);

    let client = new Client("wss://s.altnet.rippletest.net/");

    await client.connect();

    let newOffer:OfferCreate = {
        TransactionType: "OfferCreate",
        Account: user_wallet_1.classicAddress,
        Flags: OfferCreateFlags.tfSell,
        TakerGets: {
            issuer: issuer_wallet_2.classicAddress,
            currency: ISSUER_WALLET_2_CURRENCY,
            value: "10"
        },
        TakerPays: {
            issuer: issuer_wallet_1.classicAddress,
            currency: ISSUER_WALLET_1_CURRENCY,
            value: "0.01"
        }
    }

    let offerResponse = await client.submit(newOffer, {autofill: true, wallet: user_wallet_1});

    console.log(offerResponse);

}

matchOffer();

