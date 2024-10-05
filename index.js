const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const port = 3000;

// Middleware to parse JSON request body
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

app.get("/", (req, res) => {
  res.send(`<h1>Ginues are made not born </h1>`);
});

app.get("/get-percent-data", async (req, res) => {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=8b82a88b-dbda-4ed4-8ed8-db3121818283&start=1&limit=100&convert=USD"
    );
    res.status(200).json({ data: response.data });
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error.message);
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
});

// Define the route to fetch CoinMarketCap data
app.get("/get-coinmarket-data", async (req, res) => {
  const url =
    "https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest";
  const apiKey = "your-coinmarketcap-api-key"; // Replace with your actual API key

  try {
    // Make GET request to CoinMarketCap API
    const response = await axios.get(url, {
      headers: {
        "X-CMC_PRO_API_KEY": "8b82a88b-dbda-4ed4-8ed8-db3121818283",
        Accept: "application/json",
      },
    });

    // Send the response data back to the client
    // console.log(response.data);

    res.json({ data: response.data });
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error.message);
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
