import { Client, dropsToXrp, getBalanceChanges, Payment, SubscribeRequest, TransactionMetadata, Wallet, xrpToDrops} from 'xrpl';
import { Amount } from 'xrpl/dist/npm/models/common';
import { ISSUER_WALLET_ETB_SEED, XRPL_NODE } from './0_config';

let issuer_account = Wallet.fromSecret(ISSUER_WALLET_ETB_SEED)

async function subscribeAndListen() {

    let client = new Client(XRPL_NODE);

    await client.connect();

    let subscribeRequest:SubscribeRequest = {
        command: "subscribe",
        accounts: [issuer_account.classicAddress]
    }

    let listOfKnownDestinationTags:number[] = [12345];

    client.on('transaction', incomingTrx => {
        console.log("RECEIVED A TRANSACTION:")
        console.log(incomingTrx);

        //analyze transaction validity and amounts to be credited

        if(incomingTrx && incomingTrx.transaction?.TransactionType === 'Payment') {
            let paymentTransaction:Payment = incomingTrx.transaction;

            if(paymentTransaction.Destination === issuer_account.classicAddress && typeof incomingTrx.meta === 'object') {
                let metaData:TransactionMetadata = incomingTrx.meta;
                let senderAccount = paymentTransaction.Account;

                let balanceChanges = getBalanceChanges(incomingTrx.meta);
                console.log(JSON.stringify(balanceChanges));

                //check transaction success
                if(metaData.TransactionResult === 'tesSUCCESS' && metaData.delivered_amount) {

                    let deliveredAmount:number = 0;
                    
                    if(metaData.delivered_amount && typeof metaData.delivered_amount === 'object') {
                        //check that issued currency is ETB
                        if(metaData.delivered_amount.issuer === issuer_account.classicAddress && metaData.delivered_amount.currency === 'ETB') {
                            deliveredAmount = Number(metaData.delivered_amount.value);

                            let destTag = paymentTransaction.DestinationTag;

                            //check if known destination tag
                            if(destTag && listOfKnownDestinationTags.includes(destTag)) {
        
                                //it is a known destination tag and correct currency + successful transaction
        
                                console.log("Destination Tag to credit: " + destTag);
                                console.log("Amount to credit: " + (Math.round(deliveredAmount*100)/100) + " ETB");

                                //credit bank account with ETB
        
                            } else {
                                console.log("UNKOWN DESTINATION TAG")
                                //UNKNOWN DESTINATION TAG!
        
                                //bounce payment with memo stating unknown destination tag
                                bouncePayment(senderAccount, metaData.delivered_amount, "Unknown Destination Tag. Please check your Destination Tag!");
                            }

                        } else {
                            console.log("RECEIVED UNKOWN CURRENCY!")
                            //not our currency, bounce!

                            //bounce non ETB payment
                            bouncePayment(senderAccount, metaData.delivered_amount, "Unknown currency detected. Sending back payment");
                        }
                    } else if(typeof metaData.delivered_amount === 'string') {
                        //received XRP payment, send it back!
                        let deliveredDrops = metaData.delivered_amount;
                        let deliveredXRP = dropsToXrp(deliveredDrops);

                        console.log("RECEIVED XRP PAYMENT: " + deliveredXRP + " XRP! Bounce it!");

                        bouncePayment(senderAccount, metaData.delivered_amount, "Incoming XRP Payment detected. Not allowed!");

                        //bounce XRP payments!
                    }

                } else {
                    console.log("TRANSACTION NOT SUCCESSFULL")
                }
            }
        }

    });

    await client.request(subscribeRequest);

    console.log("subscribed. waiting for transaction...")
}

async function bouncePayment(destination:string, amount:Amount, reason:string) {

    let client = new Client(XRPL_NODE);

    await client.connect();

    let bouncePayment:Payment  = {
        TransactionType: "Payment",
        Account: issuer_account.classicAddress,
        Destination: destination,
        Amount: amount,
        Memos: [
            { Memo: 
                {
                    MemoType: Buffer.from("Bounce_Payment", 'utf8').toString('hex').toUpperCase(),
                    MemoData: Buffer.from("Bouncing payment due to " + reason, 'utf8').toString('hex').toUpperCase()
                }
            }
        ]
    }

    let paymentResponse = await client.submit(bouncePayment, {autofill: true, wallet: issuer_account});

    console.log("BOUNCE PAYMENT DONE");
}

subscribeAndListen();
