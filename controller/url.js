const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({ error: "URL is required" });
    }

    const shortID = shortid.generate();

    try {
        const newURL = await URL.create({
            shortID: shortID,
            redirectURL: body.url,  // Ensure this is populated from req.body.url
            visitHistory: [],
        });

        return res.json({ id: shortID });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function handleRedirectionOfURL(req, res) {
    const { shortID } = req.params.shortID;

    try {
        const entry = await URL.findOneAndUpdate(
            { shortID },
            { $push: { visitHistory: { timestamp: Date.now() } } },
            { new: true }
        );

        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        // This should redirect to the stored redirectURL
        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error("Error processing redirect:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
module.exports = {
    handleGenerateNewShortURL,
    handleRedirectionOfURL,
};
