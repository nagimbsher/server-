const pool = require('../config/dbConfig');

const createProperty = async (req, res) => {
      const { city, state, country, name, description, price } = req.body;
      try {
        const query = 'INSERT INTO airbnb (city, state, country, name, description, price) VALUES ($1, $2, $3, $4, $5, $6)';
        const values = [city, state, country, name, description, price];
        await pool.query(query, values);
        res.status(201).send('Listing created successfully.');
      } catch (err) {
        res.status(500).send(err);
      }
};
const  getAllProperties = async (req, res) => {
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

const updateProperty = async (req, res) => {
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







// const pool = require('../config/dbConfig');

// const createListing = async (req, res) => {
//   const { city, state, country, name, description, price } = req.body;

//   try {
//     const query = 'INSERT INTO airbnb (city, state, country, name, description, price) VALUES ($1, $2, $3, $4, $5, $6)';
//     const values = [city, state, country, name, description, price];

//     await pool.query(query, values);
//     res.status(201).send('Listing created successfully.');
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };

// const getAllListings = async (req, res) => {
//   try {
//     const listingsResult = await pool.query('SELECT * FROM airbnb');
//     const imagesResult = await pool.query('SELECT * FROM airbnb_images');

//     const listingsWithImages = listingsResult.rows.map(listing => {
//       const images = imagesResult.rows.filter(image => image.airbnb_id === listing.id)
//         .map(image => image.image_url);
//       return { ...listing, images };
//     });

//     res.json(listingsWithImages);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };

// const updateListing = async (req, res) => {
//   const listingId = req.params.id;
//   const { city, state, country, name, description, price } = req.body;

//   try {
//     const query = 'UPDATE airbnb SET city = $1, state = $2, country = $3, name = $4, description = $5, price = $6 WHERE id = $7';
//     const values = [city, state, country, name, description, price, listingId];

//     await pool.query(query, values);
//     res.send('Listing updated successfully.');
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };

// const deleteListing = async (req, res) => {
//   const listingId = req.params.id;

//   try {
//     const query = 'DELETE FROM airbnb WHERE id = $1';
//     const values = [listingId];

//     await pool.query(query, values);
//     res.send('Listing deleted successfully.');
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };


// const getRentalsWithUsers = async (req, res) => {
//   try {
//     const query = `
//       SELECT *
//       FROM users
//       JOIN renting ON users.id = renting.customer_id;
//     `;

//     const { rows } = await pool.query(query);
//     res.status(200).json(rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while fetching rental properties.' });
//   }
// };

// const getRentalById= async (req,res)=>{
//   // req.params
//   try{
//     pool.query(`select * from airbnb where id = `)
//   }catch(e){
//     res.json(e)
//   }
// }

// module.exports = {
//   getRentalsWithUsers,
//   createListing,
//   getAllListings,
//   updateListing,
//   deleteListing,getRentalById
// };
