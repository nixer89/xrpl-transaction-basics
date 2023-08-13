import { Wallet, Client, NFTokenCreateOffer, xrpToDrops} from 'xrpl';
import { ISSUER_WALLET_ETB_SEED, USER_1_SEED } from './0_config';

async function sellNFT() {

    try {
        let wallet_issuer = Wallet.fromSeed(ISSUER_WALLET_ETB_SEED);

        let wallet_user = Wallet.fromSeed(USER_1_SEED);

        //console.log(wallet);
        //console.log(wallet2);

        let client = new Client("wss://s.altnet.rippletest.net/");

        await client.connect();

        let nftSellOffer:NFTokenCreateOffer = {
            TransactionType: "NFTokenCreateOffer",
            Account: wallet_issuer.classicAddress,
            NFTokenID: "0008000041123E55018512915C813EA3CAF2CEE1B5B9C3FE16E5DA9D00000001",
            Amount: xrpToDrops(10),
            Owner: wallet_user.classicAddress,
            Destination: wallet_user.classicAddress
        }

        let trxResult = await client.submit(nftSellOffer, {autofill: true, wallet: wallet_issuer});
        
        console.log(trxResult);

    } catch(err) {
        console.log(err);
    }


}

sellNFT();

 