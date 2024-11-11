// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const bitcoin = require('bitcoin-core');

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://newproject:jQPFzZwwJQchTr48@cluster0.bter72s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// // Set up Bitcoin client (you need your own node or an API like Blockstream or BitPay)
// const btcClient = new bitcoin({
//     network: 'testnet', // Use 'mainnet' for real payments
//     username: 'showrab15',
//     password: 'showrab1515',
//     port: 18332
//   });

  
// async function run() {
//   try {


//     const paymentsCollection = client.db("server").collection("payments");

// // Endpoint to initiate a payment
// app.post('/api/pay', async (req, res) => {
//     const { amount } = req.body;
  
//     try {
//       const newAddress = await btcClient.getNewAddress();
//       const paymentRecord = {
//         address: newAddress,
//         amount,
//         status: 'pending',
//         createdAt: new Date()
//       };
  
//       await paymentsCollection.insertOne(paymentRecord);
  
//       res.json({
//         success: true,
//         address: newAddress,
//         message: `Send ${amount} BTC to ${newAddress}`
//       });
//     } catch (error) {
//       res.status(500).json({ success: false, message: 'Payment initiation failed', error });
//     }
//   });
  
//   // Endpoint to check payment status
//   app.post('/api/check-status', async (req, res) => {
//     const { address } = req.body;
  
//     try {
//       const transactions = await btcClient.listTransactions('*', 10);
//       const transaction = transactions.find(tx => tx.address === address && tx.confirmations > 0);
  
//       if (transaction) {
//         await paymentsCollection.updateOne({ address }, { $set: { status: 'completed' } });
//         res.json({ success: true, status: 'completed' });
//       } else {
//         res.json({ success: true, status: 'pending' });
//       }
//     } catch (error) {
//       res.status(500).json({ success: false, message: 'Status check failed', error });
//     }
//   });

//     // Connect the client to the server	(optional starting in v4.7)
//     // await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);



// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bitcoin = require('bitcoin-core');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const uri = "mongodb+srv://newproject:jQPFzZwwJQchTr48@cluster0.bter72s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Set up Bitcoin client
const btcClient = new bitcoin({
  network: 'testnet', // Change to 'mainnet' for real payments
  username: 'showrab15',
  password: 'showrab1515',
  port: 8332
});

async function initialize() {
  try {
    await client.connect();
    const paymentsCollection = client.db("server").collection("payments");

    constt newAddress = await btcClient.getNewAddress(); // This line may be causing the issue
    const paymentRecord = {
      address: newAddress,
      amount,
      status: 'pending',
      createdAt: new Date()
    };

    await paymentsCollection.insertOne(paymentRecord);

    res.json({
      success: true,
      address: newAddress,
      message: `Send ${amount} BTC to ${newAddress}`
    });
  } catch (error) {
    console.error('Payment initiation error:', error); // Log error details
    res.status(500).json({ success: false, message: 'Payment initiation failed', error: error.message });
  }
});

    console.log("Connected to MongoDB successfully and server is ready!");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}

initialize();
app.get('/', (req, res) => {
    res.send('Welcome to the Bitcoin Payment API');
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
