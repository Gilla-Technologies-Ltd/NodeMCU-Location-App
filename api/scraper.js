const axios = require('axios');
const cheerio = require('cheerio');

const scrapeData = async (city = 1) => {
  try {
    const baseUrl = 'https://www.thepavement.org.uk/services?city=';
    const url = `${baseUrl}${city}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Update the selector to target the desired element
    const buttonText = $('a.btn.btn-pavement.active').text();

    return buttonText;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {scrapeData};
