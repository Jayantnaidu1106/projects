const express = require('express');
const app = express();
const { connectMongoose } = require('./connect');
const { handleGenerateNewShortURL, handleRedirectionOfURL } = require('./controller/url');
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const port = 8001;

// Connect to MongoDB
connectMongoose('mongodb://localhost:27017/URL_Shortner_app').then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});

app.use(express.json()); 

// Use the URL route
app.use("/url", urlRoute);
 
// Route to handle redirecting based on shortId
app.get("/:shortID", handleRedirectionOfURL);

// Start the server
app.listen(port, () => console.log(`Server started at port: ${port}`));
