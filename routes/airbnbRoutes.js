const express = require('express');
const router = express.Router();
const pool = require('../config/dbConfig'); 
const airbnbController = require('../controllers/airbnbController');


router.get('/search', async (req, res) => {
  const { city, state, country } = req.query;
  if (!city || !state || !country) {
    return res.status(400).json({ error: 'Please provide city, state, and country for the search.' });
  }

  try {
    const query = 'SELECT * FROM airbnb WHERE city = $1 AND state = $2 AND country = $3';
    const values = [city, state, country];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No matching listings found.' });
    }

    res.json(result.rows);
  } catch (err) {
    console.error('Error occurred during search:', err);
    res.status(500).json({ error: 'An error occurred during the search.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const listingsQuery = 'SELECT * FROM airbnb';
    const imagesQuery = 'SELECT * FROM airbnb_images';

    const listingsResult = await pool.query(listingsQuery);
    const imagesResult = await pool.query(imagesQuery);

    const listingsWithImages = listingsResult.rows.map(listing => {
      const images = imagesResult.rows
        .filter(image => image.airbnb_id === listing.id)
        .map(image => image.image_url);
      return { ...listing, images };
    });

    res.json(listingsWithImages);
  } catch (err) {
    console.error('Error occurred while fetching listings:', err);
    res.status(500).json({ error: 'An error occurred while fetching listings.' });
  }
  

});

module.exports = router;










