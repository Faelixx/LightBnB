const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const values = [email];
  const queryString = `
  SELECT * 
  FROM users
  WHERE email = $1`;

  return pool.query(queryString, values)
    .then((result) => {
      return result.rows[0];
    }).catch((err) => console.log("This is the error message: " + err.message));
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const values = [id];
  const queryString = `
  SELECT * 
  FROM users
  WHERE id = $1`;

  return pool.query(queryString, values)
    .then((result) => {
      return result.rows[0];
    }).catch((err) => console.log("This is the error message: " + err.message));
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  const values = [user.name, user.email, user.password];

  const queryString = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;



  return pool.query(queryString, values)
    .then((result) => {
      return result.rows;
    }).catch((err) => console.log("This is the error message: " + err.message));
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const values = [limit, guest_id];

  const queryString = `SELECT reservations.id AS id,
  properties.title AS title,
  properties.cost_per_night AS cost_per_night,
  properties.number_of_bedrooms AS number_of_bedrooms,
  properties.number_of_bathrooms AS number_of_bathrooms,
  reservations.start_date AS start_date,
  reservations.end_date AS end_date,
  AVG(property_reviews.rating) AS average_rating
  FROM reservations
  JOIN properties ON property_id = properties.id
  JOIN property_reviews ON reservation_id = reservations.id
  WHERE reservations.guest_id = $2
  GROUP by reservations.id, properties.id
  ORDER BY start_date
  LIMIT $1;`;


  return pool.query(queryString, values)
    .then((result) => {
      return result.rows;
    }).catch((err) => console.log("This is the error message: " + err.message));
};



/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function(options, limit = 10) {

  const queryParams = [];
  console.log("This is limit on init: ", limit);

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating 
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(`%${options.owner_id}%`);
    if (queryParams.length === 0) {
      queryString += `WHERE owner_id LIKE $${queryParams.length} `;
    } else {
      queryString += `AND $${queryParams.length} `;
    }
  }

  if (options.minimum_price_per_night) {
    const minPrice = options.minimum_price_per_night;
    if (queryParams.length === 0) {
      queryParams.push(minPrice);
      queryString += `WHERE cost_per_night > $${queryParams.length} `;
    } else {
      queryParams.push(minPrice);
      queryString += ` AND cost_per_night > $${queryParams.length}`;
    }
  }

  if (options.maximum_price_per_night) {
    const maxPrice = options.maximum_price_per_night;
    if (queryParams.length === 0) {
      queryParams.push(maxPrice);
      queryString += `WHERE cost_per_night < $${queryParams.length} `;
    } else {
      queryParams.push(maxPrice);
      queryString += ` AND cost_per_night < $${queryParams.length}`;
    }
  }



  queryString += `
  GROUP BY properties.id `;
  
  if (options.minimum_rating) {
    const minRat = options.minimum_rating;
    queryParams.push(minRat);
    queryString += `HAVING AVG(property_reviews.rating) > $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length} `;
  
  return pool.query(queryString, queryParams)
    .then((result) => {
      return result.rows;
    }).catch((err) => console.log("This is the error message: " + err.message));
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const values = [
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.street,
    property.city,
    property.province,
    property.post_code,
    property.country,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms,
    property.active = true
  ];

  const queryString = `
  INSERT INTO properties (title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms, active)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;
  `;



  return pool.query(queryString, values)
    .then((result) => {
      return result.rows;
    }).catch((err) => console.log("This is the error message: " + err.message));
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
