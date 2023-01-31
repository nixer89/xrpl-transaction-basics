import { Wallet, Client} from 'xrpl';
import ECDSA from 'xrpl/dist/npm/ECDSA';
import { ISSUER_WALLET_SEED } from './0_config'

async function createWallet() {

    let newWallet = Wallet.generate(ECDSA.secp256k1)

    console.log(newWallet);
}

async function fundWallet() {
    let wallet = Wallet.fromSeed(ISSUER_WALLET_SEED);
    let client = new Client("wss://s.altnet.rippletest.net/");

    await client.connect();

    console.log("are we connected? " + client.isConnected());

    let result = await client.fundWallet(wallet);

    console.log(result);
}

createWallet();