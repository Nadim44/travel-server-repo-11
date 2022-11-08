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