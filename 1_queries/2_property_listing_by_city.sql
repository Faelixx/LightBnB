SELECT properties.id, properties.title, properties.cost_per_night, AVG(property_reviews.rating) AS average_rating
FROM properties
JOIN property_reviews ON property_id = properties.id
WHERE properties.city LIKE '%ancouv%'
GROUP BY properties.id
HAVING AVG (property_reviews.rating) >= 4
ORDER by cost_per_night;