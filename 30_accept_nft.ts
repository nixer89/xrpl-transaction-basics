import { Wallet, Client, NFTokenAcceptOffer} from 'xrpl';
import { ISSUER_WALLET_ETB_SEED, USER_1_SEED } from './0_config';

async function sellNFT() {

    try {
        let wallet_issuer = Wallet.fromSeed(ISSUER_WALLET_ETB_SEED);

        let wallet_user = Wallet.fromSeed(USER_1_SEED);

        //console.log(wallet);
        //console.log(wallet2);

        let client = new Client("wss://s.altnet.rippletest.net/");

        await client.connect();

        let nftAcceptOffer:NFTokenAcceptOffer = {
            TransactionType: "NFTokenAcceptOffer",
            Account: wallet_user.classicAddress,
            NFTokenBuyOffer: "328841D3E7CBE0BE4706F9B03FDD37A7C2F8B58CE29DC34098E18B67B47B509C"
        }

        let trxResult = await client.submit(nftAcceptOffer, {autofill: true, wallet: wallet_user});
        
        console.log(trxResult);

    } catch(err) {
        console.log(err);
    }


}

sellNFT();

 