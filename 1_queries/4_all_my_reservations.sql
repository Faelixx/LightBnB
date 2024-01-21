SELECT reservations.id AS id,
properties.title AS title,
properties.cost_per_night AS cost_per_night,
reservations.start_date AS start_date,
reservations.end_date AS end_date,
AVG(property_reviews.rating) AS average_rating
FROM reservations
JOIN properties ON property_id = properties.id
JOIN property_reviews ON reservation_id = reservations.id
WHERE reservations.guest_id = 4
GROUP by reservations.id, properties.id
ORDER BY start_date
LIMIT 10;