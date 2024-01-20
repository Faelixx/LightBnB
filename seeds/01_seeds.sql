-- USERS

INSERT INTO users (name, email, password) VALUES
  ('John Doe', 'john.doe@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Alice Smith', 'alice.smith@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Bob Johnson', 'bob.johnson@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


-- PROPERTIES

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url,
  cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms,
  country, street, city, province, post_code, active) VALUES
  (1, 'Cozy Cottage', 'A charming cottage in the countryside.', 'thumbnail1.jpg', 'cover1.jpg',
    100, 2, 1, 2, 'United States', '123 Main St', 'Smalltown', 'CA', '12345', true),
  (2, 'Modern Apartment', 'City living at its finest.', 'thumbnail2.jpg', 'cover2.jpg',
    150, 1, 1, 1, 'Canada', '456 Oak St', 'Metropolis', 'ON', '56789', true),
  (3, 'Luxurious Villa', 'A stunning villa with panoramic views.', 'thumbnail3.jpg', 'cover3.jpg',
    300, 4, 3, 4, 'France', '789 Pine St', 'Riviera', 'Cote d\''Azur', '67890', true);
-- RESERVATIONS

INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES
  ('2024-02-01', '2024-02-05', 1, 2),
  ('2024-03-15', '2024-03-20', 2, 3),
  ('2024-04-10', '2024-04-15', 3, 1);

-- PROPERTY REVIEWS

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES
  (2, 1, 1, 4, 'Loved my stay here, will come back again!'),
  (3, 2, 2, 4, 'Had a blast, the family really enjoyed their time here.'),
  (1, 3, 3, 5, 'Absolutely perfect! Our host was amazing!');

--