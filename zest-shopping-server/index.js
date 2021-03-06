const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const port =  process.env.PORT || 8080;

app.use(express.json())
app.use(cors())
require('dotenv').config(); 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cuolv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const cartCollection = client.db(`${process.env.DB_NAME}`).collection('cart');
    const ordersCollection = client.db(`${process.env.DB_NAME}`).collection('orders');

    const handlePost = (route, collection) => {
        app.post(route, (req, res) => {
            const data = req.body;
            collection.insertOne(data)
            .then(result => res.send(result.insertOne > 0))
        })
    }
    handlePost('/addCart', cartCollection);
    handlePost('/addOrders', ordersCollection);

    const handleGet = (route, collection) => {
        app.get(route, (req, res) => {
          collection.find({email: req.query.email})
          .toArray((err, items) => {
            res.send(items)
          })
        })
    }
    handleGet('/cartProducts', cartCollection)
    handleGet('/orders', ordersCollection)

    app.delete('/removeCart/:id', (req, res) => {
        cartCollection.deleteOne({_id: ObjectId(req.params.id)})
        .then(result => {
            res.send( result.deletedCount > 0)
        })
    })

})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)
