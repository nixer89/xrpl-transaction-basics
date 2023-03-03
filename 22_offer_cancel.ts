import { Wallet, Client, Payment, xrpToDrops, OfferCreate, OfferCreateFlags, OfferCancel, AccountObjectsRequest } from 'xrpl';
import { Offer } from 'xrpl/dist/npm/models/ledger';
import { ISSUER_WALLET_ETB_CURRENCY, ISSUER_WALLET_ETB_SEED, ISSUER_WALLET_GBP_CURRENCY, ISSUER_WALLET_GBP_SEED, OPERATIONAL_WALLET_ETB_SEED, USER_1_SEED,XRPL_NODE } from './0_config'

async function fundViaPayment() {

    let issuer_wallet_1 = Wallet.fromSeed(ISSUER_WALLET_ETB_SEED);
    let operational_wallet_1= Wallet.fromSecret(OPERATIONAL_WALLET_ETB_SEED);

    let userWallet = Wallet.fromSeed(USER_1_SEED);

    let client = new Client(XRPL_NODE);

    await client.connect();

    let accountObjectsRequest:AccountObjectsRequest = {
        command: 'account_objects',
        account: operational_wallet_1.classicAddress,
        type: 'offer'
    }

    let accountObjectsResponse = await client.request(accountObjectsRequest);

    console.log(accountObjectsResponse.result.account_objects);

    let objects = accountObjectsResponse.result.account_objects;

    for(let i = 0; i < objects.length;i++) {
        if(objects[i].LedgerEntryType === 'Offer') {
            let singleOffer:any = objects[i];

            let cancelOffer:OfferCancel = {
                TransactionType: "OfferCancel",
                Account: operational_wallet_1.classicAddress,
                OfferSequence: singleOffer['Sequence']
            }
        
            let offerResponse = await client.submit(cancelOffer, {autofill: true, wallet: operational_wallet_1});

            console.log(offerResponse);

        }
    }

    process.exit(0);

}

fundViaPayment();

