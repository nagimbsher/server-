const pool = require('../config/dbConfig');

const createProperty = async (req, res) => {
  const { city, state, country, name, description, price } = req.body;
  try {
    const query = 'INSERT INTO airbnb (city, state, country, name, description, price, availability, next_available_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    const values = [city, state, country, name, description, price, true, null]; // Assuming new property is available immediately
    await pool.query(query, values);
    res.status(201).send('Listing created successfully.');
  } catch (err) {
    res.status(500).send(err);
  }
};

const getAllProperties = async (req, res) => {
  try {
    const listingsResult = await pool.query('SELECT * FROM airbnb');
    const imagesResult = await pool.query('SELECT * FROM airbnb_images');

    const listingsWithImages = listingsResult.rows.map(listing => {
      const images = imagesResult.rows.filter(image => image.airbnb_id === listing.id)
        .map(image => image.image_url);
      return { ...listing, images };
    });

    res.json(listingsWithImages);
  } catch (err) {
    res.status(500).send(err);
  }
};

// This needs more details to be implemented correctly
const updateProperty = async (req, res) => {
  // Implement the update logic here
};

const deleteProperty = async (req, res) => {
  const listingId = req.params.id;
  try {
    const query = 'DELETE FROM airbnb WHERE id = $1';
    const values = [listingId];

    await pool.query(query, values);
    res.send('Listing deleted successfully.');
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  updateProperty,
  deleteProperty
};






