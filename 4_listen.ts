import { Client, SubscribeRequest} from 'xrpl';
import { XRPL_NODE } from './0_config';

async function subscribeAndListen() {

    let accountAddress:string = "rBJb8rfixLF8zTC7YfW5xc688LEuYqqQHY";
    let client = new Client(XRPL_NODE);

    await client.connect();

    let subscribeRequest:SubscribeRequest = {
        command: "subscribe",
        accounts: [accountAddress]
    }

    client.on('transaction', transaction => {
        console.log("RECEIVED A TRANSACTION:")
        console.log(transaction);
    });

    await client.request(subscribeRequest);

    console.log("subscribed. waiting for transaction...")
}

subscribeAndListen();
