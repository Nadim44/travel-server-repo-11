const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.POST || 5000;

// middle wares
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('travel server is running')
})

app.listen(port, () => {
    console.log(`travel server running on : ${port}`)
})