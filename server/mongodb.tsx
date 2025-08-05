
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://bele:<db_password>@cluster0.t8pbqaq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export default async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    return client;
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

