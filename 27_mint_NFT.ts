import { Wallet, Client, NFTokenMint, convertStringToHex, NFTokenMintFlags} from 'xrpl';
import { ISSUER_WALLET_ETB_SEED } from './0_config';

async function mintNFT() {

    try {
        let wallet = Wallet.fromSeed(ISSUER_WALLET_ETB_SEED);

        //console.log(wallet);
        //console.log(wallet2);

        let client = new Client("wss://s.altnet.rippletest.net/");

        wallet.sign
        await client.connect();

        let nftMint:NFTokenMint = {
            Account: wallet.classicAddress,
            NFTokenTaxon: 1,
            TransactionType: "NFTokenMint",
            URI: convertStringToHex("daniel"),
            Flags: NFTokenMintFlags.tfTransferable
        }

        let submittedTrx = await client.submit(nftMint, {autofill: true, wallet: wallet});

        console.log(submittedTrx);
    } catch(err) {
        console.log(err);
    }


}

mintNFT();

 