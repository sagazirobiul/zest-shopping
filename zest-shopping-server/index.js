const express = require('express')
const app = express()
const cors = require('cors')
const port =  process.env.PORT || 8080;

app.use(express.json())
app.use(cors())
require('dotenv').config(); 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cuolv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const cartCollection = client.db(`${process.env.DB_NAME}`).collection('cart');
    const ordersCollection = client.db(`${process.env.DB_NAME}`).collection('orders');

})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)
