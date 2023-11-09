const express = require('express');
const { ObjectId } = require('mongodb');

const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zyw1sec.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Don't close the client here to keep the connection open
  }
}

run().catch(console.dir);

// Define your route handlers here
const novelCollection = client.db('BookCategorysDB').collection('Novel');
const allCollections = client.db('BookCategorysDB').collection('AllBook');
const thrillerCollection = client.db('BookCategorysDB').collection('thriller');
const historyCollection = client.db('BookCategorysDB').collection('history');
const dramaCollection = client.db('BookCategorysDB').collection('drama');
const sci_FiCollection = client.db('BookCategorysDB').collection('sci-Fi');
const MyBorrowBook = client.db('BorrowBookDB').collection('borrowbook');

app.post('/novel', async (req, res) => {
  const newBook = req.body;
  console.log(newBook);
  const result = await novelCollection.insertOne(newBook);
  const results = await allCollections.insertOne(newBook);
  res.json({ result, results });
});
app.post('/thriller', async (req, res) => {
  const newBook = req.body;
  console.log(newBook);
  const result = await thrillerCollection.insertOne(newBook);
  const results = await allCollections.insertOne(newBook);
  res.json({ result, results });
});
app.post('/history', async (req, res) => {
  const newBook = req.body;
  console.log(newBook);
  const result = await historyCollection.insertOne(newBook);
  const results = await allCollections.insertOne(newBook);
  res.json({ result, results });
});
app.post('/drama', async (req, res) => {
  const newBook = req.body;
  console.log(newBook);
  const result = await dramaCollection.insertOne(newBook);
  const results = await allCollections.insertOne(newBook);
  res.json({ result, results });
});
app.post('/sci-fi', async (req, res) => {
  const newBook = req.body;
  console.log(newBook);
  const result = await sci_FiCollection.insertOne(newBook);
  const results = await allCollections.insertOne(newBook);
  res.json({ result, results });
});

app.post('/borrowbook/:bookId', async (req, res) => {
    const newsBook = req.body;

    const result = await MyBorrowBook.insertOne(newsBook);
    res.send(result);
});





app.get('/novel', async (req, res) => {
  const books = await novelCollection.find({}).toArray();
  res.json(books);
});
app.get('/thriller', async (req, res) => {
  const books = await thrillerCollection.find({}).toArray();
  res.json(books);
});
app.get('/history', async (req, res) => {
  const books = await historyCollection.find({}).toArray();
  res.json(books);
});
app.get('/drama', async (req, res) => {
  const books = await dramaCollection.find({}).toArray();
  res.json(books);
});
app.get('/sci-fi', async (req, res) => {
  const books = await sci_FiCollection.find({}).toArray();
  res.json(books);
});
app.get('/allbook', async (req, res) => {
    const books = await allCollections.find({}).toArray();
    res.json(books);
  });
app.get('/borrowbook', async (req, res) => {
    const products = await MyBorrowBook.find({}).toArray();
    res.json(products);
});
app.get('/novel/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await novelCollection.findOne(query);
    res.send(result);
});
app.get('/thriller/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await thrillerCollection.findOne(query);
    res.send(result);
});
app.get('/history/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await historyCollection.findOne(query);
    res.send(result);
});
app.get('/drama/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await dramaCollection.findOne(query);
    res.send(result);
});
app.get('/sci-fi/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await sci_FiCollection.findOne(query);
    res.send(result);
});

app.get('/', (req, res) => {
  res.send('It is working');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
