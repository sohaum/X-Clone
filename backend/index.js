const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://x_admin:zgCtKLXzVywAfX9T@cluster0.ujeztxz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    const postCollection = client.db('database').collection('posts'); // post collection
    const userCollection = client.db('database').collection('users'); // user collection

    // Get all posts
    app.get('/post', async (req, res) => {
      try {
        const posts = (await postCollection.find().toArray()).reverse();
        res.send(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Error fetching posts');
      }
    });

    // Check the user
    app.post('/user', async (req, res) => {
      try {
        const user = req.body;
        const result = await userCollection.insertOne(user);
        res.send(result);
      } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).send('Error inserting user');
      }
    });

    app.get('/loggedInUser', async (req, res) => {
        try {
            const email = req.query.email;
            const user = await userCollection.find({ email: email }).toArray();
            if (user.length === 0) {
                return res.status(404).send({ message: 'User not found' });
            }
            res.send(user);
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });    

    app.get('/userPost', async (req, res) => {
        try {
            const email = req.query.email;
            const post = (await postCollection.find({ email: email }).toArray()).reverse();
            res.send(post);
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });   

    // Insert a new post
    app.post('/post', async (req, res) => {
      try {
        const post = req.body;
        const result = await postCollection.insertOne(post);
        res.send(result);
      } catch (error) {
        console.error('Error inserting post:', error);
        res.status(500).send('Error inserting post');
      }
    });

    // Register a user
    app.post('/register', async (req, res) => {
      try {
        const user = req.body;
        const result = await userCollection.insertOne(user);
        res.send(result);
      } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user');
      }
    });

    //patch
    app.patch('/userUpdates/:email', async (req, res) => {
        try {
            const { email } = req.params;
            const profile = req.body;
            const filter = { email: email };
            const updateDoc = { $set: profile };
            const options = { upsert: true };
            const result = await userCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        } catch (error) {
            console.error('Error updating user profile:', error);
            res.status(500).send('Error updating user profile');
        }
    });

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello from X!');
});

app.listen(port, () => {
  console.log(`X listening on port ${port}`);
});
