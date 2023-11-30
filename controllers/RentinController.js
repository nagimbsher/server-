const pool = require('../config/dbConfig');

const getAllRentals = async (req, res) => {
  try {
    
    const { rows } = await pool.query(
      'SELECT renting.*, users.username FROM renting JOIN users ON renting.customer_id = users.id'
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching rentals.' });
  }
};
const createRental = async (req, res) => {
  const {
    customer_id,
    property_id,
    rental_start_date,
    rental_end_date,
    rental_price,
    rental_status, // This is the value that must be validated
    rental_notes,
    rental_address
  } = req.body;
console.log("From createrental")
  console.log(req.body)

  try {
    
    const insertResult = await pool.query(
      'INSERT INTO renting (customer_id, property_id, rental_start_date, rental_end_date, rental_price, rental_status, rental_notes) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [customer_id, property_id, rental_start_date, rental_end_date, rental_price, rental_status, rental_notes]
    );
console.log(insertResult)
    const rentalId = insertResult.rows[0].rental_id;
    const selectResult = await pool.query(
      'SELECT renting.*, users.username FROM renting JOIN users ON renting.customer_id = users.id WHERE renting.rental_id = $1',
      [rentalId]
    );

    res.status(201).json(selectResult.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding a new rental.' });
  }
};


const updateRental = async (req, res) => {
  const rentalId = req.params.rental_id;
  const {
    customer_id,
    property_id,
    rental_start_date,
    rental_end_date,
    rental_price,
    rental_status, // This value must also be validated
    rental_notes,
  } = req.body;

  // Reuse the allowedStatuses array from the createRental function
  const allowedStatuses = ['Available', 'Occupied', 'Maintenance', 'Closed'];

  // Check if the provided rental_status is in the allowed statuses
  if (!allowedStatuses.includes(rental_status)) {
    return res.status(400).json({ error: 'Invalid rental status provided.' });
  }
  try {
    const { rows } = await pool.query(
      'UPDATE renting SET customer_id = $1, property_id = $2, rental_start_date = $3, rental_end_date = $4, rental_price = $5, rental_status = $6, rental_notes = $7 WHERE rental_id = $8 RETURNING *',
      [
        customer_id,
        property_id,
        rental_start_date,
        rental_end_date,
        rental_price,
        rental_status,
        rental_notes,
        rentalId,
      ]
    );
    if (rows.length === 0) {
      res.status(404).json({ error: 'Rental not found.' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the rental.' });
  }
};

const deleteRental = async (req, res) => {
  const rentalId = req.params.rental_id;

  try {
    const { rowCount } = await pool.query('DELETE FROM renting WHERE rental_id = $1', [rentalId]);
    if (rowCount === 0) {
      res.status(404).json({ error: 'Rental not found.' });
    } else {
      res.sendStatus(204); // No content, successful deletion
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the rental.' });
  }
};


const addRental = async (req, res) => {
  const { apartment, price, location, address, city, state, country, postal_code, images } = req.body;

  try {
    const query = 'INSERT INTO renting (apartment, price, location, address, city, state, country, postal_code, images) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
    const values = [apartment, price, location, address, city, state, country, postal_code, JSON.stringify(images)];
    const { rows } = await pool.query(query, values);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding a new rental.' });
  }
};

module.exports = {
  addRental,
  getAllRentals,
  createRental,
  updateRental,
  deleteRental,
};





