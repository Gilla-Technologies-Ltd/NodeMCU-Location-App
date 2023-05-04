const express = require('express');
const cors = require('cors');
const {scrapeData} = require('./scraper');
const fs = require('fs');

const app = express();
app.use(cors());
const servicesData = JSON.parse(fs.readFileSync('services.json', 'utf8'));

app.get('/data', async (req, res) => {
  try {
    const city = req.query.city || 1;
    const data = await scrapeData(city);
    res.json({data});
  } catch (error) {
    res.status(500).json({error: 'Failed to fetch data'});
  }
});

// Create a new route to return the mock services data
app.get('/services', (req, res) => {
  res.json(servicesData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
