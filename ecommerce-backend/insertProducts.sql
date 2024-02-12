DELETE FROM web_order_quantities;
DELETE FROM web_order;
DELETE FROM product;
DELETE FROM address;

INSERT INTO product ([name], description, price, product_type, quantity, image_path) VALUES ('Opeth T-shirt Heritage', 'Opeth T-shirt of the album Heritage.', 30, 0, 5, 'images/heritage_shirt.webp');
INSERT INTO product ([name], description, price, product_type, quantity, image_path) VALUES ('Opeth mug', 'Black Opeth mug.', 14, 1, 3, 'images/Opeth-mug-black.webp');
INSERT INTO product ([name], description, price, product_type, quantity, image_path) VALUES ('Opeth T-shirt Tree', 'Opeth T-shirt of a tree.', 35, 0, 40, 'images/opeth_tree.webp');
INSERT INTO product ([name], description, price, product_type, quantity, image_path) VALUES ('Opeth CD Pale Communion', 'Opeth CD of the album Pale Communion.', 20, 2, 42, 'images/pale_communion_cd.jpg');
INSERT INTO product ([name], description, price, product_type, quantity, image_path) VALUES ('Opeth vinyl Blackwater park', 'Opeth vinyl of the album Blackwater park.', 70, 3, 10, 'images/blackwater_park_vinyl.jpg');
INSERT INTO product ([name], description, price, product_type, quantity, image_path) VALUES ('Opeth vinyl Sorceress', 'Opeth vinyl of the album Sorceress.', 70, 3, 42, 'images/sorceress_vinyl.webp');

INSERT INTO local_user (user_role, email, password, first_name, last_name, phone_number) VALUES (1, 'administrator@test.com', '$2a$10$7ObtkFulzUeeoqTZ3wQLCuWj2f2Tsgux0p1cITz2dpZg29rJW/9Nu', 'Admin', 'Adminov', 1000000000);

INSERT INTO product ([name], description, price, product_type, quantity, image_path) VALUES ('The Weeknd vinyl Dawn', 'The Weeknd vinyl of the album Dawn.', 90, 3, 40, 'images/dawn vinyl.webp');
INSERT INTO product ([name], description, price, product_type, quantity, image_path) VALUES ('The Weeknd CD After Hours', 'The Weeknd CD of the album After Hours.', 25, 2, 20, 'images/after-hours-cd.jpg');
INSERT INTO product ([name], description, price, product_type, quantity, image_path) VALUES ('The Weeknd mug Starboy', 'The Weeknd mug of the album Starboy.', 17, 1, 40, 'images/Starboy.jpg');

INSERT INTO product ([name], description, price, product_type, quantity, image_path) VALUES ('Taylor Swift vinyl 1989 (Taylor`s Version)', 'Taylor Swift vinyl of the album 1989 (Taylor`s Version).', 70, 3, 45, 'images/81jw1bKlYyL._UF1000,1000_QL80_.jpg');
INSERT INTO product ([name], description, price, product_type, quantity, image_path) VALUES ('Taylor Swift vinyl Red', 'Taylor Swift vinyl of the album Red.', 55, 3, 23, 'images/SWIFTTAYLORED_2019-11-06_13-19-30_4OS53B2Ohe_2048x.webp');
INSERT INTO product ([name], description, price, product_type, quantity, image_path) VALUES ('Taylor Swift 3D black T-shirt', 'Taylor Swift T-Shirt 3D face.', 25, 0, 10, 'images/taylor-swift-shirt-taylor-swift-t-shirt-tswift-shirt-taylor-shirt-taylor-era-tee-taylor-folklore-swiftie-tshirt-418cd0dd5f790c78a6112fc59b71042c.jpg');
INSERT INTO product ([name], description, price, product_type, quantity, image_path) VALUES ('Taylor Swift cute T-shirt', 'Taylor Swift black T-Shirt.', 23, 0, 15, 'images/Taylor-Swift-T-Shirt.jpg');
INSERT INTO product ([name], description, price, product_type, quantity, image_path) VALUES ('Taylor Swift mug Blank Space', 'Taylor Swift mug of Blank Space.', 17, 1, 40, 'images/talyor-swift-mugs--Blank-Space.webp');

INSERT INTO product ([name], description, price, product_type, quantity, image_path) VALUES ('Drake vinyl Nothing Was The Same', 'Drake vinyl of the album Nothing Was The Same.', 60, 3, 13, 'images/R-5256692-1676581891-1393.jpg');

INSERT INTO product ([name], description, price, product_type, quantity, image_path) VALUES ('Harry Styles vinyl Harry Styles', 'Harry Styles vinyl of the album Harry Stylese.', 73, 3, 21, 'images/harrystyles_2048x.webp');
INSERT INTO product ([name], description, price, product_type, quantity, image_path) VALUES ('Harry Styles vinyl Harry`s House', 'Harry Styles vinyl of the album Harry`s House', 100, 3, 35, 'images/harry-styles-harrys-house-vinyl__70856.jpg');

INSERT INTO product ([name], description, price, product_type, quantity, image_path) VALUES ('Mozart vinyl', 'Classical Music Masterpieces vinyl of Wolfgang Amadeus Mozart.', 18, 3, 7, 'images/71uDyaqcztL._UF894,1000_QL80_.jpg');

INSERT INTO product ([name], description, price, product_type, quantity, image_path) VALUES ('Metallica T-shirt Ride The Lightning', 'Metallica T-Shirt of the album Ride The Lightning.', 26, 0, 9, 'images/RTL_Tshirt.jpg');

INSERT INTO product ([name], description, price, product_type, quantity, image_path) VALUES ('Azis CD', 'Azis CD Kralyat.', 13, 2, 20, 'images/image;s=4160x3120.webp');

INSERT INTO product ([name], description, price, product_type, quantity, image_path) VALUES ('BTS vinyl Love Yourself: Tear', 'White BTS vinyl of the album Love Yourself: Tear.', 100, 3, 19, 'images/61nFux3zNJL._UF1000,1000_QL80_.jpg');
