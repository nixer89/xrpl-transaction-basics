import { Wallet, Client, AccountNFTsRequest, parseNFTokenID} from 'xrpl';
import { ISSUER_WALLET_ETB_SEED } from './0_config';

async function mintNFT() {

    try {
        let wallet = Wallet.fromSeed(ISSUER_WALLET_ETB_SEED);

        //console.log(wallet);
        //console.log(wallet2);

        let client = new Client("wss://s.altnet.rippletest.net/");

        await client.connect();

        let accountNftRequest: AccountNFTsRequest = {
            account: wallet.classicAddress,
            command: 'account_nfts'
        }

        let accNftResponse = await client.request(accountNftRequest);

        console.log(accNftResponse);

        console.log(accNftResponse.result.account_nfts);


        accNftResponse.result.account_nfts.forEach(nft => {
            let parsedNftokenID = parseNFTokenID(nft.NFTokenID)
            console.log(parsedNftokenID);
        })

        let parsedNftokenID = parseNFTokenID(accNftResponse.result.account_nfts[0].NFTokenID)

        console.log(parsedNftokenID);

    } catch(err) {
        console.log(err);
    }


}

mintNFT();

 