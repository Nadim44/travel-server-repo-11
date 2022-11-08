const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.POST || 5000;

// middle wares
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vtfbuf5.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const placeCollection = client.db('travelBD').collection('places');
        const reviewCollection = client.db('travelBD').collection('review');
        const purchaseCollection = client.db('travelBD').collection('purchase');

        app.get('/places', async (req, res) => {
            const query = {};
            const cursor = placeCollection.find(query)
            const places = await cursor.toArray();
            res.send(places)
        })

        app.get('/places/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const place = await placeCollection.findOne(query)
            res.send(place)
        })

        //purchase api
        app.get('/purchase', async (req, res) => {
            // console.log(req.query)
            let query = {};
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = purchaseCollection.find(query);
            const purchase = await cursor.toArray();
            res.send(purchase)
        })

        app.post('/purchase', async (req, res) => {
            const purchase = req.body;
            const result = await purchaseCollection.insertOne(purchase);
            res.send(result);
        })
        app.delete('/purchase/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await purchaseCollection.deleteOne(query);
            res.send(result)
        })



        // review api
        app.get('/review', async (req, res) => {
            // console.log(req.query)
            let query = {};
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = reviewCollection.find(query);
            const review = await cursor.toArray();
            res.send(review)
        })
        app.post('/review', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        })


    }
    finally {

    }


}

run().catch(err => console.error(err))



app.get('/', (req, res) => {
    res.send('travel server is running')
})

app.listen(port, () => {
    console.log(`travel server running on : ${port}`)
})