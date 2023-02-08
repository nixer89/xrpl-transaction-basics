import { Wallet, Client, Payment, xrpToDrops, OfferCreate, OfferCreateFlags, OfferCancel } from 'xrpl';
import { ISSUER_WALLET_1_CURRENCY, ISSUER_WALLET_1_SEED, ISSUER_WALLET_2_CURRENCY, ISSUER_WALLET_2_SEED, OPERATIONAL_WALLET_1_SEED } from './0_config'

async function fundViaPayment() {

    let issuer_wallet_1 = Wallet.fromSeed(ISSUER_WALLET_1_SEED);
    let operational_wallet_1= Wallet.fromSecret(OPERATIONAL_WALLET_1_SEED);

    let issuer_wallet_2 = Wallet.fromSeed(ISSUER_WALLET_2_SEED);

    let client = new Client("wss://s.altnet.rippletest.net/");

    await client.connect();

    let sellFromOperationalWallet:OfferCancel = {
        TransactionType: "OfferCancel",
        Account: operational_wallet_1.classicAddress,
        OfferSequence: 35212853
    }

    let offerResponse = await client.submit(sellFromOperationalWallet, {autofill: true, wallet: operational_wallet_1});

    console.log(offerResponse);

}

fundViaPayment();
