const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;


const port = 5000
const pass = "SocialActivity12"

const app = express()
app.use(cors());
app.use(bodyParser.json());

const uri = "mongodb+srv://social:SocialActivity12@cluster0.dhmoa.mongodb.net/volunteer?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
client.connect(err => {
  const collection = client.db("volunteer").collection("projects");
 
app.post('/addRegister',(req,res)=>{
  const newRegister = req.body;
  collection.insertOne(newRegister)
  .then(result=>{
    res.send(result.insertedCount > 0)
  })
console.log(newRegister)
})
app.get('/register', (req,res)=>{
  collection.find({email:req.query.email})
  .toArray((err,documents)=>{
    res.send(documents)
  })
})

});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)
// half done