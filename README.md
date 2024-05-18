## START HERE

*NOTE:* Work is still in progress. Will be providing more routes and saftey features. Stil in very early production.

1. Run the command ```npm i``` to install the dependencies in this repo
2. Create a ```.env``` file
3. Copy the key-value pairs in ```.env.template``` to your ```.env```
4. Replace the placeholder values with your actual values
5. Run the command ```npm run dev``` to run the server locally
6. Enjoy :)

**How to Retrieve Your MongoDB URI (previoius MongoDB Users)**

1. Access your MongoDB Atlas Dashboard (https://www.mongodb.com/products/platform/atlas-database).
2. Find the cluster that contains your desired database.
3. Click on the cluster name to access its details.
4. Locate the "Connect" section within the cluster overview.
5. Under the "Connect to Cluster" tab, find the URI connection string under the "Drivers" section. **Do not copy and share this string publicly.**

**How to Retrieve Your MongoDB URI (For First-Time MongoDB Users)**

MongoDB Atlas is a cloud-based database service from MongoDB. If you're new to MongoDB, you'll need to create an account and set up a cluster on MongoDB Atlas before obtaining your URI.

**Steps:**

1. **Create a MongoDB Atlas Account:**

   - Visit the MongoDB Atlas signup page: https://www.mongodb.com/cloud/signup
   - Follow the on-screen instructions to create a free account.

3. **Create a Cluster:**

   - After signing up, you'll be guided through the process of creating a new cluster. This involves choosing a cloud provider region, instance type, and setting up security details.

4. **Connect to Your Cluster:**

   - Once your cluster is created, navigate to its details within the MongoDB Atlas dashboard.

5. **Get the Connection String:**

   - Locate the "Connect" section within the cluster overview.
   - Under the "Connect to Cluster" tab, you'll see several connection methods.

6. **Copy the MongoDB URI (Important Security Note):**

   - **Important:** Locate the **URI connection string** under the **"Drivers"** section. This string contains all the necessary information to connect to your MongoDB database. Paste this as the value for ```MONGODB_CONNECTION``` in your env
   - **Security Note:**  **Do not copy and share the entire URI** in a public forum like markdown. It contains sensitive information like your username, password, and cluster details.

**Additional Resources:**

* MongoDB Atlas Getting Started Guide: https://www.mongodb.com/docs/guides/atlas/getting-started/
* MongoDB Atlas Connection String Documentation: https://www.mongodb.com/docs/guides/atlas/connection-string/
* Environment Variables Documentation (depending on your environment): [Refer to your specific environment's documentation]
